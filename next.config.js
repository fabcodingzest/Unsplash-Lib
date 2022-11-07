/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  largePageDataBytes: 200 * 100000,
};

module.exports = nextConfig;
