import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const chefMatchingSchema: PageSchema = {
    meta: {
        title: `How We Match You With a Chef – ${COMPANY_NAME}`,
        description: `Discover how Qellum matches you with the perfect professional chef based on your health goals, culinary tastes, and diet style.`,
        keywords: [
            "chef matching",
            "personal chef match",
            "how it works",
            "dietary preferences",
            "certified chefs"
        ],
        canonical: "/chef-matching",
        ogImage: {
            title: `${COMPANY_NAME} – Chef Matching Process`,
            description: "Step-by-step guide to how we connect you with expert nutrition chefs.",
            bg: "#1B4332",
            color: "#ffffff"
        }
    },
    blocks: [
        {
            type: "text",
            title: "How We Match You with a Chef",
            description: "Our proprietary matchmaking process ensures you receive culinary advice from the absolute best expert for your goals.",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "1. The Preference Intake",
            bullets: [
                "1.1. When you sign up, we ask about your dietary goals, health conditions, calorie targets, cuisine preferences, and allergies.",
                "1.2. You can also specify your cooking skill level, equipment availability (e.g., slow cooker, air fryer, oven), and budget priorities.",
                "1.3. This profile creates the baseline requirements for matching."
            ],
            centerTitle: true
        },
        {
            type: "text",
            title: "2. The Matching Algorithm & Human Curation",
            bullets: [
                "2.1. Our platform cross-references your profile with our network of over 120 certified chefs.",
                "2.2. We analyze chef certifications, culinary specialties (e.g., vegan/keto, sports nutrition, therapeutic diets), and current load.",
                "2.3. If you purchase a VIP Retainer, our head culinary board manually reviews matches to assign your dedicated 1-on-1 advisor."
            ],
            centerTitle: true
        },
        {
            type: "text",
            title: "3. Direct Communication & Adaptation",
            bullets: [
                "3.1. Once matched, you can open a chat with your chef directly in your dashboard.",
                "3.2. They will review your initial plan, adapt recipe portions, suggest ingredients swaps, and answer any kitchen questions you have.",
                "3.3. You can request a chef swap at any time via support if your dietary direction changes."
            ],
            centerTitle: true
        }
    ]
};

export default chefMatchingSchema;
