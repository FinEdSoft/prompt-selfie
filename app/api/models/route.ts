import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const requestHeaders = new Headers(request.headers);
            
        const userId  = requestHeaders.get('x-user-id') ?? "";
        
        const models = await prismaClient.model.findMany({
            where: {
                OR: [{ userId }, { open: true }],
            },
        });
        
        return NextResponse.json({ models });
    } catch (error) {
        console.error("Error fetching models:", error);
        return NextResponse.json(
            { error: "Failed to fetch models" },
            { status: 500 }
        );
    }
}