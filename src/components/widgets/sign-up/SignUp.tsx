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
                        { name: "firstName", type: "text", placeholder: "First name" },
                        { name: "lastName", type: "text", placeholder: "Last name" },
                        { name: "email", type: "email", placeholder: "Email" },
                        { name: "password", type: "password", placeholder: "Password" },
                        { name: "phone", type: "text", placeholder: "Phone number" },
                        { name: "street", type: "text", placeholder: "Street address" },
                        { name: "city", type: "text", placeholder: "City" },
                        { name: "postalCode", type: "text", placeholder: "Postal code" },
                        { name: "dateOfBirth", type: "date", placeholder: "Date of birth" },
                    ]}
                    submitLabel="Sign Up"
                >
                    {/* Country select */}
                    <div style={{ margin: "8px 0" }}>
                        <label style={{ display: "block", marginBottom: 6 }}>Country</label>
                        <Field name="country" as="select" style={{ width: "100%", padding: 10, borderRadius: 6 }}>
                            <option value="">Select country</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="Spain">Spain</option>
                            <option value="Italy">Italy</option>
                            <option value="Australia">Australia</option>
                            <option value="India">India</option>
                            <option value="Poland">Poland</option>
                        </Field>
                        <ErrorMessage name="country">
                            {(msg) => <div style={{ color: "red", fontSize: 12 }}>{msg}</div>}
                        </ErrorMessage>
                    </div>

                    {/* Terms checkbox */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}>
                        <Field type="checkbox" name="acceptedTerms" />
                        <label style={{ fontSize: 14 }}>
                            I agree to the <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
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