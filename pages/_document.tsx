import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "components/styling/createEmotionTheme";

export default class MyDocument extends Document {
	override render = () => (
		<Html translate="no">
			<Head>
				<link rel="shortcut icon" href="public/favicon.ico" />
				<>{(this.props as any).emotionStyleTags}</>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

// https://github.com/mui/material-ui/blob/master/examples/nextjs-with-typescript/pages/_document.tsx
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
	const originalRenderPage = ctx.renderPage;

	// You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
	// However, be aware that it can have global side effects.
	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App: any) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />;
				}
		});

	const initialProps = await Document.getInitialProps(ctx);
	// This is important. It prevents emotion to render invalid HTML.
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(" ")}`}
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	return {
		...initialProps,
		emotionStyleTags
	};
};
