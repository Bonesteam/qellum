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
        title: `Terms & Conditions – ${COMPANY_NAME}`,
        description: `Official Terms & Conditions of ${COMPANY_NAME}. Rules for using cooking services, token purchases, AI meal plans, and personal chef requests.`,
        keywords: [
            "terms",
            "terms and conditions",
            "cooking services",
            "tokens",
            "meal plans",
            "refund policy"
        ],
        canonical: "/terms",
        ogImage: {
            title: `${COMPANY_NAME} – Terms & Conditions`,
            description: "Clear and transparent conditions for using Qellum cooking services.",
            bg: "#ffffff",
            color: "#000000"
        }
    },
    blocks: [
        {
            type: "text",
            title: "Terms & Conditions",
            description: "Effective date: 17 October 2025",
            centerTitle: true,
            centerDescription: true
        },
        {
            type: "text",
            title: "1. Introduction",
            bullets: [
                "1.1. These Terms and Conditions (“Terms”) govern access to and use of qellum.co.uk and any related services, applications, and downloadable documents (the “Service”), operated by RISEWYNN LIMITED (company number 15799659, registered office: Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF) (“Qellum,” “we,” “us,” “our”).",
                "1.2. By creating an account, purchasing tokens, or generating any meal plan or PDF through the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.",
                "1.3. If you are using the Service on behalf of a company or organisation, you represent and warrant that you have authority to bind that entity, and “you” shall include that entity."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "2. Definitions",
            bullets: [
                "• Account – your user profile on the Service.",
                "• Tokens – our internal, prepaid digital credits required to access specific features (e.g., generate plans and PDFs). Tokens are not money, electronic money, or a financial instrument.",
                "• Meal Plan / Plan – any personalised or template meal plan, recipe pack, shopping list, menu, nutrition guidance, and any related digital content generated or supplied via the Service.",
                "• Order – a confirmed request to purchase Tokens and/or to redeem Tokens for Services.",
                "• Services – the Qellum platform and features including intake forms, chef-assisted and AI-assisted plan generation, PDF creation, and delivery of digital content.",
                "• Checkout Currency – GBP (£), EUR (€), or USD ($), as selected at checkout."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "3. Eligibility & Account Registration",
            bullets: [
                "3.1. You must be 18 years or older to use the Service.",
                "3.2. You must provide accurate, current information and keep your credentials secure. You are responsible for all activity under your Account.",
                "3.3. Notify us immediately of any suspected unauthorised access or security incident at info@qellum.co.uk."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "4. Tokens",
            bullets: [
                "4.1. Nature. Tokens are a prepayment mechanism to access features. Tokens are non-redeemable for cash, non-transferable (except as we expressly permit), and may not be traded or resold.",
                "4.2. Issuance & Rate. Tokens are issued after successful payment. The current rate is displayed at the time of purchase (for example: 100 Tokens = £1.00 / €1.17 / $1.29). The interface shows the exact number of Tokens you will receive before you pay. Rates may change from time to time and apply prospectively.",
                "4.3. Pricing in Tokens. Features and Plans are priced in Tokens. When a fiat amount is shown, it is an informational conversion based on the then-current rate.",
                "4.4. Redemption. When you confirm a generation, the displayed Token amount is deducted in real time. If a generation fails for technical reasons attributable to us and no content is delivered, the associated Tokens will be automatically returned or manually restored after support review.",
                "4.5. Expiry & Dormant Accounts. Unless stated otherwise in a promotion, Tokens do not expire; however, Accounts with no login or activity for 24 months may be archived. Contact support to reactivate.",
                "4.6. Promotions & Bonuses. Promotional bundles may include bonus Tokens subject to specific terms shown at purchase (e.g., non-refundable, time-limited, or not exchangeable).",
                "4.7. Standard Pricing & Add-ons:",
                "   a) Standard generation price: A standard Meal Plan generation costs 60 Tokens.",
                "   b) What a “standard Meal Plan” includes: Unless otherwise specified on the Generator page at the time of purchase, a standard Plan typically includes:",
                "      • an AI-assisted and/or chef-assisted plan based on your inputs (ingredients, exclusions/allergens, cuisine, goals);",
                "      • a downloadable PDF;",
                "      • a set of recipes appropriate to the selected scope (e.g., daily/weekly plan) as described in the interface;",
                "      • where available, a basic shopping list section.",
                "   c) Add-ons (“Extras”): Optional add-ons are charged in addition to the 60-Token base price. Each add-on has its own Token cost and a clear description (e.g., extended plan length/servings, multiple cuisine variants in one plan, enhanced nutrition/macros, alternative recipes, grocery-list export formats, premium PDF styling, etc.).",
                "   d) Price display: The total Token cost (base + selected add-ons) is displayed before you confirm redemption.",
                "   e) Price changes: We may update Token prices from time to time. The applicable price is the one shown at confirmation."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "5. Ordering, Payment & Checkout",
            bullets: [
                "Accepted payment methods: Visa, Mastercard · Accepted currencies: GBP (£), EUR (€), USD ($)",
                "5.1. Acceptance: All Orders are subject to acceptance. We may refuse or cancel an Order to prevent fraud/abuse, correct obvious errors, comply with law, or address technical issues.",
                "5.2. Payment Methods: By submitting a payment, you confirm you are authorised to use the selected method. We may use third-party payment processors; their terms may apply.",
                "5.3. Currencies, VAT & Taxes: Prices may be shown in GBP/EUR/USD. You may choose your Checkout Currency where available. If your card is billed in another currency, your bank may apply its FX rate and fees. VAT/consumption taxes may apply depending on your billing country; where applicable, we collect/remit taxes and display them at checkout. Invoices/receipts are issued in the Checkout Currency.",
                "5.4. Delivery of Digital Content: Meal Plans and PDFs are delivered electronically (download link and/or email). Generation time may vary depending on inputs, queue, and system load."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "6. Cancellations, Refunds & Consumer Rights",
            bullets: [
                "6.1. Digital Content & Early Supply: When you request immediate generation, you acknowledge that supply of digital content begins immediately and that you may lose the statutory right to cancel once generation has started (Consumer Contracts Regulations).",
                "6.2. Unused Tokens (Cooling-off): If you are a consumer, you may cancel a Token top-up within 14 days of purchase provided no Tokens from that top-up have been spent. Refunds are made to the original payment method in the original currency. If permitted by law and the provider’s rules, non-recoverable payment processing fees may be deducted.",
                "6.3. Used Tokens / Completed Generations: Tokens redeemed for successful generations are non-refundable, except where required by law or where a verified technical failure attributable to us resulted in no usable delivery.",
                "6.4. Defective or Misdescribed Content: If a delivered Plan is corrupted, incomplete, or clearly not as described (e.g., a PDF fails to open), contact info@qellum.co.uk within 14 days with your Order ID. We may repair, replace, re-generate, or refund Tokens/amounts as appropriate under applicable law.",
                "6.5. Chargebacks & Abuse: Filing an unwarranted chargeback may lead to suspension while we investigate. If funds are reversed, we may remove the equivalent Tokens and any generated content from your Account and may request reimbursement of processor fees."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "7. Health, Nutrition & Safety Disclaimer",
            bullets: [
                "7.1. Qellum provides informational meal plans generated by AI and/or curated by chefs based on your inputs. We do not provide medical, nutritional, or dietetic advice.",
                "7.2. Always consult a qualified healthcare professional before making significant dietary changes, particularly if you have medical conditions, allergies, are pregnant/breastfeeding, or take medication.",
                "7.3. You are responsible for verifying ingredients, allergens, and suitability for your circumstances. While we attempt to surface your stated allergens/exclusions, we cannot guarantee that outputs will be free from allergens or errors.",
                "7.4. Ingredient availability, brands, and nutritional values may vary by region and supplier; any nutrition figures are estimates only."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "8. Your Inputs & Acceptable Use",
            bullets: [
                "8.1. You must provide lawful, accurate inputs and must not upload content that is infringing, harmful, defamatory, or violates privacy or third-party rights.",
                "8.2. You must not misuse the Service (including scraping, reverse-engineering, interfering with security, attempting to bypass rate limits, or automating access contrary to our technical controls).",
                "8.3. We may apply rate limits, usage caps, or other security measures to maintain platform integrity and fair use."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "9. Intellectual Property & Licences",
            bullets: [
                "9.1. Platform IP: The Service, software, models, templates, design assets, and site content are owned by Qellum or our licensors and are protected by applicable IP laws.",
                "9.2. Licence to Use Outputs: Upon valid redemption/purchase, we grant you a personal, non-exclusive, non-transferable licence to download and use generated Plans and PDFs for your own household/personal use. Commercial redistribution or resale of outputs is not permitted unless we agree in writing.",
                "9.3. Your Inputs & Feedback: You retain rights in your inputs. You grant us a worldwide, royalty-free licence to use your inputs and non-identifying usage data to operate, secure, and improve the Service. Where we rely on consent for model improvement using your content, we will ask for it and you may withdraw it at any time in your settings.",
                "9.4. Third-Party Content: Any third-party marks or content remain the property of their respective owners."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "10. Warranties & Disclaimers",
            bullets: [
                "10.1. We warrant that we are entitled to provide the Service as described.",
                "10.2. Except as expressly stated, the Service and outputs are provided “as is” and “as available,” without warranties of accuracy, fitness for a particular purpose, merchantability, or uninterrupted availability.",
                "10.3. We do not guarantee any specific dietary, health, or fitness outcome."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "11. Limitation of Liability",
            bullets: [
                "11.1. Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or any liability that cannot be limited by law.",
                "11.2. Subject to 11.1, our total aggregate liability arising out of or in connection with the Service in any 12-month period shall not exceed the total amounts you paid to us for Tokens/Services in that period.",
                "11.3. We shall not be liable for indirect or consequential losses, including loss of profits, business, goodwill, or data, to the maximum extent permitted by law."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "12. Indemnity",
            bullets: [
                "You agree to indemnify and hold harmless Qellum and our officers, employees, and contractors from claims, damages, costs, and expenses arising from your unlawful use of the Service, breach of these Terms, or infringement of third-party rights."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "13. Data Protection & Privacy",
            bullets: [
                "13.1. We process personal data as a controller in line with the UK GDPR and the Data Protection Act 2018, as set out in our Privacy Policy.",
                "13.2. By using the Service, you acknowledge our privacy practices, including—where applicable—international transfers and your rights to access, erase, restrict, or object."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "14. Third-Party Services & Links",
            bullets: [
                "The Service may include links to third-party sites or integrate third-party tools (e.g., payment processors, analytics). We are not responsible for their content or practices. Your use of such services is governed by their terms."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "15. Suspension & Termination",
            bullets: [
                "15.1. We may suspend or terminate access if you breach these Terms, create security/fraud risks, or if required by law.",
                "15.2. On termination, your licence to use the Service and outputs ceases. We may retain minimal records as required by law (e.g., tax, accounting, fraud prevention)."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "16. Changes to the Service or Terms",
            bullets: [
                "16.1. We may update the Service and these Terms to reflect legal, technical, or business changes.",
                "16.2. We will notify you by email and/or an in-product notice for material changes. Continued use after the effective date constitutes acceptance."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "17. Notices",
            bullets: [
                "Formal notices to us: info@qellum.co.uk or postal mail to the registered office. We may provide notices to you via email, in-product messages, or via your Account."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "18. Governing Law & Jurisdiction",
            bullets: [
                "18.1. These Terms are governed by the laws of England and Wales.",
                "18.2. The courts of England and Wales have exclusive jurisdiction, except that consumers resident in Scotland, Northern Ireland, or an EU Member State may bring proceedings in their local courts."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "19. Miscellaneous",
            bullets: [
                "19.1. If any provision is held invalid or unenforceable, the remaining provisions remain in full force.",
                "19.2. No failure or delay to enforce any provision constitutes a waiver.",
                "19.3. You may not assign or transfer your rights without our prior written consent. We may assign to an affiliate or in connection with a merger, acquisition, or asset transfer.",
                "19.4. These Terms (together with policies referenced herein) form the entire agreement between you and Qellum regarding the Service."
            ],
            centerTitle: true,
            centerBullets: true
        },
        {
            type: "text",
            title: "Company Details",
            bullets: [
                `Company: ${COMPANY_LEGAL_NAME}`,
                `Company number: ${COMPANY_NUMBER}`,
                `Registered office: ${COMPANY_ADDRESS}`,
                `Email: ${COMPANY_EMAIL}`
            ],
            centerTitle: true,
            centerBullets: true
        }
    ]
};

export default termsSchema;
