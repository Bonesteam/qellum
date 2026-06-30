import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { User } from "@/backend/models/user.model";
import { resolveBalanceGBP, syncLegacyTokens } from "@/utils/wallet";

export async function GET(req: NextRequest) {
    try {
        const auth = await requireAuth(req);
        await connectDB();
        const user = await User.findById(auth.sub).select("-password").lean();
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        const balanceGBP = resolveBalanceGBP(user);
        return NextResponse.json({
            user: {
                ...user,
                balanceGBP,
                tokens: syncLegacyTokens(balanceGBP),
            },
        });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Failed to fetch profile" },
            { status: 400 }
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const auth = await requireAuth(req);
        const body = await req.json().catch(() => ({}));
        await connectDB();

        const allowed = ["firstName", "lastName", "phone", "preferredCurrency", "address"];
        const update: Record<string, unknown> = {};
        for (const key of allowed) {
            if (body[key] !== undefined) update[key] = body[key];
        }

        const user = await User.findByIdAndUpdate(
            auth.sub,
            { $set: update },
            { new: true, select: "-password" }
        ).lean();

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Failed to update profile" },
            { status: 400 }
        );
    }
}