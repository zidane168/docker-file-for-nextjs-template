import { generateUtilityClasses } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const appDrawerActionsClasses = generateUtilityClasses(
  "AppDrawerActions",
  ["root", "stickyFooter"]
);

const useStyles = makeStyles({
  name: "AppDrawerActions",
})((theme) => {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing(1),
      padding: theme.spacing(2, 3),
      position: "relative",
      backgroundColor: theme.palette.common.white,
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
    },
    stickyFooter: {
      position: "sticky",
      bottom: 0,
      zIndex: 100,
      [theme.breakpoints.down("md")]: {
        backgroundColor: theme.palette.common.white,
        boxShadow: "0px -11px 24px -4px rgba(27, 46, 94, 0.08)",
      },
    },
  };
});

export default useStyles;
