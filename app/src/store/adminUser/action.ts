import { AdminUserActionTypes } from "./types";
import type {
  FetchRequestedAction,
  FetchSucceededAction,
  FetchFailedAction,
  FetchAdminUserSucceededServerAction,
  UpdateAdminUserStatusSucceededAction,
  // Saga
  FetchAdminUsersSagaAction,
  UpdateAdminUserStatusSagaAction,
  CreateAdminUserSagaAction,
  UpdateAdminUserSagaAction,
  DeleteAdminUserSagaAction,
} from "./types";

// ---- REDUCER ACTION ----

export const fetchRequested = (
  payload: FetchRequestedAction["payload"]
): FetchRequestedAction => ({
  type: AdminUserActionTypes.FETCH_REQUESTED,
  payload,
});

export const fetchSucceeded = (
  payload: FetchSucceededAction["payload"]
): FetchSucceededAction => ({
  type: AdminUserActionTypes.FETCH_SUCCEEDED,
  payload,
});

export const fetchFailed = (
  payload: FetchFailedAction["payload"]
): FetchFailedAction => ({
  type: AdminUserActionTypes.FETCH_FAILED,
  payload,
});

export const fetchAdminUserSucceededServer = (
  payload: FetchAdminUserSucceededServerAction["payload"]
): FetchAdminUserSucceededServerAction => ({
  type: AdminUserActionTypes.FETCH_ADMIN_USER_SUCCEEDED_SERVER,
  payload,
});

export const updateAdminUserStatusSucceeded = (
  payload: UpdateAdminUserStatusSucceededAction["payload"]
): UpdateAdminUserStatusSucceededAction => ({
  type: AdminUserActionTypes.UPDATE_ADMIN_USER_STATUS_SUCCEEDED,
  payload,
});

// ---- SAGA ACTION ----

export const fetchAdminUsersSaga = (
  payload?: FetchAdminUsersSagaAction["payload"],
  meta?: FetchAdminUsersSagaAction["meta"]
): FetchAdminUsersSagaAction => ({
  type: AdminUserActionTypes.FETCH_ADMIN_USERS_SAGA,
  payload,
  meta,
});

export const updateAdminUserStatusSaga = (
  payload: UpdateAdminUserStatusSagaAction["payload"],
  meta?: UpdateAdminUserStatusSagaAction["meta"]
): UpdateAdminUserStatusSagaAction => ({
  type: AdminUserActionTypes.UPDATE_ADMIN_USER_STATUS_SAGA,
  payload,
  meta,
});

export const updateAdminUserSaga = (
  payload: UpdateAdminUserSagaAction["payload"],
  meta?: UpdateAdminUserSagaAction["meta"]
): UpdateAdminUserSagaAction => ({
  type: AdminUserActionTypes.UPDATE_ADMIN_USER_SAGA,
  payload,
  meta,
});

export const createAdminUserSaga = (
  payload: CreateAdminUserSagaAction["payload"],
  meta?: CreateAdminUserSagaAction["meta"]
): CreateAdminUserSagaAction => ({
  type: AdminUserActionTypes.CREATE_ADMIN_USER_SAGA,
  payload,
  meta,
});

export const deleteAdminUserSaga = (
  payload: DeleteAdminUserSagaAction["payload"],
  meta?: DeleteAdminUserSagaAction["meta"]
): DeleteAdminUserSagaAction => ({
  type: AdminUserActionTypes.DELETE_ADMIN_USER_SAGA,
  payload,
  meta,
});
