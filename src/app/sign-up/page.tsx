import React from 'react';
import SignUp from '@/components/widgets/sign-up/SignUp';
import { Metadata } from 'next';
import { COMPANY_NAME } from '@/resources/constants';

export const metadata: Metadata = {
    title: `Sign Up — ${COMPANY_NAME || "Qellum"}`,
};

const Page = () => {
    return (
        <SignUp/>
    );
};

export default Page;