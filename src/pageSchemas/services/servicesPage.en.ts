import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const servicesSchema: PageSchema = {
    meta: {
        title: `Our Services — ${COMPANY_NAME}`,
        description: `Explore ${COMPANY_NAME} services: personalized meal plans, chef-prepared courses, AI recipe guidance, and a flexible token system for food lovers of all levels.`,
        keywords: [
            `${COMPANY_NAME} services`,
            "meal plans",
            "personal chef",
            "AI meal planner",
            "nutrition guidance",
            "recipe tracking",
            "cooking platform",
        ],
        canonical: "/services",
        ogImage: {
            title: `${COMPANY_NAME} Services`,
            description: "Personalized meal plans, chef guidance, and AI recipes in one platform.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "section",
            align: "center",
            left: {
                type: "text",
                title: "Everything You Need to Cook Smarter",
                description: `${COMPANY_NAME} combines AI-generated meal plans with professional chef expertise. From personalized recipes to nutrition tracking — all in one app.`,
                centerTitle: true,
                centerDescription: true,
            },
        },
        {
            type: "grid",
            columns: 2,
            gap: "3rem",
            cards: [
                {
                    image: "image1",
                    title: "AI-Generated Meal Plans",
                    description: "Instantly created recipes and meal schedules tailored to your taste and goals.",
                    buttonLink: "/get-started",
                    buttonText: "Get Your Plan",
                },
                {
                    image: "image2",
                    title: "Chef-Crafted Courses",
                    description: "Personal chefs prepare customized meal courses based on your preferences.",
                    buttonLink: "/get-started",
                    buttonText: "Book a Chef",
                },
            ],
        },
        {
            type: "grid",
            columns: 4,
            gap: "2rem",
            cards: [
                {
                    image: "image7",
                    title: "Breakfast & Brunch",
                    description: "Start your day with balanced and delicious meals.",
                    buttonLink: "/sign-up",
                    buttonText: "Explore",
                },
                {
                    image: "image8",
                    title: "Lunch & Dinner",
                    description: "Chef-designed recipes for nutritious main courses.",
                    buttonLink: "/sign-up",
                    buttonText: "Explore",
                },
                {
                    image: "image9",
                    title: "Snacks & Desserts",
                    description: "Healthy snacks and indulgent treats for every craving.",
                    buttonLink: "/sign-up",
                    buttonText: "Try Recipes",
                },
                {
                    image: "image10",
                    title: "Special Diets",
                    description: "Plans for keto, vegan, gluten-free, and other dietary needs.",
                    buttonLink: "/sign-up",
                    buttonText: "Customize",
                },
            ],
        },
        {
            type: "custom",
            component: "HighlightStrip",
            messages: [
                "🍳 Personalized recipes updated weekly",
                "🥗 Nutrition guidance tailored to your needs",
                "📊 Track your meals and progress",
                "🎯 Flexible token system for all plans",
            ],
        },
        {
            type: "section",
            left: {
                type: "media",
                mediaType: "image",
                src: "image3",
                width: "100%",
                height: "400px",
                alt: "Meal tracking dashboard",
            },
            right: {
                type: "text",
                title: "Track Your Meals & Nutrition",
                description: `Visualize your culinary journey with recipe logs, nutrition insights, and progress tracking. ${COMPANY_NAME} helps you stay consistent and enjoy cooking.`,
                bullets: [
                    "Meal history saved automatically",
                    "Nutrition goals tracked",
                    "Weekly and monthly insights",
                ],
            },
        },
        {
            type: "grid",
            columns: 3,
            gap: "2rem",
            cards: [
                {
                    image: "image4",
                    title: "Flexible Token System",
                    description: "Buy tokens once and use them for meal plans, chef sessions, or premium recipes.",
                    buttonLink: "/pricing",
                    buttonText: "View Plans",
                },
                {
                    image: "image5",
                    title: "Community Support",
                    description: "Share recipes, tips, and progress with fellow cooking enthusiasts.",
                    buttonLink: "/sign-up",
                    buttonText: "Join Community",
                },
                {
                    image: "image6",
                    title: "Chef Consultations",
                    description: "Book personal chef sessions for advanced meal planning.",
                    buttonLink: "/sign-up",
                    buttonText: "Book a Chef",
                },
            ],
        },
        {
            type: "section",
            align: "center",
            left: {
                type: "text",
                title: "Why Choose Qellum?",
                description: `Because cooking should be simple, enjoyable, and personalized. ${COMPANY_NAME} adapts to your tastes — not the other way around.`,
                bullets: [
                    "AI-assisted meal personalization",
                    "Flexible token system for all plans",
                    "All-in-one solution: chef + AI + nutrition",
                ],
                centerTitle: true,
                centerDescription: true,
                centerBullets: true,
            },
        },
        {
            type: "faq",
            items: [
                {
                    question: `What services does ${COMPANY_NAME} provide?`,
                    answer: "We offer AI-generated meal plans, chef-prepared courses, nutrition guidance, meal tracking, and optional chef consultations.",
                },
                {
                    question: "Do I need tokens to start?",
                    answer: "You can try basic features for free, but tokens unlock advanced recipes, chef sessions, and nutrition plans.",
                },
                {
                    question: "How flexible is the token system?",
                    answer: "Very flexible. Buy tokens once and spend only on the services you want — no wasted subscriptions.",
                },
                {
                    question: "Can beginners use this platform?",
                    answer: `Absolutely. ${COMPANY_NAME} adapts plans based on your cooking experience and preferences.`,
                },
            ],
        },
    ],
};

export default servicesSchema;
