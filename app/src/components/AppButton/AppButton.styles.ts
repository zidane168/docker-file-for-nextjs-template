import { generateUtilityClasses } from "@mui/material";
import { alpha, darken, rgbToHex } from "@mui/material/styles";
import _get from "lodash/get";
import { makeStyles } from "tss-react/mui";

type MakeStylesParams = {
  color: string;
  textColor: string;
};

const textColorToThemePalettePathMap = {
  primary: "primary.contrastText",
  secondary: "secondary.contrastText",
} as {
  [key: string]: string;
};

const colorToThemePalettePathMap = {
  primary: "primary.main",
  secondary: "secondary.main",
} as {
  [key: string]: string;
};

export const appButtonClasses = generateUtilityClasses("AppButton", [
  "root",
  "noWrap",
  "borderRadiusRounded",
  "borderRadiusCircular",
  "borderRadiusRoundedSizeSmall",
  "fullMaxHeightSizeMedium",
  "fullMaxHeightSizeSmall",
  "text",
  "textSizeMedium",
  "textSizeSmall",
  "textEdgeStart",
  "textEdgeEnd",
  "textEdgeTop",
  "textEdgeBottom",
  "textEdgeX",
  "textEdgeY",
  "textEdgeXY",
  "outlined",
  "outlinedSizeMedium",
  "outlinedSizeSmall",
  "outlinedEdgeStart",
  "outlinedEdgeEnd",
  "outlinedEdgeTop",
  "outlinedEdgeBottom",
  "outlinedEdgeX",
  "outlinedEdgeY",
  "outlinedEdgeXY",
  "containedTonal",
  "containedTonalSizeMedium",
  "containedTonalSizeSmall",
  "containedTonalEdgeStart",
  "containedTonalEdgeEnd",
  "containedTonalEdgeTop",
  "containedTonalEdgeBottom",
  "containedTonalEdgeX",
  "containedTonalEdgeY",
  "containedTonalEdgeXY",
  "contained",
  "containedSizeMedium",
  "containedSizeSmall",
  "containedEdgeStart",
  "containedEdgeEnd",
  "containedEdgeTop",
  "containedEdgeBottom",
  "containedEdgeX",
  "containedEdgeY",
  "containedEdgeXY",
  "icon",
  "endIcon",
  "startIcon",
  "fullWidth",
  "disabled",
  "focusVisible",
]);

const useStyles = makeStyles<
  MakeStylesParams,
  | "containedTonalEdgeStart"
  | "containedTonalEdgeEnd"
  | "containedTonalEdgeTop"
  | "containedTonalEdgeBottom"
  | "containedTonalEdgeX"
  | "containedTonalEdgeY"
  | "containedTonalEdgeXY"
  | "containedEdgeStart"
  | "containedEdgeEnd"
  | "containedEdgeTop"
  | "containedEdgeBottom"
  | "containedEdgeX"
  | "containedEdgeY"
  | "containedEdgeXY"
  | "outlinedEdgeStart"
  | "outlinedEdgeEnd"
  | "outlinedEdgeTop"
  | "outlinedEdgeBottom"
  | "outlinedEdgeX"
  | "outlinedEdgeY"
  | "outlinedEdgeXY"
  | "textEdgeStart"
  | "textEdgeEnd"
  | "textEdgeTop"
  | "textEdgeBottom"
  | "textEdgeX"
  | "textEdgeY"
  | "textEdgeXY"
  | "disabled"
  | "startIcon"
  | "endIcon"
>({
  name: "AppButton",
  uniqId: "kta7lJ",
})((theme, params, classes) => {
  const color = (_get(
    theme.palette,
    colorToThemePalettePathMap[params.color!]
  ) ||
    _get(theme.palette, params.color!) ||
    (params.color ?? "white")) as string;

  const textColor =
    _get(theme.palette, textColorToThemePalettePathMap[params.color!]) ||
    _get(theme.palette, params.textColor!) ||
    (params.textColor ?? theme.palette.getContrastText(color));

  // Medium size 44 => 40 = y - 2 / x - 4
  const containedTonalSizeMediumPaddingX = "20px" as unknown as number;
  const containedTonalSizeMediumPaddingY = "10px" as unknown as number;

  const containedSizeMediumPaddingX = "20px" as unknown as number;
  const containedSizeMediumPaddingY = "10px" as unknown as number;

  const textSizeMediumPaddingX = "10px" as unknown as number;
  const textSizeMediumPaddingY = "10px" as unknown as number;

  const outlinedSizeMediumPaddingX = "19px" as unknown as number;
  const outlinedSizeMediumPaddingY = "9px" as unknown as number;
  // Small size 36 => 32 = y - 2 / x - 4
  const containedTonalSizeSmallPaddingX = "12px" as unknown as number;
  const containedTonalSizeSmallPaddingY = "6px" as unknown as number;

  const containedSizeSmallPaddingX = "12px" as unknown as number;
  const containedSizeSmallPaddingY = "6px" as unknown as number;

  const textSizeSmallPaddingX = "6px" as unknown as number; // + 36 = 8 => 1 = 0.5
  const textSizeSmallPaddingY = "6px" as unknown as number;

  const outlinedSizeSmallPaddingX = "11px" as unknown as number;
  const outlinedSizeSmallPaddingY = "5px" as unknown as number;

  return {
    root: {
      fontFamily: theme.typography.button.fontFamily,
      fontSize: theme.typography.button.fontSize,
      fontWeight: theme.typography.button.fontWeight,
      textTransform: theme.typography.button.textTransform,
      lineHeight: theme.typography.button.lineHeight,
      color,
      "&:hover": {
        backgroundColor: alpha(color, theme.palette.action.hoverOpacity),
      },
      [`&.${classes.disabled}`]: {
        color: theme.palette.text.disabled,
      },
    },
    noWrap: {
      overflow: "hidden",
    },
    borderRadiusRounded: {
      borderRadius: theme.shape.borderRadius,
    },
    borderRadiusCircular: {
      borderRadius: "40px",
    },
    borderRadiusRoundedSizeSmall: {
      borderRadius: theme.shape.borderRadius / 2,
    },
    fullMaxHeightSizeMedium: {
      maxHeight: 40,
    },
    fullMaxHeightSizeSmall: {
      maxHeight: 30,
    },

    text: {
      [`& .${classes.startIcon}`]: {
        marginLeft: `calc(-${textSizeMediumPaddingX}/2 + 2px)`,
        marginRight: `calc(${textSizeMediumPaddingX}/2 - 2px)`,
      },
      [`& .${classes.endIcon}`]: {
        marginLeft: `calc(${textSizeMediumPaddingX}/2 - 2px)`,
        marginRight: `calc(-${textSizeMediumPaddingX}/2 + 2px)`,
      },
      [`&.${classes.disabled}`]: {
        backgroundColor: "transparent",
        color: theme.palette.text.disabled,
      },
    },
    textSizeMedium: {
      padding: theme.spacing(textSizeMediumPaddingY, textSizeMediumPaddingX),
    },
    textSizeSmall: {
      padding: theme.spacing(textSizeSmallPaddingY, textSizeSmallPaddingX),
      [`& .${classes.startIcon}`]: {
        marginLeft: `calc(-${textSizeSmallPaddingX}/2 + 2px)`,
        marginRight: `calc(${textSizeSmallPaddingX}/2 - 2px)`,
      },
      [`& .${classes.endIcon}`]: {
        marginLeft: `calc(${textSizeSmallPaddingX}/2 - 2px)`,
        marginRight: `calc(-${textSizeSmallPaddingX}/2 + 2px)`,
      },
      [`&.${classes.textEdgeStart}`]: {
        marginLeft: `-${theme.spacing(textSizeSmallPaddingX)}`,
      },
      [`&.${classes.textEdgeEnd}`]: {
        marginRight: `-${theme.spacing(textSizeSmallPaddingX)}`,
      },
      [`&.${classes.textEdgeTop}`]: {
        marginTop: `-${theme.spacing(textSizeSmallPaddingY)}`,
      },
      [`&.${classes.textEdgeBottom}`]: {
        marginBottom: `-${theme.spacing(textSizeSmallPaddingY)}`,
      },
      [`&.${classes.textEdgeX}`]: {
        marginLeft: `-${theme.spacing(textSizeSmallPaddingX)}`,
        marginRight: `-${theme.spacing(textSizeSmallPaddingX)}`,
      },
      [`&.${classes.textEdgeY}`]: {
        marginTop: `-${theme.spacing(textSizeSmallPaddingY)}`,
        marginBottom: `-${theme.spacing(textSizeSmallPaddingY)}`,
      },
      [`&.${classes.textEdgeXY}`]: {
        marginTop: `-${theme.spacing(textSizeSmallPaddingY)}`,
        marginBottom: `-${theme.spacing(textSizeSmallPaddingY)}`,
        marginLeft: `-${theme.spacing(textSizeSmallPaddingX)}`,
        marginRight: `-${theme.spacing(textSizeSmallPaddingX)}`,
      },
    },
    textEdgeStart: {
      marginLeft: `-${theme.spacing(textSizeMediumPaddingX)}`,
    },
    textEdgeEnd: {
      marginRight: `-${theme.spacing(textSizeMediumPaddingX)}`,
    },
    textEdgeTop: {
      marginTop: `-${theme.spacing(textSizeMediumPaddingY)}`,
    },
    textEdgeBottom: {
      marginBottom: `-${theme.spacing(textSizeMediumPaddingY)}`,
    },
    textEdgeX: {
      marginLeft: `-${theme.spacing(textSizeMediumPaddingX)}`,
      marginRight: `-${theme.spacing(textSizeMediumPaddingX)}`,
    },
    textEdgeY: {
      marginTop: `-${theme.spacing(textSizeMediumPaddingY)}`,
      marginBottom: `-${theme.spacing(textSizeMediumPaddingY)}`,
    },
    textEdgeXY: {
      marginLeft: `-${theme.spacing(textSizeMediumPaddingX)}`,
      marginRight: `-${theme.spacing(textSizeMediumPaddingX)}`,
      marginTop: `-${theme.spacing(textSizeMediumPaddingY)}`,
      marginBottom: `-${theme.spacing(textSizeMediumPaddingY)}`,
    },

    outlined: {
      border: `1px solid ${color}`,
      color: !params.textColor ? color : textColor,
      "&:hover": {
        backgroundColor: alpha(color, theme.palette.action.hoverOpacity),
      },
      [`& .${classes.startIcon}`]: {
        marginLeft: `calc(-${outlinedSizeMediumPaddingX}/2 + 2px)`,
        marginRight: `calc(${outlinedSizeMediumPaddingX}/2 - 2px)`,
      },
      [`& .${classes.endIcon}`]: {
        marginLeft: `calc(${outlinedSizeMediumPaddingX}/2 - 2px)`,
        marginRight: `calc(-${outlinedSizeMediumPaddingX}/2 + 2px)`,
      },
      [`&.${classes.disabled}`]: {
        color: theme.palette.text.disabled,
        borderColor: theme.palette.text.disabled,
      },
    },
    outlinedSizeMedium: {
      padding: theme.spacing(
        outlinedSizeMediumPaddingY,
        outlinedSizeMediumPaddingX
      ),
    },
    outlinedSizeSmall: {
      padding: theme.spacing(
        outlinedSizeSmallPaddingY,
        outlinedSizeSmallPaddingX
      ),
      [`& .${classes.startIcon}`]: {
        marginLeft: `calc(-${outlinedSizeSmallPaddingX}/2 + 2px)`,
        marginRight: `calc(${outlinedSizeSmallPaddingX}/2 - 2px)`,
      },
      [`& .${classes.endIcon}`]: {
        marginLeft: `calc(${outlinedSizeSmallPaddingX}/2 - 2px)`,
        marginRight: `calc(-${outlinedSizeSmallPaddingX}/2 + 2px)`,
      },
      [`&.${classes.outlinedEdgeStart}`]: {
        marginLeft: `-${theme.spacing(outlinedSizeSmallPaddingX)}`,
      },
      [`&.${classes.outlinedEdgeEnd}`]: {
        marginRight: `-${theme.spacing(outlinedSizeSmallPaddingX)}`,
      },
      [`&.${classes.outlinedEdgeTop}`]: {
        marginTop: `-${theme.spacing(outlinedSizeSmallPaddingY)}`,
      },
      [`&.${classes.outlinedEdgeBottom}`]: {
        marginBottom: `-${theme.spacing(outlinedSizeSmallPaddingY)}`,
      },
      [`&.${classes.outlinedEdgeX}`]: {
        marginLeft: `-${theme.spacing(outlinedSizeSmallPaddingX)}`,
        marginRight: `-${theme.spacing(outlinedSizeSmallPaddingX)}`,
      },
      [`&.${classes.outlinedEdgeY}`]: {
        marginTop: `-${theme.spacing(outlinedSizeSmallPaddingY)}`,
        marginBottom: `-${theme.spacing(outlinedSizeSmallPaddingY)}`,
      },
      [`&.${classes.outlinedEdgeXY}`]: {
        marginTop: `-${theme.spacing(outlinedSizeSmallPaddingY)}`,
        marginBottom: `-${theme.spacing(outlinedSizeSmallPaddingY)}`,
        marginLeft: `-${theme.spacing(outlinedSizeSmallPaddingX)}`,
        marginRight: `-${theme.spacing(outlinedSizeSmallPaddingX)}`,
      },
    },
    outlinedEdgeStart: {
      marginLeft: `-${theme.spacing(outlinedSizeMediumPaddingX)}`,
    },
    outlinedEdgeEnd: {
      marginRight: `-${theme.spacing(outlinedSizeMediumPaddingX)}`,
    },
    outlinedEdgeTop: {
      marginTop: `-${theme.spacing(outlinedSizeMediumPaddingY)}`,
    },
    outlinedEdgeBottom: {
      marginBottom: `-${theme.spacing(outlinedSizeMediumPaddingY)}`,
    },
    outlinedEdgeX: {
      marginLeft: `-${theme.spacing(outlinedSizeMediumPaddingX)}`,
      marginRight: `-${theme.spacing(outlinedSizeMediumPaddingX)}`,
    },
    outlinedEdgeY: {
      marginTop: `-${theme.spacing(outlinedSizeMediumPaddingY)}`,
      marginBottom: `-${theme.spacing(outlinedSizeMediumPaddingY)}`,
    },
    outlinedEdgeXY: {
      marginLeft: `-${theme.spacing(outlinedSizeMediumPaddingX)}`,
      marginRight: `-${theme.spacing(outlinedSizeMediumPaddingX)}`,
      marginTop: `-${theme.spacing(outlinedSizeMediumPaddingY)}`,
      marginBottom: `-${theme.spacing(outlinedSizeMediumPaddingY)}`,
    },

    containedTonal: {
      backgroundColor: alpha(color, theme.palette.action.tonalOpacity),
      color: !params.textColor ? color : textColor,
      "&:hover": {
        backgroundColor: darken(
          rgbToHex(alpha(color, theme.palette.action.tonalOpacity)),
          theme.palette.action.hoverOpacity
        ),
      },
      [`& .${classes.startIcon}`]: {
        marginLeft: `calc(-${containedSizeMediumPaddingX}/2 + 2px)`,
        marginRight: `calc(${containedSizeMediumPaddingX}/2 - 2px)`,
      },
      [`& .${classes.endIcon}`]: {
        marginLeft: `calc(${containedSizeMediumPaddingX}/2 - 2px)`,
        marginRight: `calc(-${containedSizeMediumPaddingX}/2 + 2px)`,
      },
      [`&.${classes.disabled}`]: {
        backgroundColor: theme.palette.text.disabled,
        color: theme.palette.common.white,
      },
    },
    containedTonalSizeMedium: {
      padding: theme.spacing(
        containedTonalSizeMediumPaddingY,
        containedTonalSizeMediumPaddingX
      ),
    },
    containedTonalSizeSmall: {
      padding: theme.spacing(
        containedTonalSizeSmallPaddingY,
        containedTonalSizeSmallPaddingX
      ),
      [`& .${classes.startIcon}`]: {
        marginLeft: `calc(-${containedTonalSizeSmallPaddingX}/2 + 2px)`,
        marginRight: `calc(${containedTonalSizeSmallPaddingX}/2 - 2px)`,
      },
      [`& .${classes.endIcon}`]: {
        marginLeft: `calc(${containedTonalSizeSmallPaddingX}/2 - 2px)`,
        marginRight: `calc(-${containedTonalSizeSmallPaddingX}/2 + 2px)`,
      },
      [`&.${classes.containedTonalEdgeStart}`]: {
        marginLeft: `-${theme.spacing(containedTonalSizeSmallPaddingX)}`,
      },
      [`&.${classes.containedTonalEdgeEnd}`]: {
        marginRight: `-${theme.spacing(containedTonalSizeSmallPaddingX)}`,
      },
      [`&.${classes.containedTonalEdgeTop}`]: {
        marginTop: `-${theme.spacing(containedTonalSizeSmallPaddingY)}`,
      },
      [`&.${classes.containedTonalEdgeBottom}`]: {
        marginBottom: `-${theme.spacing(containedTonalSizeSmallPaddingY)}`,
      },
      [`&.${classes.containedTonalEdgeX}`]: {
        marginLeft: `-${theme.spacing(containedTonalSizeSmallPaddingX)}`,
        marginRight: `-${theme.spacing(containedTonalSizeSmallPaddingX)}`,
      },
      [`&.${classes.containedTonalEdgeY}`]: {
        marginTop: `-${theme.spacing(containedTonalSizeSmallPaddingY)}`,
        marginBottom: `-${theme.spacing(containedTonalSizeSmallPaddingY)}`,
      },
      [`&.${classes.containedTonalEdgeXY}`]: {
        marginTop: `-${theme.spacing(containedTonalSizeSmallPaddingY)}`,
        marginBottom: `-${theme.spacing(containedTonalSizeSmallPaddingY)}`,
        marginLeft: `-${theme.spacing(containedTonalSizeSmallPaddingX)}`,
        marginRight: `-${theme.spacing(containedTonalSizeSmallPaddingX)}`,
      },
    },
    containedTonalEdgeStart: {
      marginLeft: `-${theme.spacing(containedTonalSizeMediumPaddingX)}`,
    },
    containedTonalEdgeEnd: {
      marginRight: `-${theme.spacing(containedTonalSizeMediumPaddingX)}`,
    },
    containedTonalEdgeTop: {
      marginTop: `-${theme.spacing(containedTonalSizeMediumPaddingY)}`,
    },
    containedTonalEdgeBottom: {
      marginBottom: `-${theme.spacing(containedTonalSizeMediumPaddingY)}`,
    },
    containedTonalEdgeX: {
      marginLeft: `-${theme.spacing(containedTonalSizeMediumPaddingX)}`,
      marginRight: `-${theme.spacing(containedTonalSizeMediumPaddingX)}`,
    },
    containedTonalEdgeY: {
      marginTop: `-${theme.spacing(containedTonalSizeMediumPaddingY)}`,
      marginBottom: `-${theme.spacing(containedTonalSizeMediumPaddingY)}`,
    },
    containedTonalEdgeXY: {
      marginLeft: `-${theme.spacing(containedTonalSizeMediumPaddingX)}`,
      marginRight: `-${theme.spacing(containedTonalSizeMediumPaddingX)}`,
      marginTop: `-${theme.spacing(containedTonalSizeMediumPaddingY)}`,
      marginBottom: `-${theme.spacing(containedTonalSizeMediumPaddingY)}`,
    },

    contained: {
      backgroundColor: color,
      color: textColor,
      "&:hover": {
        backgroundColor: darken(color, theme.palette.action.hoverOpacity),
      },
      [`& .${classes.startIcon}`]: {
        marginLeft: `calc(-${containedSizeMediumPaddingX}/2 + 2px)`,
        marginRight: `calc(${containedSizeMediumPaddingX}/2 - 2px)`,
      },
      [`& .${classes.endIcon}`]: {
        marginLeft: `calc(${containedSizeMediumPaddingX}/2 - 2px)`,
        marginRight: `calc(-${containedSizeMediumPaddingX}/2 + 2px)`,
      },
      [`&.${classes.disabled}`]: {
        backgroundColor: theme.palette.text.disabled,
        color: theme.palette.common.white,
      },
    },
    containedSizeMedium: {
      padding: theme.spacing(
        containedSizeMediumPaddingY,
        containedSizeMediumPaddingX
      ),
    },
    containedSizeSmall: {
      padding: theme.spacing(
        containedSizeSmallPaddingY,
        containedSizeSmallPaddingX
      ),
      [`&.${classes.containedEdgeStart}`]: {
        marginLeft: `-${theme.spacing(containedSizeSmallPaddingX)}`,
      },
      [`&.${classes.containedEdgeEnd}`]: {
        marginRight: `-${theme.spacing(containedSizeSmallPaddingX)}`,
      },
      [`&.${classes.containedEdgeTop}`]: {
        marginTop: `-${theme.spacing(containedSizeSmallPaddingY)}`,
      },
      [`&.${classes.containedEdgeBottom}`]: {
        marginBottom: `-${theme.spacing(containedSizeSmallPaddingY)}`,
      },
      [`&.${classes.containedEdgeX}`]: {
        marginLeft: `-${theme.spacing(containedSizeSmallPaddingX)}`,
        marginRight: `-${theme.spacing(containedSizeSmallPaddingX)}`,
      },
      [`&.${classes.containedEdgeY}`]: {
        marginTop: `-${theme.spacing(containedSizeSmallPaddingY)}`,
        marginBottom: `-${theme.spacing(containedSizeSmallPaddingY)}`,
      },
      [`&.${classes.containedEdgeXY}`]: {
        marginTop: `-${theme.spacing(containedSizeSmallPaddingY)}`,
        marginBottom: `-${theme.spacing(containedSizeSmallPaddingY)}`,
        marginLeft: `-${theme.spacing(containedSizeSmallPaddingX)}`,
        marginRight: `-${theme.spacing(containedSizeSmallPaddingX)}`,
      },
    },
    containedEdgeStart: {
      marginLeft: `-${theme.spacing(containedSizeMediumPaddingX)}`,
    },
    containedEdgeEnd: {
      marginRight: `-${theme.spacing(containedSizeMediumPaddingX)}`,
    },
    containedEdgeTop: {
      marginTop: `-${theme.spacing(containedSizeMediumPaddingY)}`,
    },
    containedEdgeBottom: {
      marginBottom: `-${theme.spacing(containedSizeMediumPaddingY)}`,
    },
    containedEdgeX: {
      marginLeft: `-${theme.spacing(containedSizeMediumPaddingX)}`,
      marginRight: `-${theme.spacing(containedSizeMediumPaddingX)}`,
    },
    containedEdgeY: {
      marginTop: `-${theme.spacing(containedSizeMediumPaddingY)}`,
      marginBottom: `-${theme.spacing(containedSizeMediumPaddingY)}`,
    },
    containedEdgeXY: {
      marginLeft: `-${theme.spacing(containedSizeMediumPaddingX)}`,
      marginRight: `-${theme.spacing(containedSizeMediumPaddingX)}`,
      marginTop: `-${theme.spacing(containedSizeMediumPaddingY)}`,
      marginBottom: `-${theme.spacing(containedSizeMediumPaddingY)}`,
    },
    icon: {
      display: "flex",
      fontSize: 24,
      marginTop: -2,
      marginBottom: -2,
    },
    endIcon: {},
    startIcon: {},
    fullWidth: {
      width: "100%",
    },
    disabled: {},
    focusVisible: {},
  };
});

export default useStyles;
