import { Suspense } from "react";
import ResetPasswordPage from "@/components/widgets/reset-password/ResetPassword";
import { Metadata } from 'next';
import { COMPANY_NAME } from '@/resources/constants';

export const metadata: Metadata = {
    title: `Reset Password — ${COMPANY_NAME || "Qellum"}`,
};

export default function Page() {
    return (
        <Suspense fallback={null}>
            <ResetPasswordPage />
        </Suspense>
    );
}
