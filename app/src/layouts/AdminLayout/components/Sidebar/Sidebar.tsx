import { bindActionCreators } from "redux";

import { storeCommonAction } from "@/store";
import { envConfig } from "@/utils/config";

import { Collapse, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import IMediaTextSvg from "@@/public/images/svgs/i-media-text.svg";
import IMediaSvg from "@@/public/images/i-media.svg";

import AppLink from "@/components/AppLink";
import AdminAppBarToolbar from "@/components/AdminAppBarToolbar";
import AppList from "@/components/AppList";
import AppListItem from "@/components/AppListItem";
import AppListItemText from "@/components/AppListItemText";
import AppDrawer from "@/components/AppDrawer";
import AppListItemButton from "@/components/AppListItemButton";
import AppListItemIcon from "@/components/AppListItemIcon";
import AppSvgIcon from "@/components/AppSvgIcon";
import AppListSubheader from "@/components/AppListSubheader";
import AppChip from "@/components/AppChip";

import PeopleOutlineSharpIcon from "@mui/icons-material/PeopleOutlineSharp";
import KeyboardArrowDownIcon from "@@/public/images/icons/keyboard-arrow-down.svg";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";

import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector, useIsMounted } from "@/hooks";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo, useState } from "react";

import useStyles from "./Sidebar.styles";

type MenuListProps = {
  subheader?: string;
  menuLevel?: number;
  sidebarOpened?: boolean;
  sidebarCollapsed?: boolean;
  isPrimaryMenu?: boolean;
  menus: Menu[];
};

type Menu = {
  label: string;
  path?: string;
  activePath: RegExp;
  permissionName?: string;
  Icon?: React.ElementType;
  submenus?: Menu[];
};

const menuGroups = [
  {
    menus: [
      {
        label: "admin",
        path: "/admin",
        activePath: new RegExp("^/admin"),
        Icon: PeopleOutlineSharpIcon,
        submenus: [
          {
            label: "users",
            path: "/admin/users",
            activePath: new RegExp("^/admin/users"),
          },
          {
            label: "roles",
            path: "/admin/roles",
            activePath: new RegExp("^/admin/roles"),
            Icon: PeopleOutlineSharpIcon,
          },
        ],
      },
    ],
  },
  {
    subheader: "content",
    menus: [
      {
        label: "banners",
        path: "/banners",
        activePath: new RegExp("^/banners"),
        Icon: ViewCarouselOutlinedIcon,
      },
    ],
  },
  {
    subheader: "settings",
    menus: [
      {
        label: "account",
        path: "/settings/account",
        activePath: new RegExp("^/settings/account"),
        Icon: SettingsOutlinedIcon,
      },
    ],
  },
] as {
  subheader?: string;
  menus: Menu[];
}[];

const MenuList = (props: MenuListProps) => {
  const {
    subheader,
    menuLevel = 0,
    menus,
    sidebarOpened,
    sidebarCollapsed,
    isPrimaryMenu = false,
  } = props;

  const router = useRouter();

  const [collapsedSubMenuMap, setCollapsedSubMenuMap] = useState<{
    [menuIndex: number]: boolean;
  }>(() => {
    const collapsedMenuIndex = menus.findIndex(
      (menu) =>
        router.pathname.match(menu?.activePath || "") &&
        (menu.submenus?.length || 0) > 0
    );
    return collapsedMenuIndex > -1
      ? {
          [collapsedMenuIndex]: true,
        }
      : {};
  });

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const $s_commonAction = useMemo(
    () => bindActionCreators(storeCommonAction, dispatch),
    [dispatch]
  );

  const { classes, cx } = useStyles();

  const handleSubMenuToggle = (menuIndex: number) => () => {
    setCollapsedSubMenuMap((prevCollapsedSubMenuMap) => ({
      ...prevCollapsedSubMenuMap,
      [menuIndex]: !prevCollapsedSubMenuMap[menuIndex],
    }));
  };

  const handleRouteChange = (url: string) => {
    const collapsedMenuIndex = menus.findIndex(
      (menu) =>
        url.match(menu.activePath || "") && (menu.submenus?.length || 0) > 0
    );
    setCollapsedSubMenuMap(
      collapsedMenuIndex > -1
        ? {
            [collapsedMenuIndex]: true,
          }
        : {}
    );
  };

  useEffect(() => {
    if (isMounted()) {
      handleRouteChange(router.asPath);
    }
  }, [router.asPath]);

  const isMounted = useIsMounted();

  return (
    <AppList
      className={classes.list}
      subheader={
        !!isPrimaryMenu &&
        !!subheader && (
          <AppListSubheader className={classes.listSubheader}>
            {t(subheader as any)}
          </AppListSubheader>
        )
      }
    >
      {menus.map((menu, menuIndex) => {
        const hasSubMenu = (menu!.submenus?.length || 0) > 0;
        const subMenuOpen =
          !!collapsedSubMenuMap[menuIndex] && !sidebarCollapsed;

        return (
          <AppListItem
            className={cx(classes.listItem, {
              [classes.selected]: !!router.pathname.match(
                menu?.activePath || ""
              ),
              [classes.hasSubMenus]: hasSubMenu,
            })}
            key={menuIndex}
            disablePadding
          >
            <AppListItemButton
              sx={(theme) => ({
                justifyContent: sidebarOpened ? "initial" : "center",
                px: 1,
                pl: `calc(${theme.spacing(1)} + ${
                  isPrimaryMenu
                    ? `0px`
                    : `(24px + ${theme.spacing(1)})*${menuLevel}`
                })`,
              })}
              classes={{
                root: classes.listItemButton,
              }}
              disableGutters
              {...(menu?.path && !menu.submenus
                ? {
                    component: AppLink,
                    href: menu?.path,
                  }
                : {
                    component: "div",
                  })}
              onClick={
                hasSubMenu
                  ? handleSubMenuToggle(menuIndex)
                  : () => {
                      $s_commonAction.setFloatAdminSidebarOpened(false);
                    }
              }
            >
              {!!isPrimaryMenu && (
                <AppListItemIcon className={classes.listItemIcon}>
                  <AppSvgIcon component={menu.Icon} color="inherit" />
                </AppListItemIcon>
              )}
              <AppListItemText
                classes={{ root: classes.listItemText }}
                primary={t(menu!.label! as any)}
              />
              {hasSubMenu && (
                <AppListItemIcon
                  className={classes.listItemArrowIcon}
                  sx={{
                    rotate: subMenuOpen ? "180deg" : "0deg",
                  }}
                >
                  <AppSvgIcon
                    component={KeyboardArrowDownIcon}
                    color="inherit"
                    sx={{
                      mx: "-6px",
                    }}
                  />
                </AppListItemIcon>
              )}
            </AppListItemButton>
            {hasSubMenu && (
              <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
                <MenuList
                  menus={menu!.submenus!}
                  sidebarCollapsed={sidebarCollapsed}
                  sidebarOpened={sidebarOpened}
                  menuLevel={menuLevel + 1}
                />
              </Collapse>
            )}
          </AppListItem>
        );
      })}
    </AppList>
  );
};

const Sidebar = () => {
  const [rootHovered, setRootHovered] = useState(false);

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

  const { classes, cx } = useStyles();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const isCollapsedOnHover = useMemo(
    () => $s_adminSidebarCollapseOpened && !isMdDown && !rootHovered,
    [$s_adminSidebarCollapseOpened, isMdDown, rootHovered]
  );

  const handleSidebarClose = () => {
    $s_commonAction.setFloatAdminSidebarOpened(!$s_floatAdminSidebarOpened);
  };

  return (
    <AppDrawer
      className={cx(classes.drawer, {
        [classes.drawerCollapseOnHover]: isCollapsedOnHover,
        [classes.drawerCollapsed]: $s_adminSidebarCollapseOpened,
      })}
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
      variant={isMdDown ? "temporary" : "permanent"}
      open={$s_floatAdminSidebarOpened}
      onClose={handleSidebarClose}
      onMouseEnter={() => setRootHovered(true)}
      onMouseLeave={() => setRootHovered(false)}
    >
      <div className={classes.drawerContent}>
        <AdminAppBarToolbar disableGutters className={classes.logo}>
          <div className={classes.logoContainer}>
            {isCollapsedOnHover ? (
              <IMediaTextSvg className={classes.logoCollapseImage} />
            ) : (
              <IMediaSvg className={classes.logoImage} />
            )}
            <AppChip
              className={classes.logoVersionChip}
              size="small"
              borderRadius="rounded"
              label={`v${envConfig.APP_VERSION}`}
            />
          </div>
        </AdminAppBarToolbar>
        <div className={classes.listContainer}>
          {menuGroups.map((menuGroup, menuGroupIndex) => (
            <MenuList
              key={menuGroupIndex}
              subheader={menuGroup.subheader}
              menus={menuGroup.menus}
              isPrimaryMenu
              sidebarCollapsed={isCollapsedOnHover}
              sidebarOpened={$s_floatAdminSidebarOpened}
            />
          ))}
        </div>
      </div>
    </AppDrawer>
  );
};

export default Sidebar;
