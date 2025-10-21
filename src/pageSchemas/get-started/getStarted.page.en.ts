import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `Get Started — ${COMPANY_NAME}`,
        description: `Learn how to begin your personalized culinary journey with ${COMPANY_NAME}. Connect with chefs, set your meal preferences, and start enjoying your custom meal plan today.`,
        keywords: [
            `${COMPANY_NAME} get started`,
            "personal chef onboarding",
            "AI meal setup",
            "create meal plan",
            "nutrition setup",
            "cooking journey start",
        ],
        canonical: "/get-started",
        ogImage: {
            title: `Get Started with ${COMPANY_NAME}`,
            description: "Personal chef + AI assistant — start cooking smartly today.",
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [
        // 🔹 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: `Get Started with ${COMPANY_NAME}`,
            highlight: "Your Personalized Culinary Journey Begins Here",
            description: `In just a few steps, you’ll connect with a chef, define your taste preferences, and receive a custom meal plan delivered in 2–3 hours.  
Whether you want daily AI-generated recipes or chef-prepared courses — ${COMPANY_NAME} makes cooking simple and enjoyable.`,
            image: "image1",
            align: "right",
        },

        // 🔹 HIGHLIGHT STRIP
        {
            type: "custom",
            component: "HighlightStrip",
            items: [
                { icon: "🍳", text: "Personalized Meal Plans" },
                { icon: "🥗", text: "Optional Nutrition Guidance" },
                { icon: "🤖", text: "AI-Assisted Recipe Suggestions" },
                { icon: "📱", text: "Access Anytime, Anywhere" },
                { icon: "🎯", text: "Delicious Results Quickly" },
            ],
        },

        // 🔹 HOW IT WORKS (Grid)
        {
            type: "grid",
            columns: 2,
            gap: "2rem",
            cards: [
                {
                    image: "team2",
                    title: "1. Create Your Account",
                    description:
                        "Sign up to access your dashboard and connect with a chef or AI meal planner.",
                },
                {
                    image: "image10",
                    title: "2. Share Your Preferences",
                    description:
                        "Tell us about your dietary restrictions, taste preferences, and cooking goals.",
                },
                {
                    image: "image1",
                    title: "3. Choose Your Plan",
                    description:
                        "Select AI-generated recipes, a chef-prepared plan, or a combination of both.",
                },
                {
                    image: "coach3",
                    title: "4. Receive Your Meals",
                    description:
                        "Chef-prepared meals arrive in 2–3 hours, or AI plans are ready instantly in your dashboard.",
                },
                {
                    image: "image8",
                    title: "5. Add Nutrition Guidance",
                    description:
                        "Enhance your plan with nutritionist-approved meal suggestions if desired.",
                },
                {
                    image: "image6",
                    title: "6. Track & Adjust",
                    description:
                        "Use AI tools to log your meals, analyze nutrition, and communicate with your chef for updates.",
                },
            ],
        },

        // 🔹 INFO BLOCK — WHY IT WORKS
        {
            type: "section",
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Built Around Your Taste",
                description: `${COMPANY_NAME} adapts to your culinary preferences and schedule.  
No generic meal plans — every menu is crafted by a chef or AI recommendations that evolve with your feedback.`,
                bullets: [
                    "Customized recipes for your goals",
                    "Direct chat with your chef for suggestions",
                    "Smart AI meal tracking and adjustments",
                ],
                image: "trainerSupport",
            },
            right: {
                type: "custom",
                component: "InfoBlock",
                title: "Backed by Culinary Experts",
                description: `All chefs on ${COMPANY_NAME} are certified professionals with expertise in nutrition and culinary arts.  
Our internal review ensures safe, delicious, and balanced meal plans.`,
                bullets: [
                    "Verified professional certifications",
                    "Experience across dietary needs and cuisines",
                    "Continuous updates on nutrition science",
                ],
                image: "expertTrainers",
            },
        },

        // 🔹 VALUES
        {
            type: "custom",
            component: "ValuesIcons",
            title: `Why ${COMPANY_NAME} Works`,
            description: "A smarter cooking system built on three simple principles.",
            values: [
                {
                    icon: "🧠",
                    title: "Chef + AI Synergy",
                    text: "We combine expert culinary knowledge with AI efficiency for the perfect plan.",
                },
                {
                    icon: "🤝",
                    title: "Accountability & Feedback",
                    text: "Stay on track with chef guidance, weekly adjustments, and AI insights.",
                },
                {
                    icon: "📈",
                    title: "Adaptive Meal Plans",
                    text: "Your menu evolves automatically based on your feedback and preferences.",
                },
            ],
        },

        // 🔹 VIDEO
        {
            type: "custom",
            component: "VideoDemo",
            title: "See How Easy It Is to Get Started",
            description:
                "Watch how users connect with chefs, set up their meal preferences, and start enjoying meals — all within minutes.",
            video: "fitPlannerDemo",
        },

        // 🔹 CTA SECTION
        {
            type: "section",
            align: "center",
            left: {
                type: "text",
                title: "Start Your Culinary Journey Today",
                description: `Create your free account, pick a chef or AI plan, and receive your first meal plan in just hours.  
Flexible plans let you choose the level of personal guidance you want.`,
                centerTitle: true,
                centerDescription: true,
            },
        },

        // 🔹 FAQ
        {
            type: "faq",
            items: [
                {
                    question: "Do I need to cook anything myself?",
                    answer:
                        "No. You can opt for AI meal suggestions, chef-prepared meals, or a mix of both according to your preference.",
                },
                {
                    question: "Can I change my chef or AI plan later?",
                    answer:
                        "Yes. Plans are flexible — switch chefs, AI guidance, or combine options anytime using your tokens.",
                },
                {
                    question: "How fast will I receive my meal plan?",
                    answer:
                        "Chef-prepared plans are delivered within 2–3 hours. AI-generated plans are ready instantly in your dashboard.",
                },
                {
                    question: "What if I only want AI meal planning?",
                    answer:
                        "You can start with AI plans and upgrade to chef-prepared meals anytime for a fully personalized experience.",
                },
            ],
        },
    ],
};

export default schema;
