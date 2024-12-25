import { AuthActionTypes } from "./types";
import type {
  SignOutSucceededAction,
  CheckAuthRequestedAction,
  CheckAuthFailedAction,
  CheckAuthSucceededAction,
  SignInSucceededAction,
  UpdateMyProfileSucceededAction,
  // Saga
  SignOutSagaAction,
  SignOutOnExpiredTokenSagaAction,
  SignInSagaAction,
  CheckAuthSagaAction,
  UpdateMyProfileSagaAction,
} from "./types";

// ---- REDUCER ACTION ----

export const checkAuthRequested = (): CheckAuthRequestedAction => ({
  type: AuthActionTypes.CHECK_AUTH_REQUESTED,
});

export const checkAuthSucceeded = (
  payload: CheckAuthSucceededAction["payload"]
): CheckAuthSucceededAction => ({
  type: AuthActionTypes.CHECK_AUTH_SUCCEEDED,
  payload,
});

export const checkAuthFailed = (
  payload: CheckAuthFailedAction["payload"]
): CheckAuthFailedAction => ({
  type: AuthActionTypes.CHECK_AUTH_FAILED,
  payload,
});

export const signOutSucceeded = (
  payload?: SignOutSucceededAction["payload"]
): SignOutSucceededAction => ({
  type: AuthActionTypes.SIGN_OUT_SUCCEEDED,
  payload,
});

export const updateMyProfileSucceeded = (
  payload: UpdateMyProfileSucceededAction["payload"]
): UpdateMyProfileSucceededAction => ({
  type: AuthActionTypes.UPDATE_MY_PROFILE_SUCCEEDED,
  payload,
});

export const signInSucceeded = (
  payload: SignInSucceededAction["payload"]
): SignInSucceededAction => ({
  type: AuthActionTypes.SIGN_IN_SUCCEEDED,
  payload,
});

// ---- SAGA ACTION ----

export const signInSaga = (
  payload: SignInSagaAction["payload"],
  meta?: SignInSagaAction["meta"]
): SignInSagaAction => ({
  type: AuthActionTypes.SIGN_IN_SAGA,
  payload,
  meta,
});

export const checkAuthSaga = (): CheckAuthSagaAction => ({
  type: AuthActionTypes.CHECK_AUTH_SAGA,
});

export const signOutSaga = (
  payload?: SignOutSagaAction["payload"],
  meta?: SignOutSagaAction["meta"]
): SignOutSagaAction => ({
  type: AuthActionTypes.SIGN_OUT_SAGA,
  payload,
  meta,
});

export const signOutOnExpiredTokenSaga =
  (): SignOutOnExpiredTokenSagaAction => ({
    type: AuthActionTypes.SIGN_OUT_ON_EXPIRED_TOKEN_SAGA,
  });

export const updateMyProfileSaga = (
  payload: UpdateMyProfileSagaAction["payload"],
  meta?: UpdateMyProfileSagaAction["meta"]
): UpdateMyProfileSagaAction => ({
  type: AuthActionTypes.UPDATE_MY_PROFILE_SAGA,
  payload,
  meta,
});
