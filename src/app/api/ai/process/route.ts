import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/backend/middlewares/auth.middleware";
import { connectDB } from "@/backend/config/db";
import { aiService } from "@/backend/services/ai.service";
import { isTestMode } from "@/backend/config/features";

export async function POST(req: NextRequest) {
    try {
        const auth = await requireAuth(req);
        const body = await req.json().catch(() => ({}));

        const prompt = String(body.prompt || "").trim();
        if (!prompt) {
            return NextResponse.json({ message: "Prompt is required" }, { status: 400 });
        }

        const cost = body.cost != null ? Number(body.cost) : undefined;

        await connectDB();

        // TEST_MODE — не списує токени, повертає заглушку
        if (isTestMode()) {
            const fakeOrder = {
                _id: `test-${Date.now()}`,
                userId: auth.sub,
                email: auth.email,
                prompt,
                response: `[TEST MODE] This is a test response for prompt: "${prompt.slice(0, 80)}..."`,
                createdAt: new Date(),
            };
            return NextResponse.json({ order: fakeOrder }, { status: 200 });
        }

        const order = await aiService.processPrompt(auth.sub, auth.email, prompt, cost);
        return NextResponse.json({ order }, { status: 200 });

    } catch (error) {
        const msg = error instanceof Error ? error.message : "AI processing failed";
        const status = msg === "InsufficientTokens" ? 402
            : msg === "UserNotFound" ? 404
            : 500;
        return NextResponse.json({ message: msg }, { status });
    }
}