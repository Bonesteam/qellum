import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `About ${COMPANY_NAME} — Our Story & Philosophy`,
        description: `${COMPANY_NAME} is a modern cooking platform that connects people with personal chefs and AI-powered meal planning tools. Learn how we began, what drives us, and how we deliver personalized culinary experiences.`,
        keywords: [
            "about cooking company",
            "our story",
            "personal chef philosophy",
            "AI meal planning",
            "culinary services",
            "nutrition innovation",
        ],
        canonical: "/about-us",
        ogImage: {
            title: `${COMPANY_NAME}`,
            description: "Where culinary expertise meets smart innovation.",
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [
        // 🔹 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: `Who We Are`,
            highlight: `${COMPANY_NAME}`,
            description: `We are a global community of professional chefs, nutrition experts, and developers united by one belief — that cooking should be personal, intelligent, and enjoyable.  
${COMPANY_NAME} was created to make expert-level meal planning accessible to everyone, blending human creativity and AI technology for smarter culinary experiences.`,
            image: "image1",
            align: "left",
        },

        // 🔹 OUR STORY
        {
            type: "section",
            title: "Our Story — From Kitchens to Global Culinary Platform",
            description: `It started as a small group of chefs frustrated by generic meal apps and one-size-fits-all recipes.  
Too many people struggled to plan meals that fit their tastes, dietary needs, or schedules.  
We wanted to bring cooking back to its roots: real chefs creating meals for real people.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                image: "aboutStory",
                title: `How ${COMPANY_NAME} Came to Life`,
                description: `When our founders saw how many people lacked guidance in meal planning, they decided to create a solution combining personal chef expertise with AI.  
The first version of ${COMPANY_NAME} connected certified chefs with users requesting custom meal plans.  
Later, AI-assisted planning was added — not to replace chefs, but to enhance convenience and personalization.`,
                bullets: [
                    "Launched by chefs for people who love real food",
                    "Focused on lasting healthy eating habits, not quick fixes",
                    "Rooted in culinary expertise, empathy, and innovation",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image2",
                alt: "Company Story",
            },
        },

        // 🔹 MISSION
        {
            type: "custom",
            component: "MissionBanner",
            title: "Our Mission",
            description: `${COMPANY_NAME} exists to merge the creativity of chefs with intelligent AI meal planning.  
We empower chefs to deliver personalized meal plans while AI helps track preferences, adjust recipes, and streamline planning.  
Our mission is simple: make exceptional culinary experiences accessible to everyone.`,
            image: "missionBanner",
        },

        // 🔹 CHEFS & PHILOSOPHY
        {
            type: "section",
            title: `The Chefs Behind ${COMPANY_NAME}`,
            description: `Every great meal starts with a human touch.  
Our chefs are certified professionals from around the world — experts not only in cooking but also in nutrition, meal prep, and client engagement.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                image: "image1",
                title: "Who Our Chefs Are",
                description: `Each chef on ${COMPANY_NAME} undergoes strict verification — certifications, experience, and interviews.  
We look for people who understand that cooking is more than recipes — it’s about creativity, taste, and client satisfaction.`,
                bullets: [
                    "Certified culinary professionals",
                    "Experienced in diverse cuisines, nutrition, and dietary restrictions",
                    "Skilled in creating personalized meal plans",
                    "Dedicated to guiding and teaching clients",
                ],
            },
            right: {
                type: "custom",
                component: "InfoBlock",
                image: "image1",
                title: "Our Culinary Philosophy",
                description: `At ${COMPANY_NAME}, cooking is a partnership.  
Our chefs design evolving meal plans that grow with your preferences, health goals, and schedule.  
AI assists by analyzing feedback and optimizing plans, but it’s the chef’s creativity that ensures delicious, satisfying meals.`,
                bullets: [
                    "Every plan is tailored to your tastes, goals, and time",
                    "AI measures and tracks, chefs interpret and refine",
                    "We prioritize healthy, enjoyable meals over fads",
                ],
            },
        },

        // 🔹 VALUES
        {
            type: "custom",
            component: "ValuesIcons",
            title: "Our Core Values",
            description: `We believe cooking should delight, nourish, and educate.`,
            values: [
                {
                    icon: "🍳",
                    title: "Human First",
                    text: "Every feature supports real interaction between clients and chefs.",
                },
                {
                    icon: "📚",
                    title: "Education Over Convenience",
                    text: "We help clients understand ingredients, nutrition, and cooking skills.",
                },
                {
                    icon: "⚙️",
                    title: "Technology With Purpose",
                    text: "AI enhances personalization and convenience, not creativity.",
                },
                {
                    icon: "🔥",
                    title: "Consistency Over Shortcuts",
                    text: "We focus on sustainable meal habits, not one-off trends.",
                },
            ],
        },

        // 🔹 VIDEO SECTION
        {
            type: "custom",
            component: "VideoDemo",
            title: `Inside ${COMPANY_NAME}`,
            description: `Watch how our chefs create custom meals, AI assists with planning, and clients enjoy their personalized culinary experiences.`,
            video: "coachWork",
        },

        // 🔹 FUTURE VISION
        {
            type: "section",
            title: "Our Vision for the Future",
            description: `${COMPANY_NAME} is more than a platform — it’s a movement to redefine how people plan, cook, and enjoy food.  
We aim to combine technology with human expertise to make personalized culinary experiences accessible everywhere.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "What’s Next for Us",
                description: `We’re expanding into holistic meal support — integrating nutrition tracking, AI optimization, and chef-led guidance.  
Soon, every member can have a complete system: a personal chef, an AI meal planner, and educational resources — all designed to improve cooking and nutrition.`,
                bullets: [
                    "Partnering with certified chefs worldwide",
                    "Developing AI tools for nutrition tracking and meal optimization",
                    "Launching culinary education programs for users",
                    "Building community challenges and interactive cooking events",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image1",
                alt: "Future culinary vision",
            },
        },

        // 🔹 FINAL CTA
        {
            type: "custom",
            component: "MissionBanner",
            title: "We’re Redefining Cooking Together",
            description: `At ${COMPANY_NAME}, true culinary mastery comes from the combination of human expertise and intelligent assistance.  
Join us to enjoy delicious, personalized, and sustainable meals every day.`,
            image: "ctaAbout",
        },
    ],
};

export default schema;

