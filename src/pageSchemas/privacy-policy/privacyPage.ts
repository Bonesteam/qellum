import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const privacyPolicySchema: PageSchema = {
    meta: {
        title: `Privacy Policy – ${COMPANY_NAME}`,
        description: `Privacy Policy of ${COMPANY_NAME}: how we collect, store, and protect your personal and dietary data while using our cooking and meal planning services.`,
        keywords: [
            "privacy policy",
            "data protection",
            "GDPR",
            "nutrition data",
            "meal plans",
            "AI chef",
            "Qellum"
        ],
        canonical: "/privacy-policy",
        ogImage: {
            title: `${COMPANY_NAME} – Privacy Policy`,
            description: "Transparent privacy practices for AI and chef-based meal planning.",
            bg: "#ffffff",
            color: "#000000"
        }
    },
    blocks: [
        {
            type: "text",
            title: "Privacy Policy",
            description: "Effective date: 10 September 2025"
        },
        {
            type: "text",
            title: "1. Introduction",
            description: `At ${COMPANY_NAME}, we value your trust and privacy. This Privacy Policy explains how we handle personal and dietary data when you use our cooking platform — including chef-created meal plans, AI-generated nutrition programs, and token-based services. ${COMPANY_NAME} is operated by ${COMPANY_LEGAL_NAME} (Company No. ${COMPANY_NUMBER}), registered at ${COMPANY_ADDRESS}.\n\nIf you have any questions or data requests, please contact us at: ${COMPANY_EMAIL}.`
        },
        {
            type: "text",
            title: "2. What Personal Data We Collect",
            description: "We only collect information necessary to deliver and improve our services:",
            bullets: [
                "Identity & contact details: name, email, phone number, and billing address.",
                "Account data: login credentials, language preferences, currency settings (GBP/EUR).",
                "Dietary & health data: allergies, ingredients, calorie targets, and food preferences.",
                "Transaction & token data: top-ups, package purchases, and usage history.",
                "Technical information: IP address, browser type, device ID, and activity logs.",
                "Chef or AI interactions: messages, recipe feedback, uploaded photos, or plan notes.",
                "Support communications: requests, attachments, and correspondence with our team."
            ]
        },
        {
            type: "text",
            title: "3. Why We Process Your Data and Legal Bases",
            description: "We process your data to provide personalized and secure cooking experiences:",
            bullets: [
                "Service delivery (contract performance): to generate meal plans, recipes, and dashboards.",
                "Chef services: to match you with a chef, deliver personalized plans, and manage updates.",
                "AI processing (legitimate interests): to optimize plan recommendations and improve results.",
                "Payment & token transactions (legal obligation / legitimate interests): to process orders and comply with financial laws.",
                "Marketing (consent): newsletters or recipe tips, only if you opt-in.",
                "Analytics & improvements (legitimate interests): to enhance platform performance and usability."
            ]
        },
        {
            type: "text",
            title: "4. Sharing and International Transfers",
            description: "We may share limited data with trusted third parties to operate the platform:",
            bullets: [
                "Payment processors and banking providers.",
                "Hosting and cloud storage services for account and recipe data.",
                "Analytics and monitoring providers (to track site performance).",
                "Professional advisers (legal, compliance, or finance).",
                "Law enforcement or regulators, where legally required.",
                "Some partners may be located outside the UK/EEA; we use UK adequacy decisions or SCCs to ensure protection equivalent to UK GDPR."
            ]
        },
        {
            type: "text",
            title: "5. Cookies and Similar Technologies",
            description: "Qellum uses cookies for functionality, analytics, and security. Essential cookies are required to log in and use the dashboard. You can manage non-essential cookies in your browser settings or via our Cookie Policy."
        },
        {
            type: "text",
            title: "6. Data Retention",
            description: "We store your data only for as long as it is necessary for service delivery and compliance:",
            bullets: [
                "Order & token history: up to 6 years (for accounting and dispute purposes).",
                "Meal plans and recipes: stored during active use or until manually deleted.",
                "Account data: retained while your account is active.",
                "AI data & preferences: anonymized after 12 months of inactivity.",
                "Marketing data: removed upon withdrawal of consent.",
                "Once no longer needed, all data is securely erased or anonymized."
            ]
        },
        {
            type: "text",
            title: "7. Your Rights",
            description: "Under UK GDPR and applicable data laws, you have the right to:",
            bullets: [
                "Access and obtain a copy of your personal data.",
                "Request correction, deletion, or restriction of processing.",
                "Withdraw consent at any time (for marketing or AI profiling).",
                "Request portability of your data in a structured format.",
                "Object to processing where based on legitimate interests."
            ],
            description2: `To exercise your rights, contact ${COMPANY_EMAIL}. Verification may be required. We respond within statutory timeframes.`
        },
        {
            type: "text",
            title: "8. Security Measures",
            description: "We apply encryption, secure access control, monitoring, and staff training to protect your information. While no online system is completely secure, Qellum promptly investigates and reports any data breaches in line with legal obligations."
        },
        {
            type: "text",
            title: "9. Automated Decision-Making and AI",
            description: "Qellum uses limited AI automation to generate meal suggestions and optimize plans. These processes do not have legal or significant effects on you. You may request details or opt-out of AI personalization at any time."
        },
        {
            type: "text",
            title: "10. Policy Updates",
            description: "We may update this Privacy Policy periodically. Major changes will be communicated via email or in-app notifications. The effective date will always reflect the latest version."
        },
        {
            type: "text",
            title: "11. Contact & Complaints",
            description: `For privacy-related questions or complaints, contact us at ${COMPANY_EMAIL}.\n\nIf you are unsatisfied with our response, you have the right to lodge a complaint with the UK Information Commissioner’s Office (ICO).`
        },
        {
            type: "text",
            title: "Company Details",
            bullets: [
                `Company: ${COMPANY_LEGAL_NAME}`,
                `Company number: ${COMPANY_NUMBER}`,
                `Registered office: ${COMPANY_ADDRESS}`,
                `Email: ${COMPANY_EMAIL}`
            ]
        }
    ]
};

export default privacyPolicySchema;
