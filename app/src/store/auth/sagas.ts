import { all, call, put, select, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { axiosHelpers } from "@/utils/helpers";
import { appStorageService, jwtService } from "@/services";
import { authApi } from "@/utils/apis";
import { broadcastChannelNameConstants } from "@/utils/constants";

import { AuthActionTypes } from "./types";
import {
  checkAuthRequested,
  checkAuthSucceeded,
  signOutSucceeded,
  updateMyProfileSucceeded,
} from "./action";

import type {
  SignInSagaAction,
  SignOutSagaAction,
  SignInSucceededAction,
  CheckAuthFailedAction,
  UpdateMyProfileSagaAction,
} from "./types";
import type { AppState } from "@/store/rootReducer";

function* saveTokenOnSignInSucceeded(payload: {
  token: string;
  userId: number;
}) {
  jwtService.saveToken(payload.token);
  appStorageService.saveCookieAuthUserId(payload.userId);
}
function* dispatchSignInSucceededBc(payload: SignInSucceededAction["payload"]) {
  if (typeof window !== undefined) {
    const authExpiredTokenBc = new BroadcastChannel(
      broadcastChannelNameConstants.AUTH_SIGNED_IN
    );
    authExpiredTokenBc.postMessage(payload);
  }
}

function* destroyTokenOnCheckAuthFailed() {
  jwtService.destroyToken();
  appStorageService.destroyCookieAuthUserId();
}
function* dispatchCheckAuthFailedBc(payload: CheckAuthFailedAction["payload"]) {
  if (typeof window !== undefined) {
    const authExpiredTokenBc = new BroadcastChannel(
      broadcastChannelNameConstants.AUTH_EXPIRED_TOKEN
    );
    authExpiredTokenBc.postMessage(payload);
  }
}

function* signOutSaga(action: SignOutSagaAction) {
  const { cancelToken } = action.payload || {};
  const { resolve = () => {} } = action.meta || {};

  const firebaseNotificationFcmToken: string = yield select(
    (state: AppState) => state.common.firebaseNotificationFcmToken
  );

  try {
    const { data: response }: Awaited<ReturnType<typeof authApi.signOut>> =
      yield call(authApi.signOut, {
        params: {
          fcm_token: firebaseNotificationFcmToken,
        },
        cancelToken,
      });
    if (axiosHelpers.checkRequestSuccess(response)) {
      if (typeof window !== undefined) {
        const authExpiredTokenBc = new BroadcastChannel(
          broadcastChannelNameConstants.AUTH_SIGNED_OUT
        );
        authExpiredTokenBc.postMessage(null);
      }
      jwtService.destroyToken();
      yield put(signOutSucceeded());
    }
    resolve(response);
  } catch (error) {
    if (axios.isCancel(error)) {
      resolve({ message: error.message, isCancelled: true });
      return;
    }
    const message = axiosHelpers.getErrorMessage(error);
    resolve({ message });
  }
}

function* signOutOnExpiredTokenSaga() {
  jwtService.destroyToken();
  yield put(
    signOutSucceeded({
      reason: "EXPIRED_TOKEN",
    })
  );
}

function* signInSaga(action: SignInSagaAction) {
  const { params } = action.payload;
  const { resolve } = action.meta || {};

  try {
    const { data: response } = yield call(authApi.signIn, {
      params,
    });
    if (axiosHelpers.checkRequestSuccess(response)) {
      const token = response.data?.data?.token;
      const {
        data: _response,
      }: Awaited<ReturnType<typeof authApi.fetchAuthUser>> = yield call(
        authApi.fetchAuthUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (axiosHelpers.checkRequestSuccess(response)) {
        yield call(saveTokenOnSignInSucceeded, {
          token,
          userId: _response.data?.data?.id,
        });
        yield call(dispatchSignInSucceededBc, {
          ..._response.data.data,
          token,
        } as any);
      }
      resolve && resolve(_response);
      return;
    }
    resolve && resolve(response);
  } catch (e) {
    const message = axios.isAxiosError(e)
      ? (e.response?.data as any)?.message || e.message
      : "";

    resolve && resolve({ message });
  }
}

function* checkAuthSaga() {
  const token = jwtService.getToken();

  if (!token) {
    yield put(checkAuthSucceeded(null));
    return;
  }
  yield put(checkAuthRequested());
  try {
    const {
      data: response,
    }: Awaited<ReturnType<typeof authApi.fetchAuthUser>> = yield call(
      authApi.fetchAuthUser
    );
    if (axiosHelpers.checkRequestSuccess(response)) {
      appStorageService.saveCookieAuthUserId(response?.data?.data?.id!);
      yield put(checkAuthSucceeded(response.data?.data));
    } else {
      yield call(destroyTokenOnCheckAuthFailed);
      yield call(dispatchCheckAuthFailedBc, { message: response.message });
    }
  } catch (error: any) {
    if (axios.isCancel(error)) return;
    const message = axiosHelpers.getErrorMessage(error);
    const isNetworkError = axiosHelpers.isNetworkError(error);
    if (!isNetworkError) {
      yield call(destroyTokenOnCheckAuthFailed);
    }
    yield call(dispatchCheckAuthFailedBc, {
      message,
      isNetworkError,
    });
    // yield put(checkAuthFailed({ message, isNetworkError }));
  }
}

function* updateMyProfileSaga(action: UpdateMyProfileSagaAction) {
  const { params, cancelToken } = action.payload || {};
  const { resolve = () => {} } = action.meta || {};

  try {
    const {
      data: response,
    }: Awaited<ReturnType<typeof authApi.updateMyProfile>> = yield call(
      authApi.updateMyProfile,
      {
        params,
        cancelToken,
      }
    );
    if (axiosHelpers.checkRequestSuccess(response)) {
      yield put(updateMyProfileSucceeded(response.data.data));
    }
    resolve(response);
  } catch (error) {
    if (axios.isCancel(error)) {
      resolve({ message: error.message, isCancelled: true });
      return;
    }
    const message = axiosHelpers.getErrorMessage(error);
    resolve({ message });
  }
}

function* authSaga() {
  yield all([
    takeLatest(
      AuthActionTypes.SIGN_OUT_ON_EXPIRED_TOKEN_SAGA,
      signOutOnExpiredTokenSaga
    ),
    takeLatest(AuthActionTypes.SIGN_OUT_SAGA, signOutSaga),
    takeLatest(AuthActionTypes.SIGN_IN_SAGA, signInSaga),
    takeLatest(AuthActionTypes.CHECK_AUTH_SAGA, checkAuthSaga),
    takeLatest(AuthActionTypes.UPDATE_MY_PROFILE_SAGA, updateMyProfileSaga),
  ]);
}

export default authSaga;
