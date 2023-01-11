import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["cyrillic", "latin", "latin-ext"], display: "swap" });

const themeOptions: ThemeOptions = {
	palette: {
		mode: "dark",
		primary: {
			main: "#6200ee"
		}
	},
	typography: {
		fontFamily: `${inter.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`
	}
};

export const theme = createTheme(themeOptions);
