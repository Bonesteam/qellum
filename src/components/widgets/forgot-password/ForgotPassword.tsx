"use client";

import { Formik, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import Link from "next/link";
import FormUI from "@/components/ui/form/FormUI";

type ForgotPasswordValues = { email: string };

export default function ForgotPasswordPage() {
    const { showAlert } = useAlert();

    return (
        <Formik<ForgotPasswordValues>
            initialValues={{ email: "" }}
            validate={(values) => {
                const errors: Partial<ForgotPasswordValues> = {};
                if (!values.email) errors.email = "Required";
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }: FormikHelpers<ForgotPasswordValues>) => {
                try {
                    const res = await fetch("/api/auth/forgot-password", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(values),
                    });
                    const data = await res.json();
                    showAlert(
                        res.ok ? "Check your inbox" : "Request failed",
                        data.message || "",
                        res.ok ? "success" : "error"
                    );
                } catch (error) {
                    showAlert("Network error", error instanceof Error ? error.message : "", "error");
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <FormUI
                    title="Forgot password"
                    description="Enter your email and we will send you a secure link to reset your password."
                    isSubmitting={isSubmitting}
                    accentLabel="Account recovery"
                    heroTitle="Reset access to your Qellum account."
                    heroText="The reset link is valid for one hour. If you did not request a reset, you can safely ignore the email."
                    fields={[{ name: "email", type: "email", placeholder: "Email" }]}
                    submitLabel="Send reset link"
                    switchText="Remembered your password?"
                    switchHref="/sign-in"
                    switchLabel="Back to sign in"
                />
            )}
        </Formik>
    );
}
