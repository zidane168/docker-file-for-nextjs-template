import { toast } from "react-toastify";
import { bindActionCreators } from "redux";

import { storeAuthAction } from "@/store";
import { broadcastChannelNameConstants } from "@/utils/constants";

import { useAppDispatch, useAuthUser, useBroadcastChannel } from "@/hooks";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo } from "react";

const CheckAuthUser = () => {
  const { t } = useTranslation();

  const $s_hasAuth = useAuthUser();

  const dispatch = useAppDispatch();

  const $s_authAction = useMemo(
    () => bindActionCreators(storeAuthAction, dispatch),
    [dispatch]
  );
  useBroadcastChannel(broadcastChannelNameConstants.AUTH_EXPIRED_TOKEN, () => {
    $s_authAction.signOutOnExpiredTokenSaga();
    if (!$s_hasAuth) return;
    toast.error(t("sessionExpired"));
  });

  useBroadcastChannel(broadcastChannelNameConstants.AUTH_SIGNED_IN, (event) => {
    const userResponse = event.data;
    $s_authAction.signInSucceeded(userResponse);
  });

  useBroadcastChannel(broadcastChannelNameConstants.AUTH_SIGNED_OUT, () => {
    $s_authAction.signOutSucceeded();
  });

  useEffect(() => {
    $s_authAction.checkAuthSaga();
  }, []);

  return null;
};

export default CheckAuthUser;
