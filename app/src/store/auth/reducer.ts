import { AuthActionTypes } from "./types";

import type { AuthState, AuthAction } from "./types";

export const initialState: AuthState = {
  authUser: null,
  authUserCheckedError: "",
  authUserChecking: true,
  authUserError: "",
  authUserExpiredToken: false,
  authUserLoading: false,

  authUserPermissions: [],
};

const reducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.CHECK_AUTH_REQUESTED: {
      return {
        ...state,
        authUserExpiredToken: false,
        authUserChecking: true,
        authUserCheckedError: "",
      };
    }
    case AuthActionTypes.CHECK_AUTH_SUCCEEDED: {
      return {
        ...state,
        authUser: {
          ...action.payload,
        } as AuthState["authUser"],
        authUserChecking: false,
        authUserCheckedError: "",
      };
    }
    case AuthActionTypes.CHECK_AUTH_FAILED: {
      const { message, isNetworkError } = action.payload;

      return {
        ...state,
        authUser: isNetworkError ? state.authUser : null,
        authUserChecking: isNetworkError ? true : false,
        authUserCheckedError: message,
      };
    }

    case AuthActionTypes.SIGN_IN_SUCCEEDED: {
      return {
        ...state,
        authUser: action.payload,
      };
    }

    case AuthActionTypes.SIGN_OUT_SUCCEEDED: {
      const { reason } = action?.payload || {};

      return {
        ...state,
        authUserExpiredToken: reason === "EXPIRED_TOKEN",
        authUser: null,
        authUserChecking: false,
        authUserCheckedError: "",
      };
    }

    case AuthActionTypes.UPDATE_MY_PROFILE_SUCCEEDED: {
      return {
        ...state,
        authUser: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
