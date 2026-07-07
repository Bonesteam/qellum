import { PageSchema } from "@/components/constructor/page-render/types";
import { COMPANY_NAME } from "@/resources/constants";

const mealPhilosophySchema: PageSchema = {
    meta: {
        title: `Kulinarisk Filosofi – ${COMPANY_NAME}`,
        description: `Lär dig om Qellums grundläggande närings- och kulinariska värderingar. Hur vi kombinerar kockkompetens med smart teknik för balanserade och hållbara måltidsplaner.`,
        keywords: [
            "kulinarisk filosofi",
            "måltidsfilosofi",
            "hälsosam kost",
            "hållbar näring",
            "naturlig mat",
            "kockkompetens"
        ],
        canonical: "/meal-philosophy",
        ogImage: {
            title: `${COMPANY_NAME} – Kulinarisk Filosofi`,
            description: "Hur vi balanserar kulinarisk konst och näringsvetenskap.",
            bg: "#1B4332",
            color: "#ffffff"
        }
    },
    blocks: [
        {
            type: "text",
            title: "Vår Kulinariska & Måltidsfilosofi",
            description: "Hur Qellum balanserar kulinarisk konst, näringsvetenskap och smart teknik.",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "1. Riktig Mat Först",
            bullets: [
                "1.1. Vi tror på kraften hos naturliga, oprocessade råvaror. En hållbar kost bygger på riktig mat, inte syntetiska shakes eller restriktiva piller.",
                "1.2. Våra kockar fokuserar på högkvalitativa proteiner, hälsosamma fetter och näringstäta komplexa kolhydrater för att säkerställa att du håller dig mätt och energisk.",
                "1.3. Vi minimerar raffinerat socker, överdrivet natrium och industriella fröoljor i alla rekommenderade recept."
            ],
            centerTitle: true
        },
        {
            type: "text",
            title: "2. Fördelen med Kockledda Planer",
            bullets: [
                "2.1. Även om AI är fantastiskt för snabbhet saknar det mänsklig känsla. Mat är en sensorisk upplevelse — det måste dofta, se ut och smaka fantastiskt.",
                "2.2. En certifierad kock förstår hur ingredienser samspelar, hur kryddor lyfter en rätt utan att lägga till kalorier och hur man gör hälsosam mat spännande.",
                "2.3. Genom att kombinera mänsklig kulinarisk intuition med smarta mätvärden skapar vi planer som är både kockverifierade och näringsmässigt exakta."
            ],
            centerTitle: true
        },
        {
            type: "text",
            title: "3. Hållbarhet framför Restriktioner",
            bullets: [
                "3.1. Extrema dieter misslyckas eftersom de är svåra att upprätthålla. Vår filosofi fokuserar på balans, flexibilitet och portionskontroll.",
                "3.2. Vi uppmuntrar till medveten ätande och att bygga långsiktiga matlagningsvanor snarare än kortsiktig kalorihungring.",
                "3.3. Varje plan är anpassningsbar efter individuella behov, livsstil och hektiska scheman."
            ],
            centerTitle: true
        }
    ]
};

export default mealPhilosophySchema;
