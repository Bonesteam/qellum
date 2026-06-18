"use client";
import React from "react";
import { Form } from "formik";
import Link from "next/link";
import styles from "./FormUI.module.scss";
import InputUI from "@/components/ui/input/InputUI";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { media } from "@/resources/media";
import Image from "next/image";

interface FieldConfig {
    name: string;
    type: string;
    placeholder?: string;
}

interface FormUIProps {
    title: string;
    description?: string;
    isSubmitting?: boolean;
    fields?: FieldConfig[];
    submitLabel?: string;
    children?: React.ReactNode;
    accentLabel?: string;
    heroTitle?: string;
    heroText?: string;
    heroBullets?: string[];
    switchText?: string;
    switchHref?: string;
    switchLabel?: string;
    extraLink?: { href: string; label: string };
}

const defaultFields: FieldConfig[] = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
];

const FormUI: React.FC<FormUIProps> = ({
                                           title,
                                           description,
                                           isSubmitting,
                                           fields = defaultFields,
                                           submitLabel = "Sign In",
                                           children,
                                           accentLabel = "Qellum account",
                                           heroTitle = "Healthy routines start with a better kitchen flow.",
                                           heroText = "Access your dashboard, manage tokens, track purchases and keep everything in one place.",
                                           heroBullets = [
                                               "Secure checkout and token balance history",
                                               "Chef, AI and nutrition services in one account",
                                               "Fast access to orders, receipts and support",
                                           ],
                                           switchText,
                                           switchHref,
                                           switchLabel,
                                           extraLink,
                                       }) => (
    <div className={styles.wrapper}>
        <div className={styles.shell}>
            <aside className={styles.brandPanel}>
                <Link href="/" className={styles.logoWrap} aria-label="Qellum">
                    <Image src={media.logo} alt="Qellum" width={180} height={70} className={styles.logo} />
                </Link>

                <div className={styles.heroCopy}>
                    <span className={styles.accentLabel}>{accentLabel}</span>
                    <h1 className={styles.heroTitle}>{heroTitle}</h1>
                    <p className={styles.heroText}>{heroText}</p>
                </div>

                <div className={styles.heroList}>
                    {heroBullets.map((item) => (
                        <div key={item} className={styles.heroItem}>
                            <span className={styles.heroDot} />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </aside>

            <div className={styles.formContainer}>
                <div className={styles.formHead}>
                    <span className={styles.kicker}>{accentLabel}</span>
                    <h2 className={styles.title}>{title}</h2>
                    {description && <p className={styles.description}>{description}</p>}
                </div>

                <Form className={styles.formContent}>
                    {fields.map((field) => (
                        <InputUI
                            key={field.name}
                            {...field}
                            formik
                            sx={{
                                "--Input-radius": "16px",
                                "--Input-gap": "10px",
                                minHeight: "54px",
                                bgcolor: "#fff9f3",
                                borderColor: "rgba(210, 105, 30, 0.18)",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
                                "&:hover": {
                                    borderColor: "rgba(236,115,49,0.45)",
                                },
                                "&:focus-within": {
                                    borderColor: "#ec7331",
                                    boxShadow: "0 0 0 4px rgba(236,115,49,0.12)",
                                },
                            }}
                        />
                    ))}
                    {children}
                    {extraLink && (
                        <div className={styles.switchRow}>
                            <Link href={extraLink.href}>{extraLink.label}</Link>
                        </div>
                    )}
                    <ButtonUI
                        type="submit"
                        text={submitLabel}
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        fullWidth
                        shape="rounded"
                        sx={{ mt: "0.5rem", minHeight: "52px", fontWeight: 700 }}
                    />
                </Form>

                {switchText && switchHref && switchLabel && (
                    <div className={styles.switchRow}>
                        <span>{switchText}</span>
                        <Link href={switchHref}>{switchLabel}</Link>
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default FormUI;
