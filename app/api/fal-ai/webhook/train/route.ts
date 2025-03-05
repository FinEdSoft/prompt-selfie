import { fal } from "@fal-ai/client";
import { TRAIN_MODEL_CREDITS } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";
import { FalAIModel } from "@/models/FalAIModel";
import { currentUser } from "@clerk/nextjs/server";

const falAiModel = new FalAIModel();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const requestId = body.request_id as string;

        const model = await prismaClient.model.findFirst({
            where: {
              falAiRequestId: requestId,
            },
        });

        if (!model) {
            console.error("No model found for requestId:", requestId);
            return NextResponse.json(
                { message: "Model not found" },
                { status: 404 }
            );
        }

        const result = await fal.queue.result("fal-ai/flux-pro/v1.1", {
            requestId,
        });
        
        // check if the user has enough credits
        const credits = await prismaClient.userCredit.findUnique({
            where: {
                userId: model.userId,
            },
        });

        if ((credits?.amount ?? 0) < TRAIN_MODEL_CREDITS) {
            return NextResponse.json(
                { message: "Not enough credits" },
                { status: 411 }
            );
        }

        const { imageUrl } = await falAiModel.generateImageSync(
            //@ts-expect-error
            result.data.diffusers_lora_file.url
        );

        await prismaClient.model.updateMany({
            where: {
                falAiRequestId: requestId,
            },
            data: {
                trainingStatus: "Generated",
                //@ts-expect-error
                tensorPath: result.data.diffusers_lora_file.url,
                thumbnail: imageUrl,
            },
        });

        await prismaClient.userCredit.update({
            where: {
                userId: model.userId,
            },
            data: {
                amount: { decrement: TRAIN_MODEL_CREDITS },
            },
        });

        return NextResponse.json({ message: "Webhook processed successfully" });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json(
            { message: "Error processing webhook" },
            { status: 500 }
        );
    }
}