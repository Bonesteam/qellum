import "./globals.css";
import { authWrapper } from "@/utils/authWrapper";
import { AlertProvider } from "@/context/AlertContext";
import PageWrapper from "@/components/layout/page-wrapper/PageWrapper";
import Header from "@/components/layout/header/Header";
import TopBar from "@/components/layout/header/TopBar";
import Footer from "@/components/layout/footer/Footer";
import ProtectedRoute from "@/components/features/protected-route/ProtectedRoute";
import { currentFont } from "@/resources/styles-config";
import { I18nProvider } from "@/context/i18nContext";
import { AllOrdersProvider } from "@/context/AllOrdersContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import ScrollReveal from "@/components/features/scroll-reveal/ScrollReveal";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            {/* Body font — DM Sans (або Outfit якщо currentFont ще старий) */}
            <link href={currentFont.url} rel="stylesheet" />

            {/* Heading font — Fraunces, хардкод щоб не залежати від headingFont експорту */}
            <link
                href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&display=swap"
                rel="stylesheet"
            />

            <style>{`
                :root {
                    --font-family: ${currentFont.css};
                    --font-heading: 'Fraunces', serif;
                    --font-body: ${currentFont.css};
                }
            `}</style>
        </head>
        <body>
        <I18nProvider>
            <AlertProvider>
                <AllOrdersProvider>
                    <ProtectedRoute>
                        <CurrencyProvider>
                            <TopBar />
                            <Header />
                            <PageWrapper>
                                {children}
                            </PageWrapper>
                            <ScrollReveal />
                            <Footer />
                        </CurrencyProvider>
                    </ProtectedRoute>
                </AllOrdersProvider>
            </AlertProvider>
        </I18nProvider>
        </body>
        </html>
    );
}

export default authWrapper(Layout);