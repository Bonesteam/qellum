"use client";

import React, { useEffect, useState } from "react";
import { headerContent } from "@/resources/content";
import styles from "./Header.module.scss";
import { IconButton } from "@mui/material";
import { FaBars, FaInstagram, FaPinterestP } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import AuthButtons from "@/components/widgets/auth-buttons/AuthButtons";
import { headerStyles } from "@/resources/styles-config";
import DrawerMenu from "@/components/ui/drawer/Drawer";
import { useCurrency, Currency } from "@/context/CurrencyContext";
import { useI18n, LangCode } from "@/context/i18nContext";
import { motion } from "framer-motion";

const Header: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const user = useUser();
    const { currency, setCurrency } = useCurrency();
    const { lang, setLang } = useI18n();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // динамічні стилі при скролі
    const scrolledStyle: React.CSSProperties = {};
    if (isScrolled && headerStyles.type !== "default") {
        switch (headerStyles.scrollMode) {
            case "solid":
                scrolledStyle.backgroundColor = headerStyles.scrollBackground;
                break;
            case "blur":
                scrolledStyle.backdropFilter = `blur(${headerStyles.scrollBlur})`;
                scrolledStyle.backgroundColor = "rgba(255,255,255,0.05)";
                break;
        }
    }

    return (
        <>
            <motion.header
                className={[
                    headerStyles.type === "sticky" && styles.sticky,
                    isScrolled ? styles.scrolled : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                style={scrolledStyle}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className={styles.headerInner}>
                    {/* Ліва частина — логотип */}
                    <a href={headerContent.logo.href} className={styles.logo}>
                        <Image
                            width={200}
                            height={60}
                            src={headerContent.logo.src}
                            alt={headerContent.logo.alt}
                        />
                    </a>

                    {/* Центр — навігація */}
                    <nav className={styles.nav}>
                        {headerContent.links.map((link) => (
                            <a key={link.label} href={link.href} className={styles.link}>
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Права частина — кнопки */}
                    <div className={styles.actionsNav}>
                        <div className={styles.headerSocials}>
                            <a href="https://www.instagram.com/qellum/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://www.pinterest.com/qellum/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Pinterest">
                                <FaPinterestP />
                            </a>
                        </div>
                        <AuthButtons />
                        <div className={styles.currencySwitch}>
                            <select
                                value={lang}
                                onChange={(e) => setLang(e.target.value as LangCode)}
                                className={styles.currencySelect}
                                aria-label="Language"
                            >
                                <option value="en">EN</option>
                                <option value="sv">SV</option>
                            </select>
                        </div>
                        <div className={styles.currencySwitch}>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value as Currency)}
                                className={styles.currencySelect}
                                aria-label="Currency"
                            >
                                <option value="GBP">£ GBP</option>
                                <option value="EUR">€ EUR</option>
                                <option value="USD">$ USD</option>
                            </select>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <div className={styles.menuButton}>
                        <IconButton
                            onClick={() => setDrawerOpen(true)}
                            aria-label="Open navigation"
                            className={styles.button}
                        >
                            <FaBars className={styles.button} />
                        </IconButton>
                    </div>
                </div>
            </motion.header>

            <DrawerMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    );
};

export default Header;
