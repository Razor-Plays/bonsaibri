const repoName = 'bonsaibri';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true 
  },
  basePath: process.env.GITHUB_ACTIONS ? `/${repoName}` : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? `/${repoName}/` : '',
  trailingSlash: true,
}

module.exports = nextConfig
