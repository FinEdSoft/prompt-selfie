import { createSubscriptionRecord } from "@/lib/payment";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PlanType } from "@/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        const { sessionId } = body;
        
        if (!sessionId) {
            return NextResponse.json({ message: "Session ID is required" }, { status: 400 });
        }

        console.log("Verifying session:", sessionId);

        // Get the session with expanded payment_intent
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["payment_intent", "subscription"],
        });

        console.log("Session status:", session.payment_status);
        console.log("Session metadata:", session.metadata);

        // Check if payment is successful
        if (session.payment_status !== "paid") {
            return NextResponse.json({
                success: false,
                message: "Payment not completed",
            }, { status: 400 });
        }

        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan as PlanType;

        if (!userId || !plan) {
            return NextResponse.json({
                success: false,
                message: "Missing user or plan information",
            }, { status: 400 });
        }

        // Get payment intent ID
        const paymentIntentId =
            typeof session.payment_intent === "string"
                ? session.payment_intent
                : session.payment_intent?.id;

        if (!paymentIntentId) {
            return NextResponse.json({
                success: false,
                message: "Missing payment information",
            }, { status: 400 });
        }

        // Create subscription and add credits
        await createSubscriptionRecord(userId, plan, paymentIntentId, sessionId);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Stripe verification error:", error);
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : "Unknown error",
        }, { status: 500 });
    }
}