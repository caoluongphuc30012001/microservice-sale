/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/product",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
