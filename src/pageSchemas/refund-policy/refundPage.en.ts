import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const refundPolicySchema: PageSchema = {
    meta: {
        title: `Refund & Cancellation Policy – ${COMPANY_NAME}`,
        description: `Refund & Cancellation Policy of ${COMPANY_NAME}: rules for refunds on token packages, chef-created plans, AI-generated menus, and unused credits.`,
        keywords: [
            "refund policy",
            "cancellation policy",
            "meal plan refund",
            "tokens",
            "AI chef",
            "nutrition plan"
        ],
        canonical: "/refund-policy",
        ogImage: {
            title: `${COMPANY_NAME} – Refund & Cancellation Policy`,
            description: "Transparent refund and cancellation terms for meal plan and AI cooking services.",
            bg: "#ffffff",
            color: "#000000"
        }
    },
    blocks: [
        {
            type: "text",
            title: "Refund & Cancellation Policy",
            description: "Effective date: 10 September 2025"
        },
        {
            type: "text",
            title: "1. Overview",
            bullets: [
                `Refunds and cancellations within ${COMPANY_NAME} follow this Policy and applicable UK consumer law.`,
                "Refund requests are processed within 5–10 business days after approval; actual posting time depends on your bank or payment provider.",
                "Refunds cannot exceed the original payment amount, minus any non-refundable processing fees.",
                "Tokens already used for Services (AI plan generation, chef session, recipe unlock, or course delivery) are non-refundable.",
                "Unused token packages can be refunded if not activated or used in any transaction.",
                "Promotional or bonus tokens are not refundable unless required by law.",
                `To request a refund, please contact us via email at ${COMPANY_EMAIL} with full order details.`,
                "By requesting immediate access to Services (e.g., receiving a chef-created plan or AI menu), you acknowledge the waiver of your statutory cancellation right."
            ]
        },
        {
            type: "text",
            title: "2. Scope and Legal Note",
            description: `This Policy applies to all purchases of token packages, AI-based nutrition plans, personal chef courses, and related services provided by ${COMPANY_LEGAL_NAME}. It does not affect your statutory consumer rights under UK law (including the Consumer Rights Act 2015).`
        },
        {
            type: "text",
            title: "3. Definitions",
            bullets: [
                "Order — a confirmed purchase of tokens or service.",
                "Token Package — prepaid balance used to unlock or purchase services within the platform.",
                "Used Tokens — tokens spent on AI or chef-created plans, recipes, or digital content.",
                "Unused Tokens — tokens that remain in your account and were not used for any service.",
                "Promotional Credits — free or bonus tokens granted during offers or campaigns."
            ]
        },
        {
            type: "text",
            title: "4. Refund Conditions",
            description:
                "4.1 Refund limit. Refunds will not exceed the amount paid, minus transaction fees, and are issued in the original payment currency (GBP or EUR).\n\n" +
                "4.2 Used tokens. Once tokens are used for AI-generated or chef-prepared plans, they become non-refundable unless the service is proven defective or incomplete.\n\n" +
                "4.3 Unused tokens. If no tokens were used, you may request a full refund within 14 days of purchase.\n\n" +
                "4.4 Defective or failed service. If a meal plan or recipe delivery fails due to a technical issue, we will first attempt to correct it. If unresolved, a partial or full refund may be issued.\n\n" +
                "4.5 Promotions. Promotional tokens and bonus credits cannot be exchanged or refunded.\n\n" +
                "4.6 Custom chef services. Once a personal chef has begun preparing your plan or course, the refund option is no longer available unless agreed in writing.\n\n" +
                "4.7 Immediate access. If you confirm immediate access to a plan or recipe, your cancellation rights under the cooling-off period may not apply."
        },
        {
            type: "text",
            title: "5. How to Request a Refund",
            description: `To request a refund, email ${COMPANY_EMAIL} and include:`,
            bullets: [
                "Your order or transaction ID.",
                "Account email associated with the purchase.",
                "Reason for the request (unused tokens, cancellation, defective service, etc.).",
                "If related to AI/chef output — short description and evidence (screenshots, timestamps).",
                "Preferred refund method (usually the same payment method).",
                "You will receive acknowledgment within 5 business days. Investigation and processing typically take 5–10 business days."
            ]
        },
        {
            type: "text",
            title: "6. Verification & Processing",
            description:
                "6.1 We review your account activity, payment logs, and token usage records.\n\n" +
                "6.2 If approved, refunds will be processed to the same payment method; if unavailable, alternative arrangements may be offered.\n\n" +
                "6.3 If declined, we will explain the decision and available next steps."
        },
        {
            type: "text",
            title: "7. Chargebacks and Abuse",
            description: "Chargebacks filed without first contacting support may delay or void refund eligibility. Fraudulent or repeated refund abuse can result in account suspension and loss of tokens. We provide full transaction evidence to payment providers in disputed cases."
        },
        {
            type: "text",
            title: "8. Policy Updates",
            description: "This Policy may be amended periodically. Material updates will be announced via email or in your Qellum dashboard. Changes apply only to future purchases and do not affect completed transactions."
        },
        {
            type: "text",
            title: "9. Data & Record Retention",
            description: "Order and payment data (including token usage history) is retained for up to 6 years for accounting and legal purposes, consistent with our Privacy Policy."
        },
        {
            type: "text",
            title: "10. Examples",
            bullets: [
                "Example 1: You bought £10 (1000 tokens), used 100 → refund possible for 900 tokens.",
                "Example 2: You requested an AI plan and received it → tokens used and non-refundable.",
                "Example 3: Bonus tokens from a promo → non-refundable.",
                "Example 4: Chef-created plan was delayed and not delivered → eligible for full or partial refund."
            ]
        },
        {
            type: "text",
            title: "11. Contact Details",
            bullets: [
                `📧 ${COMPANY_EMAIL}`,
                `🏢 ${COMPANY_LEGAL_NAME}`,
                COMPANY_ADDRESS ?? "Address not specified"
            ]
        }
    ]
};

export default refundPolicySchema;
