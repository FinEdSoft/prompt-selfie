import { prismaClient } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { $Enums, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const user  = await currentUser();
        const userId = user?.id ?? "";
        
        // Parse the URL to get query parameters
        const { searchParams } = new URL(request.url);
        const modelId = searchParams.get("modelId") ?? "";
        const ids = searchParams.getAll("ids");
        const limit = searchParams.get("limit") || "100";
        const offset = searchParams.get("offset") || "0";
        
        let imagesData: {
            modelId: string;
            id: string;
            imageUrl: string;
            userId: string;
            prompt: string;
            falAiRequestId: string | null;
            status: $Enums.OutputImageStatusEnum;
            createdAt: Date;
            updatedAt: Date;
        }[] = [];

        let [outputImages, count] = [imagesData, 0];
        
        if(modelId !== "") {
            [outputImages, count] = await prismaClient.$transaction([
            prismaClient.outputImages.findMany({
                where: {
                    userId,
                    modelId,
                    status: {
                        not: "Failed",
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                skip: parseInt(offset),
                take: parseInt(limit),
            }),
            prismaClient.outputImages.count({ 
                    where: {
                        userId,
                        modelId,
                        status: {
                            not: "Failed",
                        },
                    } 
                })
            ]);
        } else {
            [outputImages, count] = await prismaClient.$transaction([
            prismaClient.outputImages.findMany({
                where: {
                    userId,
                    status: {
                        not: "Failed",
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                skip: parseInt(offset),
                take: parseInt(limit),
            }),
            prismaClient.outputImages.count({ 
                    where: {
                        userId,
                        status: {
                            not: "Failed",
                        },
                    } 
                })
            ]);
        }
        
        return NextResponse.json({
            images: outputImages,
            count,
        });
    } catch (error) {
        console.error("Error fetching images:", error);
        return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
    }
}