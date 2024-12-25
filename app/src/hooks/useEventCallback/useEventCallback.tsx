import { useCallback, useRef } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

const useEventCallback = <Args extends unknown[], R>(
  fn: (...args: Args) => R
): ((...args: Args) => R) => {
  const ref = useRef<typeof fn>(fn);

  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args: Args) => ref.current(...args), [ref]);
};

export default useEventCallback;
