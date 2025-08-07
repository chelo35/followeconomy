/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.coingecko.com', 'cdn.coinbase.com', 'cryptologos.cc'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig