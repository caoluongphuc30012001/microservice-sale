/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    auth_url: process.env.BACKEND_AUTH_URL,
  },
};

module.exports = nextConfig;
