import { NextResponse } from "next/server";
import { GenerateImage } from "@/lib/types";
import { prismaClient } from "@/lib/prisma";
import { FalAIModel } from "@/models/FalAIModel";
import { currentUser } from "@clerk/nextjs/server";

const IMAGE_GEN_CREDITS = 1; // Define your credit cost for image generation

export async function POST(req: Request) {
    try {
        const user  = await currentUser();
        const userId = user?.id ?? "";

        // Parse the request body
        const body = await req.json();
        const parsedBody = GenerateImage.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({}, { status: 411 });
        }

        const model = await prismaClient.model.findUnique({
            where: {
                id: parsedBody.data.modelId,
            },
        });

        if (!model || !model.tensorPath) {
            return NextResponse.json({
                message: "Model not found",
            }, { status: 411 });
        }

        // Check if the user has enough credits
        const credits = await prismaClient.userCredit.findUnique({
            where: {
                userId,
            },
        });

        if ((credits?.amount ?? 0) < IMAGE_GEN_CREDITS) {
            return NextResponse.json({
                message: "Not enough credits",
            }, { status: 411 });
        }

        const { request_id } = await new FalAIModel().generateImage(
            parsedBody.data.prompt,
            model.tensorPath
        );

        const data = await prismaClient.outputImages.create({
            data: {
                prompt: parsedBody.data.prompt,
                userId,
                modelId: parsedBody.data.modelId,
                imageUrl: "",
                falAiRequestId: request_id,
            },
        });

        await prismaClient.userCredit.update({
            where: {
                userId,
            },
            data: {
                amount: { decrement: IMAGE_GEN_CREDITS },
            },
        });

        return NextResponse.json({
            imageId: data.id,
        });
        
    } catch (error) {
        console.error("Image generation error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}