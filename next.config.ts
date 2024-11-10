// import type { NextConfig } from "next";

// const isProd = process.env.NODE_ENV === 'production';
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     unoptimized: true, // Disable default image optimization
//   },
//   assetPrefix: isProd ? '/arknights-module-checklist/' : '',
//   basePath: isProd ? '/arknights-module-checklist' : '',
//   output: 'export'
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'export',
}

export default nextConfig