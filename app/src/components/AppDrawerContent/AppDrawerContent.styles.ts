import { appDrawerActionsClasses } from "@/components/AppDrawerActions";
import { generateUtilityClasses } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const appDrawerContentClasses = generateUtilityClasses(
  "AppDrawerContent",
  ["root", "padding"]
);

const useStyles = makeStyles({
  name: "AppDrawerContent",
})((theme) => {
  return {
    root: {
      flex: 1,
      backgroundColor: theme.palette.common.white,
      [`& + .${appDrawerActionsClasses.stickyFooter}`]: {
        marginTop: theme.spacing(-2),
        [theme.breakpoints.down("sm")]: {
          padding: theme.spacing(2),
        },
      },
    },
    padding: {
      padding: theme.spacing(2, 3),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
    },
  };
});

export default useStyles;
