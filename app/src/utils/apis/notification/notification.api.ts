import { authAxios } from "@/libs/axios";

import type {
  FetchNotificationsPayload,
  FetchNotificationsResponseData,
  MarkReadNotificationPayload,
  FetchNotificationCountItemPayload,
  FetchNotificationCountItemResponseData,
} from "./notification.api.types";
import type { AxiosResponseData } from "@/libs/axios";

const notificationApi = {
  fetchNotifications: (payload: FetchNotificationsPayload) => {
    return authAxios.get<AxiosResponseData<FetchNotificationsResponseData>>(
      "notifications",
      {
        params: payload?.params,
        cancelToken: payload?.cancelToken,
      }
    );
  },
  fetchNotificationCountItem: (payload: FetchNotificationCountItemPayload) => {
    return authAxios.get<
      AxiosResponseData<FetchNotificationCountItemResponseData>
    >("notifications/count", {
      cancelToken: payload?.cancelToken,
    });
  },
  markReadNotification: (payload: MarkReadNotificationPayload) => {
    return authAxios.post<AxiosResponseData>(
      "notifications/mark_as_read",
      payload.params,
      {
        cancelToken: payload?.cancelToken,
      }
    );
  },
};

export default notificationApi;
