import { prismaClient } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const user  = await currentUser();
        const userId = user?.id ?? "";
        
        // Parse the URL to get query parameters
        const { searchParams } = new URL(request.url);
        const ids = searchParams.getAll("ids");
        const limit = searchParams.get("limit") || "100";
        const offset = searchParams.get("offset") || "0";
        
        
        const imagesData = await prismaClient.outputImages.findMany({
            where: {
                // id: { in: ids },
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
        });
        
        return NextResponse.json({
            images: imagesData,
        });
    } catch (error) {
        console.error("Error fetching images:", error);
        return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
    }
}