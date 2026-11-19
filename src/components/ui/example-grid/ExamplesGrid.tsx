import React from "react";
import styles from "./ExamplesGrid.module.scss";
import { mealPlanExamples } from "@/data/mealPlanExamples";
import CVCard from "@/components/ui/cv-card/CVCard";

const ExamplesGrid = () => {
    return (
        <div className={styles.wrapper}>
            <section className={styles.grid}>
                {mealPlanExamples.map((plan) => (
                    <CVCard
                        key={plan.slug}
                        title={plan.title}
                        description={plan.description}
                        preview={plan.preview}
                        pdf={`/pdf/${plan.slug}-meal-plan.pdf`}
                    />
                ))}
            </section>
        </div>
    );
};

export default ExamplesGrid;
