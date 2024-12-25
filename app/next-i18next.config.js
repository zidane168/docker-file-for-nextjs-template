module.exports = {
  i18n: {
    locales: ["vi-VN", "en-US"],
    defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
