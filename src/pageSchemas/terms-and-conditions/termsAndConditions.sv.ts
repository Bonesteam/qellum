import { PageSchema } from "@/components/constructor/page-render/types";
import {
    COMPANY_NAME,
    COMPANY_LEGAL_NAME,
    COMPANY_NUMBER,
    COMPANY_ADDRESS,
    COMPANY_EMAIL,
} from "@/resources/constants";

const termsSchema: PageSchema = {
    meta: {
        title: `Villkor – ${COMPANY_NAME}`,
        description: `Officiella villkor för ${COMPANY_NAME}. Regler för användning av matlagningsservice, köp av tokens, AI-måltidsplaner och personliga kockförfrågningar.`,
        keywords: [
            "villkor",
            "användarvillkor",
            "matlagningsservice",
            "tokens",
            "måltidsplaner",
            "återbetalningspolicy",
        ],
        canonical: "/terms",
        ogImage: {
            title: `${COMPANY_NAME} – Villkor`,
            description: "Tydliga och transparenta villkor för användning av Qellum matlagningsservice.",
            bg: "#ffffff",
            color: "#000000",
        },
    },
    blocks: [
        {
            type: "text",
            title: "Villkor",
            description: "Ikraftträdandedatum: 17 oktober 2025",
        },
        {
            type: "text",
            title: "1. Allmänna bestämmelser",
            description: `1.1. Dessa villkor anger reglerna för användning av ${COMPANY_NAME}, en plattform som erbjuder AI-genererade måltidsplaner och personliga kocktjänster, drivs av ${COMPANY_LEGAL_NAME} (Organisationsnummer ${COMPANY_NUMBER}), registrerad på ${COMPANY_ADDRESS}.\n\n1.2. Genom att använda våra tjänster eller köpa tokens godkänner du dessa villkor. Om du inte godkänner dem, vänligen använd inte plattformen.`,
        },
        {
            type: "text",
            title: "2. Definitioner",
            bullets: [
                "”Tjänster” — AI-måltidsplaner, kocktillagade måltider och relaterade verktyg på Qellum.",
                "”Personlig kockförfrågan” — en skräddarsydd måltidsplan skapad av en certifierad kock, levererad inom 2–3 timmar.",
                "”AI-måltidsplan” — en måltidsplan automatiskt genererad baserat på dina kostmål, preferenser och schema.",
                "”Kund” eller ”Du” — användare av Qellum-tjänster eller köpare av tokens.",
                "”Tokens” — interna krediter som används för att betala för tjänster (1 GBP = 100 tokens).",
            ],
        },
        {
            type: "text",
            title: "3. Konto-registrering",
            description: `3.1. Du måste vara minst 18 år för att använda våra tjänster.\n\n3.2. Ange korrekt information vid registrering och håll den uppdaterad.\n\n3.3. Du ansvarar för dina kontouppgifter och alla åtgärder som utförs under ditt konto.`,
        },
        {
            type: "text",
            title: "4. Tokens och betalningar",
            description: `4.1. Tokens köps i GBP eller EUR. Alla omräkningar beräknas från GBP.\n\n4.2. Tokens kan användas för AI-måltidsplaner, personliga kockförfrågningar, premiumrecept eller andra betalda funktioner.\n\n4.3. Det finns 4 tokenpaket: tre fasta belopp och ett anpassat belopp valt av användaren.\n\n4.4. Betalningar måste göras via de metoder som anges på webbplatsen. Tjänster är tillgängliga efter betalningsbekräftelse.`,
        },
        {
            type: "text",
            title: "5. Leverans av tjänster",
            description: `5.1. AI-måltidsplaner levereras omedelbart efter token-avdrag.\n\n5.2. Personliga kockförfrågningar levereras inom 2–3 timmar efter inskick.\n\n5.3. Du ansvarar för att granska måltidsplaner vid leverans och rapportera problem omedelbart.`,
        },
        {
            type: "text",
            title: "6. Avbokningar och återbetalningar",
            description: `6.1. Tokenköp kan avbokas innan de används; återbetalningar exkluderar betalningsleverantörsavgifter.\n\n6.2. Tokens som används för tjänster återbetalas inte.\n\n6.3. Vid betydande tekniska fel kan kompensation ges enligt vår återbetalningspolicy.`,
        },
        {
            type: "text",
            title: "7. Immateriella rättigheter",
            description: `7.1. Alla måltidsplaner, recept och relaterat innehåll som genereras för dig tillhör dig efter leverans.\n\n7.2. Qellum behåller rättigheter till plattformsprogramvara, AI-modeller och systeminnehåll.\n\n7.3. Användare får inte vidarebefordra plattforms-genererat innehåll för kommersiellt bruk utan tillstånd.`,
        },
        {
            type: "text",
            title: "8. Sekretess och databehandling",
            description: `8.1. Alla personliga och kostrelaterade uppgifter hanteras enligt vår sekretesspolicy och GDPR.\n\n8.2. Data som laddas upp för tjänstgenerering kan temporärt lagras för teknisk support och raderas därefter om inte lagkrav kräver annan lagring.`,
        },
        {
            type: "text",
            title: "9. Garantier och ansvarsfriskrivning",
            description: `9.1. Tjänsterna tillhandahålls med rimlig omsorg.\n\n9.2. Vi garanterar inte specifika resultat i kost, viktförändringar eller hälsa. Rådgör alltid med medicinsk professionell vid behov.`,
        },
        {
            type: "text",
            title: "10. Ansvarsbegränsning",
            description: `10.1. Qellum ansvarar inte för indirekta eller följdskador.\n\n10.2. Totalt ansvar är begränsat till det belopp som betalats för det tokenpaket som användes för den specifika tjänsten.`,
        },
        {
            type: "text",
            title: "11. Skadestånd",
            description: `Du samtycker till att hålla Qellum skadeslös från eventuella krav eller skador som uppstår från:\n(a) brott mot dessa villkor;\n(b) missbruk av tredjepartsdata;\n(c) missbruk av levererade måltidsplaner eller recept.`,
        },
        {
            type: "text",
            title: "12. Tredjepartslänkar",
            description: "Vår plattform kan innehålla länkar till tredjepartswebbplatser. Vi ansvarar inte för deras innehåll eller tillgänglighet.",
        },
        {
            type: "text",
            title: "13. Avstängning och uppsägning",
            description: `13.1. Konton kan stängas av eller avslutas vid brott mot villkor, bedräglig aktivitet eller säkerhetsrisker.\n\n13.2. Uppsägning befriar inte från åtaganden som uppstått innan uppsägningen.`,
        },
        {
            type: "text",
            title: "14. Ändringar av villkor",
            description: "Vi kan uppdatera dessa villkor. Fortsatt användning efter uppdateringar utgör godkännande.",
        },
        {
            type: "text",
            title: "15. Meddelanden",
            bullets: [
                `📧 ${COMPANY_EMAIL}`,
                `📍 ${COMPANY_ADDRESS}`,
            ],
        },
        {
            type: "text",
            title: "16. Tillämplig lag",
            description: "Dessa villkor styrs av lagarna i England och Wales. Tvister löses i engelska domstolar om inte tvingande konsumentlagar gäller.",
        },
        {
            type: "text",
            title: "17. Övrigt",
            description: `17.1. Ogiltiga bestämmelser påverkar inte de återstående villkoren.\n\n17.2. Underlåtenhet att upprätthålla rättigheter är ingen avsägelse.\n\n17.3. Dessa villkor utgör hela avtalet angående användning av plattformen.`,
        },
        {
            type: "text",
            title: "Företagsuppgifter",
            bullets: [
                `Företag: ${COMPANY_LEGAL_NAME}`,
                `Organisationsnummer: ${COMPANY_NUMBER}`,
                `Registrerad adress: ${COMPANY_ADDRESS}`,
                `E-post: ${COMPANY_EMAIL}`,
            ],
        },
    ],
};

export default termsSchema;
