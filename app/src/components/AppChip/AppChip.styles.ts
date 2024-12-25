import { alpha, darken, rgbToHex } from "@mui/material/styles";
import _get from "lodash/get";
import { makeStyles } from "tss-react/mui";

type StylesParams = {
  color: string;
  textColor: string;
};

const colorToPalettePathMap = {
  default: "common.bg",
};

const textColorToPalettePathMap = {
  textPrimary: "text.primary",
};

const useStyles = makeStyles<
  StylesParams,
  | "clickable"
  | "avatarMedium"
  | "deleteIcon"
  | "iconMedium"
  | "iconSmall"
  | "sizeMedium"
  | "sizeSmall"
>({
  name: "AppChip",
  uniqId: "m11y7A",
})((theme, params, classes) => {
  const color =
    params.color === "default"
      ? theme.palette.primary.main
      : _get(
          theme.palette,
          colorToPalettePathMap[
            params?.color as keyof typeof colorToPalettePathMap
          ] || params?.color
        ) ||
        params?.color ||
        theme.palette.grey[100];

  const textColor: string =
    params.textColor === "default" || !params.textColor
      ? theme.palette.getContrastText(color)
      : _get(
          theme.palette,
          textColorToPalettePathMap[
            params.textColor as keyof typeof textColorToPalettePathMap
          ] ?? params.textColor
        ) || params.textColor;

  return {
    root: {
      [`& .${classes.avatarMedium}`]: {
        marginRight: theme.spacing(-1.25 / 2),
        marginLeft: 4,
        width: 22,
        height: 22,
      },
      [`& .${classes.iconMedium}`]: {
        marginRight: theme.spacing(-1.25 / 2),
        marginLeft: 4,
      },
      [`& .${classes.iconSmall}`]: {
        marginRight: theme.spacing(-1.25 / 2),
        marginLeft: 4,
      },
      [`& .${classes.deleteIcon}`]: {
        fontSize: 20,
        marginRight: 30 / 4,
        marginLeft: -2,
        "&:hover": {
          color: darken(textColor, theme.palette.action.hoverOpacity),
        },
      },
      [`&.${classes.sizeSmall} .${classes.deleteIcon}`]: {
        marginRight: `${24 / 4 - 2}px`,
      },
    },
    borderRadiusRounded: {
      borderRadius: theme.shape.borderRadius / 2,
    },
    label: {
      ...(theme.typography.bodySemi14 as any),
    },
    sizeMedium: {
      height: 30,
    },
    sizeSmall: {
      height: 24,
    },
    labelMedium: {
      paddingLeft: theme.spacing(1.25),
      paddingRight: theme.spacing(1.25),
    },
    labelSmall: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    outlinedPrimary: {},
    filled: {
      backgroundColor: color,
      color: textColor,
      [`&.${classes.clickable}`]: {
        "&:hover": {
          backgroundColor: darken(color, theme.palette.contrastThreshold / 10),
        },
      },
      [`& .${classes.iconMedium}`]: {
        color: textColor,
      },
      [`& .${classes.iconSmall}`]: {
        color: textColor,
      },
      [`& .${classes.deleteIcon}`]: {
        color: textColor,
        "&:hover": {
          color: darken(textColor, theme.palette.action.hoverOpacity),
        },
      },
    },
    filledTonal: {
      backgroundColor: alpha(color, theme.palette.action.tonalOpacity),
      color:
        params.textColor === "default" || !params.textColor ? color : textColor,
      [`&.${classes.clickable}`]: {
        "&:hover": {
          backgroundColor: darken(
            rgbToHex(alpha(color, theme.palette.action.tonalOpacity)),
            theme.palette.contrastThreshold / 10
          ),
        },
      },
    },
    outlined: {
      borderColor: color,
      color: params.textColor === "default" ? color : textColor,
      [`&.${classes.clickable}`]: {
        "&:hover": {
          backgroundColor: alpha(color, theme.palette.action.hoverOpacity),
        },
      },
      [`& .${classes.iconMedium}`]: {
        color: params.textColor === "default" ? color : textColor,
      },
      [`& .${classes.iconSmall}`]: {
        color: params.textColor === "default" ? color : textColor,
      },
      [`& .${classes.deleteIcon}`]: {
        color: params.textColor === "default" ? color : textColor,
      },
    },
    avatarMedium: {},
    iconMedium: {},
    iconSmall: {},
    deleteIcon: {},
    clickable: {},
  };
});

export default useStyles;
