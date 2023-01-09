/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: {
                and: [/\.(js|ts|md)x?$/]
            },
            use: ['@svgr/webpack'],

        });
        return config;
    },
    env: {
        GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    },
}

module.exports = nextConfig