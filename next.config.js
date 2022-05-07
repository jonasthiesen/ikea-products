/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fakestoreapi.com"]
  },
  experimental: {
    outputStandalone: true,
    scrollRestoration: true,
  }
}

module.exports = nextConfig
