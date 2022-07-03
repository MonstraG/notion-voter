import { AppProps } from "next/app";
import Head from "next/head";
import "components/styling/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@emotion/react";
import theme from "components/styling/theme";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "components/styling/createEmotionTheme";
import styled from "components/styling/styled";
import { SWRConfig } from "swr";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface AppPropsEmotion extends AppProps {
	emotionCache?: EmotionCache;
}

const Main = styled("main")`
	display: flex;
	justify-content: center;
	padding: 4rem 2rem 20vh;
`;

const MyApp = ({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps: { session, ...pageProps }
}: AppPropsEmotion) => (
	<CacheProvider value={emotionCache}>
		<Head>
			<title>Notion game-voting app 3000</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<ThemeProvider theme={theme}>
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
