import type {
  FetchAdminUsersPayload,
  FetchAdminUsersResponseData,
  FetchAdminUserResponseData,
  UpdateAdminUserStatusPayload,
  UpdateAdminUserPayload,
  CreateAdminUserPayload,
  DeleteAdminUserPayload,
} from "@/utils/apis/adminUser";

export enum AdminUserActionTypes {
  FETCH_REQUESTED = "@@adminUser/FETCH_REQUESTED",
  FETCH_SUCCEEDED = "@@adminUser/FETCH_SUCCEEDED",
  FETCH_FAILED = "@@adminUser/FETCH_FAILED",

  UPDATE_ADMIN_USER_STATUS_SUCCEEDED = "@@adminUser/UPDATE_ADMIN_USER_STATUS_SUCCEEDED",

  FETCH_ADMIN_USER_SUCCEEDED_SERVER = "@@adminUser/FETCH_ADMIN_USER_SUCCEEDED_SERVER",

  // Saga
  FETCH_ADMIN_USERS_SAGA = "@@adminUser/FETCH_ADMIN_USERS_SAGA",
  UPDATE_ADMIN_USER_STATUS_SAGA = "@@adminUser/UPDATE_ADMIN_USER_STATUS_SAGA",
  UPDATE_ADMIN_USER_SAGA = "@@adminUser/UPDATE_ADMIN_USER_SAGA",
  CREATE_ADMIN_USER_SAGA = "@@adminUser/CREATE_ADMIN_USER_SAGA",
  DELETE_ADMIN_USER_SAGA = "@@adminUser/DELETE_ADMIN_USER_SAGA",
}

// State

export interface AdminUserState {
  hydrated?: boolean;

  adminUsers: FetchAdminUsersResponseData["data"];
  adminUsersLoading: boolean;
  adminUsersError: string;
  adminUsersCount: number;

  adminUser: FetchAdminUserResponseData["data"] | null;
  adminUserLoading: boolean;
  adminUserError: string;
}

// ---- Reducer Action ----

export type FetchScope = "adminUsers" | "adminUser";

export type FetchRequestedAction = {
  type: AdminUserActionTypes.FETCH_REQUESTED;
  payload: {
    scope: FetchScope;
    isReset?: boolean;
  };
};

export type FetchSucceededAction = {
  type: AdminUserActionTypes.FETCH_SUCCEEDED;
  payload: {
    scope: FetchScope;
    data: AdminUserState[FetchScope];
    count?: number;
    isLoadMore?: boolean;
  };
};

export type FetchFailedAction = {
  type: AdminUserActionTypes.FETCH_FAILED;
  payload: {
    scope: FetchScope;
    error: string;
  };
};

export type FetchAdminUserSucceededServerAction = {
  type: AdminUserActionTypes.FETCH_ADMIN_USER_SUCCEEDED_SERVER;
  payload: FetchAdminUserResponseData["data"] | null;
};

export type UpdateAdminUserStatusSucceededAction = {
  type: AdminUserActionTypes.UPDATE_ADMIN_USER_STATUS_SUCCEEDED;
  payload: {
    id: number;
    is_enabled: BooleanNumber;
  };
  meta?: {
    resolve?: (payload?: any) => void;
  };
};

// ---- Saga Action ----

export type FetchAdminUsersSagaAction = {
  type: AdminUserActionTypes.FETCH_ADMIN_USERS_SAGA;
  payload?: FetchAdminUsersPayload;
  meta?: {
    isLoadMore?: boolean;
    isReset?: boolean;
    resolve?: (payload?: any) => void;
  };
};

export type UpdateAdminUserStatusSagaAction = {
  type: AdminUserActionTypes.UPDATE_ADMIN_USER_STATUS_SAGA;
  payload: UpdateAdminUserStatusPayload;
  meta?: {
    resolve?: (payload?: any) => void;
  };
};

export type UpdateAdminUserSagaAction = {
  type: AdminUserActionTypes.UPDATE_ADMIN_USER_SAGA;
  payload: UpdateAdminUserPayload;
  meta?: {
    resolve?: (payload?: any) => void;
  };
};

export type CreateAdminUserSagaAction = {
  type: AdminUserActionTypes.CREATE_ADMIN_USER_SAGA;
  payload: CreateAdminUserPayload;
  meta?: {
    resolve?: (payload?: any) => void;
  };
};

export type DeleteAdminUserSagaAction = {
  type: AdminUserActionTypes.DELETE_ADMIN_USER_SAGA;
  payload: DeleteAdminUserPayload;
  meta?: {
    resolve?: (payload?: any) => void;
  };
};

export type AdminUserAction =
  | FetchRequestedAction
  | FetchSucceededAction
  | FetchFailedAction
  | FetchAdminUserSucceededServerAction
  | UpdateAdminUserStatusSucceededAction
  //
  | FetchAdminUsersSagaAction
  | UpdateAdminUserStatusSagaAction
  | UpdateAdminUserSagaAction
  | CreateAdminUserSagaAction
  | DeleteAdminUserSagaAction;
