import { commonHelpers } from "@/utils/helpers";
import { CommonActionTypes } from "./types";

import type { CommonState, CommonAction } from "./types";

export const initialState: CommonState = {
  adminSidebarCollapseOpened: false,
  floatAdminSidebarOpened: false,
  firebaseNotificationFcmToken: "",

  settings: {
    time_for_beauty_center_accepting: 15,
  },
  settingsError: "",
  settingsLoading: true,
};

const reducer = (state = initialState, action: CommonAction): CommonState => {
  switch (action.type) {
    case CommonActionTypes.FETCH_REQUESTED: {
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
    case CommonActionTypes.FETCH_SUCCEEDED: {
      const { scope, data, count, isLoadMore } = action.payload;

      let newData = data;
      const stateData = state[scope];

      if (
        isLoadMore &&
        Array.isArray(stateData) &&
        Array.isArray(newData) &&
        Array.isArray(data)
      ) {
        const filteredData = data.filter((item) => {
          return stateData.every(
            (stateDataItem) => item.id !== stateDataItem.id
          );
        });
        newData = [...stateData, ...(filteredData as any)] as any;
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
    case CommonActionTypes.FETCH_FAILED: {
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
    case CommonActionTypes.SET_ADMIN_SIDEBAR_COLLAPSE_OPENED: {
      return {
        ...state,
        adminSidebarCollapseOpened: action.payload,
      };
    }

    case CommonActionTypes.SET_FLOAT_ADMIN_SIDEBAR_OPENED: {
      return {
        ...state,
        floatAdminSidebarOpened: action.payload,
      };
    }

    case CommonActionTypes.REGISTER_FIREBASE_NOTIFICATION_DEVICE_SUCCEEDED: {
      return {
        ...state,
        firebaseNotificationFcmToken: action.payload.fcm_token,
      };
    }

    case CommonActionTypes.REGISTER_FIREBASE_NOTIFICATION_DEVICE_REQUESTED: {
      return {
        ...state,
        firebaseNotificationFcmToken: action.payload.fcm_token,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
