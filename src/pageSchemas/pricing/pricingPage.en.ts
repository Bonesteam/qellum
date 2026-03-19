import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `Plans & Pricing — ${COMPANY_NAME}`,
        description: `Find the perfect meal plan for your goals — from AI-generated recipes to full chef-prepared courses.`,
        keywords: [
            `${COMPANY_NAME} pricing`,
            "meal plans",
            "personal chef cost",
            "AI meal plan",
            "nutrition planning",
            "cooking subscription",
        ],
        canonical: "/pricing",
        ogImage: {
            title: `${COMPANY_NAME} Plans`,
            description: "Choose your meal or nutrition plan — tailored to your taste and goals.",
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [
        // 🔹 HERO INTRO
        {
            type: "custom",
            component: "HeroSection",
            title: "Choose Your Meal Plan",
            highlight: "For Every Taste & Lifestyle",
            description: `Select between AI-generated meal plans, chef-prepared courses, or a flexible custom plan.  
Every option helps you eat smarter, save time, and enjoy your food.`,
            image: "image1",
            align: "right",
        },

        // 🔹 INFOBLOCK (short intro)
        {
            type: "custom",
            component: "InfoBlock",
            icon: "🍳",
            title: "Simple, Transparent, and Delicious",
            description: `All ${COMPANY_NAME} plans include access to your personal dashboard, meal tracking tools, and direct chat with your chef.  
No hidden fees — just real culinary experiences.`,
            align: "center",
        },

        // 🔹 PRICING GRID
        {
            type: "grid",
            columns: 4,
            gap: "2rem",
            cards: [
                {
                    type: "pricing",
                    variant: "starter",
                    title: "AI Starter Plan",
                    price: "£10",
                    tokens: 1000,
                    badgeTop: "AI-Generated",
                    description:
                        "Quick, affordable, and fully automated — get your meal plan instantly based on your preferences.",
                    features: [
                        "Instant AI meal plan generation",
                        "Basic recipe suggestions",
                        "Weekly adjustment recommendations",
                    ],
                    buttonText: "Try AI Plan",
                    buttonLink: "/checkout?plan=ai",
                },
                {
                    type: "pricing",
                    variant: "pro",
                    title: "Chef Plan",
                    price: "€59",
                    tokens: 5900,
                    badgeTop: "Most Popular",
                    description:
                        "Work directly with a professional chef for fully customized recipes and meal courses.",
                    features: [
                        "1-on-1 chef-prepared plans",
                        "Weekly updates to recipes",
                        "Chat & feedback access",
                        "24h response from your chef",
                    ],
                    buttonText: "Start Cooking",
                    buttonLink: "/checkout?plan=chef",
                },
                {
                    type: "pricing",
                    variant: "premium",
                    title: "Full Culinary Pack",
                    price: "€99",
                    tokens: 9900,
                    badgeTop: "Complete Experience",
                    description:
                        "Combine chef-prepared meals, AI plans, and nutrition guidance for total culinary control.",
                    features: [
                        "Chef + AI meal planning",
                        "Personalized recipes & meal schedule",
                        "Smart nutrition tracking",
                        "Priority support & plan review",
                    ],
                    buttonText: "Choose Full Pack",
                    buttonLink: "/checkout?plan=full",
                },
                {
                    type: "pricing",
                    variant: "custom",
                    title: "Custom Plan",
                    price: "dynamic",
                    tokens: 0,
                    badgeTop: "Flexible Option",
                    description:
                        "Build your own combination — choose chef services, AI assistance, or nutrition options as needed.",
                    features: [
                        "Flexible token usage",
                        "Combine chef & AI freely",
                        "Pay only for what you need",
                    ],
                    buttonText: "Customize Plan",
                    buttonLink: "/checkout?plan=custom",
                },
            ],
        },

        // 🔹 SECTION: WHY UPGRADE
        {
            type: "section",
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Why Choose a Chef?",
                description: `AI gives quick structure — but real chefs provide taste, creativity, and attention to detail.  
Your chef ensures every recipe, ingredient, and portion fits your goals and preferences.`,
                bullets: [
                    "Expert guidance from certified chefs",
                    "Weekly plan updates based on your feedback",
                    "Personalized culinary support",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image1",
                alt: "Chef preparing meal",
            },
        },

        // 🔹 NUTRITION ADDON SECTION
        {
            type: "custom",
            component: "MissionBanner",
            title: "Add Personalized Nutrition",
            description: `Enhance your meal plan with nutritionist-approved recipes.  
Integrated calorie tracking, daily meal suggestions, and AI-based adjustments for optimal health.`,
            image: "nutritionBanner",
        },

        // 🔹 FAQ
        {
            type: "faq",
            items: [
                {
                    question: "What’s the difference between AI and Chef Plans?",
                    answer:
                        "AI generates your meal plan instantly based on your profile. Chef plans are crafted by professionals and updated weekly with personal feedback.",
                },
                {
                    question: "Do plans include nutrition guidance?",
                    answer:
                        "Full Culinary Pack or a Custom Plan with Nutrition Add-On includes nutrition guidance. You can add it at any time.",
                },
                {
                    question: "Can I switch plans later?",
                    answer:
                        "Yes, you can upgrade, downgrade, or combine AI and chef services at any time using your tokens.",
                },
                {
                    question: "How do I get started?",
                    answer:
                        "Create an account, fill out your taste and dietary profile, and select a plan. Your first AI or chef-prepared plan will arrive within 2–3 hours.",
                },
            ],
        },

        // 🔹 FINAL CTA
        {
            type: "custom",
            component: "MissionBanner",
            title: "Ready to Cook?",
            description: `Join ${COMPANY_NAME} today and start your personalized culinary journey.  
Get your meal plan, enjoy your meals, and achieve your health goals.`,
            image: "ctaPricing",
        },
    ],
};

export default schema;
