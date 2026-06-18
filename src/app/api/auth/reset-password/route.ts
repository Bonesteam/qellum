import { NextRequest, NextResponse } from "next/server";
import { authController } from "@/backend/controllers/auth.controller";

export async function POST(req: NextRequest) {
    try {
        const { token, password } = await req.json();
        if (!token || !password) {
            return NextResponse.json({ message: "Token and password are required" }, { status: 400 });
        }

        await authController.resetPassword(String(token), String(password));
        return NextResponse.json({ message: "Password updated successfully" });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Unable to reset password" },
            { status: 400 }
        );
    }
}
