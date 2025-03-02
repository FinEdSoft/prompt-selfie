import { prismaClient } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const packs = await prismaClient.packs.findMany({});
        
        return NextResponse.json({ packs });
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch packs' },
            { status: 500 }
        );
    }
}