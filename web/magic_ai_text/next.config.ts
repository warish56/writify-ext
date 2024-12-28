import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  reactStrictMode: true,
  images: {
    localPatterns: [
      {
        pathname: 'public/asset/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
