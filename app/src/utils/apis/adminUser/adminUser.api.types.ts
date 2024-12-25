import type { CancelToken, RawAxiosRequestHeaders } from "axios";

type Payload = {
  cancelToken?: CancelToken;
  headers?: RawAxiosRequestHeaders;
};

export type FetchAdminUsersPayload = {
  params?: {
    page?: number;
    per_page?: number;
    filters?: {
      name?: string;
      username?: string;
      is_enable?: boolean;
      keyword?: string;
    };
    sort?: {
      id?: "desc" | "asc";
    };
  };
} & Payload;
export type FetchAdminUsersResponseData = {
  data: {
    id: number;
    name: string;
    username: string;
    role: {
      id: number;
      name: string;
      display_name: string;
    } | null;
    created_at: number;
    is_enabled: BooleanNumber;
  }[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    total_page: number;
  };
};

export type FetchOptionAdminUsersPayload = {
  params?: {
    page?: number;
    per_page?: number;
    filters?: {
      keyword?: string;
    };
  };
} & Payload;
export type FetchOptionAdminUsersResponseData = {
  data: {
    id: number;
    name: string;
    username: string;
  }[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    total_page: number;
  };
};

export type FetchAdminUserPayload = {
  params: {
    id: number;
  };
} & Payload;
export type FetchAdminUserResponseData = {
  data: {
    id: number;
    name: string;
    username: string;
    role: {
      id: number;
      name: string;
      display_name: string;
    } | null;
    created_at: number;
    is_enabled: BooleanNumber;
  };
};

export type UpdateAdminUserStatusPayload = {
  params: {
    id: number;
    is_enabled: BooleanNumber;
  };
} & Payload;

export type UpdateAdminUserPayload = {
  params: {
    id: number;
    name: string;
    role_id: number;
    is_enabled: number;
    password?: string;
    password_confirmation?: string;
  };
} & Payload;

export type CreateAdminUserPayload = {
  params: {
    name: string;
    username: string;
    role_id: number;
    is_enabled: number;
    password: string;
    password_confirmation: string;
  };
} & Payload;

export type DeleteAdminUserPayload = {
  params: {
    id: number;
  };
} & Payload;
