import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@emotion/react";
import theme from "components/styles/theme";
import { CacheProvider } from "@emotion/react";
import styled from "components/styles/styled";
import { SWRConfig } from "swr";
import globalStyles from "components/styles/globalStyles";
import createCache from "@emotion/cache";

const cache = createCache({ key: "css", prepend: true });

const Main = styled("main")`
	display: flex;
	justify-content: center;
	padding: 4rem 2rem 20vh;
`;

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
	<CacheProvider value={cache}>
		<Head>
			<title>Notion game-voting app 3000</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<ThemeProvider theme={theme}>
			{globalStyles}
			<SessionProvider session={session}>
				<SWRConfig value={{ fetcher: (url: string) => fetch(url).then((res) => res.json()) }}>
					<Main>
						<Component {...pageProps} />
					</Main>
				</SWRConfig>
			</SessionProvider>
		</ThemeProvider>
	</CacheProvider>
);

export default MyApp;
