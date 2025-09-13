import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    turbopack: {
    root: __dirname,
  },
    images: {
      domains: ["img.clerk.com"],
    },
};

export default nextConfig