import { Children } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import parser from "ua-parser-js";

import { createAppEmotionCache, createMuiEmotionCache } from "@/libs";
import nextI18nextConfig from "@@/next-i18next.config.js";
import { envConfig, localeConfig } from "@/utils/config";

type CustomMyDocumentProps = {
  app: {
    nonce: string;
  };
};
export default class MyDocument extends Document<CustomMyDocumentProps> {
  render() {
    const locale =
      this.props.__NEXT_DATA__.locale ?? nextI18nextConfig.i18n.defaultLocale;
    const nonce = this.props.app?.nonce;

    return (
      <Html
        lang={locale}
        className={`${localeConfig.localeToConfigMap[locale]?.font?.variable} ${localeConfig.localeToConfigMap[locale]?.font?.className}`}
      >
        <Head nonce={nonce}>
          <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `
                window.NextPublic = ${JSON.stringify({
                  lang: locale,
                  version: envConfig.APP_VERSION,
                } as typeof window.NextPublic)}
              `,
            }}
          />
          {/* <script
            dangerouslySetInnerHTML={{
              __html: `if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function(registration) {
                    console.log('Service Worker registered with scope:', registration.scope);
                  }).catch(function(error) {
                    console.error('Service Worker registration failed:', error);
                  });
                });
              }`,
            }}
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render
  const deviceType = !!ctx?.req
    ? parser(ctx.req.headers["user-agent"]).device.type || "desktop"
    : "desktop";
  const nonceHeaderValue = ctx.req?.headers?.["x-nonce"] as string;

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const muiEmotionCache = createMuiEmotionCache({ nonce: nonceHeaderValue });
  const appEmotionCache = createAppEmotionCache({ nonce: nonceHeaderValue });
  const { extractCriticalToChunks: extractCriticalToChunksMui } =
    createEmotionServer(muiEmotionCache);
  const { extractCriticalToChunks: extractCriticalToChunksApp } =
    createEmotionServer(appEmotionCache);

  /* eslint-disable */
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) =>
        (
          <App
            muiEmotionCache={muiEmotionCache}
            appEmotionCache={appEmotionCache}
            app={{
              deviceType,
              nonce: nonceHeaderValue,
            }}
            {...props}
          />
        ),
    });
  /* eslint-enable */

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStylesApp = extractCriticalToChunksMui(initialProps.html);
  const emotionStyleTagsApp = emotionStylesApp.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      nonce={nonceHeaderValue}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  const emotionStylesMui = extractCriticalToChunksApp(initialProps.html);
  const emotionStyleTagsMui = emotionStylesMui.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      nonce={nonceHeaderValue}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    nonce: nonceHeaderValue,
    app: {
      nonce: nonceHeaderValue,
    } as CustomMyDocumentProps["app"],
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...Children.toArray(initialProps.styles),
      ...emotionStyleTagsApp,
      ...emotionStyleTagsMui,
    ],
  };
};
