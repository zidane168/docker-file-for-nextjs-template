import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth/reducer";
import common from "./common/reducer";
import adminUser from "./adminUser/reducer";

const rootReducer = combineReducers({
  auth,
  common,
  adminUser,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
