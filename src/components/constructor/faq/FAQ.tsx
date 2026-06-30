"use client";
/*
 * ❌ ПРИБРАНО: motion.div initial={{opacity:0,y:30}} на header
 * ✅ AnimatePresence залишено — тільки для accordion відкриття/закриття
 */
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./FAQ.module.scss";

interface FAQItem { question: string; answer: string; }
interface FAQProps { items: FAQItem[]; image?: string; }

const FAQ: React.FC<FAQProps> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

    return (
        <section className={styles.section}>
            {/* ❌ ПРИБРАНО: motion.div initial={{opacity:0,y:30}} whileInView */}
            <div className={styles.header}>
                <h2 className={styles.title}>Questions?<br />We've got answers.</h2>
                <p className={styles.headerNote}>
                    Still need help?<br />
                    Email us at support@qellum.co.uk
                </p>
            </div>

            <div className={styles.faqList}>
                {items.map((item, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <div key={idx} className={styles.item}>
                            <button
                                className={`${styles.question} ${isOpen ? styles.open : ""}`}
                                onClick={() => toggle(idx)}
                                aria-expanded={isOpen}
                            >
                                <span className={styles.questionNum}>
                                    {String(idx + 1).padStart(2, "0")}
                                </span>
                                <span className={styles.questionText}>{item.question}</span>
                                <span className={styles.questionIcon} aria-hidden="true">+</span>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        className={styles.answer}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className={styles.answerContent}>{item.answer}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default FAQ;