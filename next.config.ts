import { withSentryConfig } from "@sentry/nextjs";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import { rehypePrettyCode } from "rehype-pretty-code";
import type { NextConfig } from "next";

if (!process.env.CDN_HOST) {
  throw new Error("CDN_HOST is required");
}

if (!process.env.SERVER_ACTIONS_ALLOWED_ORIGINS) {
  throw new Error("SERVER_ACTIONS_ALLOWED_ORIGINS is required");
}

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
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

export default withSentryConfig(withMDX(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "shoet",

  project: "blog-frontend-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
