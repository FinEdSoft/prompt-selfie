import { NextRequest, NextResponse } from "next/server";
import { IMAGE_GEN_CREDITS } from "@/constants";
import { GenerateImagesFromPack } from "@/lib/types";
import { prismaClient } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

import { FalAIModel } from "@/models/FalAIModel";

const falAiModel = new FalAIModel();

export async function POST(req: NextRequest) {
    const user  = await currentUser();
    const userId = user?.id ?? "";
    
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
    
        const requestIds: { request_id: string }[] = await Promise.all(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prompts.map((prompt: any) =>
                falAiModel.generateImage(prompt.prompt, model.tensorPath!)
            )
        );
    
        const images = await prismaClient.outputImages.createManyAndReturn({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: prompts.map((prompt: any, index: number) => ({
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