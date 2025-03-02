import { NextRequest, NextResponse } from "next/server";
import { IMAGE_GEN_CREDITS } from "@/constants";
import { GenerateImagesFromPack } from "@/lib/types";
import { prismaClient } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const requestHeaders = new Headers(req.headers);
    const userId  = requestHeaders.get('x-user-id');
    
    try {
        const body = await req.json();
        const parsedBody = GenerateImagesFromPack.safeParse(body);
    
        if (!parsedBody.success) {
            return NextResponse.json({
                message: "Input incorrect",
            }, { status: 411 });
        }
    
        const prompts = await prismaClient.packPrompts.findMany({
            where: {
                packId: parsedBody.data.packId,
            },
        });
    
        const model = await prismaClient.model.findFirst({
            where: {
                id: parsedBody.data.modelId,
            },
        });
    
        if (!model) {
            return NextResponse.json({
                message: "Model not found",
            }, { status: 411 });
        }
    
        // check if the user has enough credits
        const credits = await prismaClient.userCredit.findUnique({
            where: {
                userId: userId,
            },
        });
    
        if ((credits?.amount ?? 0) < IMAGE_GEN_CREDITS * prompts.length) {
            return NextResponse.json({
                message: "Not enough credits",
            }, { status: 411 });
        }
    
        let requestIds: { request_id: string }[] = await Promise.all(
            prompts.map((prompt) =>
                falAiModel.generateImage(prompt.prompt, model.tensorPath!)
            )
        );
    
        const images = await prismaClient.outputImages.createManyAndReturn({
            data: prompts.map((prompt, index) => ({
                prompt: prompt.prompt,
                userId: userId,
                modelId: parsedBody.data.modelId,
                imageUrl: "",
                falAiRequestId: requestIds[index].request_id,
            })),
        });
    
        await prismaClient.userCredit.update({
            where: {
                userId: userId,
            },
            data: {
                amount: { decrement: IMAGE_GEN_CREDITS * prompts.length },
            },
        });
    
        return NextResponse.json({
            images: images.map((image) => image.id),
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}