/** @type {import('next').NextConfig} */
module.exports = {
  // Remove static export for Vercel - Vercel handles dynamic content
  images: { unoptimized: true },
  // Remove basePath for Vercel - Vercel serves from root domain
  trailingSlash: true,
}
