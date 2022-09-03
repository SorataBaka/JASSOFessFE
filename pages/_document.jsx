import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html>
			<Head>
				<Script
					id="google-ads"
					async={true}
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1472555358889864"
					crossorigin="anonymous"
					onError={(e) => {
						console.error("Failed to load", e);
					}}
					strategy="beforeInteractive"
				/>
				<Script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-LHC78WB0W7"
				/>
				<Script id="google-analytics" strategy="beforeInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){
							dataLayer.push(arguments);
						}
						gtag('js', new Date());
						gtag('config', 'G-LHC78WB0W7');
				`}
				</Script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
