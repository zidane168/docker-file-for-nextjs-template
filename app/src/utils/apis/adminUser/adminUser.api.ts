import { authAxios } from "@/libs/axios";

import type {
  FetchAdminUsersPayload,
  FetchAdminUsersResponseData,
  FetchAdminUserPayload,
  FetchAdminUserResponseData,
  UpdateAdminUserStatusPayload,
  UpdateAdminUserPayload,
  CreateAdminUserPayload,
  DeleteAdminUserPayload,
  FetchOptionAdminUsersPayload,
  FetchOptionAdminUsersResponseData,
} from "./adminUser.api.types";
import type { AxiosResponseData } from "@/libs/axios";

const adminUserApi = {
  fetchAdminUsers: (payload?: FetchAdminUsersPayload) => {
    return authAxios.get<AxiosResponseData<FetchAdminUsersResponseData>>(
      "admins",
      {
        params: payload?.params,
        cancelToken: payload?.cancelToken,
      }
    );
  },
  fetchOptionAdminUsers: (payload?: FetchOptionAdminUsersPayload) => {
    return authAxios.get<AxiosResponseData<FetchOptionAdminUsersResponseData>>(
      "admin/select_list",
      {
        params: payload?.params,
        cancelToken: payload?.cancelToken,
      }
    );
  },
  fetchAdminUser: (payload: FetchAdminUserPayload) => {
    return authAxios.get<AxiosResponseData<FetchAdminUserResponseData>>(
      `admins/${payload.params.id}`,
      {
        cancelToken: payload?.cancelToken,
        headers: payload.headers,
      }
    );
  },
  updateAdminUserStatus: (payload: UpdateAdminUserStatusPayload) => {
    const { id, ...params } = payload.params;
    return authAxios.patch<AxiosResponseData>(`admins/enable/${id}`, params, {
      cancelToken: payload?.cancelToken,
    });
  },
  updateAdminUser: (payload: UpdateAdminUserPayload) => {
    const { id, ...params } = payload.params;
    return authAxios.put<AxiosResponseData>(`admins/${id}`, params, {
      cancelToken: payload?.cancelToken,
    });
  },
  createAdminUser: (payload: CreateAdminUserPayload) => {
    return authAxios.post<AxiosResponseData>("admins", payload.params, {
      cancelToken: payload?.cancelToken,
    });
  },
  deleteAdminUser: (payload: DeleteAdminUserPayload) => {
    return authAxios.delete<AxiosResponseData>(`admins/${payload.params.id}`, {
      cancelToken: payload?.cancelToken,
    });
  },
};

export default adminUserApi;
