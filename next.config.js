/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["tfm-maps.ru", "i.imgur.com", "151.248.121.176", "cdn.tfm-maps.ru", "cdn.onlyplanks.fun"],
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
