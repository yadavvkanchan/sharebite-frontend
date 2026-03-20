/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'www.narayansevausa.org',
      'images.unsplash.com',
      'source.unsplash.com',
      'cdn.pixabay.com',
      'pixabay.com'
    ],
  },
};

export default nextConfig;