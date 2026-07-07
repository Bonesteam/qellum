import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `${COMPANY_NAME} — Personalized Meal Plans with Real Chefs & Smart AI`,
        description: `${COMPANY_NAME} connects you with professional chefs who create fully personalized meal courses — supported by AI for smart suggestions and nutrition tracking.`,
        keywords: [
            "personal chef",
            "custom meal plan",
            "nutrition coach",
            "AI meal planner",
            "recipes",
            "cooking plan",
            "diet transformation",
            "meal delivery",
            "cooking with experts",
        ],
        canonical: "/",
        ogImage: {
            title: COMPANY_NAME,
            description: `Get your personal chef & AI-powered meal plan today.`,
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [
        {
            type: "custom",
            component: "HeroSection",
            title: "Cook Smarter — Chef & AI Meal Plans",
            highlight: "Fast. Personalized. Delicious.",
            description: `Pick a plan, tell us your preferences, and get a tailored meal plan with recipes and shopping lists. Choose instant AI plans or a reviewed chef plan.`,
            primaryCta: {text: "Get Your Meal Plan", link: "/get-started"},
            secondaryCta: {text: "How It Works", link: "#how-it-works"},
            image: "image1",
            align: "left",
        },

        {
            type: "custom",
            component: "HighlightStrip",
            items: [
                {icon: "chef", text: "120+ Certified Chefs"},
                {icon: "plans", text: "8,400 Meal Plans Created"},
                {icon: "rating", text: "4.9★ Average Rating"},
                {icon: "allergy", text: "Allergy & Diet Safe"},
                {icon: "speed", text: "Plans Ready in 2–3 Hours"},
                {icon: "countries", text: "Clients in 30+ Countries"},
            ],
        },

        {
            type: "custom",
            component: "CalorieCalculator",
        },

        {
            type: "custom",
            component: "InfoBlock",
            title: "Featured Recipes",
            description: "A few popular recipes from our chefs — quick, nutritious, and delicious.",
            align: "center",
        },
        {
            type: "custom",
            component: "CardSlider",
            cards: [
                { image: "recipe1", title: "Herb Roasted Chicken", description: "Juicy chicken with garlic herb rub and seasonal veg." },
                { image: "recipe2", title: "Quinoa Buddha Bowl", description: "Balanced bowl with grains, veggies, and tahini dressing." },
                { image: "recipe3", title: "Spicy Chickpea Stew", description: "Comforting stew, rich in flavor and protein." },
            ],
        },

        {
            type: "custom",
            component: "ValuesIcons",
            title: "Why Choose Qellum Chefs?",
            description: `${COMPANY_NAME} combines culinary expertise with smart AI to deliver personalized meal experiences.`,
            values: [
                {
                    icon: "👨‍🍳",
                    title: "Certified Chefs",
                    text: "Experts craft plans tailored to your taste and health needs.",
                },
                {
                    icon: "🧠",
                    title: "Smart Assistance",
                    text: "AI suggests recipes, swaps ingredients, and creates shopping lists.",
                },
                {
                    icon: "🍽️",
                    title: "Practical & Tasty",
                    text: "Recipes are realistic, delicious, and easy to cook at home.",
                },
            ],
        },

        {
            type: "custom",
            component: "InfoBlock",
            title: "How It Works",
            description: "Create your account, add preferences, choose AI or Chef plan, and receive recipes and a grocery list within hours.",
            bullets: [
                "Sign up and fill out dietary preferences",
                "Choose an AI plan for instant results or Chef plan for reviewed menus",
                "Get recipes, portions, and a shopping list",
            ],
            align: "center",
        },

        {
            type: "section",
            title: "Meet Our Chefs",
            description:
                "Our chefs combine skill, nutrition knowledge, and passion. Every plan is handcrafted and verified.",
            left: {
                type: "slider",
                images: ["coach1", "coach2", "coach3", "coach4"],
            },
            right: {
                type: "custom",
                component: "InfoBlock",
                title: "Only Certified Professionals",
                description:
                    "All chefs are trained, certified, and experienced. You’ll be matched with the best expert for your dietary style.",
                bullets: [
                    "Certified culinary and nutrition experts",
                    "Specializations: weight loss, muscle gain, healthy cooking",
                ],
            },
        },

        {
            type: "section",
            title: "Qellum VIP Elite Retention Plans",
            description: "For clients seeking the ultimate level of culinary guidance, individual chef coaching, and certified medical nutrition review.",
            align: "center",
        },
        {
            type: "grid",
            columns: 2,
            gap: "2.5rem",
            cards: [
                {
                    type: "pricing",
                    variant: "premium",
                    title: "VIP Chef Retainer (3 Months)",
                    price: "€499",
                    tokens: 49900,
                    badgeTop: "VIP Elite",
                    description: "Your own dedicated professional chef on retainer for 1-on-1 diet coaching and signature recipe customization.",
                    features: [
                        "Dedicated Chef on retainer for 3 months",
                        "Weekly 60-minute Zoom cooking & diet consultations",
                        "Unlimited personalized recipe swaps and modifications",
                        "Kitchen & equipment audit with your chef",
                        "Printable Premium Signed VIP PDFs",
                    ],
                    buttonText: "Enroll in VIP (3 Mo)",
                    buttonLink: "/checkout?plan=vip3",
                },
                {
                    type: "pricing",
                    variant: "custom",
                    title: "Ultimate Culinary Suite (6 Months)",
                    price: "€999",
                    tokens: 99000,
                    badgeTop: "Ultimate VIP",
                    description: "The complete 6-month elite transformation with direct chef support and board-certified nutritionist supervision.",
                    features: [
                        "Direct WhatsApp check-ins with your assigned executive chef",
                        "Continuous real-time ingredient and recipe adjustments",
                        "Monthly senior nutritionist laboratory/diet review",
                        "Personalized custom video guides for recipes",
                        "Certified culinary board signature stamp on plans",
                    ],
                    buttonText: "Enroll in Ultimate (6 Mo)",
                    buttonLink: "/checkout?plan=vip6",
                },
            ]
        },

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
                    badgeTop: "AI-Generated Plan",
                    description:
                        "Instant meal plan generated by AI based on your preferences.",
                    features: [
                        "Instant course generation",
                        "AI cooking adjustments",
                        "Basic tracking",
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
                        "Work directly with a professional chef for a fully customized plan.",
                    features: [
                        "1-on-1 chef guidance",
                        "Plan review and adjustment",
                        "Direct chat with chef",
                        "Priority feedback",
                    ],
                    buttonText: "Get Chef Plan",
                    buttonLink: "/checkout?plan=chef",
                },
                {
                    type: "pricing",
                    variant: "premium",
                    title: "Full Culinary Pack",
                    price: "€99",
                    tokens: 9900,
                    badgeTop: "Complete Culinary Experience",
                    description:
                        "Chef guidance + AI nutrition tracking + meal analysis for best results.",
                    features: [
                        "Customized meal plan",
                        "Personal nutrition plan",
                        "Fast feedback within 2–3 hours",
                        "AI nutrition analysis",
                        "Priority support",
                    ],
                    buttonText: "Choose Full Package",
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
                        "Combine services — AI, chef, or nutrition as you prefer.",
                    features: [
                        "Choose AI or chef focus",
                        "Flexible token usage",
                        "Pay only for what you need",
                    ],
                    buttonText: "Customize Plan",
                    buttonLink: "/checkout?plan=custom",
                },
            ],
        },

        {
            type: "section",
            title: "Our Mission — Culinary Expertise First",
            description: `We believe real transformation starts with human expertise — connecting you to chefs who understand your taste, goals, and nutrition needs.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                title: `How ${COMPANY_NAME} Started`,
                image: "image2",
                description: `${COMPANY_NAME} began as a small network of chefs passionate about healthy, personalized cooking.  
We noticed people struggled with diets, inconsistent recipes, and generic meal plans.  
So we built a platform where real chefs craft courses with AI support — combining experience and technology.`,
                bullets: [
                    "Over 100 certified chefs and nutritionists",
                    "Science-based personalized recipes",
                    "AI analytics for nutrition tracking",
                    "Thousands of satisfied clients worldwide",
                ],
            },
            right: {
                type: "custom",
                component: "StoryTimeline",
                steps: [
                    {
                        year: "2020",
                        title: "Idea Born",
                        description: "Chefs wanted to offer personalized courses online."
                    },
                    {
                        year: "2021",
                        title: "Chef Network",
                        description: "Certified chefs from multiple countries joined the platform."
                    },
                    {
                        year: "2023",
                        title: "AI Integration",
                        description: "Smart AI assistant introduced to enhance planning."
                    },
                    {
                        year: "2025",
                        title: "Full Meal Coaching",
                        description: "Chef guidance + AI nutrition analytics for complete support."
                    },
                ],
            },
        },

        {
            type: "custom",
            component: "MissionBanner",
            title: "Healthy Meals Made Easy",
            description:
                "Pair your preferences with a personalized plan from a chef or AI. Get recipes, shopping lists, and portion guides tailored to you.",
            image: "nutritionBanner",
        },

        {
            type: "custom",
            component: "VideoDemo",
            title: "See How Meal Planning Works",
            description:
                "Watch chefs create personalized courses, review nutritional data, and see AI suggestions in action.",
            video: "coachWork",
        },

        {
            type: "custom",
            component: "SeasonalMenuPreview",
            title: "Seasonal Menus — Always Fresh",
            description: "Our chefs craft menus around the finest seasonal produce. Every dish is created fresh, nutritionally balanced, and tailored to your preferences.",
            ctaText: "Get My Personal Menu",
            ctaLink: "/get-started",
        },

        {
            type: "section",
            title: `Join the ${COMPANY_NAME} Community`,
            description:
                "Share your cooking journey, get tips, and celebrate results with thousands of members.",
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Meal Tracker & Social Support",
                image: "image3",
                description:
                    "Track your courses, nutrition, and recipe progress. Stay motivated through feedback and community challenges.",
                bullets: [
                    "Visual dashboard for meals & calories",
                    "Monthly cooking challenges",
                    "Private chef chat",
                    "AI suggestions for ingredients and portions",
                ],
            },
            right: {
                type: "card",
                image: "image4",
                title: "Track Every Recipe",
                description:
                    "Monitor your meals and nutrition easily — powered by AI, guided by chefs.",
                buttonText: "Start Tracking",
                buttonLink: "/profile",
            },
        },

        {
            type: "custom",
            component: "NutritionFactsTicker",
        },

        {
            type: "custom",
            component: "ChefMatchTeaser",
            title: "Find Your Perfect Chef in 3 Questions",
            description: "Answer a few quick questions and we'll match you with the ideal certified chef for your goals, preferences and schedule.",
            ctaLink: "/get-started",
        },

        {
            type: "custom",
            component: "TestimonialsSlider",
            title: "Real Users. Real Results.",
            description:
                "See how our members improved their nutrition and cooking with chefs and AI support.",
            testimonials: [
                {
                    name: "Elena Rossi",
                    role: "Entrepreneur",
                    image: "review1",
                    text: "My chef created a perfect plan in hours. AI tracking keeps me on target daily!",
                    rating: 5,
                },
                {
                    name: "Liam Carter",
                    role: "Student",
                    image: "review2",
                    text: "AI plan was great, but having a chef review it made it perfect.",
                    rating: 5,
                },
                {
                    name: "Sophia Nguyen",
                    role: "Designer",
                    image: "review3",
                    text: "Full cooking pack improved my habits completely — now I feel healthier.",
                    rating: 5,
                },
                {
                    name: "Mark Kowalski",
                    role: "Engineer",
                    image: "review4",
                    text: "Chef adapted the plan to my dietary needs. I've never felt better.",
                    rating: 5,
                },
            ],
        },

        {
            type: "faq",
            image: "image5",
            items: [
                {
                    question: "Why choose a chef instead of AI?",
                    answer:
                        "AI assists automatically, but a chef understands your preferences, allergies, and taste. They adapt courses in real time.",
                },
                {
                    question: "Can I contact my chef directly?",
                    answer:
                        "Yes! Chat directly with your chef for advice, recipe modifications, or guidance.",
                },
                {
                    question: "How often will my plan be updated?",
                    answer:
                        "Your chef reviews your courses in 2–3 hours and updates plans as needed.",
                },
                {
                    question: "Can I combine AI and chef plans later?",
                    answer:
                        "Absolutely. You can add AI or chef plans anytime using your tokens.",
                },
                {
                    question: "Are there beginner-friendly options?",
                    answer:
                        "Yes, we cater to all levels — from beginners to experienced cooks.",
                },
            ],
        },



        {
            type: "custom",
            component: "ContactForm",
            title: "Need Help Choosing a Plan?",
            description:
                "Our support team can guide you to the best plan, explain tokens, or answer any questions.",
        },
    ],
};

export default schema;
