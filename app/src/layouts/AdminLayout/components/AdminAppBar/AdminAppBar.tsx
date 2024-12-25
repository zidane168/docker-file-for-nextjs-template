import { useMemo } from "react";
import { bindActionCreators } from "redux";

import { storeCommonAction } from "@/store";
import { commonConstants } from "@/utils/constants";

import { AppBar, useMediaQuery } from "@mui/material";
import AdminAppBarToolbar from "@/components/AdminAppBarToolbar";
import AppIconButton from "@/components/AppIconButton";
import AppTypography from "@/components/AppTypography";
import AppSvgIcon from "@/components/AppSvgIcon";
import LanguageSelect from "@/layouts/AdminLayout/components/AdminAppBar/components/LanguageSelect";
import AccountLogout from "@/layouts/AdminLayout/components/AdminAppBar/components/AccountLogout";

import MenuIcon from "@@/public/images/icons/menu.svg";

import { useAppDispatch, useAppSelector } from "@/hooks";

import useStyles from "./AdminAppBar.styles";

export type AdminBarProps = {
  title?: string;
  className?: string;
};

const MenuIconButton = () => {
  const { theme } = useStyles();

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();

  const $s_commonAction = useMemo(
    () => bindActionCreators(storeCommonAction, dispatch),
    [dispatch]
  );

  const $s_adminSidebarCollapseOpened = useAppSelector(
    (state) => state.common.adminSidebarCollapseOpened
  );
  const $s_floatAdminSidebarOpened = useAppSelector(
    (state) => state.common.floatAdminSidebarOpened
  );

  const handleSidebarToggle = () => {
    if (isMdDown)
      $s_commonAction.setFloatAdminSidebarOpened(!$s_floatAdminSidebarOpened);
    else
      $s_commonAction.setAdminSidebarCollapseOpened(
        !$s_adminSidebarCollapseOpened
      );
  };

  return (
    <AppIconButton
      edge="start"
      color="common.darkNeutral"
      borderRadius="circular"
      onClick={handleSidebarToggle}
    >
      <AppSvgIcon component={MenuIcon} fontSize="inherit" />
    </AppIconButton>
  );
};

const AdminAppBar = (props: AdminBarProps) => {
  const { className, title } = props;

  const { classes, theme, cx } = useStyles();

  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <AppBar
      className={cx(classes.root, !!className && className)}
      position="fixed"
      elevation={0}
      color="inherit"
      id={commonConstants.ADMIN_HEADER_ELE_ID}
    >
      <AdminAppBarToolbar className={classes.adminAppBarToolbar}>
        <div className={classes.adminAppBarToolbarLeft}>
          <MenuIconButton />
          {title && !isLgDown && (
            <AppTypography variant="titleMed22" noWrap>
              {title}
            </AppTypography>
          )}
        </div>
        <LanguageSelect />
        <AccountLogout />
      </AdminAppBarToolbar>
    </AppBar>
  );
};

export default AdminAppBar;
