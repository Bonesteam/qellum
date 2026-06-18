"use client";

import { Formik, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter, useSearchParams } from "next/navigation";
import FormUI from "@/components/ui/form/FormUI";

type ResetPasswordValues = { password: string; confirmPassword: string };

export default function ResetPasswordPage() {
    const { showAlert } = useAlert();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    return (
        <Formik<ResetPasswordValues>
            initialValues={{ password: "", confirmPassword: "" }}
            validate={(values) => {
                const errors: Partial<ResetPasswordValues> = {};
                if (!values.password) errors.password = "Required";
                if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = "Passwords must match";
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }: FormikHelpers<ResetPasswordValues>) => {
                if (!token) {
                    showAlert("Invalid link", "Reset token is missing.", "error");
                    setSubmitting(false);
                    return;
                }

                try {
                    const res = await fetch("/api/auth/reset-password", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ token, password: values.password }),
                    });
                    const data = await res.json();

                    if (res.ok) {
                        showAlert("Password updated", "You can now sign in with your new password.", "success");
                        router.replace("/sign-in");
                    } else {
                        showAlert("Reset failed", data.message || "", "error");
                    }
                } catch (error) {
                    showAlert("Network error", error instanceof Error ? error.message : "", "error");
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <FormUI
                    title="Reset password"
                    description="Choose a new password for your account."
                    isSubmitting={isSubmitting}
                    accentLabel="New password"
                    heroTitle="Secure your account with a fresh password."
                    fields={[
                        { name: "password", type: "password", placeholder: "New password" },
                        { name: "confirmPassword", type: "password", placeholder: "Confirm password" },
                    ]}
                    submitLabel="Update password"
                    switchText="Back to"
                    switchHref="/sign-in"
                    switchLabel="Sign in"
                />
            )}
        </Formik>
    );
}
