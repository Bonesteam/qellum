import { PageSchema } from "@/components/constructor/page-render/types";

const schema: PageSchema = {
    meta: {
        title: "Pricing — CV Maker",
        description:
            "Choose the right plan for your career journey. CV Maker offers instant CV generation and optional expert HR review.",
        keywords: [
            "CV Maker pricing",
            "resume builder plans",
            "AI CV cost",
            "expert HR review pricing",
        ],
        canonical: "/pricing",
        ogImage: {
            title: "CV Maker Pricing",
            description: "Affordable plans for instant CVs or HR-reviewed resumes",
            bg: "#0a2540",
            color: "#ffffff",
        },
    },
    blocks: [
        // 🔹 Hero / Intro
        {
            type: "custom",
            component: "HeroSection",
            title: "Choose Your Plan",
            highlight: "Flexible Pricing",
            description:
                "Whether you need a quick CV today or a polished version tomorrow, we’ve got a plan tailored to your needs.",
            image: "image10",
        },

        // 🔹 InfoBlock перед тарифами
        {
            type: "custom",
            component: "InfoBlock",
            title: "Simple & Transparent",
            description:
                "Pick the plan that matches your career goals — all with clear pricing and no hidden fees.",
            icon: "💡",
            align: "center",
        },

        {
            type: "grid",
            columns: 2,
            gap: "2rem",
            cards: [
                {
                    type: "pricing",
                    variant: "starter",
                    title: "Starter",
                    price: "€9",
                    tokens: 900,
                    badgeTop: "Starter Plan",
                    description: "Create your first professional CV instantly with our templates.",
                    features: [
                        "1 instant ATS-ready CV",
                        "Access to modern templates",
                        "Basic formatting options"
                    ],
                    buttonText: "Start Now",
                    buttonLink: "/checkout?plan=starter",
                },
                {
                    type: "pricing",
                    variant: "pro",
                    title: "Pro",
                    price: "€49",
                    tokens: 4900,
                    badgeTop: "Pro Plan",
                    description: "Perfect for job seekers who apply frequently and need flexibility.",
                    features: [
                        "Unlimited CV generations per month",
                        "Multiple export formats (PDF, DOCX)",
                        "Custom design options",
                        "Priority email support"
                    ],
                    buttonText: "Go Pro",
                    buttonLink: "/checkout?plan=pro",
                },
                {
                    type: "pricing",
                    variant: "premium",
                    title: "Premium",
                    price: "€99",
                    tokens: 9900,
                    badgeTop: "Recommended",
                    description: "Get expert-level CVs and stand out in competitive job markets.",
                    features: [
                        "Unlimited CVs with all templates",
                        "1-on-1 HR expert review (24h)",
                        "Advanced personalization & styling",
                        "Cover letter builder included",
                        "Dedicated priority support"
                    ],
                    buttonText: "Choose Premium",
                    buttonLink: "/checkout?plan=premium",
                },
                {
                    type: "pricing",
                    variant: "custom",
                    title: "Custom Plan",
                    price: "dynamic",
                    tokens: 0,
                    badgeTop: "Custom Plan",
                    description: "Flexible pricing — pay only for what you use.",
                    features: [
                        "Choose your CV amount",
                        "Instant calculation of tokens",
                        "No expiration on credits"
                    ],
                    buttonText: "Buy Custom",
                    buttonLink: "/checkout?plan=custom",
                },
            ],
        },

        // 🔹 Section з текстом і фото
        {
            type: "section",
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Why Upgrade?",
                description:
                    "An expertly reviewed CV increases your chances of landing interviews by highlighting the right skills and structure recruiters expect.",
                bullets: [
                    "Instant download in multiple formats",
                    "Reviewed by HR professionals",
                    "Guaranteed ATS optimization",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image4",
                alt: "Professional CV Example",
            },
        },

        // 🔹 FAQ в кінці
        {
            type: "faq",
            items: [
                {
                    question: "Can I really get my CV instantly?",
                    answer:
                        "Yes, with our AI-powered generator you can download your CV immediately after filling in your details.",
                },
                {
                    question: "What’s included in the HR review?",
                    answer:
                        "Our HR experts check your structure, keywords, and formatting to maximize your chances of passing ATS and impressing recruiters.",
                },
                {
                    question: "Can I upgrade later?",
                    answer:
                        "Of course! You can start with the Basic plan and upgrade to Pro or Premium whenever you want.",
                },
            ],
        },
    ],
};

export default schema;
