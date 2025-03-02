import { NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware, currentUser } from '@clerk/nextjs/server'

export default clerkMiddleware();

// export async function middleware(req: NextRequest) {
//   try {

//     // const publicKey = process.env.CLERK_JWT_PUBLIC_KEY!;

//     // if (!publicKey) {
//     //   console.error("Missing CLERK_JWT_PUBLIC_KEY in environment variables");
//     //   return NextResponse.json(
//     //     { message: "Missing public key" },
//     //     { status: 500 }
//     //   );
//     // }

//     // const authHeader = req.headers.get("authorization");
//     // const token = authHeader?.split(" ")[1] || "";

//     // // Format the public key properly
//     // const formattedKey = publicKey.replace(/\\n/g, "\n");

//     // const decoded = await jose.jwtVerify(token, formattedKey, {
//     //   algorithms: ["RS256"],
//     //   issuer:
//     //     process.env.CLERK_ISSUER || "https://above-glider-54.clerk.accounts.dev",
//     //   complete: true,
//     // });

//     // console.log("Decoded token:", decoded);

//     // Check if user is authenticated with Clerk
//     // Fetch user details
//     const user = await currentUser();
//     const userId = user?.id;
//     console.log("User:", user);

//     if (!userId) {
//       return NextResponse.json(
//         { message: "Authentication required" },
//         { status: 401 }
//       );
//     }
    
    
    
//     if (!user || !user.emailAddresses || !user.primaryEmailAddressId) {
//       return NextResponse.json(
//         { message: "User information incomplete" },
//         { status: 400 }
//       );
//     }

//     const primaryEmail = user.emailAddresses.find(
//       (email) => email.id === user.primaryEmailAddressId
//     );

//     if (!primaryEmail) {
//       return NextResponse.json(
//         { message: "User email not found" },
//         { status: 400 }
//       );
//     }

//     // Create a new headers object
//     const requestHeaders = new Headers(req.headers);
    
//     // Add user information to headers
//     requestHeaders.set('x-user-id', userId);
//     requestHeaders.set('x-user-email', primaryEmail.emailAddress);
    
//     // Return response with modified headers
//     return NextResponse.next({
//       request: {
//         headers: requestHeaders,
//       },
//     });
    
//   } catch (error) {
//     console.error("Auth error:", error);
//     return NextResponse.json(
//       { 
//         message: "Error processing authentication",
//         details: process.env.NODE_ENV === "development" ? (error as Error).message : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

export const config = {
  matcher: [
    "/api/pre-signed-url",
    "/api/ai/training", 
    "/api/ai/generate",
    "/api/pack/generate",
    "/api/pack/bulk",
    "/api/image/bulk",
    "/api/models",
    "/api/fal-ai/webhook/train",
    "/api/fal-ai/webhook/image",
    "/api/payment/create",
    "/api/payment/stripe/verify",
    "/api/payment/razorpay/verify",
    "/api/payment/subscription/[userId]",
    "/api/payment/credits/[userId]",
    "/api/payment/credits",
    "/api/payment/webhook",
    "/api/payment/verify",
    "/api/webhook/clerk"

  ],
};