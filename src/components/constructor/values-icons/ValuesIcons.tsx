"use client";
import React from "react";
import Grid from "../grid/Grid";
import styles from "./ValuesIcons.module.scss";

interface ValueItem {
    icon: string;
    title: string;
    description?: string;
    text?: string;
}

const ValuesIcons: React.FC<{ values: ValueItem[] }> = ({ values }) => {
    return (
        <Grid columns={values.length} gap="2rem">
            {values.map((v, i) => (
                <div key={i} className={styles.valueCard}>
                    <div className={styles.icon}>{v.icon}</div>
                    <h3>{v.title}</h3>
                    <p>{v.description ?? v.text}</p>
                </div>
            ))}
        </Grid>
    );
};


export default ValuesIcons;
