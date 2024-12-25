/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  output: "standalone",
  i18n: {
    localeDetection: false,
    ...i18n,
  },
  experimental: {
    optimizePackageImports: [
      "lodash",
      "@mui/material",
      "@mui/icons-material",
      "@mui/x-date-pickers",
      "@mui/system",
      "next-seo",
      "@reduxjs/toolkit",
      "@tanstack/react-table",
      "@toolpad/core",
      "firebase",
      "libphonenumber-js",
      "react-toastify",
      "react-virtualized-auto-sizer",
      "react-window",
      "react-window-infinite-loader",
      "redux",
      "redux-saga",
      "swiper",
      "tss-react",
      "ua-parser-js",
      "uuid",
      "yup",
      "react-advanced-cropper",
    ],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    formats: ["image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_CDN_DOMAIN,
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  rewrites() {
    return [
      {
        source: "/firebase-messaging-sw.js",
        destination: "/api/firebase-messaging-sw",
      },
      {
        source: "/robots.txt",
        destination: "/api/common/robots",
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset",
      resourceQuery: /url/,
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] },
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
