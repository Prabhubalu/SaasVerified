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
    // Enable image optimization in production
    unoptimized: false,
    // Add formats support
    formats: ["image/avif", "image/webp"],
    // Increase image sizes if needed
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Disable ESLint during builds to prevent build failures
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during builds (optional, but helpful)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
