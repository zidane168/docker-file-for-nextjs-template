import { Noto_Sans, Noto_Sans_TC, Noto_Sans_SC } from "next/font/google";

export const notoSans = Noto_Sans({
  weight: ["400", "500", "600"],
  style: ["normal"],
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--noto-sans-font",
});

export const notoSansTC = Noto_Sans_TC({
  weight: ["400", "500", "600"],
  style: ["normal"],
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--noto-sans-font",
});

export const notoSansSC = Noto_Sans_SC({
  weight: ["400", "500", "600"],
  style: ["normal"],
  subsets: ["latin", "latin-ext", "vietnamese"],
  variable: "--noto-sans-font",
});
