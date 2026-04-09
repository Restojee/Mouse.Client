const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // @reduxjs/toolkit 2.0.0-alpha.2 requires redux@5 (dist/es/index.js).
    // Pin webpack to the nested redux copy that ships with toolkit.
    config.resolve.alias["redux"] = path.resolve(
      __dirname,
      "node_modules/@reduxjs/toolkit/node_modules/redux",
    );
    return config;
  },
  reactStrictMode: false,
  images: {
    domains: ["tfm-maps.ru", "i.imgur.com", "151.248.121.176", "cdn.tfm-maps.ru", "cdn.onlyplanks.ru", "localhost"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    forceSwcTransforms: true,
  },
  env: {
    // eslint-disable-next-line no-undef
    BASE_API_URL: process.env.BASE_API_URL,
    // eslint-disable-next-line no-undef
    FILE_STORAGE_URL: process.env.FILE_STORAGE_URL,
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
