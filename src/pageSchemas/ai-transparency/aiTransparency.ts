import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const aiTransparencySchema: PageSchema = {
    meta: {
        title: `AI Meal Plan Transparency Notice – ${COMPANY_NAME}`,
        description: `How Qellum uses AI to suggest, draft, and track meal plans, combined with professional human chef oversight.`,
        keywords: [
            "AI transparency",
            "how AI works",
            "meal plan algorithms",
            "automated nutrition",
            "human in the loop",
        ],
        canonical: "/ai-transparency",
        ogImage: {
            title: `${COMPANY_NAME} – AI Meal Plan Transparency`,
            description: "How we combine artificial intelligence with professional chefs.",
            bg: "#1A2F22",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "text",
            title: "AI Meal Plan Transparency Notice",
            description: "Effective date: 10 September 2025",
            centerTitle: true,
            centerDescription: true,
        },
        {
            type: "text",
            title: "1. How AI Is Utilized in Qellum",
            bullets: [
                `${COMPANY_NAME} uses advanced large language models (LLMs) and optimization algorithms to generate recipes, calculate estimated macro-nutritional balances, draft custom shopping lists, and suggest creative swaps for ingredients.`,
                "This technology enables us to deliver highly customized meal plans in a matter of seconds for our Starter tiers, making dietary planning affordable and accessible.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "2. The AI & Chef Collaboration (Human-in-the-Loop)",
            bullets: [
                "For our standard AI Starter Plan, recipes and instructions are created directly by the AI model based on your inputs and preference queries.",
                "For our Chef Plan, Full Culinary Pack, and VIP Elite Retainers, the AI is used strictly as a draft tool. A real certified professional chef reviews, adjusts, and signs off on every meal proposal and macro structure before it reaches you.",
                "This ensures the culinary wisdom, flavor harmony, and practical preparation constraints are double-checked by a qualified human chef.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "3. Algorithm Limitations & Hallucinations",
            bullets: [
                "AI algorithms may occasionally output incorrect cooking times, inaccurate calorie count estimates, or suggest swaps that are not readily available in your region.",
                "While our filters block major allergens automatically, AI systems can still carry risks of unexpected suggestions. We recommend users with severe, life-threatening food allergies double-check ingredient lists independently.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "4. Data Use & Privacy",
            bullets: [
                "When sending preference data to our AI providers, we strip personal identifiers such as your name, billing data, or location coordinates. Only your raw dietary choices, goals, calories, and allergies are passed to the model.",
                "Your information is not used to train public AI models.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "5. Contact & Feedback",
            bullets: [
                `We continuously refine our algorithmic models based on chef and customer feedback. If you identify an issue with an AI-generated recipe or macro count, please report it to our team.`,
                `📧 ${COMPANY_EMAIL}`,
                `Company: ${COMPANY_LEGAL_NAME} | No. ${COMPANY_NUMBER}`,
                `Registered at: ${COMPANY_ADDRESS}`,
            ],
            centerTitle: true,
        },
    ],
};

export default aiTransparencySchema;
