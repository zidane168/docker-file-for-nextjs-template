import { CommonActionTypes } from "./types";
import type {
  FetchRequestedAction,
  FetchSucceededAction,
  FetchFailedAction,
  SetAdminSidebarCollapseOpenedAction,
  SetFloatAdminSidebarOpenedAction,
  RegisterFirebaseNotificationDeviceRequestedAction,
  RegisterFirebaseNotificationDeviceSucceededAction,
  // Saga
  FetchSettingsSagaAction,
  RegisterFirebaseNotificationDeviceSagaAction,
} from "./types";

// ---- REDUCER ACTION ----

export const fetchRequested = (
  payload: FetchRequestedAction["payload"]
): FetchRequestedAction => ({
  type: CommonActionTypes.FETCH_REQUESTED,
  payload,
});

export const fetchSucceeded = (
  payload: FetchSucceededAction["payload"]
): FetchSucceededAction => ({
  type: CommonActionTypes.FETCH_SUCCEEDED,
  payload,
});

export const fetchFailed = (
  payload: FetchFailedAction["payload"]
): FetchFailedAction => ({
  type: CommonActionTypes.FETCH_FAILED,
  payload,
});

export const setAdminSidebarCollapseOpened = (
  payload: SetAdminSidebarCollapseOpenedAction["payload"]
): SetAdminSidebarCollapseOpenedAction => ({
  type: CommonActionTypes.SET_ADMIN_SIDEBAR_COLLAPSE_OPENED,
  payload,
});

export const setFloatAdminSidebarOpened = (
  payload: SetFloatAdminSidebarOpenedAction["payload"]
): SetFloatAdminSidebarOpenedAction => ({
  type: CommonActionTypes.SET_FLOAT_ADMIN_SIDEBAR_OPENED,
  payload,
});

export const registerFirebaseNotificationDeviceSucceeded = (
  payload: RegisterFirebaseNotificationDeviceSucceededAction["payload"]
): RegisterFirebaseNotificationDeviceSucceededAction => ({
  type: CommonActionTypes.REGISTER_FIREBASE_NOTIFICATION_DEVICE_SUCCEEDED,
  payload,
});

export const registerFirebaseNotificationDeviceRequested = (
  payload: RegisterFirebaseNotificationDeviceRequestedAction["payload"]
): RegisterFirebaseNotificationDeviceRequestedAction => ({
  type: CommonActionTypes.REGISTER_FIREBASE_NOTIFICATION_DEVICE_REQUESTED,
  payload,
});

// ---- SAGA ACTION ----

export const registerFirebaseNotificationDeviceSaga = (
  payload: RegisterFirebaseNotificationDeviceSagaAction["payload"],
  meta?: RegisterFirebaseNotificationDeviceSagaAction["meta"]
): RegisterFirebaseNotificationDeviceSagaAction => ({
  type: CommonActionTypes.REGISTER_FIREBASE_NOTIFICATION_DEVICE_SAGA,
  payload,
  meta,
});

export const fetchSettingsSaga = (
  payload: FetchSettingsSagaAction["payload"],
  meta?: FetchSettingsSagaAction["meta"]
): FetchSettingsSagaAction => ({
  type: CommonActionTypes.FETCH_SETTINGS_SAGA,
  payload,
  meta,
});
