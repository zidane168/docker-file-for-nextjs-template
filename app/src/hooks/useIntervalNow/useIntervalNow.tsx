import { useState } from "react";

import useAppMomentWithLocale from "@/hooks/useAppMomentWithLocale/useAppMomentWithLocale";

const useIntervalNow = () => {
  const { momentWithLocale } = useAppMomentWithLocale();

  const [now, setNow] = useState(momentWithLocale());

  setInterval(() => {
    setNow(momentWithLocale());
  }, 1000);

  return now;
};

export default useIntervalNow;
