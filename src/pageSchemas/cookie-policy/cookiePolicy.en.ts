import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const cookiePolicyEn: PageSchema = {
    meta: {
        title: `Cookies Policy – ${COMPANY_NAME}`,
        description: `Cookies Policy of ${COMPANY_NAME}: how we use cookies for AI chef, personal meal plans, token tracking, analytics, marketing, and user consent.`,
        keywords: [
            "cookies policy",
            "cooking platform",
            "tokens",
            "AI chef",
            "meal plan",
            "GDPR",
            "consent",
            "tracking",
        ],
        canonical: "/cookies-policy",
        ogImage: {
            title: `${COMPANY_NAME} – Cookies Policy`,
            description: "Clear and transparent cookie practices for AI chef and meal plan services.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Cookies Policy",
            description: "Effective date: 10 September 2025",
        },
        {
            type: "text",
            title: "1. Overview",
            description: `This Cookies Policy explains how ${COMPANY_NAME}, operated by ${COMPANY_LEGAL_NAME} (Company No. ${COMPANY_NUMBER}, registered office: ${COMPANY_ADDRESS}), uses cookies and similar technologies (localStorage, sessionStorage, pixels, and identifiers) across our platform, including AI-generated meal plans, personal chef services, and token management. This Policy complements our Privacy Policy. By continuing to use the platform or interacting with the cookie banner, you consent to or manage non-essential cookies as described below.`
        },
        {
            type: "text",
            title: "2. What Are Cookies?",
            description: "Cookies are small text files or browser entries stored on your device. They help us manage login sessions, remember your meal preferences, track token usage, measure AI/chef service performance, and — with consent — enable analytics and marketing features."
        },
        {
            type: "text",
            title: "3. Categories of Cookies We Use",
            description: "We use cookies for clearly defined purposes related to our cooking services:",
            bullets: [
                "Essential / Necessary — required for core platform features (login, security, token balance, dashboard). No consent needed.",
                "Functional — store user settings like preferred language, meal preferences, or dashboard layout.",
                "Performance / Analytics — measure usage of AI meal plans, chef requests, order history, and general platform performance. May rely on legitimate interests or consent.",
                "Marketing / Advertising — with consent, track promotional campaigns, remarketing, and personalized offers for recipes, meal plans, or token packages.",
                "Security / Anti-abuse — detect fraud, abuse, bots, or unauthorized token usage."
            ]
        },
        {
            type: "text",
            title: "4. Examples of Typical Cookies",
            description: "Cookie names, lifetime, and providers may vary. Current details are always available in your cookie settings panel. Examples:",
            bullets: [
                "session_id — Keeps you logged in and manages dashboard session • Essential • Lifetime: Session",
                "csrf_token — Security for transactions and AI/chef requests • Essential • Lifetime: Session",
                "cookie_consent — Saves your cookie preferences • Functional • Lifetime: 6–12 months",
                "ui_prefs — Saves language, dashboard layout, and meal plan filters • Functional • Lifetime: ~6 months",
                "_ga, _gid — Analytics for platform usage and AI/chef performance • Performance/Analytics • Lifetime: 1–24 months",
                "promo_tracking — Tracks token promotions and marketing campaigns • Marketing • Lifetime: 30–90 days"
            ]
        },
        {
            type: "text",
            title: "5. Consent and Lawful Basis",
            bullets: [
                "Essential cookies are required for the platform to function and are used without consent.",
                "Non-essential cookies (functional, analytics, marketing) are activated only after you consent via the cookie banner or settings panel.",
                "Legal bases include contract performance (delivery of services), consent, and legitimate interests (security, fraud prevention, service improvements)."
            ]
        },
        {
            type: "text",
            title: "6. Recording and Retaining Consent",
            description: "When you provide cookie consent, we log the banner version, timestamp, IP address, and browser/device details. Consent records are kept for at least 24 months, and up to 6 years if needed for disputes, accounting, or enterprise purposes."
        },
        {
            type: "text",
            title: "7. Third Parties and International Transfers",
            description: `We work with third-party providers (payment processors, hosting/cloud platforms, analytics, marketing, customer support) that may place cookies. Some are outside the UK/EEA. In such cases, we rely on safeguards like UK adequacy regulations or Standard Contractual Clauses. Active providers are listed in your cookie settings panel.`
        },
        {
            type: "text",
            title: "8. Managing or Withdrawing Consent",
            bullets: [
                "Use the cookie banner or settings panel to accept, decline, or customize non-essential cookies.",
                "You may withdraw or change consent at any time via the cookie settings link in the footer.",
                "Cookies can also be managed via your browser or private/incognito mode.",
                "Disabling certain cookies may reduce functionality (automatic login, saved preferences, AI/chef tracking, or dashboard history)."
            ]
        },
        {
            type: "text",
            title: "9. Updates to this Policy",
            description: "We may update this Cookies Policy if new tools, services, or technologies are added. Significant changes will be communicated via website notice or email. The effective date will always be updated."
        },
        {
            type: "text",
            title: "10. Contact",
            bullets: [
                `📧 ${COMPANY_EMAIL}`,
                `🏢 ${COMPANY_LEGAL_NAME}`,
                COMPANY_ADDRESS ?? "Address not specified"
            ]
        }
    ]
};

export default cookiePolicyEn;
