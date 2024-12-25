import { authAxios } from "@/libs/axios";

import type {
  FetchRolesPayload,
  FetchRolesResponseData,
  FetchOptionRolesPayload,
  FetchOptionRolesResponseData,
  CreateRolePayload,
  UpdateRolePayload,
  UpdateRoleEnabledPayload,
  DeleteRolePayload,
  FetchRolePayload,
  FetchRoleResponseData,
} from "./role.api.types";
import type { AxiosResponseData } from "@/libs/axios";

const roleApi = {
  fetchRoles: (payload?: FetchRolesPayload) => {
    return authAxios.get<AxiosResponseData<FetchRolesResponseData>>("roles", {
      params: payload?.params,
      cancelToken: payload?.cancelToken,
    });
  },
  fetchOptionRoles: (payload?: FetchOptionRolesPayload) => {
    return authAxios.get<AxiosResponseData<FetchOptionRolesResponseData>>(
      "roles/select_list",
      {
        params: payload?.params,
        cancelToken: payload?.cancelToken,
      }
    );
  },
  fetchRole: (payload: FetchRolePayload) => {
    const { id, ...params } = payload.params;
    return authAxios.get<AxiosResponseData<FetchRoleResponseData>>(
      `roles/${id}`,
      {
        params: params,
        cancelToken: payload?.cancelToken,
        headers: payload.headers,
      }
    );
  },
  createRole: (payload: CreateRolePayload) => {
    return authAxios.post<AxiosResponseData>("roles", payload.params, {
      cancelToken: payload?.cancelToken,
    });
  },
  updateRole: (payload: UpdateRolePayload) => {
    const { id, ...params } = payload.params;
    return authAxios.put<AxiosResponseData>(`roles/${id}`, params, {
      cancelToken: payload?.cancelToken,
    });
  },
  updateRoleEnabled: (payload: UpdateRoleEnabledPayload) => {
    const { id, ...params } = payload.params;
    return authAxios.patch<AxiosResponseData>(`roles/enable/${id}`, params, {
      cancelToken: payload?.cancelToken,
    });
  },
  deleteRole: (payload: DeleteRolePayload) => {
    const { id } = payload.params;
    return authAxios.delete<AxiosResponseData>(`roles/${id}`, {
      cancelToken: payload?.cancelToken,
    });
  },
};

export default roleApi;
