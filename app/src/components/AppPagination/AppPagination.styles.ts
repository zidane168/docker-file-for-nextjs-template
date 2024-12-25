import _get from "lodash/get";
import { alpha, darken, rgbToHex } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";

type StylesParams = {
  color: AppThemeColor;
};

const useStyles = makeStyles<StylesParams, "selected">({
  name: "AppPagination",
  uniqId: "LRijS3",
})((theme, params, classes) => {
  let color: React.CSSProperties["color"];
  let textColor: React.CSSProperties["color"];
  //  =
  // _get(theme.palette, textColorToThemePalettePathMap[params.color!]) ||
  // _get(theme.palette, params.textColor!) ||
  // (params.textColor ?? theme.palette.getContrastText(color));

  switch (params.color) {
    case "primary": {
      color = theme.palette.primary.main;
      textColor = theme.palette.primary.contrastText;
      break;
    }
    case "secondary": {
      color = theme.palette.secondary.main;
      textColor = theme.palette.primary.contrastText;
      break;
    }
    case "error": {
      color = theme.palette.error.main;
      textColor = theme.palette.error.contrastText;
      break;
    }
    default:
      color =
        _get(theme.palette, params?.color ?? "") ??
        (params?.color || theme.palette.primary.main);
      textColor = theme.palette.getContrastText(color!);
      break;
  }

  return {
    paginationItemText: {
      [`&.${classes.selected}`]: {
        backgroundColor: color,
        color: textColor,
        "&:hover": {
          backgroundColor: darken(
            theme.palette.primary.main,
            theme.palette.contrastThreshold / 10
          ),
        },
      },
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.contrastThreshold / 10
        ),
      },
    },
    paginationItemOutlined: {
      borderColor: color,
      color,
      [`&.${classes.selected}`]: {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.contrastThreshold / 10
        ),
        "&:hover": {
          backgroundColor: darken(
            rgbToHex(
              alpha(
                theme.palette.primary.main,
                theme.palette.contrastThreshold / 10
              )
            ),
            theme.palette.contrastThreshold / 10
          ),
        },
      },
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.contrastThreshold / 10
        ),
      },
    },
    paginationItem: {
      fontSize: theme.typography.bodyReg14.fontSize,
      fontWeight: theme.typography.bodyReg14.fontWeight,
      fontFamily: theme.typography.bodyReg14.fontFamily,
      lineHeight: theme.typography.bodyReg14.lineHeight,
    },
    selected: {},
  };
});

export default useStyles;
