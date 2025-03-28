import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.honda.com.vn",
        // port: "3000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
