"use client";
/**
 * src/components/widgets/sign-up/SignUp.tsx
 *
 * Вимога 5: повна форма реєстрації:
 * - Name, Surname, Email, Password, Phone, Date of birth
 * - Address: Street, City, Country (full world list − blocked), Post code
 * - Checkbox Terms & Conditions + Privacy Policy з посиланнями
 *
 * Вимога 9: ❌ БЕЗ жодних згадок про крипту
 */
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
import styles from "./SignUp.module.scss";

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
                    title="Create Account"
                    description="Sign up to top up your balance, track payments and access all Qellum services."
                    isSubmitting={isSubmitting}
                    accentLabel="Create account"
                    heroTitle="Join Qellum and keep every order in one place."
                    heroText="Set up your profile once and use it for balance top-ups, payment receipts, chef services and AI meal planning."
                    heroBullets={[
                        "Confirmation email sent after registration",
                        "Payment receipts with PDF invoices",
                        "Secure account for all Qellum services",
                    ]}
                    fields={[
                        { name: "firstName",   type: "text",     placeholder: "Name" },
                        { name: "lastName",    type: "text",     placeholder: "Surname" },
                        { name: "email",       type: "email",    placeholder: "Email" },
                        { name: "password",    type: "password", placeholder: "Password" },
                        { name: "phone",       type: "text",     placeholder: "Phone number" },
                        { name: "dateOfBirth", type: "date",     placeholder: "Date of birth" },
                    ]}
                    submitLabel="Sign Up"
                    switchText="Already registered?"
                    switchHref="/sign-in"
                    switchLabel="Sign in"
                >
                    {/* ── ADDRESS SECTION ───────────────────────────────── */}
                    <div className={styles.addressSection}>
                        <p className={styles.addressLabel}>Address</p>

                        {/* Street */}
                        <Field
                            name="street"
                            type="text"
                            placeholder="Street, house number, apartment..."
                            className={styles.input}
                        />
                        <ErrorMessage name="street">
                            {(msg) => <span className={styles.error}>{msg}</span>}
                        </ErrorMessage>

                        {/* City + Post code */}
                        <div className={styles.row2}>
                            <div>
                                <Field name="city" type="text" placeholder="City" className={styles.input} />
                                <ErrorMessage name="city">
                                    {(msg) => <span className={styles.error}>{msg}</span>}
                                </ErrorMessage>
                            </div>
                            <div>
                                <Field name="postalCode" type="text" placeholder="Post code" className={styles.input} />
                                <ErrorMessage name="postalCode">
                                    {(msg) => <span className={styles.error}>{msg}</span>}
                                </ErrorMessage>
                            </div>
                        </div>

                        {/* Country — повний список */}
                        <div>
                            <Field name="country" as="select" className={styles.select}>
                                <option value="">Select country</option>
                                {ALLOWED_COUNTRIES.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="country">
                                {(msg) => <span className={styles.error}>{msg}</span>}
                            </ErrorMessage>
                        </div>
                    </div>

                    {/* ── TERMS CHECKBOX ───────────────────────────────── */}
                    <div className={styles.termsRow}>
                        <Field type="checkbox" name="acceptedTerms" id="acceptedTerms" className={styles.checkbox} />
                        <label htmlFor="acceptedTerms" className={styles.termsLabel}>
                            I agree to the{" "}
                            <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
                                Terms &amp; Conditions
                            </a>{" "}
                            and{" "}
                            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                                Privacy Policy
                            </a>.
                        </label>
                    </div>
                    <ErrorMessage name="acceptedTerms">
                        {(msg) => <span className={styles.error}>{msg}</span>}
                    </ErrorMessage>
                </FormUI>
            )}
        </Formik>
    );
}