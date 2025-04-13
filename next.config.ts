import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true, // Disable default image optimization
    },
    output: 'export',
    trailingSlash: true,
    basePath: isProd? '/ti-tooling-assistant/' : '',
    assetPrefix: isProd? '/ti-tooling-assistant/' : '',
}

export default nextConfig;