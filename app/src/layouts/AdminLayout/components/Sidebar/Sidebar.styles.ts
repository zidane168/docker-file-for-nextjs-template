import { commonConstants } from "@/utils/constants";
import { alpha } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<
  void,
  | "selected"
  | "listItemText"
  | "drawerPaper"
  | "drawer"
  | "listItem"
  | "listItemButton"
  | "listContainer"
  | "listItemIcon"
  | "hasSubMenus"
  | "listItemArrowIcon"
  | "drawerCollapseOnHover"
>({
  name: "Sidebar",
  uniqId: "qsejAe",
})((theme, _, classes) => {
  return {
    drawer: {
      width: commonConstants.ADMIN_SIDEBAR_WIDTH,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerCollapsed: {
      position: "absolute",
    },
    drawerCollapseOnHover: {
      position: "absolute",
      width: `calc(${commonConstants.ADMIN_SIDEBAR_COLLAPSED_WIDTH}px)`,
      [`& .${classes.drawerPaper}`]: {
        width: `calc(${commonConstants.ADMIN_SIDEBAR_COLLAPSED_WIDTH}px)`,
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      [`& .${classes.listItem}.${classes.selected}:before`]: {
        left: `calc(${commonConstants.ADMIN_SIDEBAR_COLLAPSED_WIDTH}px)`,
        transition: theme.transitions.create("left", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      [`& .${classes.listContainer}`]: {
        overflow: "clip",
      },
    },
    drawerPaper: {
      width: commonConstants.ADMIN_SIDEBAR_WIDTH,
      overflowX: "clip",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: theme.palette.common.white,
      boxShadow: "4px 0px 10px 0px #0000000D",
      borderWidth: 0,
    },
    drawerContent: {
      width: commonConstants.ADMIN_SIDEBAR_WIDTH,
      display: "flex",
      flexDirection: "column",
      flex: 1,
      overflow: "auto",
    },
    logoContainer: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
      [`.${classes.drawerCollapseOnHover} &`]: {
        padding: 0,
        width: commonConstants.ADMIN_SIDEBAR_COLLAPSED_WIDTH,
        display: "flex",
        justifyContent: "center",
      },
    },
    logo: {
      gap: theme.spacing(1),
    },
    logoImage: {
      height: 40,
    },
    logoCollapseImage: {
      width: 40,
      height: 40,
    },
    logoVersionChip: {
      [`.${classes.drawerCollapseOnHover} &`]: {
        display: "none",
      },
    },
    listContainer: {
      flex: 1,
      overflowX: "hidden",
      overflowY: "auto",
      padding: theme.spacing(0, 1),
    },
    list: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(1),
      padding: theme.spacing(1, 0),
      [`.${classes.drawerCollapseOnHover} &`]: {
        padding: 0,
        paddingTop: theme.spacing(1),
        "&:last-of-type": {
          paddingBottom: theme.spacing(1),
        },
      },
    },
    listSubheader: {
      ...theme.typography.bodyReg16,
      lineHeight: "40px",
      color: theme.palette.primary.main,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      [`.${classes.drawerCollapseOnHover} &`]: {
        display: "none",
      },
    },
    listItem: {
      display: "block",
      borderRadius: theme.shape.borderRadius,
      overflow: "clip",
      [`&.${classes.selected}`]: {
        // [`& .${classes.listItemButton}`]: {
        //   position: "relative",
        //   backgroundColor: alpha(
        //     theme.palette.primary.main,
        //     theme.palette.action.selectedOpacity
        //   ),
        //   color: theme.palette.primary.main,
        //   "&:hover": {
        //     backgroundColor: alpha(
        //       theme.palette.primary.main,
        //       theme.palette.contrastThreshold / 10
        //     ),
        //   },
        //   [`& .${classes.listItemText}`]: {
        //     color: theme.palette.primary.main,
        //   },
        // },
        [`& .${classes.listItemIcon}`]: {
          color: theme.palette.primary.main,
        },
        [`& .${classes.listItemText}`]: {
          color: theme.palette.primary.main,
        },
        [`&:not(.${classes.hasSubMenus})`]: {
          [`& .${classes.listItemButton}`]: {
            position: "relative",
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity
            ),
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: alpha(
                theme.palette.primary.main,
                theme.palette.contrastThreshold / 10
              ),
            },
          },
        },
      },
      [`.${classes.drawerCollapseOnHover} &`]: {
        width: `calc(${theme.spacing(1 * 2)} + 24px)`,
        [`& .${classes.listItemText}, & .${classes.listItemArrowIcon}`]: {
          display: "none",
        },
        [`& .${classes.listItemIcon}`]: {
          marginRight: 0,
        },
      },
    },
    listItemButton: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      [`.${classes.drawerCollapseOnHover} &`]: {
        padding: "0 !important",
      },
      "&:hover": {
        [`& .${classes.listItemText}, & .${classes.listItemArrowIcon}, & .${classes.listItemIcon}`]:
          {
            color: theme.palette.primary.main,
          },
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    listItemText: {
      textTransform: "capitalize",
      color: alpha(
        theme.palette.primary.main,
        theme.palette.contrastThreshold / 10
      ),
      margin: 0,
      [`.${classes.drawerCollapseOnHover} &`]: {
        textAlign: "center",
      },
    },
    listItemIcon: {
      marginLeft: 0,
      color: alpha(
        theme.palette.primary.main,
        theme.palette.contrastThreshold / 10
      ),
    },
    listItemArrowIcon: {
      margin: 0,
      color: alpha(
        theme.palette.primary.main,
        theme.palette.contrastThreshold / 10
      ),
      transition: theme.transitions.create(["rotate"]),
    },
    selected: {},
    hasSubMenus: {},
  };
});

export default useStyles;
