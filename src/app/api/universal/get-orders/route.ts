import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { universalController } from "@/backend/controllers/universal.controller";

export async function GET(req: NextRequest) {
    try {
        const user = await requireAuth(req);
        if (!user)
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const result = await universalController.getOrders(user.sub);

        // 🧩 Конвертуємо всі extrasData (Map → Object)
        if (Array.isArray(result.orders)) {
            result.orders = result.orders.map((o: any) => {
                if (o.extrasData instanceof Map) o.extrasData = Object.fromEntries(o.extrasData);
                return o;
            });
        }

        return NextResponse.json(result);
    } catch (err: any) {
        const msg = err?.message || "Unknown error";
        const status = /auth|token/i.test(msg) ? 401 : 500;
        return NextResponse.json({ message: msg }, { status });
    }
}
