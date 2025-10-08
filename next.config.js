const isCI = !!process.env.GITHUB_ACTIONS
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''

/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isCI ? `/${repo}` : '',
  assetPrefix: isCI ? `/${repo}/` : '',
  trailingSlash: true,
}
