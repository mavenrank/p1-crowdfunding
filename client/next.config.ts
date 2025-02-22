// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

// // next.config.js
// module.exports = {
//   experimental: {
//     appDir: true, // Ensure App Router is enabled
//   },
//   reactStrictMode: true,
// };

// const nextConfig: NextConfig = {
//   experimental: {
//     appDir: true, // ✅ Ensures App Router (`app/`) is enabled
//   },
//   webpack(config) {
//     config.resolve.alias = {
//       ...(config.resolve.alias || {}),
//       "@": require("path").resolve(__dirname), // ✅ Enables `@/components/` imports
//     };
//     return config;
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true, // ✅ Enforces best practices
  images: {
    domains: ["example.com"], // ✅ Add any domains needed for image optimization
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname), // ✅ Enables absolute imports like `@/components/...`
    };
    return config;
  },
};

export default nextConfig;
