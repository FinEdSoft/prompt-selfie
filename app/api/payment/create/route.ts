import { createStripeSession, PaymentService } from "@/lib/payment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { plan, isAnnual, method } = body;
        
        // Get user from the request - implement this based on your auth setup
        const requestHeaders = new Headers(request.headers);
            
        const userId  = requestHeaders.get('x-user-id') ?? "";
        const userEmail = requestHeaders.get('x-user-email') ?? "";

        console.log("Payment request received:", {
            userId,
            plan,
            isAnnual,
            method,
            body,
        });

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        if (!userEmail) {
            return NextResponse.json({ message: "User email is required" }, { status: 400 });
        }

        if (!plan || !method) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        if (method === "stripe") {
            try {
                const session = await createStripeSession(
                    userId,
                    plan as "basic" | "premium",
                    isAnnual,
                    userEmail
                );
                console.log("Stripe session created:", session);
                return NextResponse.json({ sessionId: session.id });
            } catch (error) {
                console.error("Stripe session creation error:", error);
                return NextResponse.json(
                    {
                        message: "Error creating payment session",
                        details: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
                    },
                    { status: 500 }
                );
            }
        }

        if (method === "razorpay") {
            try {
                const order = await PaymentService.createRazorpayOrder(
                    userId,
                    plan,
                    isAnnual
                );
                console.log("Razorpay order created successfully:", order);
                return NextResponse.json(order);
            } catch (error) {
                console.error("Razorpay error:", error);
                return NextResponse.json(
                    {
                        message: "Error creating Razorpay order",
                        details: process.env.NODE_ENV === "development" ? (error as Error).message : undefined,
                    },
                    { status: 500 }
                );
            }
        }

        return NextResponse.json({ message: "Invalid payment method" }, { status: 400 });
    } catch (error) {
        console.error("Payment creation error:", error);
        return NextResponse.json(
            {
                message: "Error creating payment session",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
