import { createSubscriptionRecord } from '@/lib/payment';
import { PlanType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const sig = req.headers.get('stripe-signature');

        if (!sig) {
            return NextResponse.json(
                { error: 'No Stripe signature found' },
                { status: 400 }
            );
        }

        const event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        console.log("Webhook event received:", event.type);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.metadata?.userId;
            const plan = session.metadata?.plan as PlanType;

            if (!userId || !plan) {
                throw new Error("Missing metadata in session");
            }

            console.log("Processing successful payment:", {
                userId,
                plan,
                sessionId: session.id,
            });

            await createSubscriptionRecord(
                userId,
                plan,
                session.payment_intent as string,
                session.id
            );

            console.log("Successfully processed payment and added credits");
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            { error: `Webhook Error: ${error instanceof Error ? error.message : "Unknown error"}` },
            { status: 400 }
        );
    }
}