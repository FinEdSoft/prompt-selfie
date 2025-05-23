import { prismaClient } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Authenticate the user
        const user = await currentUser();
        const userId = user?.id;
        
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const userCredit = await prismaClient.userCredit.findUnique({
            where: {
                userId: userId,
            },
            select: {
                amount: true,
                updatedAt: true,
            },
        });

        return NextResponse.json({
            credits: userCredit?.amount || 0,
            lastUpdated: userCredit?.updatedAt || null,
        });
    } catch (error) {
        console.error("Error fetching credits:", error);
        return NextResponse.json(
            {
                message: "Error fetching credits",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
