import mediaQuery from "css-mediaquery";

import { localeConfig } from "@/utils/config";
import defaultTheme from "./theme.default";

import { useMemo } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { TssCacheProvider } from "tss-react";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";

import { useTranslation } from "next-i18next";

import type { PropsWithChildren } from "react";
import type { MuiEmotionCache } from "@/libs/createMuiEmotionCache";
import type { AppEmotionCache } from "@/libs/createAppEmotionCache";

type Viewport = "mobile" | "desktop";

type AppThemeProviderProps<V extends string = Viewport> = PropsWithChildren<{
  viewport?: V;
  muiEmotionCache: MuiEmotionCache;
  appEmotionCache: AppEmotionCache;
}>;

export const theme = createTheme(defaultTheme);

const tabletSsrMatchMedia = (query: string) => ({
  matches: mediaQuery.match(query, {
    width: "0px",
  }),
});

const desktopSsrMatchMedia = (query: string) => ({
  matches: mediaQuery.match(query, {
    width: `${theme.breakpoints.values.md}px`,
  }),
});

const AppThemeProvider = <V extends string = Viewport>(
  props: AppThemeProviderProps<V>
) => {
  const {
    children,
    viewport = "desktop",
    appEmotionCache,
    muiEmotionCache,
  } = props;

  const { i18n } = useTranslation();
  const locale = i18n.language;

  const currentTheme = useMemo(
    () =>
      createTheme(
        {
          ...theme,
          components: {
            ...theme.components,
            MuiUseMediaQuery: {
              defaultProps: {
                ssrMatchMedia:
                  viewport === "mobile"
                    ? tabletSsrMatchMedia
                    : desktopSsrMatchMedia,
                noSsr: true,
              },
            },
          },
        },
        localeConfig.localeToConfigMap[locale]
      ),
    [theme, locale, viewport]
  );

  return (
    <CacheProvider value={muiEmotionCache}>
      <TssCacheProvider value={appEmotionCache}>
        <MuiThemeProvider theme={currentTheme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </TssCacheProvider>
    </CacheProvider>
  );
};

export default AppThemeProvider;
