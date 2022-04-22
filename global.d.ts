import "@emotion/react";
import theme from "components/styling/theme";

declare module "@emotion/react" {
	type ThemeType = typeof theme;
	export interface Theme extends ThemeType {}
}
