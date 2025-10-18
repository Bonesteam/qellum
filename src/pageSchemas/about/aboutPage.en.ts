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
        // 🔹 HERO (centered)
        {
            type: "custom",
            component: "HeroSection",
            title: `Who We Are`,
            highlight: `${COMPANY_NAME}`,
            description: `We’re a community of chefs, nutrition experts, and engineers who believe cooking should be personal, intelligent, and joyful. ${COMPANY_NAME} blends chef creativity and smart technology to deliver meal plans that fit your life and tastes.`,
            image: "image1",
            align: "left",
        },

        // 🔹 OUR STORY (condensed)
        {
            type: "section",
            title: "Our Story",
            description: `Born from chefs who wanted better tools, ${COMPANY_NAME} started as a service connecting professionals with people who needed personalized meal plans. Over time we added AI to speed planning and track preferences — always keeping chefs in the loop.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                image: "aboutStory",
                title: `How ${COMPANY_NAME} Came to Life`,
                description: `Our founders built a platform that combines verified culinary expertise with machine assistance — helping real people cook better and eat healthier.`,
                bullets: [
                    "Created by chefs, for real food lovers",
                    "Designed for long-term healthy habits",
                    "Grounded in culinary craft and empathy",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image2",
                alt: "Company Story",
            },
        },

        // 🔹 BY THE NUMBERS (using InfoBlock for compatibility)
        {
            type: "custom",
            component: "InfoBlock",
            title: "By the Numbers",
            description: "A quick look at what we do and who we serve.",
            bullets: [
                "120+ chefs onboard",
                "30+ countries served",
                "50k+ meal plans created",
                "4.8/5 average rating",
            ],
        },

        // 🔹 MISSION (moved after stats)
        {
            type: "custom",
            component: "MissionBanner",
            title: "Our Mission",
            description: `${COMPANY_NAME} merges chef creativity with smart meal planning tools. We enable chefs to craft tailored plans while AI supports personalization and efficiency. Our goal: make exceptional, sustainable eating accessible to all.`,
            image: "missionBanner",
        },

        // 🔹 CHEFS & PHILOSOPHY
        {
            type: "section",
            title: `The Chefs Behind ${COMPANY_NAME}`,
            description: `Human creativity guides every plan. Our chefs are verified professionals skilled in cuisine, nutrition, and client care. AI supports their work; it never replaces the human touch.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                image: "image1",
                title: "Who Our Chefs Are",
                description: `Chefs on ${COMPANY_NAME} pass verification checks for skill and client care. They design meal plans that are both tasty and practical.`,
                bullets: [
                    "Verified culinary professionals",
                    "Experienced across cuisines and dietary needs",
                    "Focused on practical, delicious plans",
                ],
            },
            right: {
                type: "custom",
                component: "InfoBlock",
                image: "image1",
                title: "Our Culinary Philosophy",
                description: `We treat meal planning as a collaboration: chefs craft, AI recommends, and clients enjoy. The result is sustainable, flavorful, and personalized food.`,
                bullets: [
                    "Plans tailored to tastes, goals and time",
                    "AI analyzes feedback, chefs refine results",
                    "Healthy eating that tastes great",
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

