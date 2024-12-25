import { enUS, viVN } from "@mui/material/locale";

import { interFonts } from "@/utils/fonts";
import * as envConfig from "./env.config";

export const DEFAULT_LOCALE = envConfig.DEFAULT_LOCALE;

export const DEFAULT_FONT_VARIABLE = interFonts.inter.variable;

export const localeToConfigMap = {
  "en-US": {
    label: "English",
    themeLocale: enUS,
    font: interFonts.inter,
    imageSrc: "/images/svgs/en-us-flag.svg",
    requestedValue: "en-us",
  },
  "vi-VN": {
    label: "Tiếng Việt",
    themeLocale: viVN,
    font: interFonts.inter,
    imageSrc: "/images/svgs/vi-vn-flag.svg",
    requestedValue: "vi-vn",
  },
} as Record<
  string,
  {
    label: string;
    themeLocale: typeof enUS;
    font: typeof interFonts.inter;
    imageSrc: string;
    requestedValue: string;
  }
>;

export const localeConfigs = Object.entries(localeToConfigMap).map(
  ([locale, config]) => ({
    locale,
    ...config,
  })
);

export const locales = Object.entries(localeToConfigMap).map(
  ([locale]) => locale
);
