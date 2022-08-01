/** @type import('next').NextConfig */
const nextConfig = {
	swcMinify: true,
	reactStrictMode: true,
	optimizeFonts: false, // https://github.com/vercel/next.js/issues/24640#issuecomment-879296080
	compiler: {
		emotion: true
	},
	experimental: {
		legacyBrowsers: false,
		browsersListForSwc: true
	},
	images: {
		domains: ["cdn.discordapp.com"]
	}
};

module.exports = nextConfig;
