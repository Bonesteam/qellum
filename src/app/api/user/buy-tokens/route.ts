import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { userController } from "@/backend/controllers/user.controller";
import { isTestMode } from "@/backend/config/features";
import { displayToGbp, round2 } from "@/utils/wallet";

const RATES_TO_GBP = { GBP: 1, EUR: 1.17, USD: 1.22 } as const;

export async function POST(req: NextRequest) {
    if (!isTestMode()) {
        return NextResponse.json({ message: "Direct top-up is only available in TEST_MODE" }, { status: 403 });
    }

    try {
        const payload = await requireAuth(req);
        const body = await req.json();

        if (body.currency && body.amount) {
            const currency = String(body.currency).toUpperCase() as keyof typeof RATES_TO_GBP;
            if (!RATES_TO_GBP[currency]) {
                return NextResponse.json({ message: "Unsupported currency" }, { status: 400 });
            }

            const gbpAmount = displayToGbp(Number(body.amount), currency);
            const user = await userController.topUpWallet(payload.sub, gbpAmount, {
                chargedAmount: Number(body.amount),
                chargedCurrency: currency,
            });

            return NextResponse.json({ user, info: `Credited £${gbpAmount.toFixed(2)}` });
        }

        const { amount } = body;
        if (!amount || amount <= 0) {
            return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
        }

        const user = await userController.topUpWallet(payload.sub, round2(amount / 100));
        return NextResponse.json({ user });
    } catch (err: unknown) {
        return NextResponse.json(
            { message: err instanceof Error ? err.message : "Top-up failed" },
            { status: 400 }
        );
    }
}
