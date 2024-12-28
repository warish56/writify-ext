import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: 'dist',
  reactStrictMode: true,
  images: {
    localPatterns: [
      {
        pathname: '/asset/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
