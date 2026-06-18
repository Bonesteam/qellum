"use client";

import React from "react";
import Image from "next/image";
import { media } from "@/resources/media";
import styles from "./TopBar.module.scss";

const TopBar: React.FC = () => {
    return (
        <div className={styles.topBar}>
            <div className={styles.container}>
                <div className={styles.message}>
                    <span>🌿 Certified Personal Chefs & Smart AI Planning</span>
                </div>
                <div className={styles.payments}>
                    <span className={styles.label}>100% Secure Checkout:</span>
                    <div className={styles.logos}>
                        <Image src={media.visaLogo} alt="Visa" width={32} height={10} className={styles.logo} />
                        <Image src={media.mastercardLogo} alt="Mastercard" width={24} height={14} className={styles.logo} />
                        <Image src={media.pciDssLogo} alt="PCI DSS" width={36} height={12} className={styles.logo} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
