/** @type import('next').NextConfig */
const nextConfig = {
	reactStrictMode: true,
	optimizeFonts: false, // https://github.com/vercel/next.js/issues/24640#issuecomment-879296080
	compiler: {
		emotion: true
	},
	pageExtensions: ["api.ts", "page.tsx"],
	experimental: {
		modularizeImports: {
			"@mui/material": {
				transform: "@mui/material/{{member}}"
			},
			"@mui/lab": {
				transform: "@mui/lab/{{member}}"
			},
			"@mui/base": {
				transform: "@mui/base/{{member}}"
			}
		}
	},
	images: {
		domains: ["cdn.discordapp.com"]
	}
};

module.exports = nextConfig;
