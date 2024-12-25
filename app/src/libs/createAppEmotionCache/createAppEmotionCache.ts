import createCache from "@emotion/cache";

import { commonConfig } from "@/utils/config";

type CreateAppEmotionCache = {
  nonce?: string;
};

export function createAppEmotionCache(options?: CreateAppEmotionCache) {
  return createCache({
    key: commonConfig.APP_CACHE_KEY,
    nonce: options?.nonce,
  });
}

export type AppEmotionCache = ReturnType<typeof createAppEmotionCache>;

export default createAppEmotionCache;
