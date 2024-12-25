import type {
  SignInPayload,
  SignOutPayload,
  FetchAuthUserResponseData,
  UpdateMyProfileResponse,
  UpdateMyProfilePayload,
} from "@/utils/apis/auth";

export enum AuthActionTypes {
  SIGN_IN_SUCCEEDED = "@@auth/SIGN_IN_SUCCEEDED",
  SIGN_OUT_SUCCEEDED = "@@auth/SIGN_OUT_SUCCEEDED",

  CHECK_AUTH_REQUESTED = "@@auth/CHECK_AUTH_REQUESTED",
  CHECK_AUTH_SUCCEEDED = "@@auth/CHECK_AUTH_SUCCEEDED",
  CHECK_AUTH_FAILED = "@@auth/CHECK_AUTH_FAILED",

  UPDATE_MY_PROFILE_SUCCEEDED = "@@auth/UPDATE_MY_PROFILE_SUCCEEDED",

  // Saga
  CHECK_AUTH_SAGA = "@@auth/CHECK_AUTH_SAGA",
  SIGN_OUT_SAGA = "@@auth/SIGN_OUT_SAGA",
  SIGN_OUT_ON_EXPIRED_TOKEN_SAGA = "@@auth/SIGN_OUT_ON_EXPIRED_TOKEN_SAGA",
  SIGN_IN_SAGA = "@@auth/SIGN_IN_SAGA",
  UPDATE_MY_PROFILE_SAGA = "@@auth/UPDATE_MY_PROFILE_SAGA",
}

// State

export interface AuthState {
  authUser: FetchAuthUserResponseData["data"] | null;
  authUserChecking: boolean;
  authUserCheckedError: string;
  authUserLoading: boolean;
  authUserError: string;
  authUserExpiredToken: boolean;

  authUserPermissions: string[];
}

// ---- Reducer Action ----

export type SignInSucceededAction = {
  type: AuthActionTypes.SIGN_IN_SUCCEEDED;
  payload: FetchAuthUserResponseData["data"];
};

export type CheckAuthRequestedAction = {
  type: AuthActionTypes.CHECK_AUTH_REQUESTED;
};

export type CheckAuthFailedAction = {
  type: AuthActionTypes.CHECK_AUTH_FAILED;
  payload: {
    message: string;
    isNetworkError?: boolean;
  };
};

export type CheckAuthSucceededAction = {
  type: AuthActionTypes.CHECK_AUTH_SUCCEEDED;
  payload: AuthState["authUser"] | null;
};

export type SignOutSucceededAction = {
  type: AuthActionTypes.SIGN_OUT_SUCCEEDED;
  payload?: {
    reason?: string;
  };
};

export type UpdateMyProfileSucceededAction = {
  type: AuthActionTypes.UPDATE_MY_PROFILE_SUCCEEDED;
  payload: UpdateMyProfileResponse["data"];
};

// ---- Saga Action ----

export type SignOutSagaAction = {
  type: AuthActionTypes.SIGN_OUT_SAGA;
  payload?: SignOutPayload;
  meta?: {
    resolve?: (payload?: any) => void;
  };
};

export type SignOutOnExpiredTokenSagaAction = {
  type: AuthActionTypes.SIGN_OUT_ON_EXPIRED_TOKEN_SAGA;
};

export type SignInSagaAction = {
  type: AuthActionTypes.SIGN_IN_SAGA;
  payload: SignInPayload;
  meta?: {
    resolve?: (payload?: any) => void;
  };
};

export type UpdateMyProfileSagaAction = {
  type: AuthActionTypes.UPDATE_MY_PROFILE_SAGA;
  payload: UpdateMyProfilePayload;
  meta?: {
    resolve?: (payload?: any) => void;
  };
};

export type CheckAuthSagaAction = {
  type: AuthActionTypes.CHECK_AUTH_SAGA;
};

export type AuthAction =
  | CheckAuthRequestedAction
  | CheckAuthSucceededAction
  | CheckAuthFailedAction
  | SignInSucceededAction
  | SignOutSucceededAction
  | UpdateMyProfileSucceededAction
  //
  | CheckAuthSagaAction
  | SignOutSagaAction
  | SignOutOnExpiredTokenSagaAction
  | SignInSagaAction
  | UpdateMyProfileSagaAction;
