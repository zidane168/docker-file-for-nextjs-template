import {
  fetchFailed,
  fetchRequested,
  fetchSucceeded,
  registerFirebaseNotificationDeviceRequested,
  registerFirebaseNotificationDeviceSucceeded,
} from "./action";
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import axios from "axios";

import { jwtService } from "@/services";
import { axiosHelpers } from "@/utils/helpers";
import { commonApi } from "@/utils/apis";

import { CommonActionTypes } from "./types";

import type {
  FetchScope,
  FetchSettingsSagaAction,
  RegisterFirebaseNotificationDeviceSagaAction,
} from "./types";
import type { AxiosResponseData } from "@/libs/axios";
import type { AppState } from "@/store/rootReducer";

function* registerFirebaseNotificationDeviceSaga(
  action: RegisterFirebaseNotificationDeviceSagaAction
) {
  const { params, cancelToken } = action.payload;
  const { resolve = () => {} } = action.meta || {};
  yield put(
    registerFirebaseNotificationDeviceRequested({
      fcm_token: params.fcm_token,
    })
  );
  try {
    const {
      data: response,
    }: Awaited<
      ReturnType<typeof commonApi.registerFirebaseNotificationDevice>
    > = yield call(commonApi.registerFirebaseNotificationDevice, {
      params,
      cancelToken,
    });
    if (!axiosHelpers.checkRequestSuccess(response)) {
      yield put(
        registerFirebaseNotificationDeviceSucceeded({
          fcm_token: "",
        })
      );
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

function* fetchSettingsSaga(action: FetchSettingsSagaAction) {
  const { cancelToken } = action.payload || {};
  const { resolve = () => {}, isReset } = action.meta || {};
  const scope = "settings" as FetchScope;
  if (!jwtService.getToken()) {
    const settings: AppState["common"]["settings"] = yield select(
      (state: AppState) => state.common.settings
    );
    yield put(
      fetchSucceeded({
        scope,
        data: settings,
      })
    );
    resolve({ success: true } as Partial<AxiosResponseData>);
    return;
  }
  yield put(
    fetchRequested({
      scope,
      isReset,
    })
  );
  try {
    const {
      data: response,
    }: Awaited<ReturnType<typeof commonApi.fetchSettings>> = yield call(
      commonApi.fetchSettings,
      {
        cancelToken,
      }
    );
    if (axiosHelpers.checkRequestSuccess(response)) {
      yield put(
        fetchSucceeded({
          scope,
          data: response.data?.data ?? [],
        })
      );
    } else {
      yield put(
        fetchFailed({
          scope,
          error: response.message,
        })
      );
    }
    resolve(response);
  } catch (error) {
    if (axios.isCancel(error)) {
      resolve({ message: error.message, isCancelled: true });
      return;
    }
    const message = axiosHelpers.getErrorMessage(error);
    yield put(
      fetchFailed({
        scope,
        error: message,
      })
    );
    resolve({ message });
  }
}

function* commonSaga() {
  yield all([
    takeLatest(
      CommonActionTypes.REGISTER_FIREBASE_NOTIFICATION_DEVICE_SAGA,
      registerFirebaseNotificationDeviceSaga
    ),
    takeEvery(CommonActionTypes.FETCH_SETTINGS_SAGA, fetchSettingsSaga),
  ]);
}

export default commonSaga;
