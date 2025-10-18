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
                {icon: "👩‍🍳", text: "Chef-crafted Plans"},
                {icon: "🤖", text: "Instant AI Recipes"},
                {icon: "🧠", text: "Smart Grocery Lists"},
                {icon: "🌿", text: "Allergy & Diet Friendly"},
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

        // Simplified how-it-works section is embedded later as a short InfoBlock and CTA

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
                { image: "recipe1", title: "Herb Roasted Chicken", description: "Juicy chicken with garlic herb rub and seasonal veg.", buttonText: "View Recipe", buttonLink: "/recipes/herb-roasted-chicken" },
                { image: "recipe2", title: "Quinoa Buddha Bowl", description: "Balanced bowl with grains, veggies, and tahini dressing.", buttonText: "View Recipe", buttonLink: "/recipes/quinoa-buddha" },
                { image: "recipe3", title: "Spicy Chickpea Stew", description: "Comforting stew, rich in flavor and protein.", buttonText: "View Recipe", buttonLink: "/recipes/chickpea-stew" },
            ],
        },

        {
            type: "grid",
            columns: 3,
            gap: "2rem",
            items: [
                {
                    block: {
                        type: "pricing",
                        variant: "basic",
                        title: "AI Plan",
                        price: "€9",
                        tokens: 900,
                        badgeTop: "AI-Generated Plan",
                        description: "Instant meal plan generated by AI based on your preferences.",
                        features: ["Instant course generation", "AI meal adjustments", "Basic tracking"],
                        buttonText: "Try AI Plan",
                        buttonLink: "/checkout?plan=ai",
                    },
                },
                {
                    block: {
                        type: "pricing",
                        variant: "highlight",
                        title: "Chef Plan",
                        price: "€59",
                        tokens: 5900,
                        badgeTop: "Most Popular",
                        description: "Work directly with a professional chef for a fully customized course.",
                        features: ["1-on-1 chef guidance", "Meal plan review and adjustments", "Direct chat with chef", "Priority feedback"],
                        buttonText: "Get Chef Plan",
                        buttonLink: "/checkout?plan=chef",
                    },
                },
                {
                    block: {
                        type: "pricing",
                        variant: "premium",
                        title: "Full Cooking Pack",
                        price: "€99",
                        tokens: 9900,
                        badgeTop: "Complete Meal Experience",
                        description: "Chef guidance + AI nutrition tracking + meal analytics for best results.",
                        features: ["Custom meal plan", "Personalized nutrition plan", "Fast feedback in 2–3 hours", "AI analytics for nutrition", "Priority support"],
                        buttonText: "Choose Full Pack",
                        buttonLink: "/checkout?plan=full",
                    },
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
