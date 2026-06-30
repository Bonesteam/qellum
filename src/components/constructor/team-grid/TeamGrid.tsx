"use client";
/*
 * TeamGrid.tsx — ФІКС
 * ❌ ПРИБРАНО: framer-motion stagger (delay: i * 0.2) на кожній картці
 * ❌ ПРИБРАНО: framer-motion whileInView на header
 * ✅ Простий рендер — анімація не потрібна для сітки
 */
import React from "react";
import Grid from "../grid/Grid";
import Card from "../card/Card";
import { media as mediaMap } from "@/resources/media";
import styles from "./TeamGrid.module.scss";

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
}

interface TeamGridProps {
    title?: string;
    description?: string;
    members: TeamMember[];
}

function resolveMedia(key?: string) {
    if (!key) return undefined;
    return (mediaMap as Record<string, unknown>)[key] as any;
}

const TeamGrid: React.FC<TeamGridProps> = ({ title, description, members }) => {
    return (
        <section className={styles.section}>
            <div className={styles.head}>
                {title && <h2 className={styles.sectionTitle}>{title}</h2>}
                {description && <p className={styles.sectionDesc}>{description}</p>}
            </div>

            <Grid columns={members.length > 3 ? 3 : members.length} gap="2rem">
                {members.map((m, i) => (
                    /* ❌ ПРИБРАНО: motion.div з variants + delay stagger */
                    <div key={i} className={styles.memberCard}>
                        <Card
                            image={resolveMedia(m.image)}
                            title={`${m.name} — ${m.role}`}
                            description={m.bio}
                        />
                    </div>
                ))}
            </Grid>
        </section>
    );
};

export default TeamGrid;