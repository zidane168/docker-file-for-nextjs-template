import { alpha, darken } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "selected">({
  name: "AppListItem",
  uniqId: "qWpSuI",
})((theme, _, classes) => {
  return {
    root: {
      minHeight: 40,
      [`&.${classes.selected}`]: {
        backgroundColor: theme.palette.common.lighterNeutral,
        "&.Mui-focused": {
          backgroundColor: darken(
            theme.palette.common.lighterNeutral,
            theme.palette.action.focusOpacity
          ),
        },
        "&.Mui-focusVisible": {
          backgroundColor: darken(
            theme.palette.common.lighterNeutral,
            theme.palette.action.hoverOpacity
          ),
        },
      },
      "&.Mui-focused": {
        backgroundColor: alpha(
          theme.palette.common.neutral,
          theme.palette.action.focusOpacity
        ),
      },
    },
    padding: {
      padding: theme.spacing(1.5),
    },
    selected: {},
  };
});

export default useStyles;
