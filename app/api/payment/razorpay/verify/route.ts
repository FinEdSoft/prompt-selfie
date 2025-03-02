import { NextRequest, NextResponse } from 'next/server';
import { PlanType } from '@/types';
import { PaymentService } from '@/lib/payment';
import { prismaClient } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
    try {
        const user  = await currentUser();
        const userId = user?.id ?? "";
        const body = await request.json();
        
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            plan,
            isAnnual,
        } = body;

        // Debug log
        console.log("Verification Request:", {
            userId,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            signature: razorpay_signature,
            plan,
            isAnnual,
        });

        if (
            !razorpay_payment_id ||
            !razorpay_order_id ||
            !razorpay_signature ||
            !plan
        ) {
            return NextResponse.json({
                message: "Missing required fields",
                received: {
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                    plan,
                },
            }, { status: 400 });
        }

        try {
            const isValid = await PaymentService.verifyRazorpaySignature({
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                signature: razorpay_signature,
            });

            if (!isValid) {
                return NextResponse.json({ message: "Invalid payment signature" }, { status: 400 });
            }

            // Create subscription and add credits
            const subscription = await PaymentService.createSubscriptionRecord(
                userId,
                plan as PlanType,
                razorpay_payment_id,
                razorpay_order_id,
                isAnnual
            );

            // Get updated credits
            const userCredit = await prismaClient.userCredit.findUnique({
                where: { userId },
                select: { amount: true },
            });

            console.log("Payment successful:", {
                subscription,
                credits: userCredit?.amount,
            });

            return NextResponse.json({
                success: true,
                credits: userCredit?.amount || 0,
                subscription,
            });
        } catch (verifyError) {
            console.error("Verification process error:", verifyError);
            return NextResponse.json({
                message: "Error processing payment verification",
                details:
                    verifyError instanceof Error
                        ? verifyError.message
                        : "Unknown error",
            }, { status: 500 });
        }
    } catch (error) {
        console.error("Route handler error:", error);
        return NextResponse.json({
            message: "Error verifying payment",
            details: error instanceof Error ? error.message : "Unknown error",
        }, { status: 500 });
    }
}