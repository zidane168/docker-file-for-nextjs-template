import type { CancelToken, RawAxiosRequestHeaders } from "axios";

type Payload = {
  cancelToken?: CancelToken;
  headers?: RawAxiosRequestHeaders;
};

export type SignInPayload = {
  params: {
    username: string;
    password: string;
  };
} & Payload;

export type FetchAuthUserPayload = Payload;
export type FetchAuthUserResponseData = {
  data: {
    id: number;
    name: string;
    is_enabled_notification: BooleanNumber;
    username: string;
    is_enabled: BooleanNumber;
    role: {
      id: number;
      name: string;
      display_name: string;
      permissions: {
        id: number;
        name: string;
        display_name: string;
      }[];
    } | null;
  };
};

export type SignOutPayload = {
  params?: {
    fcm_token?: string;
  };
} & Payload;

export type UpdateMyProfilePayload = {
  params: {
    name: string;
    password?: string;
    password_confirmation?: string;
    is_enabled_notification: BooleanNumber;
  };
} & Payload;
export type UpdateMyProfileResponse = FetchAuthUserResponseData;
