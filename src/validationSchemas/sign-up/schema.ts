import { AlertColor } from "@mui/material/Alert";
import { isCountryAllowed } from "@/resources/countries";

export const signUpInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    city: "",
    country: "",
    postalCode: "",
    dateOfBirth: "",
    acceptedTerms: false,
};

export const signUpValidation = (values: typeof signUpInitialValues) => {
    const errors: Partial<Record<string, string>> = {};
    if (!values.firstName) errors.firstName = "Required";
    if (!values.lastName) errors.lastName = "Required";
    if (!values.email) errors.email = "Required";
    if (!values.password) errors.password = "Required";
    if (!values.phone) errors.phone = "Required";
    if (!values.street) errors.street = "Required";
    if (!values.city) errors.city = "Required";
    if (!values.country) errors.country = "Required";
    if (values.country && !isCountryAllowed(values.country)) {
        errors.country = "Selected country is not allowed";
    }
    if (!values.postalCode) errors.postalCode = "Required";
    if (!values.dateOfBirth) errors.dateOfBirth = "Required";
    if (!values.acceptedTerms) {
        errors.acceptedTerms = "Please accept the Terms & Conditions and Privacy Policy";
    }
    return errors;
};

export const signUpOnSubmit = async (
    values: typeof signUpInitialValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
    showAlert: (msg: string, desc?: string, severity?: AlertColor) => void,
    router: { replace: (url: string) => void; refresh: () => void }
) => {
    try {
        const requestBody = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            phone: values.phone,
            address: {
                street: values.street,
                city: values.city,
                country: values.country,
                postalCode: values.postalCode,
            },
            dateOfBirth: values.dateOfBirth,
        };

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(requestBody),
        });

        const data = await res.json();

        if (res.ok && data?.user) {
            showAlert("Registration successful!", "A confirmation email has been sent to your inbox.", "success");
            router.replace("/");
            router.refresh();
        } else {
            showAlert(data?.message || "Registration failed", "", "error");
        }
    } catch (e: unknown) {
        showAlert(e instanceof Error ? e.message : "Network error", "", "error");
    } finally {
        setSubmitting(false);
    }
};
