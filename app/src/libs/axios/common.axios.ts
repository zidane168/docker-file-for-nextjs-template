import axios from "axios";

import { envConfig, localeConfig } from "@/utils/config";

import type { AxiosError } from "axios";

const commonAxios = axios.create({
  baseURL: envConfig.API_BASE_URL,
});

commonAxios.interceptors.request.use(
  (req) => {
    const language =
      localeConfig.localeToConfigMap[
        typeof window !== "undefined" ? window.NextPublic.lang : "en-US"
      ].requestedValue;
    if (typeof req.headers["Locale"] === "undefined") {
      req.headers["Locale"] = language;
    }

    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

commonAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default commonAxios;
