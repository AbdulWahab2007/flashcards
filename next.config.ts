import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
module.exports = {
  async rewrites() {
    return [
      {
        source: "/sw.js",
        destination: "/public/sw.js",
      },
    ];
  },
};
export default nextConfig;
