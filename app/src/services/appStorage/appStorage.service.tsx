import { storageService } from "..";
import { storageKeyConstants } from "@/utils/constants";

import type { OptionsType } from "cookies-next/lib/types";

export const getCookieAuthUserId = (options?: OptionsType) => {
  return (
    storageService.getCookieItem<number>(
      storageKeyConstants.AUTH_USER_ID,
      options
    ) ?? null
  );
};
export const destroyCookieAuthUserId = (options?: OptionsType) => {
  storageService.destroyCookieItem(storageKeyConstants.AUTH_USER_ID, options);
};
export const saveCookieAuthUserId = (
  userId: number | null,
  options?: OptionsType
) => {
  storageService.saveCookieItem(
    storageKeyConstants.AUTH_USER_ID,
    userId,
    options
  );
};

export const saveCookieLocale = (locale: string, options?: OptionsType) => {
  storageService.saveCookieItem(storageKeyConstants.APP_LOCALE, locale, {
    ...options,
  });
};
