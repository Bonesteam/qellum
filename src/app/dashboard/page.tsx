import React from 'react';
import Profile from "@/components/widgets/profile/Profile";
import { Metadata } from 'next';
import { COMPANY_NAME } from '@/resources/constants';

export const metadata: Metadata = {
    title: `Dashboard — ${COMPANY_NAME || "Qellum"}`,
};

const Page = () => {
    return (
        <Profile defaultTab="generator" />
    );
};

export default Page;