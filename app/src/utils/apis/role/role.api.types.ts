import type { CancelToken, RawAxiosRequestHeaders } from "axios";

type Payload = {
  cancelToken?: CancelToken;
  headers?: RawAxiosRequestHeaders;
};

export type FetchRolesPayload = {
  params?: {
    page?: number;
    per_page?: number;
    filters?: {
      keyword?: string;
    };
  };
} & Payload;
export type FetchRolesResponseData = {
  data: {
    id: number;
    name: string;
    is_enabled: BooleanNumber;
  }[];
  pagination: {
    total: number;
  };
};

export type FetchOptionRolesPayload = {
  params?: {
    page?: number;
    per_page?: number;
    filters?: {
      keyword?: string;
    };
  };
} & Payload;
export type FetchOptionRolesResponseData = {
  data: {
    id: number;
    name: string;
  }[];
  pagination: {
    total: number;
  };
};

export type FetchRolePayload = {
  params: {
    id: number;
  };
} & Payload;
export type FetchRoleResponseData = {
  data: {
    id: number;
    name: string;
    permissions: {
      id: number;
      name: string;
      display_name: string;
    }[];
    is_enabled: BooleanNumber;
  };
};

export type CreateRolePayload = {
  params: {
    name: string;
    permissions: number[];
    is_enabled: BooleanNumber;
  };
} & Payload;

export type UpdateRolePayload = {
  params: {
    id: number;
    name: string;
    permissions: number[];
    is_enabled: BooleanNumber;
  };
} & Payload;

export type UpdateRoleEnabledPayload = {
  params: {
    id: number;
    is_enabled: BooleanNumber;
  };
} & Payload;

export type DeleteRolePayload = {
  params: {
    id: number;
  };
} & Payload;
