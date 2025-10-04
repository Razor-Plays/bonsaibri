/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  images: {
    unoptimized: true
  },
  // Disable server-side features for static export
  experimental: {
    appDir: true,
  },
  // Ensure static export works properly
  trailingSlash: true,
  // Handle API routes in static export
  distDir: 'out',
}

module.exports = nextConfig
