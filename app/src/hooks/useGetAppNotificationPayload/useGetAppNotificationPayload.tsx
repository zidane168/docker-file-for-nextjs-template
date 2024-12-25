// import { notificationConstants } from "@/utils/constants";
// import { commonHelpers } from "@/utils/helpers";
// import { useTranslation } from "next-i18next";

type GetAppNotificationPayloadPayload = {
  notificationType: string;
  beautyCenter?: Record<string, any> | null;
  referenceId?: string | null;
};

const useGetAppNotificationPayload = () => {
  // const { t } = useTranslation();

  const getAppNotificationPayload = (
    payload: GetAppNotificationPayloadPayload
  ) => {
    const {
      notificationType,
      // beautyCenter,
      // referenceId,
    } = payload;
    // const beautyCenterName =
    //   beautyCenter?.[
    //     commonHelpers.generateFieldNameByLanguage(
    //       "name",
    //       i18n.language
    //     ) as keyof typeof beautyCenter
    //   ];

    switch (notificationType) {
      // case notificationConstants.NotificationType.PUBLISHED: {
      //   return {
      //     title: t("appointmentNotificationTitle_text", {
      //       referenceId,
      //     }),
      //     body: t("appointmentPublishedNotificationBody_text"),
      //   };
      // }
      default: {
        return {
          title: "",
          body: "",
        };
      }
    }
  };

  return getAppNotificationPayload;
};

export default useGetAppNotificationPayload;
