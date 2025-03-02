import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prisma'; // Adjust this import based on your project structure

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        // console.log("fal-ai/webhook/image");
        // console.log(body);
        
        // update the status of the image in the DB
        const requestId = body.request_id;
        
        if (body.status === "ERROR") {
            await prismaClient.outputImages.updateMany({
                where: {
                    falAiRequestId: requestId,
                },
                data: {
                    status: "Failed",
                    imageUrl: body.payload.images[0].url,
                },
            });
            
            return NextResponse.json({}, { status: 411 });
        }
        
        await prismaClient.outputImages.updateMany({
            where: {
                falAiRequestId: requestId,
            },
            data: {
                status: "Generated",
                imageUrl: body.payload.images[0].url,
            },
        });
        
        return NextResponse.json({
            message: "Webhook received",
        });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: "Failed to process webhook" },
            { status: 500 }
        );
    }
}