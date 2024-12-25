import { alpha, darken } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "selected">({
  name: "AppMenuItem",
  uniqId: "BuxwSj",
})((theme, _, classes) => {
  return {
    root: {
      ...theme.typography.bodyReg14,
      lineHeight: "16px",
      padding: theme.spacing(1.25, 1.5),
      minHeight: 40,
      color: theme.palette.text.secondary,
      [`&.${classes.selected}`]: {
        backgroundColor: theme.palette.common.lighterNeutral,
        "&:hover": {
          backgroundColor: darken(
            theme.palette.common.lighterNeutral,
            theme.palette.action.hoverOpacity
          ),
        },
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
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.common.neutral,
          theme.palette.action.focusOpacity
        ),
      },
    },
    selected: {},
  };
});

export default useStyles;
