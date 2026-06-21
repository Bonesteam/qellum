import Profile from "@/components/widgets/profile/Profile";
import { Metadata } from 'next';
import { COMPANY_NAME } from '@/resources/constants';

export const metadata: Metadata = {
    title: `Profile — ${COMPANY_NAME || "Qellum"}`,
};

export default function AccountPage() {
    return (
        <>
            <Profile defaultTab="tracker" />
        </>
    );
}
