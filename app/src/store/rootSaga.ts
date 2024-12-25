import { all, fork } from "redux-saga/effects";

import auth from "./auth/sagas";
import common from "./common/sagas";

export default function* rootSaga() {
  yield all([fork(auth), fork(common)]);
}
