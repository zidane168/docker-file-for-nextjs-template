import { notificationConstants } from "@/utils/constants";
// import { commonHelpers } from "@/utils/helpers";
import { useTranslation } from "next-i18next";

type GetAppNotificationPayloadPayload = {
  notificationType: string;
  beautyCenter?: Record<string, any> | null;
  referenceId?: string | null;
};

const useGetAppNotificationPayload = () => {
  const { t } = useTranslation();

  const getAppNotificationPayload = (
    payload: GetAppNotificationPayloadPayload
  ) => {
    const {
      notificationType,
      // beautyCenter,
      referenceId,
    } = payload;
    // const beautyCenterName =
    //   beautyCenter?.[
    //     commonHelpers.generateFieldNameByLanguage(
    //       "name",
    //       i18n.language
    //     ) as keyof typeof beautyCenter
    //   ];

    switch (notificationType) {
      case notificationConstants.NotificationType.PUBLISHED: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentPublishedNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType
        .ASSIGNED_TO_BEAUTY_CENTER_BY_SYSTEM: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t(
            "appointmentAssignedToBeautyCenterBySystemNotificationBody_text"
          ),
        };
      }
      case notificationConstants.NotificationType.ASSIGNED_TIMEOUT_BY_SYSTEM: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentAssignedTimeoutBySystemNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType
        .ASSIGNED_NOT_FOUND_BY_SYSTEM: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentAssignedNotFoundNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType.DECLINED: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentDeclinedNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType.ACCEPTED: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentAcceptedNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType.CHECKED_IN_BY_BEAUTY_CENTER: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentCheckedInByBeautyCenterNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType.CHECKED_IN_BY_SYSTEM: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentCheckedInBySystemNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType.ABSENCE: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentAbsenceNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType
        .ASSIGNED_TO_BEAUTY_CENTER_BY_ADMIN: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t(
            "appointmentAssignedToBeautyCenterByAdminNotificationBody_text"
          ),
        };
      }
      case notificationConstants.NotificationType.CONFIRMED_BY_CUSTOMER: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentConfirmedByCustomerNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType.RESCHEDULED_BY_CUSTOMER: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentRescheduledByCustomerNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType
        .RESCHEDULED_BY_BEAUTY_CENTER: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentRescheduledByCenterNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType.CANCELLED_BY_ADMIN: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentCancelledByAdminNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType.CANCELLED_BY_CUSTOMER: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentCancelledByCustomerNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType.MAILED_TO_ADMIN: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentMailedByAdminNotificationBody_text"),
        };
      }
      case notificationConstants.NotificationType.SENT_SMS_TO_CUSTOMER: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentSentSmsToCustomerNotificationBody_text"),
        };
      }
      default: {
        return {
          title: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
          body: t("appointmentNotificationTitle_text", {
            referenceId,
          }),
        };
      }
    }
  };

  return getAppNotificationPayload;
};

export default useGetAppNotificationPayload;
