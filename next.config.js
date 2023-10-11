/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tfm-maps.ru', 'i.imgur.com', '151.248.121.176']

  },
  experimental: {
    forceSwcTransforms: true
  },
  env: {
    BASE_API_URL: process.env.BASE_API_URL
  }
}

module.exports = nextConfig
