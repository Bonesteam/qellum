import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { aiService } from "@/backend/services/ai.service";

export async function GET(req: NextRequest) {
    try {
        const auth = await requireAuth(req);
        await connectDB();
        const orders = await aiService.getOrders(auth.sub);
        return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Failed to fetch orders" },
            { status: 400 }
        );
    }
}