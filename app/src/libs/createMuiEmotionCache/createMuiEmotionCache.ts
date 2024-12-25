import createCache from "@emotion/cache";

type CreateMuiEmotionCacheOption = {
  nonce?: string;
};

const createMuiEmotionCache = (options?: CreateMuiEmotionCacheOption) => {
  return createCache({ key: "mui", prepend: true, nonce: options?.nonce });
};

export type MuiEmotionCache = ReturnType<typeof createMuiEmotionCache>;

export default createMuiEmotionCache;
