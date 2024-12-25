import axios from "axios";
import { bindActionCreators } from "redux";

import { jwtService } from "@/services";
import {
  storeAuthSelectors,
  storeCommonAction,
  // storeNotificationAction,
} from "@/store";

import { useAppDispatch, useAppSelector, useIsMounted } from "@/hooks";
import { useEffect, useMemo, useRef } from "react";

import type { CancelTokenSource } from "axios";

const AppInitialize = () => {
  const fetchSettingsSourceRef = useRef<CancelTokenSource | null>(null);
  const fetchNotificationCountItemSourceRef = useRef<CancelTokenSource | null>(
    null
  );
  const dispatch = useAppDispatch();

  const $s_commonAction = useMemo(
    () => bindActionCreators(storeCommonAction, dispatch),
    [dispatch]
  );

  // const $s_notificationAction = useMemo(
  //   () => bindActionCreators(storeNotificationAction, dispatch),
  //   [dispatch]
  // );

  const $s_hasAuth = useAppSelector(storeAuthSelectors.selectHasAuth);

  const fetchSettings = async () => {
    fetchSettingsSourceRef.current = axios.CancelToken.source();
    $s_commonAction.fetchSettingsSaga({
      cancelToken: fetchSettingsSourceRef.current.token,
    });
  };

  // const fetchNotificationCountItem = () => {
  //   fetchNotificationCountItemSourceRef.current = axios.CancelToken.source();
  //   $s_notificationAction.fetchNotificationCountItemSaga(
  //     {
  //       cancelToken: fetchNotificationCountItemSourceRef.current.token,
  //     },
  //     {
  //       isReset: true,
  //     }
  //   );
  // };

  useEffect(() => {
    // !!$s_hasAuth && fetchNotificationCountItem();
    return () => {
      fetchNotificationCountItemSourceRef.current?.cancel &&
        fetchNotificationCountItemSourceRef.current.cancel();
    };
  }, [$s_hasAuth]);

  useEffect(() => {
    if (!isMounted() && !!jwtService.getToken()) return;
    fetchSettings();
    return () => {
      fetchSettingsSourceRef.current?.cancel &&
        fetchSettingsSourceRef.current.cancel();
    };
  }, [$s_hasAuth]);

  const isMounted = useIsMounted();

  return null;
};

export default AppInitialize;
