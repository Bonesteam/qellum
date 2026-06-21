import ForgotPasswordPage from "@/components/widgets/forgot-password/ForgotPassword";
import { Metadata } from 'next';
import { COMPANY_NAME } from '@/resources/constants';

export const metadata: Metadata = {
    title: `Forgot Password — ${COMPANY_NAME || "Qellum"}`,
};

export default function Page() {
    return <ForgotPasswordPage />;
}
