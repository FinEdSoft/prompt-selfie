import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;

    if (!SIGNING_SECRET) {
        return NextResponse.json(
            { success: false, message: "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env" },
            { status: 500 }
        );
    }

    const wh = new Webhook(SIGNING_SECRET);
    const payload = await req.json();

    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return NextResponse.json(
            { success: false, message: "Error: Missing svix headers" },
            { status: 400 }
        );
    }

    let evt: any;

    try {
        evt = wh.verify(JSON.stringify(payload), {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err: any) {
        console.log("Error: Could not verify webhook:", err.message);
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 400 }
        );
    }

    const { id } = evt.data;
    const eventType = evt.type;

    try {
        switch (eventType) {
            case "user.created":
            case "user.updated": {
                await prismaClient.user.upsert({
                    where: { clerkId: id },
                    update: {
                        name: `${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim(),
                        email: evt.data.email_addresses[0].email_address,
                        profilePicture: evt.data.profile_image_url,
                    },
                    create: {
                        clerkId: id,
                        name: `${evt.data.first_name ?? ""} ${evt.data.last_name ?? ""}`.trim(),
                        email: evt.data.email_addresses[0].email_address,
                        profilePicture: evt.data.profile_image_url,
                    },
                });
                break;
            }

            case "user.deleted": {
                await prismaClient.user.delete({
                    where: { clerkId: id },
                });
                break;
            }

            default:
                console.log(`Unhandled event type: ${eventType}`);
                break;
        }
    } catch (error) {
        console.error("Error handling webhook:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }

    return NextResponse.json(
        { success: true, message: "Webhook received" },
        { status: 200 }
    );
}
