import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html>
			<Head>
				<Script
					async={true}
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1472555358889864"
					crossorigin="anonymous"
					onError={(e) => {
						console.error("Failed to load", e);
					}}
					strategy="beforeInteractive"
				></Script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
