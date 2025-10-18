import {media} from "@/resources/media";
import {FaTwitter, FaFacebook, FaLinkedin} from "react-icons/fa";

export const baseURL =
    typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

export const headerContent = {
    logo: {
        src: media.logo.src,
        alt: "Site Logo",
        href: "/"
    },
    links: [
        {label: "About Company", href: "/about-us"},
        {label: "Process", href: "/get-started"},
        {label: "Pricing", href: "/pricing"},
        {label: "Contact", href: "/contact-us"},
        {label: "Faq", href: "/faq"},

    ]
};

export const footerContent = {
    logo: {src: media.logo.src, alt: "Site Logo", href: "/"},
    columns: [
        {
            title: "Navigate",
            links: [
                {label: "About Us", href: "/about-us"},
                {label: "Pricing", href: "/pricing"},
                {label: "Faq", href: "/faq"},
                {label: "Get Started", href: "/get-started"},
            ],
        },
        {
            title: "Legal",
            links: [
                {label: "Terms & Conditions", href: "/terms-and-conditions"},
                {label: "Cookie Policy", href: "/cookie-policy"},
                {label: "Refund Policy", href: "/refund-policy"},
                {label: "Privacy Policy", href: "/privacy-policy"},
            ],
        },
    ],
    contact: {
        email: "info@qellum.co.uk",
        phone: "+44 7457 423001",
        address: "Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF",
    },

    legal: {
        companyName: "PREMIUM SERVICE PROVIDERS LTD",
        companyNumber: "15799659",
        address: "1 Brook St, Nottingham, United Kingdom, NG1 1AR",
    },
    socials: [],
};

