import type { LangCode } from "@/context/i18nContext";

export type Dictionary = {
    common: {
        signIn: string;
        signUp: string;
        createMeal: string;
        balance: string;
        topUp: string;
        forgotPassword: string;
        resetPassword: string;
        sendResetLink: string;
        backToSignIn: string;
    };
    auth: {
        signInTitle: string;
        signUpTitle: string;
        forgotPasswordTitle: string;
        resetPasswordTitle: string;
    };
    wallet: {
        yourBalance: string;
        topUpWallet: string;
        minimumTopUp: string;
        processing: string;
    };
};

export const dictionaries: Record<LangCode, Dictionary> = {
    en: {
        common: {
            signIn: "Sign In",
            signUp: "Sign Up",
            createMeal: "Create Meal",
            balance: "Balance",
            topUp: "Top Up",
            forgotPassword: "Forgot password?",
            resetPassword: "Reset password",
            sendResetLink: "Send reset link",
            backToSignIn: "Back to sign in",
        },
        auth: {
            signInTitle: "Sign In",
            signUpTitle: "Sign Up",
            forgotPasswordTitle: "Forgot password",
            resetPasswordTitle: "Choose a new password",
        },
        wallet: {
            yourBalance: "Your Wallet Balance",
            topUpWallet: "Top Up Wallet",
            minimumTopUp: "Minimum top-up: 10.00",
            processing: "Processing...",
        },
    },
    sv: {
        common: {
            signIn: "Logga in",
            signUp: "Registrera",
            createMeal: "Skapa måltid",
            balance: "Saldo",
            topUp: "Fyll på",
            forgotPassword: "Glömt lösenord?",
            resetPassword: "Återställ lösenord",
            sendResetLink: "Skicka återställningslänk",
            backToSignIn: "Tillbaka till inloggning",
        },
        auth: {
            signInTitle: "Logga in",
            signUpTitle: "Registrera",
            forgotPasswordTitle: "Glömt lösenord",
            resetPasswordTitle: "Välj ett nytt lösenord",
        },
        wallet: {
            yourBalance: "Ditt saldo",
            topUpWallet: "Fyll på plånbok",
            minimumTopUp: "Minsta påfyllning: 10,00",
            processing: "Bearbetar...",
        },
    },
};

export function getDictionary(lang: LangCode): Dictionary {
    return dictionaries[lang] ?? dictionaries.en;
}
