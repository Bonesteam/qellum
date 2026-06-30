import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { aiService } from "@/backend/services/ai.service";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const auth = await requireAuth(req);
        await connectDB();
        const order = await aiService.getOrderById(auth.sub, params.id);
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }
        return NextResponse.json({ order }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Failed to fetch order" },
            { status: 400 }
        );
    }
}