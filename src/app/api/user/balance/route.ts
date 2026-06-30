import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { User } from "@/backend/models/user.model";
import { resolveBalanceGBP, syncLegacyTokens } from "@/utils/wallet";

export async function GET(req: NextRequest) {
    try {
        const auth = await requireAuth(req);
        await connectDB();
        const user = await User.findById(auth.sub).lean();
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        const balanceGBP = resolveBalanceGBP(user);
        return NextResponse.json({
            balanceGBP,
            tokens: syncLegacyTokens(balanceGBP),
        });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Failed to fetch balance" },
            { status: 400 }
        );
    }
}