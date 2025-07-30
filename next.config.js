/** @type {import('next').NextConfig} */
const { withNextVideo } = require('next-video/process');

const nextConfig = {
  experimental: {
    serverActions: {},
  },
  images: {
    domains: ['localhost', 'img.clerk.com', 'images.clerk.dev'],
  },
  // Add any other Next.js config options here
};

module.exports = withNextVideo(nextConfig);
