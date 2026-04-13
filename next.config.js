/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: true,
}
