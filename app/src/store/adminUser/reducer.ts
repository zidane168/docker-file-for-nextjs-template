import { AdminUserActionTypes } from "./types";
import { commonHelpers } from "@/utils/helpers";
import { HYDRATE } from "next-redux-wrapper";

import type { AdminUserState, AdminUserAction } from "./types";

export const initialState: AdminUserState = {
  adminUsers: [],
  adminUsersError: "",
  adminUsersLoading: true,
  adminUsersCount: 0,

  adminUser: null,
  adminUserError: "",
  adminUserLoading: true,
};

const reducer = (
  state = initialState,
  action: AdminUserAction
): AdminUserState => {
  switch (action.type) {
    case HYDRATE as any: {
      const { adminUser, adminUserError, adminUserLoading, hydrated } = (
        action as any
      ).payload.adminUser as AdminUserState;

      const newState = {
        adminUser,
        adminUserError,
        adminUserLoading,
      };

      if (typeof hydrated !== "undefined") {
        Object.entries(newState).forEach(([key, _state]) => {
          if (typeof _state === "undefined") delete (newState as any)[key];
        });
      }

      return {
        ...state,
        ...(typeof hydrated !== "undefined" ? newState : {}),
        hydrated: true,
      };
    }

    case AdminUserActionTypes.FETCH_REQUESTED: {
      const { scope, isReset } = action.payload;

      const newState = {
        ...state,
        ...(typeof state[`${scope}Loading` as keyof typeof state] !==
        "undefined"
          ? {
              [`${scope}Loading`]: true,
            }
          : {}),
        ...(typeof state[`${scope}Error` as keyof typeof state] !== "undefined"
          ? {
              [`${scope}Error`]: "",
            }
          : {}),
      };

      if (isReset) {
        Object.assign(newState, {
          [scope]: Array.isArray(newState[scope]) ? [] : null,
        });
      }

      return newState;
    }
    case AdminUserActionTypes.FETCH_SUCCEEDED: {
      const { scope, data, count, isLoadMore } = action.payload;

      let newData = data;
      const stateData = state[scope];

      if (isLoadMore && Array.isArray(stateData) && Array.isArray(data)) {
        const filteredData = data.filter((item) => {
          return stateData.every(
            (stateDataItem) => item.id !== stateDataItem.id
          );
        });
        newData = [...stateData, ...filteredData];
      }

      return {
        ...state,
        [scope]: newData,
        ...(typeof state[`${scope}Loading` as keyof typeof state] !==
        "undefined"
          ? {
              [`${scope}Loading`]: false,
            }
          : {}),
        ...(commonHelpers.isNumber(count)
          ? {
              [`${scope}Count`]: count,
            }
          : {}),
      };
    }
    case AdminUserActionTypes.FETCH_FAILED: {
      const { scope, error } = action.payload;

      return {
        ...state,
        ...(typeof state[`${scope}Loading` as keyof typeof state] !==
        "undefined"
          ? {
              [`${scope}Loading`]: false,
            }
          : {}),
        ...(typeof state[`${scope}Error` as keyof typeof state] !== "undefined"
          ? {
              [`${scope}Error`]: error,
            }
          : {}),
      };
    }

    case AdminUserActionTypes.FETCH_ADMIN_USER_SUCCEEDED_SERVER: {
      return {
        adminUser: action.payload,
        adminUserLoading: false,
        adminUserError: "",
        hydrated: true,
      } as Partial<AdminUserState> as AdminUserState;
    }

    case AdminUserActionTypes.UPDATE_ADMIN_USER_STATUS_SUCCEEDED: {
      const { id, is_enabled } = action.payload;

      return {
        ...state,
        adminUsers: state.adminUsers.map((adminUser) => {
          if (adminUser.id === id)
            return {
              ...adminUser,
              is_enabled,
            };
          return adminUser;
        }),
        adminUser:
          state.adminUser?.id === id
            ? {
                ...state.adminUser,
                is_enabled,
              }
            : state.adminUser,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
