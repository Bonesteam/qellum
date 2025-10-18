"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Input, Textarea } from "@mui/joy";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { validationSchema, initialValues, sendContactRequest } from "./schema";
import { useAlert } from "@/context/AlertContext";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE } from "@/resources/constants";
import styles from "./ContactForm.module.scss";

const ContactUsForm = () => {
    const { showAlert } = useAlert();
    const [showConfetti, setShowConfetti] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
        try {
            await sendContactRequest(values);
            resetForm();
            setSuccessMsg("🎉 Message sent successfully!");
            setShowConfetti(true);
            showAlert("Success", "Your message has been sent!", "success");
            setTimeout(() => setShowConfetti(false), 6000);
        } catch {
            showAlert("Error", "Something went wrong. Try again.", "error");
        }
        setSubmitting(false);
    };

    return (
        <section className={styles.contactSection}>
            {showConfetti && <Confetti />}
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2>Let’s Connect ✉️</h2>
                <p>
                    We’d love to hear from you. Reach out with any questions, collaborations, or ideas —
                    we’ll get back to you within 24 hours.
                </p>
            </motion.div>

            {/* Page content: left = info, right = form */}
            <div className={styles.content}>
                {/* Contact info cards */}
                <div className={styles.infoGrid}>
                <motion.div className={styles.infoCard} whileHover={{ y: -5 }}>
                    <FaMapMarkerAlt className={styles.icon} />
                    <h4>Address</h4>
                    <p>{COMPANY_ADDRESS}</p>
                </motion.div>

                <motion.div className={styles.infoCard} whileHover={{ y: -5 }}>
                    <FaEnvelope className={styles.icon} />
                    <h4>Email</h4>
                    <p>{COMPANY_EMAIL}</p>
                </motion.div>

                <motion.div className={styles.infoCard} whileHover={{ y: -5 }}>
                    <FaPhone className={styles.icon} />
                    <h4>Phone</h4>
                    <p>{COMPANY_PHONE}</p>
                </motion.div>
                </div>

                {/* Floating form */}
                <motion.div
                    className={styles.formWrapper}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {successMsg ? (
                    <div className={styles.successMsg}>{successMsg}</div>
                ) : (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form className={styles.form}>
                                <div className={styles.row}>
                                    <Field name="name">
                                        {({ field }: any) => (
                                            <Input {...field} placeholder="First Name" fullWidth />
                                        )}
                                    </Field>
                                    <Field name="secondName">
                                        {({ field }: any) => (
                                            <Input {...field} placeholder="Last Name" fullWidth />
                                        )}
                                    </Field>
                                </div>

                                <Field name="email">
                                    {({ field }: any) => (
                                        <Input {...field} type="email" placeholder="Email" fullWidth />
                                    )}
                                </Field>

                                <Field name="message">
                                    {({ field }: any) => (
                                        <Textarea {...field} placeholder="Your message" minRows={5} />
                                    )}
                                </Field>

                                <ButtonUI
                                    type="submit"
                                    fullWidth
                                    loading={isSubmitting}
                                    text="Send Message"
                                    color="secondary"
                                    textColor="backgroundLight"
                                />
                            </Form>
                        )}
                    </Formik>
                )}
            </motion.div>
            </div>
        </section>
    );
};

export default ContactUsForm;
