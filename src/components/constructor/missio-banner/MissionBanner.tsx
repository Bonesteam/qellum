"use client";
import React from "react";
import styles from "./MissionBanner.module.scss";
import Media from "../image/Media";

interface MissionBannerProps {
    title: string;
    description: string;
    image?: string;
}

const MissionBanner: React.FC<MissionBannerProps> = ({ title, description, image }) => {
    return (
        <div className={styles.missionBanner}>
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
                {image && (
                    <div className={styles.imageWrapper}>
                        <Media
                            src={image}
                            type="image"
                            width="100%"
                            height="400px"
                            alt="Mission image"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MissionBanner;
