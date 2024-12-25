import { authAxios } from "@/libs";

import type {
  RegisterFirebaseNotificationDevicePayload,
  FetchSettingsPayload,
  FetchSettingsResponseData,
} from "./common.api.types";
import type { AxiosResponseData } from "@/libs/axios";

const commonApi = {
  fetchSettings: (payload: FetchSettingsPayload) => {
    return authAxios.get<AxiosResponseData<FetchSettingsResponseData>>(
      "settings",
      {
        cancelToken: payload?.cancelToken,
      }
    );
  },
  registerFirebaseNotificationDevice: (
    payload: RegisterFirebaseNotificationDevicePayload
  ) => {
    return authAxios.post<AxiosResponseData>(
      "staff_device/sync",
      payload.params,
      {
        cancelToken: payload?.cancelToken,
      }
    );
  },
};

export default commonApi;
