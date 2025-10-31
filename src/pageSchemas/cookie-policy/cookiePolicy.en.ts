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
        description: `Cookies Policy of ${COMPANY_NAME}: how we use cookies and similar technologies for AI chef, personal meal plans, token tracking, analytics, marketing, and user consent.`,
        keywords: [
            "cookies policy",
            "AI chef",
            "meal plan",
            "tokens",
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
            description: "Effective date: 17 October 2025",
            centerTitle: true,
            centerDescription: true,
        },
        {
            type: "text",
            title: "1. Overview",
            bullets: [
                `This Cookies Policy explains how ${COMPANY_NAME} (“we”, “us”, “our”), operated by ${COMPANY_LEGAL_NAME} (Company No. ${COMPANY_NUMBER}, ${COMPANY_ADDRESS}), uses cookies and similar technologies (including localStorage, sessionStorage, pixels, and SDKs) on qellum.co.uk and related services.`,
                "It complements our Privacy Policy.",
                "By interacting with our cookie banner or preferences center, you can manage consent to non-essential cookies as described below."
            ],
            centerTitle: true,
            centerBullets: true,
        },
        {
            type: "text",
            title: "Controller & Contact",
            bullets: [
                `Controller: ${COMPANY_LEGAL_NAME} (Company No. ${COMPANY_NUMBER}), ${COMPANY_ADDRESS}`,
                `Email: ${COMPANY_EMAIL}`
            ],
            centerTitle: true,
            centerBullets: true,
        },
        {
            type: "text",
            title: "2. What Are Cookies (and Similar Technologies)?",
            bullets: [
                "Cookies are small files placed on your device by a website.",
                "They help the site to run essential functions (login, security), remember preferences, measure performance, and — where you consent — enable analytics and marketing.",
                "Similar technologies include localStorage/sessionStorage keys, SDK identifiers, tracking pixels, and device/browser identifiers."
            ],
            centerTitle: true,
            centerBullets: true,
        },
        {
            type: "text",
            title: "3. Categories We Use",
            bullets: [
                "Necessary / Essential — required for core functionality (authentication, security, session management, consent logging). No consent needed.",
                "Functional — remember your choices (language, UI layout, generator inputs).",
                "Performance / Analytics — measure usage, errors, and page speed to improve reliability; may rely on consent or legitimate interests.",
                "Marketing / Advertising — set only with consent; for campaign attribution, remarketing, and effectiveness measurement.",
                "Security / Anti-abuse — detect unusual activity, mitigate fraud and bot traffic."
            ],
            centerTitle: true,
            centerBullets: true,
        },
        {
            type: "text",
            title: "4. Typical Cookies & Storage Keys (Examples)",
            bullets: [
                "session_id — Maintains authenticated session • Necessary • Lifetime: Session",
                "csrf_token — CSRF protection • Necessary • Lifetime: Session",
                "consent_state — Stores banner/settings choices • Necessary/Functional • Lifetime: 6–12 months",
                "ui_prefs — Language, theme, layout • Functional • Lifetime: ~6 months",
                "perf_metrics — Page performance & errors • Analytics • Lifetime: 1–3 months",
                "campaign_src — UTM/campaign attribution • Marketing • Lifetime: 1–3 months",
                "ql_token_hint (localStorage) — Remembers last token pack view • Functional • Until cleared",
                "ql_generator_prefs (localStorage) — Saves generator form preferences • Functional • Until cleared"
            ],
            centerTitle: true,
            centerBullets: true,
        },
        {
            type: "text",
            title: "5. Consent and Lawful Basis",
            bullets: [
                "Essential cookies are strictly necessary and do not require consent.",
                "Non-essential cookies are set only after consent via the banner or preferences center, unless analytics rely on legitimate interests.",
                "Lawful bases include performance of contract, consent, and legitimate interests (service improvement, fraud prevention)."
            ],
            centerTitle: true,
            centerBullets: true,
        },
        {
            type: "text",
            title: "6. How We Record and Retain Consent",
            bullets: [
                "We record consent categories selected, policy/version reference, timestamp, IP, and user-agent.",
                "Records are retained for at least 24 months, up to 6 years for disputes, accounting, or enterprise needs, in line with our Privacy Policy."
            ],
            centerTitle: true,
            centerBullets: true,
        },
        {
            type: "text",
            title: "7. Third Parties and International Transfers",
            bullets: [
                "We may use third-party providers (payment processors, analytics, hosting/CDN, email delivery, marketing) that set/read cookies.",
                "Some are outside the UK/EEA.",
                "We apply safeguards like UK adequacy regulations or Standard Contractual Clauses.",
                "The full list is available in your cookie settings panel."
            ],
            centerTitle: true,
            centerBullets: true,
        },
        {
            type: "text",
            title: "8. Managing or Withdrawing Consent",
            bullets: [
                "Use the cookie banner or settings panel to accept, decline, or customize non-essential cookies.",
                "Withdraw consent anytime via the Cookie Settings link.",
                "Cookies can also be cleared via browser settings or private/incognito mode.",
                "Disabling certain cookies may limit functionality (login, preferences, AI tracking, dashboard)."
            ],
            centerTitle: true,
            centerBullets: true,
        },
        {
            type: "text",
            title: "9. Do Not Track / Global Privacy Controls",
            bullets: [
                "If your browser sends Global Privacy Control (GPC) or similar signals, we treat them as an opt-out from non-essential cookies where feasible and lawful."
            ],
            centerTitle: true,
            centerBullets: true,
        },
        {
            type: "text",
            title: "10. Changes to this Policy",
            bullets: [
                "This Policy may be updated when new tools, services, or integrations are added.",
                "Significant changes will be notified via website notice or email.",
                "The effective date always reflects the latest version."
            ],
            centerTitle: true,
            centerBullets: true,
        },
        {
            type: "text",
            title: "11. Contact",
            bullets: [
                `📧 ${COMPANY_EMAIL}`,
                `🏢 ${COMPANY_LEGAL_NAME}`,
                COMPANY_ADDRESS ?? "Address not specified"
            ],
            centerTitle: true,
            centerBullets: true,
        }
    ]
};

export default cookiePolicyEn;

