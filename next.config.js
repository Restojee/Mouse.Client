/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['tfm-maps.ru', 'i.imgur.com', '151.248.121.176', 'cdn.tfm-maps.ru']

  },
  experimental: {
    forceSwcTransforms: true
  },
  env: {
    BASE_API_URL: process.env.BASE_API_URL,
    FILE_STORAGE_URL: process.env.FILE_STORAGE_URL,
  }
}

module.exports = nextConfig
