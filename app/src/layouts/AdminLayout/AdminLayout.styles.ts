import { commonConstants } from "@/utils/constants";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "main">({
  name: "AdminLayout",
  uniqId: "oazHF3",
})((theme, _, classes) => {
  return {
    root: {
      display: "flex",
      justifyContent: "flex-end",
      position: "relative",
    },
    main: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.default,
      minHeight: "100dvh",
      width: `calc(100% - ${commonConstants.ADMIN_SIDEBAR_WIDTH}px)`,
      transition: theme.transitions.create(["width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.down("md")]: {
        width: "100% !important",
      },
    },
    adminAppBar: {
      marginLeft: commonConstants.ADMIN_SIDEBAR_WIDTH,
      width: `calc(100% - ${commonConstants.ADMIN_SIDEBAR_WIDTH}px)`,
      transition: theme.transitions.create(["width", "margin-left"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.down("md")]: {
        marginLeft: 0,
        width: "100%",
      },
    },
    adminAppBarSidebarCollapsed: {
      marginLeft: `calc(${commonConstants.ADMIN_SIDEBAR_COLLAPSED_WIDTH}px)`,
      width: `calc(100% - ${commonConstants.ADMIN_SIDEBAR_COLLAPSED_WIDTH}px)`,
      transition: theme.transitions.create(["width", "margin-left"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.down("md")]: {
        marginLeft: 0,
        width: "100%",
      },
      [`& + .${classes.main}`]: {
        width: `calc(100% - ${commonConstants.ADMIN_SIDEBAR_COLLAPSED_WIDTH}px)`,
        transition: theme.transitions.create(["width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    },
  };
});

export default useStyles;
