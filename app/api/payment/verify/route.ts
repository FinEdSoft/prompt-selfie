import { verifyStripePayment } from '@/lib/payment';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { sessionId } = body;

        if (!sessionId) {
            return NextResponse.json(
                { message: "Session ID is required" },
                { status: 400 }
            );
        }

        // Verify the payment session
        const isValid = await verifyStripePayment(sessionId);

        if (isValid) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { message: "Payment verification failed" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        return NextResponse.json(
            {
                message: "Error verifying payment",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}