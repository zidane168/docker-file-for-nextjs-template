import { alpha } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import _get from "lodash/get";
import { appButtonClasses } from "@/components/AppButton";
import { appIconButtonClasses } from "@/components/AppIconButton";

type StylesParams = {
  bgColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
};

const useStyles = makeStyles<
  StylesParams,
  | "outlinedInputRoot"
  | "outlinedInputInput"
  | "outlinedInputNotchedOutline"
  | "outlinedInputFocused"
  | "outlinedInputError"
  | "inputLabel"
>({
  name: "appTextField",
  uniqId: "XjJClS",
})((theme, params, classes) => {
  const bgColor =
    _get(theme.palette, params.bgColor!) || (params.bgColor as string);
  const borderColor =
    _get(theme.palette, params.borderColor!) ||
    (params.borderColor as string) ||
    theme.palette.common.lighterNeutral;
  const hoverBorderColor =
    _get(theme.palette, params.hoverBorderColor!) ||
    (params.hoverBorderColor as string) ||
    theme.palette.primary.main;

  return {
    outlinedInputRoot: {
      margin: 0,
      "& .MuiInputAdornment-root": {
        fontSize: 24,
        color: theme.palette.common.darkNeutral,
      },
      "& .MuiInputAdornment-positionStart, & .MuiInputAdornment-positionEnd": {
        [`& .${appButtonClasses.root}`]: {
          height: 40,
          [`&.${appButtonClasses.textEdgeStart},&.${appButtonClasses.textEdgeEnd},&.${appButtonClasses.textEdgeX},&.${appButtonClasses.textEdgeXY}`]:
            {
              paddingLeft: theme.spacing(1.5),
              paddingRight: theme.spacing(1.5),
            },

          [`&.${appButtonClasses.textEdgeX},&.${appButtonClasses.textEdgeXY},&.${appButtonClasses.containedEdgeX},&.${appButtonClasses.containedEdgeXY},&.${appButtonClasses.containedTonalEdgeX},&.${appButtonClasses.containedTonalEdgeXY},&.${appButtonClasses.outlinedEdgeX},&.${appButtonClasses.outlinedEdgeXY}`]:
            {
              marginLeft: theme.spacing(-1.5),
              marginRight: theme.spacing(-1.5),
            },

          [`&.${appButtonClasses.textEdgeStart},&.${appButtonClasses.containedEdgeStart},&.${appButtonClasses.containedTonalEdgeStart},&.${appButtonClasses.outlinedEdgeStart}`]:
            {
              marginLeft: theme.spacing(-1.5),
            },

          [`&.${appButtonClasses.textEdgeEnd},&.${appButtonClasses.containedEdgeEnd},&.${appButtonClasses.containedTonalEdgeEnd},&.${appButtonClasses.outlinedEdgeEnd}`]:
            {
              marginRight: theme.spacing(-1.5),
            },
        },

        [`& .${appIconButtonClasses.root}`]: {
          height: 40,
          width: 40,
          [`&.${appIconButtonClasses.textEdgeStart},&.${appIconButtonClasses.textEdgeEnd},&.${appIconButtonClasses.textEdgeX},&.${appIconButtonClasses.textEdgeXY}`]:
            {
              padding: theme.spacing(1.5),
            },
          [`&.${appIconButtonClasses.textEdgeX},&.${appIconButtonClasses.textEdgeXY},&.${appIconButtonClasses.containedEdgeX},&.${appIconButtonClasses.containedEdgeXY},&.${appIconButtonClasses.containedTonalEdgeX},&.${appIconButtonClasses.containedTonalEdgeXY},&.${appIconButtonClasses.outlinedEdgeX},&.${appIconButtonClasses.outlinedEdgeXY}`]:
            {
              marginLeft: theme.spacing(-1.5),
              marginRight: theme.spacing(-1.5),
            },

          [`&.${appIconButtonClasses.textEdgeStart},&.${appIconButtonClasses.containedEdgeStart},&.${appIconButtonClasses.containedTonalEdgeStart},&.${appIconButtonClasses.outlinedEdgeStart}`]:
            {
              marginLeft: theme.spacing(-1.5),
            },

          [`&.${appIconButtonClasses.textEdgeEnd},&.${appIconButtonClasses.containedEdgeEnd},&.${appIconButtonClasses.containedTonalEdgeEnd},&.${appIconButtonClasses.outlinedEdgeEnd}`]:
            {
              marginRight: theme.spacing(-1.5),
            },
        },
      },
      [`.${classes.inputLabel} + &`]: {
        marginTop: `calc(${theme.spacing(0.5)} + 18px)`,
      },
      "&:hover": {
        [`& .${classes.outlinedInputNotchedOutline}`]: {
          borderColor: hoverBorderColor,
        },
        [`&.${classes.outlinedInputError} .${classes.outlinedInputNotchedOutline}`]:
          {
            borderColor: theme.palette.error.main,
          },
      },
      [`&.${classes.outlinedInputFocused}`]: {
        [`& .${classes.outlinedInputNotchedOutline}`]: {
          borderColor: hoverBorderColor,
        },
        [`&.${classes.outlinedInputError} .${classes.outlinedInputNotchedOutline}`]:
          {
            borderColor: theme.palette.error.main,
          },
      },
    },
    outlinedInputInput: {
      fontSize: theme.typography.bodyReg16.fontSize,
      fontFamily: theme.typography.bodyReg16.fontFamily,
      lineHeight: theme.typography.bodyReg16.lineHeight,
      fontWeight: theme.typography.bodyReg16.fontWeight,
      padding: theme.spacing("8.5px", 1.5),
      minHeight: 21,
      color: theme.palette.text.primary,
      "&:autofill, &:autofill:hover, &:autofill:focus, &:autofill:active": {
        transition: "background-color 9999s ease-in-out 0s",
      },
      "&::placeholder": {
        color: theme.palette.common.neutral,
      },
    },
    outlinedInputMultiline: {
      padding: theme.spacing("9.5px", 1.5),
      [`& .${classes.outlinedInputInput}`]: {
        padding: 0,
      },
    },
    outlinedInputFocused: {},
    outlinedInputNotchedOutline: {
      borderColor,
    },
    outlinedInputDisabled: {
      "&.Mui-disabled": {
        WebkitTextFillColor: theme.palette.action.disabled,
      },
      ":not(input)": {
        backgroundColor: alpha(
          theme.palette.common.lighterNeutral,
          theme.palette.action.disabledOpacity
        ),
      },
    },
    outlinedInputAdornedStart: {
      paddingLeft: theme.spacing(1.5),
    },
    outlinedInputInputAdornedStart: {
      [`.${classes.outlinedInputRoot} &`]: {
        paddingLeft: theme.spacing(0),
      },
    },
    outlinedInputAdornedEnd: {
      paddingRight: theme.spacing(1.5),
    },
    outlinedInputInputAdornedEnd: {
      [`.${classes.outlinedInputRoot} &`]: {
        paddingRight: theme.spacing(0),
      },
    },
    outlinedInputError: {},
    outlinedInputBg: {
      backgroundColor: bgColor,
    },
    formHelperText: {
      paddingLeft: theme.spacing(0.5),
    },
    inputLabel: {
      maxWidth: "100%",
      paddingLeft: theme.spacing(0.5),
    },
    borderRadiusCircular: {
      borderRadius: "50px",
    },
  };
});

export default useStyles;
