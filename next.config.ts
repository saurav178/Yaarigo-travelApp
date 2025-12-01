// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Main Unsplash domain
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Unsplash “plus” premium domain (your failing one)
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      // Fallbacks (used by getPosts for dynamic images)
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

