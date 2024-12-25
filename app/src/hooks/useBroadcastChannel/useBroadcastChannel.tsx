import { useCallback, useEffect, useRef } from "react";
import useEventCallback from "@/hooks/useEventCallback";
import useIsMounted from "@/hooks/useIsMounted";

const useBroadcastChannel = <D = any,>(
  channelName: string,
  messageHandler?: (event: MessageEvent<D>) => void,
  messageErrorHandler?: (event: MessageEvent<D>) => void
) => {
  const bcRef = useRef(
    typeof window !== "undefined" && "BroadcastChannel" in window
      ? new BroadcastChannel(channelName)
      : null
  );

  const executeMessageHandler = useEventCallback(messageHandler ?? (() => {}));
  const executeMessageErrorHandler = useEventCallback(
    messageErrorHandler ?? (() => {})
  );

  useEffect(() => {
    if (isMounted()) {
      bcRef.current =
        typeof window !== "undefined" && "BroadcastChannel" in window
          ? new BroadcastChannel(channelName)
          : null;
    }

    const bc = bcRef.current;

    if (bc) {
      bc.addEventListener("message", executeMessageHandler);
      bc.addEventListener("messageerror", executeMessageHandler);
      return () => {
        bc.removeEventListener("message", executeMessageHandler);
        bc.removeEventListener("message", executeMessageErrorHandler);
      };
    }
  }, [channelName]);

  const isMounted = useIsMounted();

  return useCallback((data: D) => {
    bcRef?.current?.postMessage(data);
  }, []);
};

export default useBroadcastChannel;
