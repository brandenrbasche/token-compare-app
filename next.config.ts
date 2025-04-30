import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Disable strict mode in production to prevent double rendering
  env: {
    FUNKIT_API_KEY: process.env.FUNKIT_API_KEY,
  }
};

export default nextConfig;
