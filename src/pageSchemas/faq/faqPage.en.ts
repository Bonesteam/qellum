import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/resources/constants";

const faqSchema: PageSchema = {
    meta: {
        title: `FAQ — ${COMPANY_NAME}`,
        description: `Frequently asked questions about ${COMPANY_NAME}: personal trainers, AI assistant, nutrition plans, tokens, and how to start your fitness journey.`,
        keywords: [
            `${COMPANY_NAME} FAQ`,
            "fitness plans",
            "personal trainer",
            "AI fitness coach",
            "nutrition plan",
            "training tokens",
            "how it works",
        ],
        canonical: "/faq",
        ogImage: {
            title: `${COMPANY_NAME} FAQ`,
            description: `Answers to the most common questions about training, coaching, and nutrition with ${COMPANY_NAME}.`,
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [
    {
        type: "faq",
        items: [
            {
                question: "What is Qellum?",
                answer: "Qellum is a smart cooking platform that connects you with personal chefs and nutrition experts. You can request a custom meal plan prepared by a real chef or let our AI generate one instantly based on your goals and preferences.",
            },
            {
                question: "How does the personal chef option work?",
                answer: "After submitting your dietary preferences, a certified chef creates a full personalized meal course just for you. Once ready, it’s delivered to your dashboard within 2–3 hours.",
            },
            {
                question: "How does the AI meal planner work?",
                answer: "Our AI analyzes your food preferences, nutrition goals, and schedule to automatically build meal plans, recipes, and grocery lists. You can adjust ingredients, serving size, and calories anytime.",
            },
            {
                question: "Can I combine AI and chef-created plans?",
                answer: "Yes, of course. You can use AI-generated plans for everyday meals and request a personal chef plan for special days or advanced nutrition needs. Both options work together seamlessly.",
            },
            {
                question: "What are tokens and how do they work?",
                answer: "Tokens are your internal currency on Qellum. You spend them on meal plans, chef consultations, or premium AI features. You can top up tokens anytime — 1.00 GBP equals 100 tokens.",
            },
            {
                question: "What token packages are available?",
                answer: "There are 4 token packages available: three predefined options with fixed values and one custom package where you can choose your own amount.",
            },
            {
                question: "Which currencies are supported?",
                answer: "Our main currency is GBP, but we also support EUR. All conversions are calculated from GBP, so you always know the exact value of your tokens.",
            },
            {
                question: "What can I spend my tokens on?",
                answer: "You can use tokens to request meal plans, hire personal chefs, unlock premium recipes, get nutrition consultations, or add meal customization options. More features are added regularly.",
            },
            {
                question: "How do I manage my orders and balance?",
                answer: "You can track your token history, meal requests, and refills through your personal dashboard. It’s simple, clear, and always up to date.",
            },
            {
                question: "Can I pause or modify my plan?",
                answer: "Yes. You can pause, switch, or edit your meal plan anytime. Any remaining tokens will stay on your account for future use.",
            },
            {
                question: "Is my personal data safe?",
                answer: "Absolutely. Qellum complies with GDPR and international data protection standards. Your personal and dietary data are stored securely and never shared with third parties.",
            },
            {
                question: "Where can I find the platform policies?",
                answer: "You can read our Terms and Conditions, Privacy Policy, Return Policy, and Cooking Policy in the information section of our website.",
            },
            {
                question: "Can I change the language of the platform?",
                answer: "Yes. Qellum supports multiple languages, and you can switch them in your profile settings. More languages will be added soon.",
            },
            {
                question: "How can I contact support?",
                answer: "Our support team is always here to help. You can reach us at support@qellum.com or through the contact form on our website.",
            },
        ],
    },
],
};

export default faqSchema;
