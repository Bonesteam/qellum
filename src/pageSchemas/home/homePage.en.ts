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
            title: "Cook Smarter with Expert Chefs",
            highlight: "Personal Chef + Smart AI Assistant",
            description: `Enjoy meals crafted just for you by certified chefs — or let AI instantly generate a complete meal plan.  
Whether your goal is weight management, muscle gain, or balanced nutrition — your plan is tailored to you.`,
            primaryCta: {text: "Start with My Chef", link: "/get-started"},
            image: "image1",
            align: "right",
        },

        {
            type: "custom",
            component: "HighlightStrip",
            items: [
                {icon: "👩‍🍳", text: "Personalized Chef Meal Plans"},
                {icon: "🤖", text: "AI-Generated Recipes"},
                {icon: "📊", text: "Nutrition & Calorie Tracking"},
                {icon: "💬", text: "Direct Chef Communication"},
                {icon: "🔥", text: "Custom Courses Delivered in Hours"},
            ],
        },

        {
            type: "custom",
            component: "ValuesIcons",
            title: "Why Choose Qellum Chefs?",
            description: `${COMPANY_NAME} ensures your journey is guided by culinary expertise — AI helps, but real chefs lead.`,
            values: [
                {
                    icon: "👨‍🍳",
                    title: "Certified Chefs",
                    text: "All chefs are trained and experienced in personalized cooking and nutrition.",
                },
                {
                    icon: "🧠",
                    title: "AI Assistance",
                    text: "Our AI helps track preferences, optimize nutrition, and suggest recipe adjustments.",
                },
                {
                    icon: "🍽️",
                    title: "Fully Personalized",
                    text: "Plans are created based on dietary needs, preferences, and goals.",
                },
                {
                    icon: "🤝",
                    title: "Support & Motivation",
                    text: "Chefs provide guidance and feedback to keep your meal plan enjoyable and sustainable.",
                },
            ],
        },

        {
            type: "custom",
            component: "Timeline",
            title: "How It Works",
            steps: [
                {
                    title: "Create Your Account",
                    description: "Sign up to access your dashboard and meal planning options.",
                },
                {
                    title: "Buy Tokens",
                    description: "Use tokens to request chef courses, AI plans, or additional services.",
                },
                {
                    title: "Fill Out Your Preferences",
                    description: "Provide dietary needs, allergies, goals, and cooking style preferences.",
                },
                {
                    title: "Chef Creates Your Meal Plan",
                    description: "Within 2–3 hours, receive a fully tailored meal plan from your chef.",
                },
                {
                    title: "Add AI Assistant (Optional)",
                    description: "AI tracks nutrition, calorie intake, and suggests recipe adjustments.",
                },
                {
                    title: "Get Extra Options",
                    description: "Add extra recipes, snacks, or special dishes using your tokens.",
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
            type: "grid",
            columns: 4,
            gap: "2rem",
            cards: [
                {
                    type: "pricing",
                    variant: "starter",
                    title: "AI Plan",
                    price: "€9",
                    tokens: 900,
                    badgeTop: "AI-Generated Plan",
                    description:
                        "Instant meal plan generated by AI based on your preferences.",
                    features: [
                        "Instant course generation",
                        "AI meal adjustments",
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
                        "Work directly with a professional chef for a fully customized course.",
                    features: [
                        "1-on-1 chef guidance",
                        "Meal plan review and adjustments",
                        "Direct chat with chef",
                        "Priority feedback",
                    ],
                    buttonText: "Get Chef Plan",
                    buttonLink: "/checkout?plan=chef",
                },
                {
                    type: "pricing",
                    variant: "premium",
                    title: "Full Cooking Pack",
                    price: "€99",
                    tokens: 9900,
                    badgeTop: "Complete Meal Experience",
                    description:
                        "Chef guidance + AI nutrition tracking + meal analytics for best results.",
                    features: [
                        "Custom meal plan",
                        "Personalized nutrition plan",
                        "Fast feedback in 2–3 hours",
                        "AI analytics for nutrition",
                        "Priority support",
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
                        "Mix and match services — AI, chef, or nutrition as you prefer.",
                    features: [
                        "Choose AI or chef focus",
                        "Flexible token usage",
                        "Pay for what you need",
                    ],
                    buttonText: "Customize Plan",
                    buttonLink: "/checkout?plan=custom",
                },
            ],
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
            component: "TestimonialsSlider",
            title: "Real Users. Real Results.",
            description:
                "See how our members improved their nutrition and cooking with chefs and AI support.",
            testimonials: [
                {
                    name: "Anna Rossi",
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
                    name: "Mark Evans",
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
            component: "MissionBanner",
            title: "Start Your Culinary Journey Today",
            description:
                `Join thousands improving their meals and nutrition with ${COMPANY_NAME}. Choose your chef or AI plan and begin now.`,
            image: "ctaBanner",
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
