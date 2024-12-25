import type { CancelToken, RawAxiosRequestHeaders } from "axios";

type Payload = {
  cancelToken?: CancelToken;
  headers?: RawAxiosRequestHeaders;
};

export type RegisterFirebaseNotificationDevicePayload = {
  params: {
    fcm_token: string;
  };
} & Payload;

export type FetchSettingsPayload = Payload;
export type FetchSettingsResponseData = {
  data: {
    time_for_beauty_center_accepting: number;
  };
};
