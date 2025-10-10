/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',                // next export -> static
  images: { unoptimized: true },
  basePath: '/bonsaibri',          // project pages live at /<repo>
  assetPrefix: '/bonsaibri/',      // static assets served under /<repo>/
  trailingSlash: true,             // ensures folder/index.html output
}
