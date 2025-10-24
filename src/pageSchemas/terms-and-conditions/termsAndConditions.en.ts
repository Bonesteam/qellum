import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const termsSchema: PageSchema = {
    meta: {
        title: `Terms & Conditions – ${COMPANY_NAME}`,
        description: `Official Terms & Conditions of ${COMPANY_NAME}. Rules for using cooking services, token purchases, AI meal plans, and personal chef requests.`,
        keywords: [
            "terms",
            "terms and conditions",
            "cooking services",
            "tokens",
            "meal plans",
            "refund policy"
        ],
        canonical: "/terms",
        ogImage: {
            title: `${COMPANY_NAME} – Terms & Conditions`,
            description: "Clear and transparent conditions for using Qellum cooking services.",
            bg: "#ffffff",
            color: "#000000"
        }
    },
    blocks: [
        {
            type: "text",
            title: "Terms & Conditions",
            description: "Effective date: 17 October 2025",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "1. General Provisions",
            description: `1.1. These Terms and Conditions set the rules for using ${COMPANY_NAME}, a platform offering AI-generated meal plans and personal chef services, operated by ${COMPANY_LEGAL_NAME} (Company No. ${COMPANY_NUMBER}), registered at ${COMPANY_ADDRESS}.\n\n1.2. By using our services or purchasing tokens, you agree to these Terms. If you do not agree, please do not use the platform.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "2. Definitions",
            bullets: [
                "Services — AI meal plans, chef-prepared courses, and related tools on Qellum.",
                "Personal Chef Request — a custom meal plan created by a certified chef, delivered to your dashboard within 2–3 hours.",
                "AI Meal Plan — a meal plan automatically generated based on your dietary goals, preferences, and schedule.",
                "Client or You — any user of Qellum services or purchaser of tokens.",
                "Tokens — internal credits used to pay for Services (1 GBP = 100 tokens)."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "3. Account Registration",
            description: `3.1. You must be at least 18 years old to use our services.\n\n3.2. You agree to provide accurate information during registration and keep it updated.\n\n3.3. You are responsible for your account credentials and all actions performed under your account.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "4. Tokens and Payments",
            description: `4.1. Tokens are purchased in GBP or EUR. All conversions are calculated from GBP.\n\n4.2. Tokens can be used for AI meal plans, personal chef requests, premium recipes, or other paid features.\n\n4.3. There are 4 token packages: three fixed amounts and one custom amount chosen by the user.\n\n4.4. Payments must be made via the methods listed on the website. Services are available after payment confirmation.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "5. Service Delivery",
            description: `5.1. AI meal plans are delivered instantly after token deduction.\n\n5.2. Personal chef requests are delivered within 2–3 hours after submission.\n\n5.3. You are responsible for reviewing meal plans upon delivery and reporting issues promptly.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "6. Cancellations and Refunds",
            description: `6.1. Token purchases may be canceled before use; refunds exclude payment provider fees.\n\n6.2. Tokens spent on services cannot be refunded.\n\n6.3. If a significant technical error occurs, compensation may be provided in line with our refund policy.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "7. Intellectual Property",
            description: `7.1. All meal plans, recipes, and related content generated for you belong to you after delivery.\n\n7.2. Qellum retains rights to platform software, AI models, and system content.\n\n7.3. Users may not redistribute platform-generated content for commercial purposes without permission.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "8. Confidentiality and Data Processing",
            description: `8.1. All personal and dietary data are handled according to our Privacy Policy and GDPR.\n\n8.2. Data uploaded for service generation may be temporarily stored for technical support, then deleted unless legally required to retain.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "9. Warranties and Disclaimer",
            description: `9.1. Services are provided with reasonable care.\n\n9.2. We do not guarantee specific nutrition results, weight changes, or health outcomes. Always consult a medical professional if needed.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "10. Limitation of Liability",
            description: `10.1. Qellum is not liable for indirect or consequential damages.\n\n10.2. Total liability is limited to the amount paid for the token package used for the specific service.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "11. Indemnity",
            description: `You agree to indemnify Qellum from any claims or damages arising from:\n(a) breach of these Terms;\n(b) misuse of third-party data;\n(c) misuse of delivered meal plans or recipes.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "12. Third-Party Links",
            description: "Our platform may include links to third-party websites. We are not responsible for their content or availability.",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "13. Suspension and Termination",
            description: `13.1. Accounts may be suspended or terminated for breach of Terms, fraudulent activity, or security risks.\n\n13.2. Termination does not relieve obligations accrued before termination.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "14. Changes to Terms",
            description: "We may update these Terms. Continued use after updates constitutes acceptance.",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "15. Notices",
            bullets: [
                `📧 ${COMPANY_EMAIL}`,
                `📍 ${COMPANY_ADDRESS}`
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "16. Governing Law",
            description: "These Terms are governed by the laws of England and Wales. Disputes are resolved in English courts unless mandatory consumer laws apply.",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "17. Miscellaneous",
            description: `17.1. Invalid provisions do not affect remaining Terms.\n\n17.2. Failure to enforce rights is not a waiver.\n\n17.3. These Terms form the complete agreement regarding platform use.`,
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "Company Details",
            bullets: [
                `Company: ${COMPANY_LEGAL_NAME}`,
                `Company number: ${COMPANY_NUMBER}`,
                `Registered office: ${COMPANY_ADDRESS}`,
                `Email: ${COMPANY_EMAIL}`
            ],
            centerTitle: true,
            centerBullets: true
        }
    ]
};

export default termsSchema;