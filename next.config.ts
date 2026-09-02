import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy /api/py/* requests to the Python AI engine
  async rewrites() {
    const aiEngineUrl =
      process.env.AI_ENGINE_URL || "http://127.0.0.1:8000";

    return [
      {
        source: "/api/py/:path*",
        destination: `${aiEngineUrl}/py/:path*`,
      },
    ];
  },
};

export default nextConfig;
