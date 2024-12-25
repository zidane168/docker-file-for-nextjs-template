import { darken } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "selected" | "focusVisible">({
  name: "AppListItemButton",
  uniqId: "T1UyK6",
})((theme, _, classes) => {
  return {
    root: {
      minHeight: 40,
      [`&.${classes.focusVisible}`]: {
        backgroundColor: darken(
          theme.palette.common.lightNeutral,
          theme.palette.action.focusOpacity
        ),
      },
      [`&.${classes.selected}`]: {
        backgroundColor: theme.palette.common.lightNeutral,
        [`&.${classes.focusVisible}`]: {
          backgroundColor: darken(
            theme.palette.common.lightNeutral,
            theme.palette.action.focusOpacity
          ),
        },
        "&:hover": {
          backgroundColor: darken(
            theme.palette.common.lightNeutral,
            theme.palette.action.hoverOpacity
          ),
        },
      },
    },
    gutters: {
      padding: theme.spacing(1.5),
    },
    disableHover: {
      "&:hover": {
        cursor: "auto",
        backgroundColor: "initial",
      },
    },
    selected: {},
    focusVisible: {},
  };
});

export default useStyles;
