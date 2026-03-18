import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,

    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    // Use a specific origin for credentialed requests. Set NEXT_PUBLIC_APP_ORIGIN
                    // to your app URL (e.g. https://www.qellum.co.uk). If not set, keep `*`.
                    {
                        key: "Access-Control-Allow-Origin",
                        value: process.env.NEXT_PUBLIC_APP_ORIGIN || "*",
                    },
                    { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
                    { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
                    // Allow sending cookies/credentials from the browser when origin is specific
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                ],
            },
        ];
    },

    trailingSlash: false,

    images: {
        unoptimized: true,
        // Disable Next.js built-in image optimization to avoid Vercel's image-transform quota
        // If you prefer optimization, remove `unoptimized` and upgrade your Vercel plan.
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**.freepik.com",
            },
            {
                protocol: "https",
                hostname: "media.shipster.se",
            },
        ],
    },

    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
    },

    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },

    // removed unrecognized `turbo` key to avoid Next.js config warnings
};

export default nextConfig;