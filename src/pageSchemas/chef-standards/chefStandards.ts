import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const chefStandardsSchema: PageSchema = {
    meta: {
        title: `Chef Standards & Certification Policy – ${COMPANY_NAME}`,
        description: `How ${COMPANY_NAME} selects, verifies, and audits our certified personal chefs and nutritionists. Learn about our culinary standards.`,
        keywords: [
            "chef standards",
            "certified chefs",
            "chef verification",
            "cooking standards",
            "meal quality assurance",
            "personal chef qualifications",
        ],
        canonical: "/chef-standards",
        ogImage: {
            title: `${COMPANY_NAME} – Chef Standards & Certification`,
            description: "How we verify qualifications and maintain culinary excellence.",
            bg: "#1A2F22",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Chef Standards & Certification Policy",
            description: "Effective date: 10 September 2025",
            centerTitle: true,
            centerDescription: true,
        },
        {
            type: "text",
            title: "1. Introduction to Our Chef Network",
            bullets: [
                `${COMPANY_NAME} takes pride in the high caliber of our culinary network. We believe that professional meal planning requires a combination of formal education, practical kitchen experience, and strong nutritional understanding.`,
                "This document explains the criteria we use to vet our chefs, the compliance checks we conduct, and the quality standards chefs must maintain to remain on our platform.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "2. Qualification & Verification Requirements",
            bullets: [
                "🎓 Culinary Arts Degree or equivalent professional culinary diploma from an accredited academy or institution.",
                "📜 Active Food Safety and Hygiene Certification (Level 2 or higher for UK/EU or local equivalent).",
                "👨‍🍳 Minimum of 3 years of experience as a chef in commercial kitchens, private households, or high-end dining establishments.",
                "🩺 Nutritional credentials or sports diet certifications are highly valued and mandatory for specialized dietary plans.",
                "🕵️ Background checks and professional reference verification are completed for all applicants.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "3. Continuous Quality Audits",
            bullets: [
                "Every chef plan is subject to peer review and random quality audits by our senior culinary advisory board.",
                "We monitor user ratings, reviews, and plan update speeds to ensure high satisfaction.",
                "Chefs must complete annual continuing professional development in food allergens, healthy cooking styles, and smart nutrition planning.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "4. Professional Conduct & Ethics",
            bullets: [
                "Chefs must maintain confidentiality regarding user personal data, diets, and communication.",
                "All communication with users must occur within our secure platform and maintain a professional and encouraging tone.",
                "Failure to respect dietary restrictions or allergens is taken seriously and can result in immediate removal from the network.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "5. Contact & Support",
            bullets: [
                `For questions about our culinary standards, or if you are a chef looking to join our network, contact our chef relations team.`,
                `📧 ${COMPANY_EMAIL}`,
                `Company: ${COMPANY_LEGAL_NAME} | No. ${COMPANY_NUMBER}`,
                `Registered at: ${COMPANY_ADDRESS}`,
            ],
            centerTitle: true,
        },
    ],
};

export default chefStandardsSchema;
