// import { storeNotificationSelectors } from "@/store";

import AppBadge from "@/components/AppBadge";
import AppIconButton from "@/components/AppIconButton";
import AppLink from "@/components/AppLink";
import AppSvgIcon from "@/components/AppSvgIcon";

// import { useAppSelector } from "@/hooks";

import NotificationsIcon from "@@/public/images/icons/notifications.svg";

const NotificationNav = () => {
  const $s_publicUnreadNotificationsCount = 0;

  return (
    <AppIconButton
      edge="x"
      component={AppLink}
      href="/notifications"
      underline="none"
      hoverColor="none"
    >
      <AppBadge
        badgeContent={$s_publicUnreadNotificationsCount}
        color="error.main"
      >
        <AppSvgIcon component={NotificationsIcon} fontSize="inherit" />
      </AppBadge>
    </AppIconButton>
  );
};

export default NotificationNav;
