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
            title: "Refund / Return Policy",
            description: "Effective date: 17 October 2025",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "1. Summary (customer-facing)",
            bullets: [
                "Refunds are assessed under this Policy and applicable consumer law.",
                "Typical processing time: 5–10 business days after approval (payment-provider timelines may vary).",
                "Refunds will not exceed the amount originally paid for the relevant Token top-up or transaction.",
                "Spent (redeemed) Tokens are non-refundable, except as set out in §4.2.",
                "Tokens are account-bound, non-transferable, and cannot be exchanged for real currency.",
                "Promotional/bonus Tokens are non-refundable in all circumstances.",
                `Submit requests to ${COMPANY_EMAIL} with your order reference and details.`,
                "This Policy may be updated; material changes will be notified as described in §8.",
                "If you consented to immediate supply and opened/downloaded the digital content, your statutory right to cancel may be lost (see §4.7).",
                "Accepted currencies: GBP (£), EUR (€), USD ($). All conversions are calculated from GBP. Payment methods: Visa, Mastercard."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "2. Scope and legal note",
            description: `This Policy governs refunds for Tokens (internal credits) and digital Meal Plans/Services supplied by ${COMPANY_LEGAL_NAME} via qellum.co.uk. Nothing in this Policy overrides statutory consumer rights under UK law, including the Consumer Contracts Regulations 2013 and the Consumer Rights Act 2015.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "3. Definitions",
            bullets: [
                "Tokens / Credits — internal prepaid credits used on the Service.",
                "Unused Tokens — Tokens credited to your Account but not yet redeemed.",
                "Redeemed / Spent Tokens — Tokens already used to access or generate a Meal Plan/Service.",
                "Promotional / Bonus Tokens — Tokens issued as part of a promotion, bonus, or incentive and marked as such."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "4. Refund principles (binding rules)",
            bullets: [
                "4.1 Refund amount cap — Any refund will not exceed the original amount paid for the relevant Token top-up or transaction, net of any non-refundable processor fees.",
                "4.2 No refund for spent Tokens (exceptions) — Redeemed Tokens are non-refundable, except where: (a) the Meal Plan or Service is defective or not as described; (b) Qellum fails to supply the Service as contracted; or (c) a refund is otherwise required by law.",
                "4.3 Unused Tokens — Generally refundable at the original purchase price if requested before any redemption. Non-recoverable payment processing fees may be deducted.",
                "4.4 Account-bound — Tokens are tied to your Account and cannot be transferred.",
                "4.5 No cash-out — Tokens cannot be exchanged for cash or other currencies unless required by law.",
                "4.6 Promotional Tokens — Bonus/promotional Tokens are non-refundable under all circumstances.",
                "4.7 Immediate supply of digital content — If you consent to immediate delivery and then open/download the content (e.g., a generated PDF), your statutory right to cancel may not apply.",
                "4.8 Bespoke/custom work — Custom Meal Plans are non-refundable once substantial preparation has begun, unless otherwise agreed in writing.",
                "4.9 Standard plan & add-ons — A standard Meal Plan generation costs 60 Tokens. Optional add-ons carry separate Token prices shown before confirmation. Once redeemed, add-ons follow the same rules as above."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "5. How to request a refund (procedure)",
            bullets: [
                "Order reference number",
                "Account email used for purchase",
                "Whether the request concerns Unused Tokens or a Redeemed item",
                "For redeemed items: description of the issue and supporting evidence (screenshots, file details, error messages)",
                "Preferred refund method (original payment method is standard)",
                "Acknowledgment within 5 business days, investigation, and refund processing typically 5–10 business days"
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "6. Investigation, evidence and decisions",
            bullets: [
                "We may review token transaction logs, checkout confirmations, delivery logs, and customer evidence for claims involving redeemed content.",
                "Refunds are normally processed to the original payment method. If not possible, a reasonable alternative may be offered.",
                "If a claim is rejected, reasons will be provided along with options to escalate or pursue legal remedies."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "7. Chargebacks, fraud and abuse",
            description: "If a chargeback is initiated while a refund request is pending, it is treated as a dispute. Refunds may be refused and accounts suspended/closed in cases of suspected fraud or abuse.",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "8. Changes to this Policy",
            description: "We may update this Policy at any time. Material changes will be notified to registered users by email and/or prominent in-product notice. Changes apply prospectively and do not affect previously completed transactions, unless the law requires otherwise.",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "9. Record keeping and retention",
            description: "Records relevant to refund requests and disputes are retained for at least 24 months, and up to 6 years for enterprise or disputed transactions, consistent with our Privacy Policy and applicable law.",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "10. Examples (practical, illustrative)",
            bullets: [
                "Unused Tokens (GBP): Purchase 2,000 Tokens; spend 300; unused 1,700 → refund equals pro-rata original GBP amount.",
                "Unused Tokens (EUR): Same as above, refunded in EUR at original purchase price.",
                "Unused Tokens (USD): Same as above, refunded in USD at original purchase price.",
                "Opened Meal Plan: Refunds apply only if defective or not as described (§4.2).",
                "Promotional Tokens: 100 bonus Tokens awarded in a promotion → non-refundable.",
                "Add-ons: Base 60 Tokens + add-on Tokens; once redeemed, non-refundable except under §4.2 or law.",
                "Technical failure: Generation error with no usable delivery → Tokens restored or refunded."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "11. Contact Details",
            bullets: [
                `📧 ${COMPANY_EMAIL}`,
                `🏢 ${COMPANY_LEGAL_NAME}`,
                COMPANY_ADDRESS ?? "Address not specified"
            ],
            centerTitle: true,
            centerBullets: true
        }
    ]
};

export default refundPolicySchema;

