import React from "react";
import styles from "./ExamplesIntro.module.scss";

const ExamplesIntro = () => {
    return (
        <section className={styles.intro}>
            <h1 className={styles.title}>Example Meal Plans</h1>
            <p className={styles.text}>
                Check out our sample meal plans. Each example can be viewed directly on the website
                in PDF format or downloaded. Use them as inspiration for your own personalized menu.
            </p>
        </section>
    );
};

export default ExamplesIntro;
