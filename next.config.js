/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  optimizeFonts: false, // https://github.com/vercel/next.js/issues/24640#issuecomment-879296080
  compiler: {
    styledComponents: true
  }
}

module.exports = nextConfig
