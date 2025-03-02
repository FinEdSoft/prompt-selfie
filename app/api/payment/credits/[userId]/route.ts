import { NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prisma'; // Adjust this import path as needed

export async function GET(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const userCredit = await prismaClient.userCredit.findUnique({
            where: {
                userId: (await params).userId,
            },
            select: {
                amount: true,
            },
        });
        
        return NextResponse.json({
            credits: userCredit?.amount || 0,
        });
    } catch (error) {
        console.error("Error fetching credits:", error);
        return NextResponse.json(
            { message: "Error fetching credits" },
            { status: 500 }
        );
    }
}