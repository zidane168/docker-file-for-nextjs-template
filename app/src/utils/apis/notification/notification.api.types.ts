import type { CancelToken, RawAxiosRequestHeaders } from "axios";

type Payload = {
  cancelToken?: CancelToken;
  headers?: RawAxiosRequestHeaders;
};

export type FetchNotificationsPayload = {
  params: {
    page?: number;
    per_page?: number;
    filters?: {
      is_read?: BooleanNumber;
      beauty_center_id?: number;
    };
  };
} & Payload;
export type FetchNotificationsResponseData = {
  data: {
    id: number;
    type: string;
    data: {
      type: string;
      appointment: string;
      beauty_center: string;
    };
    created_at: number;
    is_read: BooleanNumber;
  }[];
  pagination: {
    total: number;
  };
};

export type MarkReadNotificationPayload = {
  params: {
    notification_id: number | "";
    beauty_center_id: number | "";
  };
} & Payload;

export type FetchNotificationCountItemPayload = Payload;
export type FetchNotificationCountItemResponseData = {
  data: {
    total: number;
    unread: number;
    read: number;
    beauty_center: {
      beauty_center_id: number;
      total: number;
      unread: number;
      read: number;
    }[];
  };
};
