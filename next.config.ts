import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import { rehypePrettyCode } from "rehype-pretty-code";
import { NextConfig } from "next";

if (!process.env.CDN_HOST) {
  throw new Error("CDN_HOST is required");
}

if (!process.env.SERVER_ACTIONS_ALLOWED_ORIGINS) {
  throw new Error("SERVER_ACTIONS_ALLOWED_ORIGINS is required");
}

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.CDN_HOST,
      },
    ],
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  transpilePackages: ["highlight.js"],
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.SERVER_ACTIONS_ALLOWED_ORIGINS],
    },
  },
  poweredByHeader: false,
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrettyCode],
  },
});

export default withMDX(nextConfig);
