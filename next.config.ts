import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true, // Disable default image optimization
    },
    output: 'export',
    basePath: isProd? '/ti-tooling-assistant' : '',
}

export default nextConfig;