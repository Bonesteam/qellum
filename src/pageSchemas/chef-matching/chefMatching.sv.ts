import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const chefMatchingSchema: PageSchema = {
    meta: {
        title: `Hur vi matchar dig med en kock – ${COMPANY_NAME}`,
        description: `Upptäck hur Qellum matchar dig med den perfekta professionella kocken baserat på dina hälsomål, kulinariska smaker och koststil.`,
        keywords: [
            "kockmatchning",
            "personlig kockmatchning",
            "hur det fungerar",
            "kostpreferenser",
            "certifierade kockar"
        ],
        canonical: "/chef-matching",
        ogImage: {
            title: `${COMPANY_NAME} – Kockmatchningsprocess`,
            description: "Steg-för-steg-guide till hur vi kopplar ihop dig med expertkockar inom näring.",
            bg: "#1B4332",
            color: "#ffffff"
        }
    },
    blocks: [
        {
            type: "text",
            title: "Hur vi matchar dig med en kock",
            description: "Vår unika matchningsprocess säkerställer att du får kulinarisk rådgivning från den absolut bästa experten för dina mål.",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "1. Kartläggning av preferenser",
            bullets: [
                "1.1. När du registrerar dig frågar vi om dina kostmål, hälsotillstånd, kalorimål, kökspreferenser och allergier.",
                "1.2. Du kan också ange din matlagningskunskap, tillgänglig utrustning (t.ex. slow cooker, airfryer, ugn) och budgetprioriteringar.",
                "1.3. Denna profil skapar basen för matchningen."
            ],
            centerTitle: true
        },
        {
            type: "text",
            title: "2. Matchningsalgoritm och manuell granskning",
            bullets: [
                "2.1. Vår plattform matchar din profil med vårt nätverk av över 120 certifierade kockar.",
                "2.2. Vi analyserar kockarnas certifieringar, kulinariska specialiteter (t.ex. vegansk/keto, idrottsnutrition, terapeutiska dieter) och aktuell arbetsbelastning.",
                "2.3. Om du köper en VIP Retainer granskar vår kulinariska nämnd matchningarna manuellt för att tilldela din dedikerade 1-till-1-rådgivare."
            ],
            centerTitle: true
        },
        {
            type: "text",
            title: "3. Direktkommunikation och anpassning",
            bullets: [
                "3.1. När du har matchats kan du öppna en chatt med din kock direkt i din dashboard.",
                "3.2. De kommer att granska din första plan, anpassa receptportioner, föreslå ingrediensbyten och svara på alla köksfrågor du har.",
                "3.3. Du kan begära att byta kock när som helst via supporten om din kostinriktning förändras."
            ],
            centerTitle: true
        }
    ]
};

export default chefMatchingSchema;
