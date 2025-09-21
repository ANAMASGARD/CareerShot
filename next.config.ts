import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  
  // For Google Cloud Run
  experimental: {
    serverComponentsExternalPackages: ['@google-cloud/vertexai', '@google/generative-ai']
  }
};

export default nextConfig;
