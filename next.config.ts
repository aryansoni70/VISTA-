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
  async rewrites() {
    return [
      {
        source: "/api/py/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/py/:path*"
            : "/api/",
      },
    ];
  },
};

export default nextConfig;
