import { NextRequest, NextResponse } from "next/server";
import { authController } from "@/backend/controllers/auth.controller";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email || typeof email !== "string") {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        await authController.requestPasswordReset(email);
        return NextResponse.json({
            message: "If an account exists for this email, a reset link has been sent.",
        });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Unable to process request" },
            { status: 400 }
        );
    }
}
