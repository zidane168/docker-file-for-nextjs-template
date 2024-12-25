import { commonConstants } from "@/utils/constants";
import { alpha } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AdminAppBar",
})((theme) => {
  return {
    root: {
      marginLeft: commonConstants.ADMIN_SIDEBAR_WIDTH,
      width: `calc(100% - ${commonConstants.ADMIN_SIDEBAR_WIDTH}px)`,
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      backdropFilter: "blur(6px)",
      transition: theme.transitions.create(["width", "margin-left"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      [theme.breakpoints.down("md")]: {
        marginLeft: 0,
        width: "100%",
      },
    },
    adminAppBarToolbar: {
      gap: theme.spacing(3),
      [theme.breakpoints.down("md")]: {
        gap: theme.spacing(2),
      },
    },
    adminAppBarToolbarLeft: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      gap: theme.spacing(1),
    },
  };
});

export default useStyles;
