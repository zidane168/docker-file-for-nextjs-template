import useAppSelector from "@/hooks/useAppSelector/useAppSelector";

import type { LinkProps as NextLinkProps } from "next/link";

const useAuthUser = () => {
  const $s_hasAuthUser = useAppSelector((state) => !!state.auth.authUser?.id);
  const $s_authUserChecking = useAppSelector(
    (state) => state.auth.authUserChecking
  );

  const handleAuthNavigationPush =
    (_?: NextLinkProps["href"]) => (event?: React.SyntheticEvent) => {
      if ($s_hasAuthUser) return;
      if (!!event) {
        event.preventDefault();
        event.stopPropagation();
      }
      // ...
    };

  return {
    authChecking: $s_authUserChecking,
    hasAuth: $s_hasAuthUser,
    handleAuthNavigationPush,
  };
};

export default useAuthUser;
