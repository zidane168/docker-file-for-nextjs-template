import type { CancelToken, RawAxiosRequestHeaders } from "axios";

export type AxiosResponseData<D = any> = {
  data: D;
  success: boolean;
  message: string;
  isCancelled?: boolean;
};

export type AxiosRequestPayload<
  Params extends Object = {},
  ParamsRequired extends boolean = false
> = {
  cancelToken?: CancelToken;
  headers?: RawAxiosRequestHeaders;
} & (ParamsRequired extends true
  ? {
      params: Params;
    }
  : {
      params?: Params;
    });
