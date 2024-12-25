import axios from "axios";
import { bindActionCreators } from "redux";
import { getToken, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

import {
  broadcastChannelNameConstants,
  eventBusConstants,
} from "@/utils/constants";
import { appFirebase } from "@/libs";
import {
  storeAuthSelectors,
  storeCommonAction,
  // storeNotificationAction,
} from "@/store";
import { envConfig } from "@/utils/config";
import { commonHelpers } from "@/utils/helpers";
import { eventBusService } from "@/services";

import AppTypography from "@/components/AppTypography";
import AppSvgIcon from "@/components/AppSvgIcon";

import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";

import {
  useAppDispatch,
  useAppSelector,
  useEventCallback,
  useGetAppNotificationPayload,
} from "@/hooks";
import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";

import useStyles from "./FirebaseNotification.styles";

import type { CancelTokenSource } from "axios";
import type { MessagePayload } from "firebase/messaging";

type NotificationDataBeautyCenter = {
  id: number;
  name_en: string;
  name_hk: string;
  name_cn: string;
};

export type FirebaseNotificationData = {
  data: {
    notification_id: number;
    appointment: string; // { id: number, order_type: string, reference_id: string }
    beauty_center: string; // { id: number, name_en: string, name_hk: string, name_ch: string, reference_id: string }
    type: string;
  };
  notification: {
    title: string;
    body: string;
    image: string;
  };
};

export type FirebaseNotificationClickData = {
  payload: {
    data: FirebaseNotificationData["data"];
    fcmMessageId: string;
    from: string; // number
    notification: {
      title: string;
      click_action: string;
      body: string;
      image: string;
    };
  };
  routerLocation: {
    baseUrl: string;
    pathname: string;
    query: Record<string, any>;
    referenceLink: string;
    search: string;
  };
};

const FirebaseNotification = () => {
  const registerFirebaseNotificationDeviceSourceRef =
    useRef<CancelTokenSource | null>(null);

  const router = useRouter();

  const getAppNotificationPayload = useGetAppNotificationPayload();

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

  const { classes } = useStyles();

  const checkAndMarkReadNotification = async (__: {
    // payload
    notification_id: number | "";
    beauty_center?: NotificationDataBeautyCenter | null;
  }) => {
    // $s_notificationAction.markReadNotificationSaga({
    //   params: {
    //     notification_id: payload.notification_id,
    //     ...(payload.beauty_center?.id
    //       ? {
    //           beauty_center_id: payload.beauty_center?.id,
    //         }
    //       : {}),
    //   },
    // });

    return {
      success: true,
    };
  };

  const handleMessageToastClick = useEventCallback(
    (payload: {
        href: string;
        newBrowserWindow: boolean;
        payload: {
          notification_id: number;
          appointment?: {
            id: number;
          };
          beauty_center?: NotificationDataBeautyCenter | null;
        };
      }) =>
      async () => {
        const { success } = await checkAndMarkReadNotification({
          notification_id: payload.payload.notification_id,
          beauty_center: payload.payload.beauty_center,
        });
        if (!success) return;
        if (!payload.href) return;
        if (payload?.newBrowserWindow) window.open(payload.href, "_blank");
        else {
          pushAppointmentListNavigateEventBus({
            appointment: {
              id: payload.payload.appointment?.id!,
            },
          });
          router.push(payload.href, undefined);
        }
      }
  );

  const pushNotificationToast = useEventCallback(
    (payload: FirebaseNotificationData) => {
      if (!$s_hasAuth) return;

      let notificationBeautyCenter: NotificationDataBeautyCenter | null = null;
      let notificationAppointment: {
        id: number;
        order_type: string;
        reference_id: string;
      } | null = null;
      try {
        notificationBeautyCenter = JSON.parse(payload.data.beauty_center!);
      } catch {}
      try {
        notificationAppointment = JSON.parse(payload.data.appointment!);
      } catch {}

      const appNotificationPayload = getAppNotificationPayload({
        notificationType: payload.data.type,
        beautyCenter: notificationBeautyCenter,
        referenceId: notificationAppointment?.reference_id,
      });
      const notificationTitle = appNotificationPayload.title;
      const notificationBody = appNotificationPayload.body;

      let routerLocation: {
        href?: string;
        newBrowserWindow?: boolean;
      } = {
        href: `/appointments/${notificationAppointment?.reference_id}-${notificationAppointment?.id}`,
        newBrowserWindow: false,
      };

      // !!notificationBeautyCenter?.id &&
      //   $s_notificationAction.increasePublicUnreadNotificationCount();

      toast.info(
        <>
          <AppTypography
            className={classes.notificationTitle}
            variant="bodyMed16"
          >
            {notificationTitle}
          </AppTypography>
          <AppTypography className={classes.notificationContent}>
            {notificationBody}
          </AppTypography>
        </>,
        {
          onClick: handleMessageToastClick({
            href: routerLocation.href!,
            newBrowserWindow: !!routerLocation.newBrowserWindow,
            payload: {
              appointment: {
                id: Number(notificationAppointment?.id),
              },
              notification_id: Number(payload.data.notification_id!),
              beauty_center: notificationBeautyCenter,
            },
          }),
          autoClose: 5000000,
          position: "bottom-left",
          icon: (
            <div className={classes.notificationIconWrapper}>
              <AppSvgIcon
                component={NotificationsIcon}
                className={classes.notificationIcon}
              />
            </div>
          ),
        }
      );
    }
  );

  const handleFirebaseMessage = useEventCallback((payload: MessagePayload) => {
    eventBusService.dispatch(eventBusConstants.NOTIFICATION_MESSAGE, payload);
    pushNotificationToast(payload as any);
  });

  const getFirebaseMessage = () => {
    if (!appFirebase.messaging) return;
    onMessage(appFirebase.messaging, handleFirebaseMessage);
  };

  const registerAppDevice = async () => {
    registerFirebaseNotificationDeviceSourceRef.current?.cancel &&
      registerFirebaseNotificationDeviceSourceRef.current.cancel();
    registerFirebaseNotificationDeviceSourceRef.current =
      axios.CancelToken.source();
    try {
      const fcmToken = await getToken(appFirebase.messaging, {
        vapidKey: envConfig.FIREBASE_MESSAGING_VAPID_KEY,
      });
      $s_commonAction.registerFirebaseNotificationDeviceSaga({
        params: {
          fcm_token: fcmToken,
        },
        cancelToken: registerFirebaseNotificationDeviceSourceRef.current.token,
      });
      getFirebaseMessage();
    } catch {}
  };

  const requestPermission = () => {
    try {
      if (commonHelpers.isPhoneIos()) {
        registerAppDevice();
      } else
        Notification.requestPermission(function (permission) {
          if (permission === "granted") {
            registerAppDevice();
          }
        });
    } catch {}
  };

  const handleBackgroundMessageClick = useEventCallback(
    async (event: MessageEvent<FirebaseNotificationClickData>) => {
      const { payload, routerLocation } = event.data;
      let notificationBeautyCenter: NotificationDataBeautyCenter | null = null;
      try {
        notificationBeautyCenter = JSON.parse(payload.data.beauty_center!);
      } catch {}
      const { success } = await checkAndMarkReadNotification({
        notification_id: Number(payload.data.notification_id),
        beauty_center: notificationBeautyCenter,
      });
      if (!success) return;
      if (window.location.pathname === routerLocation.pathname) {
        pushAppointmentListNavigateEventBus();
        router.push(
          {
            pathname: routerLocation.pathname,
            query: routerLocation.query,
          },
          undefined
        );
      }
    }
  );

  const handleBackgroundMessageListen = useEventCallback(
    (event: MessageEvent<FirebaseNotificationData>) => {
      const payload = event.data;
      eventBusService.dispatch(eventBusConstants.NOTIFICATION_MESSAGE, payload);
      pushNotificationToast(payload);
    }
  );

  const pushAppointmentListNavigateEventBus = (payload?: {
    appointment?: {
      id: number;
    };
  }) => {
    eventBusService.dispatch(
      eventBusConstants.NOTIFICATION_APPOINTMENT_LIST_NAVIGATE,
      payload
    );
  };

  useEffect(() => {
    const backgroundMessageClickChannel = new BroadcastChannel(
      broadcastChannelNameConstants.FIREBASE_NOTIFICATION_BACKGROUND_MESSAGE_CLICK
    );
    const backgroundMessageListenChannel = new BroadcastChannel(
      broadcastChannelNameConstants.FIREBASE_NOTIFICATION_BACKGROUND_MESSAGE
    );
    backgroundMessageClickChannel.addEventListener(
      "message",
      handleBackgroundMessageClick
    );
    backgroundMessageListenChannel.addEventListener(
      "message",
      handleBackgroundMessageListen
    );
    return () => {
      backgroundMessageClickChannel.removeEventListener(
        "message",
        handleBackgroundMessageClick
      );
      backgroundMessageListenChannel.removeEventListener(
        "message",
        handleBackgroundMessageListen
      );
    };
  }, []);

  useEffect(() => {
    $s_hasAuth && requestPermission();
    return () => {
      registerFirebaseNotificationDeviceSourceRef.current?.cancel &&
        registerFirebaseNotificationDeviceSourceRef.current.cancel();
    };
  }, [$s_hasAuth]);

  return null;
};

export default FirebaseNotification;
