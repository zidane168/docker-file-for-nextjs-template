import { authAxios, commonAxios } from "@/libs/axios";

import type {
  SignInPayload,
  FetchAuthUserPayload,
  FetchAuthUserResponseData,
  SignOutPayload,
  UpdateMyProfilePayload,
} from "./auth.api.types";
import type { AxiosResponseData } from "@/libs/axios";

const authApi = {
  signOut: (payload?: SignOutPayload) => {
    return authAxios.post<AxiosResponseData>("auth/logout", undefined, {
      cancelToken: payload?.cancelToken,
    });
  },
  signIn: (payload: SignInPayload) => {
    return commonAxios.post<AxiosResponseData>("auth/login", payload.params, {
      cancelToken: payload.cancelToken,
    });
  },
  fetchAuthUser: (payload?: FetchAuthUserPayload) => {
    return authAxios.get<AxiosResponseData<FetchAuthUserResponseData>>(
      "auth/profile",
      {
        cancelToken: payload?.cancelToken,
        headers: payload?.headers,
      }
    );
  },
  updateMyProfile: (payload: UpdateMyProfilePayload) => {
    return authAxios.put<AxiosResponseData<FetchAuthUserResponseData>>(
      "auth/profile",
      payload.params,
      {
        cancelToken: payload?.cancelToken,
        headers: payload?.headers,
      }
    );
  },
};

export default authApi;
