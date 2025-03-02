import { fal } from "@fal-ai/client";
import { TRAIN_MODEL_CREDITS } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";
import { FalAIModel } from "@/models/FalAIModel";

const falAiModel = new FalAIModel();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const requestId = body.request_id as string;
        
        const result = await fal.queue.result("fal-ai/flux-lora", {
            requestId,
        });

        // Get user ID from session or auth token
        // You need to implement authentication middleware to get userId
        const userId = ""; // Replace with actual user ID retrieval logic
        
        // check if the user has enough credits
        const credits = await prismaClient.userCredit.findUnique({
            where: {
                userId: userId,
            },
        });

        if ((credits?.amount ?? 0) < TRAIN_MODEL_CREDITS) {
            return NextResponse.json(
                { message: "Not enough credits" },
                { status: 411 }
            );
        }

        const { imageUrl } = await falAiModel.generateImageSync(
            //@ts-ignore
            result.data.diffusers_lora_file.url
        );

        await prismaClient.model.updateMany({
            where: {
                falAiRequestId: requestId,
            },
            data: {
                trainingStatus: "Generated",
                //@ts-ignore
                tensorPath: result.data.diffusers_lora_file.url,
                thumbnail: imageUrl,
            },
        });

        await prismaClient.userCredit.update({
            where: {
                userId: userId,
            },
            data: {
                amount: { decrement: TRAIN_MODEL_CREDITS },
            },
        });

        return NextResponse.json({ message: "Webhook received" });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json(
            { message: "Error processing webhook" },
            { status: 500 }
        );
    }
}