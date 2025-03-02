import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const subscription = await prismaClient.subscription.findFirst({
            where: {
                userId: (await params).userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                plan: true,
                createdAt: true,
            },
        });

        return NextResponse.json({
            subscription: subscription || null,
        });
    } catch (error) {
        console.error("Error fetching subscription:", error);
        return NextResponse.json(
            { message: "Error fetching subscription status" },
            { status: 500 }
        );
    }
}