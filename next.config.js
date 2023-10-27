/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "images.unsplash.com", "media.gettyimages.com"],
  },
};

module.exports = nextConfig;
