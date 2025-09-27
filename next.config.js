/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": require("path").resolve(__dirname, "src"),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.khaasfood.com",
      },
    ],
  },
};

module.exports = nextConfig;
