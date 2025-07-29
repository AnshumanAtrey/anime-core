/** @type {import('next').NextConfig} */
const { withNextVideo } = require('next-video/process');

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['localhost'],
  },
  // Add any other Next.js config options here
};

module.exports = withNextVideo(nextConfig);
