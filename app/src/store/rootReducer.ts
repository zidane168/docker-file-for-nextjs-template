import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth/reducer";
import common from "./common/reducer";

const rootReducer = combineReducers({
  auth,
  common,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
