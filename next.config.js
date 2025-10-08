/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  images: {
    unoptimized: true
  },
  // Ensure static export works properly
  trailingSlash: true,
  // Handle API routes in static export
  distDir: 'out',
  // Set outputFileTracingRoot to avoid lockfile warning
  outputFileTracingRoot: process.cwd(),
}

module.exports = nextConfig
