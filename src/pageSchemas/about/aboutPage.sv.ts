import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `Om ${COMPANY_NAME} — Vår Historia & Filosofi`,
        description: `${COMPANY_NAME} är en modern matlagningsplattform som kopplar människor till personliga kockar och AI-drivna måltidsplaneringsverktyg. Lär dig hur vi började, vad som driver oss och hur vi levererar personliga kulinariska upplevelser.`,
        keywords: [
            "om matlagningsföretag",
            "vår historia",
            "personlig kock filosofi",
            "AI måltidsplanering",
            "kulinariska tjänster",
            "näringsinnovation",
        ],
        canonical: "/about-us",
        ogImage: {
            title: `${COMPANY_NAME}`,
            description: "Där kulinarisk expertis möter smart innovation.",
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [
        // 🔹 HERO
        {
            type: "custom",
            component: "HeroSection",
            title: `Vem vi är`,
            highlight: `${COMPANY_NAME}`,
            description: `Vi är ett globalt community av professionella kockar, näringsexperter och utvecklare som delar en tro — att matlagning ska vara personlig, intelligent och rolig.  
${COMPANY_NAME} skapades för att göra expertmåltidsplanering tillgänglig för alla, genom att kombinera mänsklig kreativitet med AI-teknik för smartare kulinariska upplevelser.`,
            image: "image1",
            align: "left",
        },

        // 🔹 OUR STORY
        {
            type: "section",
            title: "Vår Historia — Från Köken till Global Matlagningsplattform",
            description: `Allt började som en liten grupp kockar frustrerade över generiska matappar och standardrecept.  
Alltför många hade svårt att planera måltider som passade deras smak, kostbehov eller schema.  
Vi ville återföra matlagning till dess grund: riktiga kockar som skapar måltider för riktiga människor.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                image: "aboutStory",
                title: `Hur ${COMPANY_NAME} Uppstod`,
                description: `När våra grundare såg hur många saknade vägledning i måltidsplanering, bestämde de sig för att skapa en lösning som kombinerar personlig kockkompetens med AI.  
Den första versionen av ${COMPANY_NAME} kopplade certifierade kockar till användare som önskade skräddarsydda måltidsplaner.  
Senare lades AI-stöd till för planering — inte för att ersätta kockar, utan för att öka bekvämlighet och personalisering.`,
                bullets: [
                    "Lanserad av kockar för människor som älskar riktig mat",
                    "Fokuserad på långsiktiga hälsosamma matvanor, inte snabba lösningar",
                    "Grundad på kulinarisk expertis, empati och innovation",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image2",
                alt: "Företagshistoria",
            },
        },

        // 🔹 MISSION
        {
            type: "custom",
            component: "MissionBanner",
            title: "Vår Mission",
            description: `${COMPANY_NAME} existerar för att förena kockars kreativitet med intelligent AI-måltidsplanering.  
Vi ger kockar möjlighet att leverera personliga måltidsplaner medan AI hjälper till att spåra preferenser, justera recept och effektivisera planeringen.  
Vår mission är enkel: göra exceptionella kulinariska upplevelser tillgängliga för alla.`,
            image: "missionBanner",
        },

        // 🔹 CHEFS & PHILOSOPHY
        {
            type: "section",
            title: `Kockarna bakom ${COMPANY_NAME}`,
            description: `Varje fantastisk måltid börjar med en mänsklig touch.  
Våra kockar är certifierade proffs från hela världen — experter inte bara i matlagning utan även i näring, måltidsförberedelse och kundengagemang.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                image: "image1",
                title: "Vilka våra kockar är",
                description: `Varje kock på ${COMPANY_NAME} genomgår strikt verifiering — certifikat, erfarenhet och intervjuer.  
Vi söker personer som förstår att matlagning handlar om mer än recept — det handlar om kreativitet, smak och kundnöjdhet.`,
                bullets: [
                    "Certifierade kulinariska proffs",
                    "Erfarna inom olika kök, näring och kostbegränsningar",
                    "Skickliga på att skapa personliga måltidsplaner",
                    "Engagerade i att vägleda och undervisa kunder",
                ],
            },
            right: {
                type: "custom",
                component: "InfoBlock",
                image: "image1",
                title: "Vår Kulinariska Filosofi",
                description: `På ${COMPANY_NAME} är matlagning ett partnerskap.  
Våra kockar skapar utvecklande måltidsplaner som anpassas efter dina preferenser, hälsomål och schema.  
AI assisterar genom att analysera feedback och optimera planerna, men det är kockens kreativitet som säkerställer utsökta och tillfredsställande måltider.`,
                bullets: [
                    "Varje plan är skräddarsydd efter dina smaker, mål och tid",
                    "AI mäter och spårar, kockar tolkar och finjusterar",
                    "Vi prioriterar hälsosamma, njutbara måltider framför trender",
                ],
            },
        },

        // 🔹 VALUES
        {
            type: "custom",
            component: "ValuesIcons",
            title: "Våra Kärnvärden",
            description: `Vi tror att matlagning ska glädja, ge näring och utbilda.`,
            values: [
                {
                    icon: "🍳",
                    title: "Människor Först",
                    text: "Varje funktion stöder verklig interaktion mellan kunder och kockar.",
                },
                {
                    icon: "📚",
                    title: "Utbildning Över Bekvämlighet",
                    text: "Vi hjälper kunder att förstå ingredienser, näring och matlagningsfärdigheter.",
                },
                {
                    icon: "⚙️",
                    title: "Teknik Med Syfte",
                    text: "AI förbättrar personalisering och bekvämlighet, inte kreativitet.",
                },
                {
                    icon: "🔥",
                    title: "Konsekvens Över Snabba Lösningar",
                    text: "Vi fokuserar på hållbara matvanor, inte engångstrender.",
                },
            ],
        },

        // 🔹 VIDEO SECTION
        {
            type: "custom",
            component: "VideoDemo",
            title: `Inuti ${COMPANY_NAME}`,
            description: `Se hur våra kockar skapar skräddarsydda måltider, AI assisterar med planering, och kunder njuter av sina personliga kulinariska upplevelser.`,
            video: "coachWork",
        },

        // 🔹 FUTURE VISION
        {
            type: "section",
            title: "Vår Vision för Framtiden",
            description: `${COMPANY_NAME} är mer än en plattform — det är en rörelse för att omdefiniera hur människor planerar, lagar och njuter av mat.  
Vi vill kombinera teknik med mänsklig expertis för att göra personliga kulinariska upplevelser tillgängliga överallt.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Vad som Kommer Nästa",
                description: `Vi expanderar till holistiskt måltidsstöd — integrerar näringsspårning, AI-optimering och kockledd vägledning.  
Snart kan varje medlem ha ett komplett system: en personlig kock, en AI-måltidsplanerare och utbildningsresurser — allt designat för att förbättra matlagning och näring.`,
                bullets: [
                    "Samarbeta med certifierade kockar världen över",
                    "Utveckla AI-verktyg för näringsspårning och måltidsoptimering",
                    "Lansera kulinariska utbildningsprogram för användare",
                    "Bygga gemenskapsutmaningar och interaktiva matlagningsaktiviteter",
                ],
            },
            right: {
                type: "media",
                mediaType: "image",
                src: "image1",
                alt: "Framtida kulinarisk vision",
            },
        },

        // 🔹 FINAL CTA
        {
            type: "custom",
            component: "MissionBanner",
            title: "Vi Omdefinierar Matlagning Tillsammans",
            description: `På ${COMPANY_NAME} kommer verklig kulinarisk skicklighet från kombinationen av mänsklig expertis och intelligent assistans.  
Gå med oss för att njuta av utsökta, personliga och hållbara måltider varje dag.`,
            image: "ctaAbout",
        },
    ],
};

export default schema;
