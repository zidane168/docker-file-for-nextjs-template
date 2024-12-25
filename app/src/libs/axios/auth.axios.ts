import axios from "axios";

import { envConfig, localeConfig } from "@/utils/config";
import { jwtService } from "@/services";
import { broadcastChannelNameConstants } from "@/utils/constants";

import type { AxiosError } from "axios";

const authAxios = axios.create({
  baseURL: envConfig.API_BASE_URL,
});

authAxios.interceptors.request.use(
  (req) => {
    const language =
      localeConfig.localeToConfigMap[
        typeof window !== "undefined" ? window.NextPublic.lang : "en-US"
      ].requestedValue;
    if (typeof req.headers["Locale"] === "undefined") {
      req.headers["Locale"] = language;
    }

    if (!req.headers.Authorization) {
      const token = jwtService.getToken();
      if (!!token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    }

    switch ((req.method as string).toUpperCase()) {
      case "GET": {
        req.params = req.params || {};
        // Object.assign(req.params, {});
        break;
      }
      case "POST": {
        // if (!(req.data instanceof FormData) && !!req.data) {
        //   req.data = commonHelpers.formatFormData(req.data);
        // }

        // if (req.data instanceof FormData) {
        // } else {
        //   req.data = req.data || {};
        //   // Object.assign(req.params, {});
        // }
        break;
      }
      case "PUT": {
        // if (!(req.data instanceof FormData) && !!req.data) {
        //   req.data = commonHelpers.formatFormData(req.data);
        // }
        // if (req.data instanceof FormData) {
        //   // req.data.append("language", window.NextPublic.lang);
        // } else {
        //   req.data = req.data || {};
        //   // Object.assign(req.params, {});
        // }
        break;
      }
    }
    return req;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

authAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const authExpiredTokenBc = new BroadcastChannel(
          broadcastChannelNameConstants.AUTH_EXPIRED_TOKEN
        );
        authExpiredTokenBc.postMessage(null);
      }
    }
    return Promise.reject(error);
  }
);

export default authAxios;
