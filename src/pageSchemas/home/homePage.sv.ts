import {PageSchema} from "@/components/constructor/page-render/types";
import {COMPANY_NAME} from "@/resources/constants";

const schema: PageSchema = {
    meta: {
        title: `${COMPANY_NAME} — Personliga Måltidsplaner med Riktiga Kockar & Smart AI`,
        description: `${COMPANY_NAME} kopplar dig till professionella kockar som skapar helt personliga måltider — stöds av AI för smarta förslag och näringsspårning.`,
        keywords: [
            "personlig kock",
            "anpassad måltidsplan",
            "näringsrådgivare",
            "AI måltidsplanerare",
            "recept",
            "matplan",
            "dietförändring",
            "måltidsleverans",
            "matlagning med experter",
        ],
        canonical: "/",
        ogImage: {
            title: COMPANY_NAME,
            description: `Få din personliga kock & AI-drivna måltidsplan idag.`,
            bg: "#0a2540",
            color: "#ffffff",
        },
    },

    blocks: [
        {
            type: "custom",
            component: "HeroSection",
            title: "Laga Smartare med Expertkockar",
            highlight: "Personlig Kock + Smart AI Assistent",
            description: `Njut av måltider skapade just för dig av certifierade kockar — eller låt AI generera en komplett måltidsplan direkt.  
Oavsett om målet är viktkontroll, muskeluppbyggnad eller balanserad näring — är planen skräddarsydd för dig.`,
            primaryCta: {text: "Starta med Min Kock", link: "/get-started"},
            image: "image1",
            align: "right",
        },

        {
            type: "custom",
            component: "HighlightStrip",
            items: [
                {icon: "👩‍🍳", text: "Personliga Kockmåltider"},
                {icon: "🤖", text: "AI-genererade Recept"},
                {icon: "📊", text: "Närings- & Kaloriuppföljning"},
                {icon: "💬", text: "Direktkontakt med Kock"},
                {icon: "🔥", text: "Skräddarsydda Måltider på Några Timmar"},
            ],
        },

        {
            type: "custom",
            component: "ValuesIcons",
            title: "Varför Välja Qellum Kockar?",
            description: `${COMPANY_NAME} säkerställer att din resa leds av kulinarisk expertis — AI hjälper till, men riktiga kockar leder.`,
            values: [
                {
                    icon: "👨‍🍳",
                    title: "Certifierade Kockar",
                    text: "Alla kockar är utbildade och erfarna inom personlig matlagning och näring.",
                },
                {
                    icon: "🧠",
                    title: "AI-stöd",
                    text: "Vårt AI spårar preferenser, optimerar näring och föreslår receptjusteringar.",
                },
                {
                    icon: "🍽️",
                    title: "Helt Personligt",
                    text: "Planer skapas utifrån kostbehov, preferenser och mål.",
                },
                {
                    icon: "🤝",
                    title: "Support & Motivation",
                    text: "Kockarna ger vägledning och feedback för att hålla din måltidsplan rolig och hållbar.",
                },
            ],
        },

        {
            type: "custom",
            component: "Timeline",
            title: "Hur Det Fungerar",
            steps: [
                {
                    title: "Skapa Ditt Konto",
                    description: "Registrera dig för att få tillgång till din dashboard och måltidsalternativ.",
                },
                {
                    title: "Köp Tokens",
                    description: "Använd tokens för att beställa kockkurser, AI-planer eller extra tjänster.",
                },
                {
                    title: "Fyll i Dina Preferenser",
                    description: "Ange kostbehov, allergier, mål och matlagningsstil.",
                },
                {
                    title: "Kocken Skapar Din Måltidsplan",
                    description: "Inom 2–3 timmar får du en helt skräddarsydd plan från din kock.",
                },
                {
                    title: "Lägg till AI-assistent (valfritt)",
                    description: "AI spårar näring, kaloriintag och föreslår receptjusteringar.",
                },
                {
                    title: "Få Extra Alternativ",
                    description: "Lägg till extra recept, snacks eller specialrätter med dina tokens.",
                },
            ],
        },

        {
            type: "section",
            title: "Vårt Uppdrag — Kulinarisk Expertis Först",
            description: `Vi tror att verklig förändring börjar med mänsklig expertis — att koppla dig till kockar som förstår din smak, mål och näringsbehov.`,
            left: {
                type: "custom",
                component: "InfoBlock",
                title: `Hur ${COMPANY_NAME} Startade`,
                image: "image2",
                description: `${COMPANY_NAME} började som ett nätverk av kockar passionerade om hälsosam, personlig matlagning.  
Vi såg att folk hade svårt med dieter, inkonsekventa recept och generiska planer.  
Så vi byggde en plattform där riktiga kockar skapar kurser med AI-stöd — kombinerar erfarenhet och teknik.`,
                bullets: [
                    "Över 100 certifierade kockar och näringsspecialister",
                    "Vetenskapsbaserade personliga recept",
                    "AI-analys för näringsspårning",
                    "Tusentals nöjda kunder världen över",
                ],
            },
            right: {
                type: "custom",
                component: "StoryTimeline",
                steps: [
                    {
                        year: "2020",
                        title: "Idén Föddes",
                        description: "Kockar ville erbjuda personliga kurser online."
                    },
                    {
                        year: "2021",
                        title: "Kocknätverk",
                        description: "Certifierade kockar från flera länder gick med på plattformen."
                    },
                    {
                        year: "2023",
                        title: "AI-integration",
                        description: "Smart AI-assistent introducerad för att förbättra planeringen."
                    },
                    {
                        year: "2025",
                        title: "Full Måltidscoaching",
                        description: "Kockvägledning + AI-näringsanalys för komplett stöd."
                    },
                ],
            },
        },

        {
            type: "section",
            title: "Möt Våra Kockar",
            description:
                "Våra kockar kombinerar skicklighet, näringskunskap och passion. Varje plan är handgjord och verifierad.",
            left: {
                type: "slider",
                images: ["coach1", "coach2", "coach3", "coach4"],
            },
            right: {
                type: "custom",
                component: "InfoBlock",
                title: "Endast Certifierade Proffs",
                description:
                    "Alla kockar är utbildade, certifierade och erfarna. Du matchas med den bästa experten för din koststil.",
                bullets: [
                    "Certifierade kockar och näringsexperter",
                    "Specialiseringar: viktminskning, muskelbyggnad, hälsosam matlagning",
                    
                ],
            },
        },

        {
            type: "custom",
            component: "MissionBanner",
            title: "Hälsosamma Måltider Gjorda Enkelt",
            description:
                "Kombinera dina preferenser med en personlig plan från kock eller AI. Få recept, inköpslistor och portionsguider skräddarsydda för dig.",
            image: "nutritionBanner",
        },

        {
            type: "custom",
            component: "VideoDemo",
            title: "Se Hur Måltidsplanering Fungerar",
            description:
                "Se hur kockar skapar personliga kurser, granskar näringsdata och visar AI-förslag i praktiken.",
            video: "coachWork",
        },

        {
            type: "grid",
            columns: 4,
            gap: "2rem",
            cards: [
                {
                    type: "pricing",
                    variant: "starter",
                    title: "AI-plan",
                    price: "€9",
                    tokens: 900,
                    badgeTop: "AI-genererad Plan",
                    description:
                        "Omedelbar måltidsplan genererad av AI baserat på dina preferenser.",
                    features: [
                        "Omedelbar kursgenerering",
                        "AI-matlagningsjusteringar",
                        "Grundläggande spårning",
                    ],
                    buttonText: "Testa AI-plan",
                    buttonLink: "/checkout?plan=ai",
                },
                {
                    type: "pricing",
                    variant: "pro",
                    title: "Kockplan",
                    price: "€59",
                    tokens: 5900,
                    badgeTop: "Mest Populär",
                    description:
                        "Arbeta direkt med en professionell kock för en helt anpassad plan.",
                    features: [
                        "1-till-1 kockvägledning",
                        "Granskning och justering av plan",
                        "Direktchat med kock",
                        "Prioriterad feedback",
                    ],
                    buttonText: "Få Kockplan",
                    buttonLink: "/checkout?plan=chef",
                },
                {
                    type: "pricing",
                    variant: "premium",
                    title: "Full Matlagningspaket",
                    price: "€99",
                    tokens: 9900,
                    badgeTop: "Komplett Matupplevelse",
                    description:
                        "Kockvägledning + AI-näringsspårning + matanalys för bästa resultat.",
                    features: [
                        "Anpassad måltidsplan",
                        "Personlig näringsplan",
                        "Snabb feedback på 2–3 timmar",
                        "AI-analys för näring",
                        "Prioriterat stöd",
                    ],
                    buttonText: "Välj Fullt Paket",
                    buttonLink: "/checkout?plan=full",
                },
                {
                    type: "pricing",
                    variant: "custom",
                    title: "Anpassad Plan",
                    price: "dynamic",
                    tokens: 0,
                    badgeTop: "Flexibelt Alternativ",
                    description:
                        "Kombinera tjänster — AI, kock eller näring efter eget val.",
                    features: [
                        "Välj AI eller kockfokus",
                        "Flexibel token-användning",
                        "Betala bara för det du behöver",
                    ],
                    buttonText: "Anpassa Plan",
                    buttonLink: "/checkout?plan=custom",
                },
            ],
        },

        {
            type: "section",
            title: `Gå med i ${COMPANY_NAME}-gemenskapen`,
            description:
                "Dela din matlagningsresa, få tips och fira resultat med tusentals medlemmar.",
            left: {
                type: "custom",
                component: "InfoBlock",
                title: "Måltidsspårare & Socialt Stöd",
                image: "image3",
                description:
                    "Spåra kurser, näring och receptframsteg. Håll dig motiverad med feedback och utmaningar från gemenskapen.",
                bullets: [
                    "Visuell dashboard för måltider & kalorier",
                    "Månatliga matlagningsutmaningar",
                    "Privatchatt med kock",
                    "AI-förslag för ingredienser och portioner",
                ],
            },
            right: {
                type: "card",
                image: "image4",
                title: "Spåra Varje Recept",
                description:
                    "Övervaka dina måltider och näring enkelt — AI-driven, ledd av kockar.",
                buttonText: "Börja Spåra",
                buttonLink: "/profile",
            },
        },

        {
            type: "custom",
            component: "TestimonialsSlider",
            title: "Verkliga Användare. Verkliga Resultat.",
            description:
                "Se hur våra medlemmar förbättrat sin näring och matlagning med kockar och AI-stöd.",
            testimonials: [
                {
                    name: "Anna Rossi",
                    role: "Entreprenör",
                    image: "review1",
                    text: "Min kock skapade en perfekt plan på några timmar. AI-spårning håller mig på målet dagligen!",
                    rating: 5,
                },
                {
                    name: "Liam Carter",
                    role: "Student",
                    image: "review2",
                    text: "AI-planen var bra, men att ha en kock som granskade den gjorde den perfekt.",
                    rating: 5,
                },
                {
                    name: "Sophia Nguyen",
                    role: "Designer",
                    image: "review3",
                    text: "Fullt matlagningspaket förbättrade mina vanor helt — nu mår jag bättre.",
                    rating: 5,
                },
                {
                    name: "Mark Evans",
                    role: "Ingenjör",
                    image: "review4",
                    text: "Kocken anpassade planen efter mina kostbehov. Jag har aldrig mått bättre.",
                    rating: 5,
                },
            ],
        },

        {
            type: "faq",
            image: "image5",
            items: [
                {
                    question: "Varför välja en kock istället för AI?",
                    answer:
                        "AI assisterar automatiskt, men en kock förstår dina preferenser, allergier och smak. De anpassar kurser i realtid.",
                },
                {
                    question: "Kan jag kontakta min kock direkt?",
                    answer:
                        "Ja! Chatta direkt med din kock för råd, receptmodifieringar eller vägledning.",
                },
                {
                    question: "Hur ofta uppdateras min plan?",
                    answer:
                        "Din kock granskar dina kurser på 2–3 timmar och uppdaterar planen vid behov.",
                },
                {
                    question: "Kan jag kombinera AI- och kockplaner senare?",
                    answer:
                        "Absolut. Du kan lägga till AI- eller kockplaner när som helst med dina tokens.",
                },
                {
                    question: "Finns det nybörjarvänliga alternativ?",
                    answer:
                        "Ja, vi anpassar till alla nivåer — från nybörjare till erfarna kockar.",
                },
            ],
        },

        {
            type: "custom",
            component: "MissionBanner",
            title: "Starta Din Kulinariska Resa Idag",
            description:
                `Gå med tusentals som förbättrar sina måltider och näring med ${COMPANY_NAME}. Välj din kock eller AI-plan och börja nu.`,
            image: "ctaBanner",
        },

        {
            type: "custom",
            component: "ContactForm",
            title: "Behöver Hjälp att Välja Plan?",
            description:
                "Vårt supportteam kan guida dig till bästa planen, förklara tokens eller svara på frågor.",
        },
    ],
};

export default schema;
