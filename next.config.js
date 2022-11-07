/** @type import('next').NextConfig */
const nextConfig = {
	reactStrictMode: true,
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
