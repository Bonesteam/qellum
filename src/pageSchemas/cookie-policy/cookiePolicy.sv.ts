import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const cookiePolicySv: PageSchema = {
    meta: {
        title: `Cookies Policy – ${COMPANY_NAME}`,
        description: `Cookies Policy för ${COMPANY_NAME}: hur vi använder cookies för AI-kock, personliga måltidsplaner, tokens, analys, marknadsföring och användarsamtycke.`,
        keywords: [
            "cookies policy",
            "matlagningsplattform",
            "tokens",
            "AI-kock",
            "måltidsplan",
            "GDPR",
            "samtycke",
            "spårning",
        ],
        canonical: "/cookies-policy-sv",
        ogImage: {
            title: `${COMPANY_NAME} – Cookies Policy`,
            description: "Tydliga och transparenta cookiesrutiner för AI-kock och måltidsplanstjänster.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Cookies Policy",
            description: "Ikraftträdandedatum: 10 September 2025",
        },
        {
            type: "text",
            title: "1. Översikt",
            description: `Denna Cookies Policy förklarar hur ${COMPANY_NAME}, som drivs av ${COMPANY_LEGAL_NAME} (Org.nr ${COMPANY_NUMBER}, registrerat kontor: ${COMPANY_ADDRESS}), använder cookies och liknande tekniker (localStorage, sessionStorage, pixlar och identifierare) på vår plattform, inklusive AI-genererade måltidsplaner, personliga kocktjänster och tokenhantering. Denna policy kompletterar vår Integritetspolicy. Genom att fortsätta använda plattformen eller interagera med cookie-bannern godkänner du eller hanterar icke-nödvändiga cookies enligt beskrivningen nedan.`
        },
        {
            type: "text",
            title: "2. Vad är cookies?",
            description: "Cookies är små textfiler eller webbläsarposter som sparas på din enhet. De hjälper oss att hantera inloggning, komma ihåg dina måltidspreferenser, spåra tokenanvändning, mäta AI/kock-tjänsternas prestanda och — med ditt samtycke — aktivera analys och marknadsföring."
        },
        {
            type: "text",
            title: "3. Kategorier av cookies vi använder",
            description: "Vi använder cookies för tydligt definierade ändamål relaterade till våra matlagnings- och AI-tjänster:",
            bullets: [
                "Nödvändiga / Essentiella — krävs för kärnfunktioner (inloggning, säkerhet, tokenbalans, dashboard). Kräver inget samtycke.",
                "Funktionella — sparar användarinställningar som språk, dashboard-layout och måltidspreferenser.",
                "Prestanda / Analys — mäter användning av AI-måltidsplaner, kockförfrågningar, orderhistorik och plattformsstabilitet. Kan baseras på berättigade intressen eller samtycke.",
                "Marknadsföring / Reklam — aktiveras med samtycke för att spåra kampanjer, remarketing och personliga erbjudanden för recept, måltidsplaner eller tokenpaket.",
                "Säkerhet / Anti-missbruk — hjälper till att upptäcka bedrägeri, missbruk, bots eller obehörig tokenanvändning."
            ]
        },
        {
            type: "text",
            title: "4. Exempel på typiska cookies",
            description: "Cookie-namn, livslängd och leverantör kan ändras. Aktuell information finns alltid i cookie-inställningarna på plattformen. Exempel:",
            bullets: [
                "session_id — Håller dig inloggad och hanterar sessioner • Essentiell • Livslängd: Session",
                "csrf_token — Säkerhet för transaktioner och AI/kock-förfrågningar • Essentiell • Livslängd: Session",
                "cookie_consent — Sparar dina cookie-inställningar • Funktionell • Livslängd: 6–12 månader",
                "ui_prefs — Sparar språk, dashboard-layout och filter för måltidsplaner • Funktionell • Livslängd: ~6 månader",
                "_ga, _gid — Analys av plattformsanvändning och AI/kock-prestanda • Prestanda/Analys • Livslängd: 1–24 månader",
                "promo_tracking — Spårar tokenkampanjer och marknadsföringskampanjer • Marknadsföring • Livslängd: 30–90 dagar"
            ]
        },
        {
            type: "text",
            title: "5. Samtycke och rättslig grund",
            bullets: [
                "Essentiella cookies används utan samtycke, då de krävs för plattformens funktion.",
                "Icke-essentiella cookies (funktionella, analys, marknadsföring) aktiveras endast efter ditt samtycke via cookie-bannern eller inställningspanelen.",
                "Rättsliga grunder inkluderar avtalsuppfyllnad (leverans av tjänster), samtycke och berättigade intressen (säkerhet, bedrägeriförebyggande, förbättring av tjänster)."
            ]
        },
        {
            type: "text",
            title: "6. Registrering och lagring av samtycke",
            description: "När du ger cookie-samtycke loggar vi version av bannern, tidsstämpel, IP-adress och webbläsar-/enhetsinformation. Samtyckesposter sparas minst 24 månader och upp till 6 år om det krävs för tvister, bokföring eller företagsbehov."
        },
        {
            type: "text",
            title: "7. Tredje parter och internationella överföringar",
            description: `Vi samarbetar med tredjepartsleverantörer (betalningsprocessorer, hosting/cloud-plattformar, analys, marknadsföring, kundsupport) som kan placera cookies. Vissa leverantörer finns utanför UK/EEA. I sådana fall förlitar vi oss på skyddsåtgärder som UK adequacy regulations eller Standard Contractual Clauses. Aktuella leverantörer finns listade i cookie-inställningarna.`
        },
        {
            type: "text",
            title: "8. Hantera eller återkalla samtycke",
            bullets: [
                "Använd cookie-bannern eller inställningspanelen för att acceptera, neka eller anpassa icke-essentiella cookies.",
                "Du kan återkalla eller ändra samtycke när som helst via cookie-inställningslänken i sidfoten.",
                "Cookies kan även hanteras direkt i webbläsaren eller via privat/incognito-läge.",
                "Att inaktivera vissa cookies kan minska funktionalitet (automatisk inloggning, sparade preferenser, AI/kock-spårning eller dashboardhistorik)."
            ]
        },
        {
            type: "text",
            title: "9. Uppdateringar av denna policy",
            description: "Vi kan uppdatera denna Cookies Policy om nya verktyg, tjänster eller tekniker införs. Betydande ändringar meddelas via webbplatsen eller e-post. Ikraftträdandedatum uppdateras alltid."
        },
        {
            type: "text",
            title: "10. Kontakt",
            bullets: [
                `📧 ${COMPANY_EMAIL}`,
                `🏢 ${COMPANY_LEGAL_NAME}`,
                COMPANY_ADDRESS ?? "Adress ej angiven"
            ]
        }
    ]
};

export default cookiePolicySv;

