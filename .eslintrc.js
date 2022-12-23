module.exports = {
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"next/core-web-vitals",
		"prettier"
	],
	rules: {
		"no-restricted-imports": [
			"error",
			{
				paths: [
					{
						name: "@mui/icons-material",
						message:
							"Import icons one-by-one, e.g.: `import WhateverIcon from @mui/icons-material/Whatever`, otherwise it tries to import all of them"
					}
				],
				patterns: [
					{
						group: ["@mui/*/*/*", ",!@mui/material/test-utils/*"],
						message: "Material UI tells us we should not import from 4th level ever."
					},
					{
						group: ["@mui/system"],
						message: "Import from @mui/material instead."
					}
				]
			}
		]
	}
};
