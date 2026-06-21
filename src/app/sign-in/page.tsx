import React from 'react';
import SignIn from '@/components/widgets/sign-in/SignIn';
import { Metadata } from 'next';
import { COMPANY_NAME } from '@/resources/constants';

export const metadata: Metadata = {
    title: `Sign In — ${COMPANY_NAME || "Qellum"}`,
};

const Page = () => {
    return (
        <SignIn/>
    );
};

export default Page;