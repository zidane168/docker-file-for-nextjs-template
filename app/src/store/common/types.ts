import type {
  FetchSettingsPayload,
  FetchSettingsResponseData,
  RegisterFirebaseNotificationDevicePayload,
} from "@/utils/apis/common";

export enum CommonActionTypes {
  FETCH_REQUESTED = "@@auth/FETCH_REQUESTED",
  FETCH_SUCCEEDED = "@@auth/FETCH_SUCCEEDED",
  FETCH_FAILED = "@@auth/FETCH_FAILED",

  SET_FLOAT_ADMIN_SIDEBAR_OPENED = "@@common/SET_FLOAT_ADMIN_SIDEBAR_OPENED",
  SET_ADMIN_SIDEBAR_COLLAPSE_OPENED = "@@common/SET_ADMIN_SIDEBAR_COLLAPSE_OPENED",

  REGISTER_FIREBASE_NOTIFICATION_DEVICE_REQUESTED = "@@common/REGISTER_FIREBASE_NOTIFICATION_DEVICE_REQUESTED",
  REGISTER_FIREBASE_NOTIFICATION_DEVICE_SUCCEEDED = "@@common/REGISTER_FIREBASE_NOTIFICATION_DEVICE_SUCCEEDED",
  // Saga
  REGISTER_FIREBASE_NOTIFICATION_DEVICE_SAGA = "@@common/REGISTER_FIREBASE_NOTIFICATION_DEVICE_SAGA",
  FETCH_SETTINGS_SAGA = "@@common/FETCH_SETTINGS_SAGA",
}

// State

export interface CommonState {
  floatAdminSidebarOpened: boolean;
  adminSidebarCollapseOpened: boolean;
  firebaseNotificationFcmToken: string;

  settings: FetchSettingsResponseData["data"];
  settingsLoading: boolean;
  settingsError: string;
}

// ---- Reducer Action ----

export type FetchScope = "settings";

export type FetchRequestedAction = {
  type: CommonActionTypes.FETCH_REQUESTED;
  payload: {
    scope: FetchScope;
    isReset?: boolean;
  };
};

export type FetchSucceededAction = {
  type: CommonActionTypes.FETCH_SUCCEEDED;
  payload: {
    scope: FetchScope;
    data: CommonState[FetchScope];
    count?: number;
    isLoadMore?: boolean;
  };
};

export type FetchFailedAction = {
  type: CommonActionTypes.FETCH_FAILED;
  payload: {
    scope: FetchScope;
    error: string;
  };
};

export type SetFloatAdminSidebarOpenedAction = {
  type: CommonActionTypes.SET_FLOAT_ADMIN_SIDEBAR_OPENED;
  payload: boolean;
};

export type SetAdminSidebarCollapseOpenedAction = {
  type: CommonActionTypes.SET_ADMIN_SIDEBAR_COLLAPSE_OPENED;
  payload: boolean;
};

export type RegisterFirebaseNotificationDeviceSucceededAction = {
  type: CommonActionTypes.REGISTER_FIREBASE_NOTIFICATION_DEVICE_SUCCEEDED;
  payload: {
    fcm_token: string;
  };
};

export type RegisterFirebaseNotificationDeviceRequestedAction = {
  type: CommonActionTypes.REGISTER_FIREBASE_NOTIFICATION_DEVICE_REQUESTED;
  payload: {
    fcm_token: string;
  };
};

// ---- Saga Action ----

export type RegisterFirebaseNotificationDeviceSagaAction = {
  type: CommonActionTypes.REGISTER_FIREBASE_NOTIFICATION_DEVICE_SAGA;
  payload: RegisterFirebaseNotificationDevicePayload;
  meta?: {
    resolve?: (payload?: any) => void;
  };
};

export type FetchSettingsSagaAction = {
  type: CommonActionTypes.FETCH_SETTINGS_SAGA;
  payload?: FetchSettingsPayload;
  meta?: {
    resolve?: (payload?: any) => void;
    isReset?: boolean;
  };
};

export type CommonAction =
  | FetchRequestedAction
  | FetchSucceededAction
  | FetchFailedAction
  | SetFloatAdminSidebarOpenedAction
  | SetAdminSidebarCollapseOpenedAction
  | RegisterFirebaseNotificationDeviceSucceededAction
  | RegisterFirebaseNotificationDeviceRequestedAction
  // Saga
  | FetchSettingsSagaAction
  | RegisterFirebaseNotificationDeviceSagaAction;
