import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const tokenUsagePolicySchema: PageSchema = {
    meta: {
        title: `Token Usage Policy – ${COMPANY_NAME}`,
        description: `Understand how ${COMPANY_NAME} tokens work — how they are earned, spent, and protected for AI meal plans, chef consultations, and nutritional services.`,
        keywords: [
            "token usage",
            "credit policy",
            "meal plan tokens",
            "AI credits",
            "chef consultation tokens",
            "Qellum token system",
            "token refund",
        ],
        canonical: "/token-usage-policy",
        ogImage: {
            title: `${COMPANY_NAME} – Token Usage Policy`,
            description: "How our token credit system works for meal plans and chef services.",
            bg: "#B8860B",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Fair Token Usage Policy",
            description: "Effective date: 10 September 2025",
            centerTitle: true,
            centerDescription: true,
        },
        {
            type: "text",
            title: "1. What Are Tokens?",
            bullets: [
                `${COMPANY_NAME} uses a token-based credit system to power all meal planning services on the platform.`,
                "Tokens represent a unit of service value — they are consumed when you request meal plans, chef reviews, AI generation, or add-on modules.",
                "Tokens are non-currency credits. They are not money and have no cash equivalent, but they grant you access to specific quantified services on the platform.",
                "All token values are published transparently in the platform pricing section and are visible before any purchase or service confirmation.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "2. How Tokens Are Acquired",
            bullets: [
                "Tokens are purchased via our secure payment gateway using Visa, Mastercard, or other accepted payment methods.",
                "Tokens may be included as part of subscription packages (AI Starter, Chef Plan, Full Culinary Pack).",
                "Promotional or bonus tokens may be issued at the platform's discretion during campaigns or events — these are clearly labelled as promotional.",
                "Tokens are credited to your account immediately upon successful payment confirmation.",
                "Token amounts are displayed in your dashboard balance at all times.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "3. Token Consumption Schedule",
            bullets: [
                "🤖 AI Instant Meal Plan — base cost 20 tokens (varies by duration and extras)",
                "👨‍🍳 Chef Plan Review — base cost 35 tokens (varies by package tier)",
                "🧬 Premium Culinary Pack (AI + Chef) — base cost 60 tokens",
                "📅 Duration Surcharge — +10 tokens per additional week beyond 1 week",
                "🌍 Language Translation — +5 tokens for non-English delivery",
                "📋 Add-on Modules (shopping list, calorie breakdown, etc.) — 3–12 tokens each",
                "🩺 Nutritionist Expert Review — 30 tokens",
                "💬 1:1 Consultation Session (30 minutes) — 50 tokens",
                "📆 Follow-up Week Plan — 25 tokens",
                "All costs are confirmed before order submission. No hidden deductions.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "4. Token Validity & Expiry",
            bullets: [
                "Purchased tokens do not expire as long as your account remains active and in good standing.",
                "Promotional tokens may carry an expiry date, which will be clearly communicated at the time of issuance.",
                "If your account is closed or terminated due to a policy violation, any remaining token balance will be forfeited.",
                "Tokens cannot be transferred between accounts.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "5. Refund of Tokens",
            bullets: [
                "If a meal plan order fails due to a platform error or chef non-delivery, tokens will be fully reinstated to your balance within 2 business days.",
                "If you cancel a Chef Plan order before the chef has begun work (within 1 hour of submission), tokens will be reinstated.",
                "Once a chef has begun preparing your plan or an AI plan has been generated, tokens are consumed and non-refundable.",
                "If you are dissatisfied with a delivered plan, please contact our support team — we will review on a case-by-case basis and may offer partial token credit at our discretion.",
                `All refund requests must be submitted to ${COMPANY_EMAIL} within 7 days of order delivery.`,
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "6. Fair Use & Abuse Prevention",
            bullets: [
                "Token system abuse — including chargeback fraud, account sharing, or reselling of plans — will result in immediate account suspension.",
                "We monitor token usage patterns to detect anomalies. Unusual activity may trigger a manual review before further tokens can be used.",
                "Each account is entitled to one active order per token tier at a time (i.e., one active Chef Plan, one active AI plan).",
                `${COMPANY_NAME} reserves the right to modify the token cost of services with 14 days' advance notice. Previously purchased tokens will be honoured at the rate applicable at the time of purchase.`,
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "7. Token Transparency Promise",
            bullets: [
                "We will always show the full token cost of any service before you confirm an order.",
                "Your running token balance will be updated in real-time and visible in your dashboard at all times.",
                "All token transactions — purchases, deductions, and refunds — are logged in your transaction history.",
                "We will never charge tokens for actions you did not initiate or approve.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "8. Currency & Payment",
            bullets: [
                "Tokens may be purchased in GBP (£), EUR (€), or USD ($). Prices are converted at the prevailing rate at time of purchase.",
                "All payments are processed via a PCI DSS-compliant payment gateway. We do not store your card details.",
                "Accepted payment methods: Visa, Mastercard.",
                "In case of payment disputes, please contact your bank AND notify us at the email below so we can resolve the issue promptly.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "9. Changes to This Policy",
            bullets: [
                "We may update this Token Usage Policy to reflect new services or pricing structures.",
                "Material changes will be notified via email and/or in-platform banner at least 14 days before taking effect.",
                "Continued use of the platform after the effective date constitutes acceptance of updated terms.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "10. Contact Us",
            bullets: [
                "For questions about your token balance, a transaction, or this policy:",
                `📧 ${COMPANY_EMAIL}`,
                `Company: ${COMPANY_LEGAL_NAME} | No. ${COMPANY_NUMBER}`,
                `Registered at: ${COMPANY_ADDRESS}`,
            ],
            centerTitle: true,
        },
    ],
};

export default tokenUsagePolicySchema;
