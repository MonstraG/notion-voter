import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider, type SessionProviderProps } from "next-auth/react";
import { CacheProvider } from "@emotion/react";
import styled from "components/styles/styled";
import { SWRConfig } from "swr";
import createCache from "@emotion/cache";
import { get } from "pages/requests";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "components/styles/theme";

const cache = createCache({ key: "css", prepend: true });

const Main = styled("main")`
	display: flex;
	justify-content: center;
	padding: 4rem 2rem 20vh;
`;

const MyApp = ({
	Component,
	pageProps: { session, ...pageProps }
}: AppProps<SessionProviderProps>) => (
	<CacheProvider value={cache}>
		<Head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="icon" href="/favicon.ico" />
			<title>Notion game-voting app 3000</title>
		</Head>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SessionProvider session={session}>
				<SWRConfig value={{ fetcher: get }}>
					<Main>
						<Component {...pageProps} />
					</Main>
				</SWRConfig>
			</SessionProvider>
		</ThemeProvider>
	</CacheProvider>
);

export default MyApp;
