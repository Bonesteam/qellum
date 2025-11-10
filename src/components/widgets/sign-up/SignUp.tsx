"use client";

import { Formik, FormikHelpers, Field, ErrorMessage } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    signUpValidation,
    signUpInitialValues,
    signUpOnSubmit
} from "@/validationSchemas/sign-up/schema";
import FormUI from "@/components/ui/form/FormUI";

export type SignUpValues = { name: string; email: string; password: string; acceptedTerms: boolean };

export default function SignUpPage() {
    const { showAlert } = useAlert();
    const router = useRouter();

    return (
        <Formik<SignUpValues>
            initialValues={signUpInitialValues}
            validate={signUpValidation}
            onSubmit={async (values, { setSubmitting }: FormikHelpers<SignUpValues>) =>
                signUpOnSubmit(values, { setSubmitting }, showAlert, router)
            }
        >
            {({ isSubmitting }) => (
                <FormUI
                    title="Sign Up"
                    description="Create your account"
                    isSubmitting={isSubmitting}
                    fields={[
                        { name: "name", type: "text", placeholder: "Name" },
                        { name: "email", type: "email", placeholder: "Email" },
                        { name: "password", type: "password", placeholder: "Password" }
                    ]}
                    submitLabel="Sign Up"
                    >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}>
                        <Field type="checkbox" name="acceptedTerms" />
                        <label style={{ fontSize: 14 }}>
                            I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
                        </label>
                    </div>
                    <ErrorMessage name="acceptedTerms">{(msg) => <div style={{ color: "red", fontSize: 12 }}>{msg}</div>}</ErrorMessage>
                </FormUI>
            )}
        </Formik>
    );
}