export const checkRequestSuccess = (response: any) => {
  return !!response?.success;
};

export const checkRequestInvalidToken = (response: any) => {
  return !!response?.success;
};

export const getErrorMessage = (error: any) => {
  return error?.response?.data?.message || error.message;
};

export const isNetworkError = (error: any) => {
  try {
    return (
      ["ENOTFOUND", "ERR_NETWORK"].includes(error.code) ||
      (typeof window !== "undefined" && !window.navigator.onLine)
    );
  } catch {
    return false;
  }
};
