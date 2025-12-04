/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["logo.clearbit.com", "cdn.simpleicons.org"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

export default nextConfig;
