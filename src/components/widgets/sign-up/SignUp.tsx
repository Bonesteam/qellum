"use client";

import { Formik, FormikHelpers, Field, ErrorMessage } from "formik";
import { useAlert } from "@/context/AlertContext";
import { useRouter } from "next/navigation";
import {
    signUpValidation,
    signUpInitialValues,
    signUpOnSubmit,
} from "@/validationSchemas/sign-up/schema";
import FormUI from "@/components/ui/form/FormUI";
import { ALLOWED_COUNTRIES } from "@/resources/countries";

export type SignUpValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
    dateOfBirth: string;
    acceptedTerms: boolean;
};

const selectStyle = {
    width: "100%",
    padding: "16px 18px",
    borderRadius: 16,
    border: "1px solid rgba(210, 105, 30, 0.18)",
    background: "#fff9f3",
    color: "#4b342c",
    outline: "none",
} as const;

export default function SignUpPage() {
    const { showAlert } = useAlert();
    const router = useRouter();

    return (
        <Formik<SignUpValues>
            initialValues={signUpInitialValues}
            validate={signUpValidation}
            onSubmit={async (values, helpers: FormikHelpers<SignUpValues>) =>
                signUpOnSubmit(values, helpers, showAlert, router)
            }
        >
            {({ isSubmitting }) => (
                <FormUI
                    title="Sign Up"
                    description="Create your account to top up your wallet, receive receipts and manage everything from one place."
                    isSubmitting={isSubmitting}
                    accentLabel="Create account"
                    heroTitle="Join Qellum and keep every order in one elegant workspace."
                    heroText="Set up your profile once and use it for wallet top-ups, payment receipts, chef services and AI meal planning."
                    heroBullets={[
                        "Confirmation email sent after registration",
                        "Payment receipts with PDF invoices",
                        "Secure account for all Qellum services",
                    ]}
                    fields={[
                        { name: "firstName", type: "text", placeholder: "Name" },
                        { name: "lastName", type: "text", placeholder: "Surname" },
                        { name: "email", type: "email", placeholder: "Email" },
                        { name: "password", type: "password", placeholder: "Password" },
                        { name: "phone", type: "text", placeholder: "Phone number" },
                        { name: "dateOfBirth", type: "date", placeholder: "Date of birth" },
                        { name: "street", type: "text", placeholder: "Street, house number, apartment..." },
                        { name: "city", type: "text", placeholder: "City" },
                        { name: "postalCode", type: "text", placeholder: "Post code" },
                    ]}
                    submitLabel="Sign Up"
                    switchText="Already registered?"
                    switchHref="/sign-in"
                    switchLabel="Sign in"
                >
                    <div style={{ margin: "6px 0 2px" }}>
                        <label style={{ display: "block", marginBottom: 8, color: "#7d6558", fontSize: 14, fontWeight: 600 }}>
                            Country
                        </label>
                        <Field name="country" as="select" style={selectStyle}>
                            <option value="">Select country</option>
                            {ALLOWED_COUNTRIES.map((country) => (
                                <option key={country} value={country}>
                                    {country}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="country">
                            {(msg) => <div style={{ color: "red", fontSize: 12 }}>{msg}</div>}
                        </ErrorMessage>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, margin: "6px 0 2px", color: "#6f584c" }}>
                        <Field type="checkbox" name="acceptedTerms" />
                        <label style={{ fontSize: 14 }}>
                            I agree to the{" "}
                            <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                                Terms &amp; Conditions
                            </a>{" "}
                            and{" "}
                            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                                Privacy Policy
                            </a>
                            .
                        </label>
                    </div>
                    <ErrorMessage name="acceptedTerms">
                        {(msg) => <div style={{ color: "red", fontSize: 12 }}>{msg}</div>}
                    </ErrorMessage>
                </FormUI>
            )}
        </Formik>
    );
}
