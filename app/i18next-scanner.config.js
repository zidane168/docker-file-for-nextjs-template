module.exports = {
  input: [
    "src/views/**/*.{js,jsx,ts,tsx}",
    "src/components/**/*.{js,jsx,ts,tsx}",
    "src/theme/**/*.{js,jsx,ts,tsx}",
    "src/guards/**/*.{js,jsx,ts,tsx}",
    "src/hooks/**/*.{js,jsx,ts,tsx}",
    "src/layouts/**/*.{js,jsx,ts,tsx}",
    "src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  output: "./",
  options: {
    removeUnusedKeys: true,
    sort: false,
    func: {
      list: ["t"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    trans: {
      component: "Trans",
      i18nKey: "i18nKey",
      defaultsKey: "defaults",
    },
    lngs: ["en-US", "zh-HK", "zh-CN"],
    ns: ["common"],
    defaultLng: "en-US",
    defaultNs: "common",
    defaultValue: (lng, ns, key) => key,
    resource: {
      loadPath: "public/locales/{{lng}}/{{ns}}.json",
      savePath: "public/locales/{{lng}}/{{ns}}.json",
    },
  },
};
