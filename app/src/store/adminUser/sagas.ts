import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { axiosHelpers } from "@/utils/helpers";
import { adminUserApi } from "@/utils/apis";

import {
  AdminUserActionTypes,
  CreateAdminUserSagaAction,
  UpdateAdminUserSagaAction,
} from "./types";
import {
  fetchRequested,
  fetchFailed,
  fetchSucceeded,
  updateAdminUserStatusSucceeded,
} from "./action";

import type {
  FetchScope,
  FetchAdminUsersSagaAction,
  UpdateAdminUserStatusSagaAction,
  DeleteAdminUserSagaAction,
} from "./types";

function* fetchAdminUsersSaga(action: FetchAdminUsersSagaAction) {
  const { params, cancelToken } = action.payload || {};
  const { resolve = () => {}, isLoadMore, isReset } = action.meta || {};
  const scope = "adminUsers" as FetchScope;
  yield put(
    fetchRequested({
      scope,
      isReset,
    })
  );
  try {
    const {
      data: response,
    }: Awaited<ReturnType<typeof adminUserApi.fetchAdminUsers>> = yield call(
      adminUserApi.fetchAdminUsers,
      {
        params,
        cancelToken,
      }
    );
    if (axiosHelpers.checkRequestSuccess(response)) {
      yield put(
        fetchSucceeded({
          scope,
          data: response.data?.data ?? [],
          count: response.data?.pagination?.total ?? 0,
          isLoadMore: !!isLoadMore,
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

function* updateAdminUserStatusSaga(action: UpdateAdminUserStatusSagaAction) {
  const { params, cancelToken } = action.payload;
  const { resolve = () => {} } = action.meta || {};

  try {
    const {
      data: response,
    }: Awaited<ReturnType<typeof adminUserApi.updateAdminUserStatus>> =
      yield call(adminUserApi.updateAdminUserStatus, {
        params,
        cancelToken,
      });
    if (axiosHelpers.checkRequestSuccess(response)) {
      yield put(
        updateAdminUserStatusSucceeded({
          id: params.id,
          is_enabled: params.is_enabled,
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

function* updateAdminUserSaga(action: UpdateAdminUserSagaAction) {
  const { params, cancelToken } = action.payload;
  const { resolve = () => {} } = action.meta || {};

  try {
    const {
      data: response,
    }: Awaited<ReturnType<typeof adminUserApi.updateAdminUser>> = yield call(
      adminUserApi.updateAdminUser,
      {
        params,
        cancelToken,
      }
    );
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

function* createAdminUserSaga(action: CreateAdminUserSagaAction) {
  const { params, cancelToken } = action.payload;
  const { resolve = () => {} } = action.meta || {};

  try {
    const {
      data: response,
    }: Awaited<ReturnType<typeof adminUserApi.createAdminUser>> = yield call(
      adminUserApi.createAdminUser,
      {
        params,
        cancelToken,
      }
    );
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

function* deleteAdminUserSaga(action: DeleteAdminUserSagaAction) {
  const { params, cancelToken } = action.payload;
  const { resolve = () => {} } = action.meta || {};

  try {
    const {
      data: response,
    }: Awaited<ReturnType<typeof adminUserApi.deleteAdminUser>> = yield call(
      adminUserApi.deleteAdminUser,
      {
        params,
        cancelToken,
      }
    );
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

function* adminUserSaga() {
  yield all([
    takeEvery(AdminUserActionTypes.FETCH_ADMIN_USERS_SAGA, fetchAdminUsersSaga),
    takeLatest(
      AdminUserActionTypes.UPDATE_ADMIN_USER_STATUS_SAGA,
      updateAdminUserStatusSaga
    ),
    takeLatest(
      AdminUserActionTypes.UPDATE_ADMIN_USER_SAGA,
      updateAdminUserSaga
    ),
    takeLatest(
      AdminUserActionTypes.CREATE_ADMIN_USER_SAGA,
      createAdminUserSaga
    ),
    takeLatest(
      AdminUserActionTypes.DELETE_ADMIN_USER_SAGA,
      deleteAdminUserSaga
    ),
  ]);
}

export default adminUserSaga;
