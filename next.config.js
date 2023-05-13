/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tfm-maps.ru']

  },
  experimental: {
    forceSwcTransforms: true
  }
}

module.exports = nextConfig
