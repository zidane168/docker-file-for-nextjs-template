import { appDrawerContentClasses } from "@/components/AppDrawerContent";
import { generateUtilityClasses } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const appDrawerTitleClasses = generateUtilityClasses("AppDrawerTitle", [
  "root",
  "stickyHeader",
]);

const useStyles = makeStyles({
  name: "AppDrawerTitle",
})((theme) => {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(2, 3),
      position: "relative",
      backgroundColor: theme.palette.common.white,
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
      [`& + .${appDrawerContentClasses.root}`]: {
        paddingTop: 0,
      },
    },
    stickyHeader: {
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
  };
});

export default useStyles;
