// next.config.ts
import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const baseConfig: NextConfig = {
  transpilePackages: ["antd-mobile"],
  // Add other Next.js config options here as needed
};

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  // Optional Serwist flags:
  disable: process.env.NODE_ENV === "development",
  additionalPrecacheEntries: [
    { url: "/manifest.webmanifest", revision: null }
  ],
});

const nextConfig = withSerwist(baseConfig);

export default nextConfig;