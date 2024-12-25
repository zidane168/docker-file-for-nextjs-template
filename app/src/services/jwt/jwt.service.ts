import { storageKeyConstants } from "@/utils/constants";

import { appStorageService, storageService } from "..";
import { OptionsType } from "cookies-next/lib/types";
import { envConfig } from "@/utils/config";

export const getToken = (cookieOptions?: OptionsType) => {
  return (
    storageService.getCookieItem(storageKeyConstants.AUTH_TOKEN, {
      ...cookieOptions,
    }) || ""
  );
};

export const saveToken = (token: string, cookieOptions?: OptionsType) => {
  storageService.saveCookieItem(storageKeyConstants.AUTH_TOKEN, token, {
    ...cookieOptions,
    ...(envConfig.NODE_ENV !== "development"
      ? {
          secure: true,
        }
      : {}),
  });
};

export const destroyToken = (cookieOptions?: OptionsType) => {
  appStorageService.destroyCookieAuthUserId();
  storageService.destroyCookieItem(storageKeyConstants.AUTH_TOKEN, {
    ...cookieOptions,
  });
};
