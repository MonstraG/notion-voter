/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	reactStrictMode: true,
	optimizeFonts: false, // https://github.com/vercel/next.js/issues/24640#issuecomment-879296080
	experimental: {
		emotion: true
	},
	images: {
		domains: ["cdn.discordapp.com"]
	}
};

module.exports = nextConfig;
