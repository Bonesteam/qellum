import { Suspense } from "react";
import ResetPasswordPage from "@/components/widgets/reset-password/ResetPassword";

export default function Page() {
    return (
        <Suspense fallback={null}>
            <ResetPasswordPage />
        </Suspense>
    );
}
