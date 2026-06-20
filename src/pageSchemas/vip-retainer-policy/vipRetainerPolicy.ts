import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const vipRetainerPolicySchema: PageSchema = {
    meta: {
        title: `VIP Culinary Retainer Policy – ${COMPANY_NAME}`,
        description: `Official terms of service for Qellum VIP Chef Retention and Premium Retainer plans. Learn about scheduling, nutritionist reviews, and chef availability.`,
        keywords: [
            "VIP chef retainer",
            "culinary coaching",
            "premium meal prep",
            "nutritionist audit",
            "private chef online",
            "Qellum VIP",
        ],
        canonical: "/vip-retainer-policy",
        ogImage: {
            title: `${COMPANY_NAME} – VIP Retainer Agreement`,
            description: "Official policy and terms for VIP Elite and Ultimate culinary services.",
            bg: "#111827",
            color: "#ffffff",
        },
    },
    blocks: [
        {
            type: "text",
            title: "VIP Culinary Retainer Agreement",
            description: "Effective date: 10 September 2025",
            centerTitle: true,
            centerDescription: true,
        },
        {
            type: "text",
            title: "1. Scope of VIP Retainer Services",
            bullets: [
                `Qellum offers high-tier personal culinary coaching and nutritionist review retainer services: the VIP Chef Retainer (3 Months) and the Ultimate Culinary Suite (6 Months).`,
                "These plans match active members with a dedicated professional chef and senior nutritionist to customize meals, track macros, and hold personal cooking consultations.",
                "This VIP Retainer Agreement outlines the parameters of chef availability, video booking rules, response times, and refund schedules for these premium packages.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "2. Dedicated Chef Retainer & Availability",
            bullets: [
                "Each VIP member is matched with an executive chef based on their dietary profile and cuisine preferences. This chef remains assigned to the client for the duration of the retainer term.",
                "Direct Messaging: VIP members gain access to a personal messenger channel with their chef. Chefs are available for messaging from Monday through Friday between 9:00 AM and 6:00 PM CET.",
                "Response Times: Chefs will respond to recipes adjustment requests, ingredient swap inquiries, and questions within 12 hours during operational windows, and within 24 hours on weekends.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "3. 1-on-1 Zoom Consultations & Kitchen Audits",
            bullets: [
                "VIP Elite (3 Mo) members are entitled to up to three (3) 60-minute Zoom sessions, and Ultimate VIP (6 Mo) members are entitled to up to six (6) 60-minute sessions.",
                "Zoom sessions can be used for live cooking tutorials, custom recipe reviews, pantry/kitchen audits, or menu strategy planning.",
                "Scheduling: Sessions must be scheduled through the Dashboard Booking Center at least 48 hours in advance.",
                "Cancellations: Members must provide at least 24 hours notice to reschedule or cancel a session. Failure to do so will count the session as completed.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "4. Senior Nutritionist Audits",
            bullets: [
                "Our board-certified senior nutritionists oversee all VIP dietary goals. They conduct monthly laboratory and biomarker alignment audits where applicable.",
                "All custom recipes generated under a VIP retainer receive a certified stamp of approval from the nutrition board, ensuring safety, macro consistency, and caloric targets.",
                "Nutrition plans and reports are issued in high-quality signed PDF format, suitable for medical record tracking.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "5. Retention Fees & Refund Policy",
            bullets: [
                "VIP packages are paid as upfront, one-time retainer fees of €499 (for 3 months) or €999 (for 6 months). They credit the respective tokens to the account.",
                "Cooling-off Period: You may request a full refund of the retainer fee within 14 days of purchase, provided you have not initiated a chef chat or booked a Zoom lesson.",
                "Partial Refunds: After 14 days or after services have commenced, refunds are calculated pro-rata based on the months elapsed, minus a €100 administrative setup and matching fee.",
            ],
            centerTitle: true,
        },
        {
            type: "text",
            title: "6. Support & Escalations",
            bullets: [
                `For VIP billing inquiries, chef matching adjustments, or feedback, our Elite VIP support desk is available to assist you.`,
                `📧 ${COMPANY_EMAIL}`,
                `Company: ${COMPANY_LEGAL_NAME} | No. ${COMPANY_NUMBER}`,
                `Registered at: ${COMPANY_ADDRESS}`,
            ],
            centerTitle: true,
        },
    ],
};

export default vipRetainerPolicySchema;
