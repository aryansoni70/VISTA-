import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy /api/py/* requests to the Python AI engine
  async rewrites() {
    let aiEngineUrl = process.env.AI_ENGINE_URL || "http://127.0.0.1:8000";
    
    // Auto-fix if the URL is missing http:// or https://
    if (!aiEngineUrl.startsWith("http://") && !aiEngineUrl.startsWith("https://")) {
      aiEngineUrl = `https://${aiEngineUrl}`;
    }

    // Ensure no trailing slash
    aiEngineUrl = aiEngineUrl.replace(/\/$/, "");

    return [
      {
        source: "/api/py/:path*",
        destination: `${aiEngineUrl}/py/:path*`,
      },
    ];
  },
};

export default nextConfig;
