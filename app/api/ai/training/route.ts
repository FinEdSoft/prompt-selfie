import { prismaClient } from "@/lib/prisma";
import { TrainModel } from "@/lib/types";
import { FalAIModel } from "@/models/FalAIModel";
import { NextRequest, NextResponse } from "next/server";


const falAiModel = new FalAIModel();

export async function POST(req: NextRequest) {

    const requestHeaders = new Headers(req.headers);
    
    const userId = requestHeaders.get('x-user-id');
    
    // Parse request body
    const body = await req.json();
    const parsedBody = TrainModel.safeParse(body);
    
    if (!parsedBody.success) {
        return NextResponse.json({
            message: "Input incorrect"
        }, { status: 411 });
    }
    
    // Train the model using falAi service
    const { request_id, response_url } = await falAiModel.trainModel(
        parsedBody.data.zipUrl,
        parsedBody.data.name
    );
    
    // Create model in database
    const data = await prismaClient.model.create({
        data: {
            name: parsedBody.data.name,
            type: parsedBody.data.type,
            age: parsedBody.data.age,
            ethinicity: parsedBody.data.ethinicity,
            eyeColor: parsedBody.data.eyeColor,
            bald: parsedBody.data.bald,
            userId: userId,
            zipUrl: parsedBody.data.zipUrl,
            falAiRequestId: request_id,
        },
    });
    
    return NextResponse.json({
        modelId: data.id
    });
}