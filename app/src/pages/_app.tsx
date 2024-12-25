import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";

// import { END } from "redux-saga";

import { reduxWrapper } from "@/store";
import nextI18NextConfig from "@@/next-i18next.config.js";
import { createAppEmotionCache, createMuiEmotionCache } from "@/libs";

import { commonConfig, envConfig, localeConfig } from "@/utils/config";
import { storageService } from "@/services";
import { commonHelpers } from "@/utils/helpers";

import { Provider } from "react-redux";

import Head from "next/head";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AppThemeProvider, theme } from "@/theme";

import { useTranslation } from "next-i18next";

import "@/assets/scss/app.scss";
import "moment/locale/zh-hk";
import "moment/locale/zh-cn";
import "moment/locale/vi";
import "moment/locale/ja";

import type { NextPage } from "next";
import type { UseTranslationResponse } from "react-i18next";
import type { AppProps } from "next/app";
import type { MuiEmotionCache } from "@/libs/createMuiEmotionCache";
import type { AppEmotionCache } from "@/libs/createAppEmotionCache";

// import type { DefaultSeoProps } from "next-seo";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (
    page: React.ReactElement,
    pageProps: P,
    appProps: {
      translation: UseTranslationResponse<"common", undefined>;
    }
  ) => React.ReactNode;
};

type CustomAppInitialProps = {
  app?: {
    deviceType?: string;
    nonce?: string;
  };
  [key: string]: any;
};

type MyAppProps = AppProps<CustomAppInitialProps> & {
  Component: NextPageWithLayout;
  muiEmotionCache?: MuiEmotionCache;
  appEmotionCache?: AppEmotionCache;
};

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, ...rest } = props;

  const { store, props: wrappedStoreProps } =
    reduxWrapper.useWrappedStore(rest);

  const {
    pageProps: { app, ...pageProps },
  } = wrappedStoreProps as MyAppProps;
  const { nonce, deviceType } = app ?? {};
  const clientSideMuiEmotionCache = createMuiEmotionCache({
    nonce,
  });
  const clientSideAppEmotionCache = createAppEmotionCache({
    nonce,
  });

  const {
    muiEmotionCache = clientSideMuiEmotionCache,
    appEmotionCache = clientSideAppEmotionCache,
  } = wrappedStoreProps as MyAppProps;

  const headerLocale =
    ((pageProps?._nextI18Next?.initialLocale || "").replace(
      "-",
      "_"
    ) as string) || localeConfig.DEFAULT_LOCALE.replace("-", "_");

  const getLayout = Component.getLayout ?? ((page) => page);
  const translation = useTranslation();

  const curVersion = storageService.getLocalItem("version");

  if (curVersion !== envConfig.APP_VERSION) {
    storageService.clearLocal();
    storageService.saveLocalItem("version", envConfig.APP_VERSION);
  }

  return (
    <>
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.svg" type="image/svg" sizes="16px" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <DefaultSeo
        defaultTitle={commonConfig.DOCUMENT_TITLE}
        description={commonConfig.DOCUMENT_DESCRIPTION}
        titleTemplate={`%s | ${commonConfig.DOCUMENT_TITLE}`}
        // facebook={{
        //   appId: commonConfig.FACEBOOK_APP_ID,
        // }}
        openGraph={{
          type: "website",
          url: commonHelpers.getURL("/"),
          title: commonConfig.DOCUMENT_TITLE,
          description: commonConfig.DOCUMENT_DESCRIPTION,
          images: [
            {
              url: commonHelpers.getURL("/images/base-og-image.jpg"),
              alt: `${commonConfig.DOCUMENT_TITLE} - Logo`,
              type: "image/jpg",
            },
          ],
          locale: headerLocale,
          siteName: commonConfig.DOCUMENT_TITLE,
        }}
      />
      <Provider store={store}>
        <AppThemeProvider
          muiEmotionCache={muiEmotionCache}
          appEmotionCache={appEmotionCache}
          viewport={deviceType}
        >
          <ErrorBoundary>
            {getLayout(<Component {...pageProps} />, pageProps, {
              translation,
            })}
          </ErrorBoundary>
        </AppThemeProvider>
      </Provider>
    </>
  );
};

const MyAppWithModule = appWithTranslation(MyApp, nextI18NextConfig);

export default MyAppWithModule;
