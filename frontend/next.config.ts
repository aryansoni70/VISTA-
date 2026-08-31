import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude better-sqlite3 from client-side bundling
  serverExternalPackages: ["better-sqlite3"],
  // Increase the body parser limit for file uploads
  experimental: {
    serverActions: {
      bodySizeLimit: "500mb",
    },
  },
};

export default nextConfig;
