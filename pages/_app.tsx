import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { MyTheme } from "components/myTheme";
import "styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<title>Notion game-voting app 3000</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<ThemeProvider theme={MyTheme}>
			<Component {...pageProps} />
		</ThemeProvider>
	</>
);

export default MyApp;
