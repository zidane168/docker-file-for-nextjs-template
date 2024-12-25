import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

import type { Store } from "@reduxjs/toolkit";
import type { AppState } from "./rootReducer";
import type { Task } from "redux-saga";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const reduxWrapper = createWrapper<Store<AppState>>(makeStore);

export type { AppState } from "./rootReducer";
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];

export * as storeAuthAction from "./auth/action";
export * as storeCommonAction from "./common/action";

export * as storeAuthSelectors from "./auth/selectors";
