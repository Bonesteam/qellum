"use client";

import { Formik, FormikHelpers } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    signInValidation,
    signInInitialValues,
    signInOnSubmit
} from "@/validationSchemas/sign-in/schema";
import FormUI from "@/components/ui/form/FormUI";

export type SignInValues = { email: string; password: string };

export default function SignInPage() {
    const { showAlert } = useAlert();
    const router = useRouter();

    return (
        <Formik<SignInValues>
            initialValues={signInInitialValues}
            validate={signInValidation}
            onSubmit={async (values, { setSubmitting }: FormikHelpers<SignInValues>) =>
                signInOnSubmit(values, { setSubmitting }, showAlert, router)
            }
        >
            {({ isSubmitting }) => (
                <FormUI
                    title="Sign In"
                    description="Welcome back. Sign in to access your dashboard, token balance and recent payments."
                    isSubmitting={isSubmitting}
                    accentLabel="Welcome back"
                    heroTitle="Pick up your meal planning right where you left it."
                    heroText="Manage tokens, review payment receipts and keep your Qellum profile ready for the next order."
                    heroBullets={[
                        "Instant access to your balance and dashboard",
                        "Track payments and token top-ups",
                        "Continue with AI, chef and nutrition services",
                    ]}
                    fields={[
                        { name: "email", type: "email", placeholder: "Email" },
                        { name: "password", type: "password", placeholder: "Password" },
                    ]}
                    submitLabel="Sign In"
                    switchText="Need an account?"
                    switchHref="/sign-up"
                    switchLabel="Create one"
                    extraLink={{ href: "/forgot-password", label: "Forgot password?" }}
                />
            )}
        </Formik>
    );
}
