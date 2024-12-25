import { makeStyles } from "tss-react/mui";
import _get from "lodash/get";
import { appButtonClasses } from "@/components/AppButton";
import { appIconButtonClasses } from "@/components/AppIconButton";

type StylesParams = {
  bgColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
};

const useStyles = makeStyles<StylesParams, "inputLabel" | "root">({
  name: "AppSelect",
  uniqId: "LQ8mIG",
})((theme, params) => {
  const keyToBgColorMap = {
    transparent: "transparent",
    white: theme.palette.common.white,
  };

  const bgColor =
    keyToBgColorMap[params.bgColor! as keyof typeof keyToBgColorMap] ||
    (_get(theme.palette, params?.bgColor!) as string) ||
    params?.bgColor ||
    "transparent";

  const borderColor =
    _get(theme.palette, params.borderColor!) ||
    (params.borderColor as string) ||
    theme.palette.common.lighterNeutral;
  const hoverBorderColor =
    _get(theme.palette, params.hoverBorderColor!) ||
    (params.hoverBorderColor as string) ||
    theme.palette.primary.main;

  return {
    selectBgColor: {
      backgroundColor: bgColor,
    },
    placeholder: {
      color: theme.palette.common.neutral,
      opacity: 0.42,
    },
    borderRadiusCircular: {
      borderRadius: 40,
      "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: 40,
      },
    },
    root: {
      "& .MuiInputAdornment-root": {
        fontSize: 20,
        color: theme.palette.common.darkNeutral,
      },
      "& .MuiInputAdornment-positionEnd, & .MuiInputAdornment-positionStart": {
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

      "& .MuiSelect-select, & .MuiNativeSelect-select": {
        fontSize: theme.typography.bodyReg14.fontSize,
        fontWeight: theme.typography.bodyReg14.fontWeight,
        lineHeight: "22px",
        fontFamily: theme.typography.bodyReg14.fontFamily,
        padding: theme.spacing("9px", 1.25),
        color: theme.palette.text.primary,
        display: "flex",
        alignItems: "center",
        "&.MuiInputBase-input": {
          paddingRight: 24 + 12 + 12 / 2 - 6,
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor,
      },
      "&.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.error.main,
      },

      [`& .MuiSelect-select option[value=""], & .MuiSelect-select option:not([value])`]:
        {
          // color: "red",
        },
      [`& .MuiSelect-select:empty`]: {
        // background: "red",
      },

      "&.MuiInputBase-adornedStart": {
        paddingLeft: theme.spacing(1.5),
      },
      "& .MuiInputBase-inputAdornedStart": {
        paddingLeft: theme.spacing(0),
      },
      "&.MuiInputBase-adornedEnd": {
        paddingRight: `calc(${theme.spacing(1.5)} + 20px + ${theme.spacing(
          1.5
        )})`,
      },
      "& .MuiInputBase-inputAdornedEnd": {
        [`&.MuiSelect-select`]: {
          paddingRight: theme.spacing(0),
        },
      },

      "& .MuiNativeSelect-icon, & .MuiSelect-icon": {
        fontSize: 24,
        color: theme.palette.common.black,
        right: `calc(${theme.spacing(1.5)} - 6px)`,
        transition: theme.transitions.create(["transform"]),
      },

      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: hoverBorderColor,
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.error.main,
        },
      },
      "& .Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: hoverBorderColor,
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.error.main,
        },
      },
    },

    selectMenuPaper: {
      // maxHeight: `calc(${40 * 5}px + ${theme.spacing(1.25 * 2)})`,
      maxHeight: "40dvh",
      overflow: "auto",
      boxShadow: "0px 8px 24px -4px rgba(27, 46, 94, 0.08)",
    },
    selectMenuList: {},

    inputLabel: {
      maxWidth: "100%",
      paddingLeft: theme.spacing(0.5),
      "& + .MuiOutlinedInput-root": {
        marginTop: `calc(${theme.spacing(0.5)} + 18px)`,
      },
    },
    formHelperText: {
      paddingLeft: theme.spacing(0.5),
    },
  };
});

export default useStyles;
