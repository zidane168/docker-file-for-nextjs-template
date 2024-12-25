import { appButtonClasses } from "@/components/AppButton";
import { appIconButtonClasses } from "@/components/AppIconButton";
import { alpha, darken } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<
  void,
  "input" | "root" | "hasClearIcon" | "hasPopupIcon" | "endAdornment"
>({
  name: "appAutocomplete",
  uniqId: "CTmsfJ",
})((theme, _, classes) => {
  return {
    root: {
      [`&  .MuiOutlinedInput-root .${classes.endAdornment}`]: {
        right: `calc(${theme.spacing(1.5)} - 6px)`,
      },
      [`& .MuiOutlinedInput-root`]: {
        padding: `4px ${theme.spacing(1.5 / 2)}`, // input height
        "& .MuiAutocomplete-input": {
          padding: `4.5px ${theme.spacing(1.5 / 2)} 4.5px ${theme.spacing(
            1.5 / 2
          )}`,
          "&.MuiInputBase-inputAdornedEnd": {
            paddingRight: 0,
          },
          "&.MuiInputBase-inputAdornedStart": {
            paddingLeft: 0,
          },
        },
        "& .MuiInputAdornment-positionStart, & .MuiInputAdornment-positionEnd":
          {
            [`& .${appButtonClasses.root}`]: {
              height: 40,
              [`&.${appButtonClasses.textEdgeStart},&.${appButtonClasses.textEdgeEnd},&.${appButtonClasses.textEdgeX},&.${appButtonClasses.textEdgeXY}`]:
                {
                  paddingLeft: theme.spacing(1.5),
                  paddingRight: theme.spacing(1.5),
                },

              [`&.${appButtonClasses.textEdgeX},&.${appButtonClasses.textEdgeXY},&.${appButtonClasses.containedEdgeX},&.${appButtonClasses.containedEdgeXY},&.${appButtonClasses.containedTonalEdgeX},&.${appButtonClasses.containedTonalEdgeXY},&.${appButtonClasses.outlinedEdgeX},&.${appButtonClasses.outlinedEdgeXY}`]:
                {
                  marginLeft: theme.spacing(-1.5 / 2),
                  marginRight: theme.spacing(-1.5 / 2),
                },

              [`&.${appButtonClasses.textEdgeStart},&.${appButtonClasses.containedEdgeStart},&.${appButtonClasses.containedTonalEdgeStart},&.${appButtonClasses.outlinedEdgeStart}`]:
                {
                  marginLeft: theme.spacing(-1.5 / 2),
                },

              [`&.${appButtonClasses.textEdgeEnd},&.${appButtonClasses.containedEdgeEnd},&.${appButtonClasses.containedTonalEdgeEnd},&.${appButtonClasses.outlinedEdgeEnd}`]:
                {
                  marginRight: theme.spacing(-1.5 / 2),
                },
            },

            [`& .${appIconButtonClasses.root}`]: {
              [`&.${appIconButtonClasses.textEdgeStart},&.${appIconButtonClasses.textEdgeEnd},&.${appIconButtonClasses.textEdgeX},&.${appIconButtonClasses.textEdgeXY}`]:
                {
                  padding: theme.spacing(1.5),
                },
              [`&.${appIconButtonClasses.textEdgeX},&.${appIconButtonClasses.textEdgeXY},&.${appIconButtonClasses.containedEdgeX},&.${appIconButtonClasses.containedEdgeXY},&.${appIconButtonClasses.containedTonalEdgeX},&.${appIconButtonClasses.containedTonalEdgeXY},&.${appIconButtonClasses.outlinedEdgeX},&.${appIconButtonClasses.outlinedEdgeXY}`]:
                {
                  marginLeft: theme.spacing(-1.5 / 2),
                  marginRight: theme.spacing(-1.5 / 2),
                },

              [`&.${appIconButtonClasses.textEdgeStart},&.${appIconButtonClasses.containedEdgeStart},&.${appIconButtonClasses.containedTonalEdgeStart},&.${appIconButtonClasses.outlinedEdgeStart}`]:
                {
                  marginLeft: theme.spacing(-1.5 / 2),
                },

              [`&.${appIconButtonClasses.textEdgeEnd},&.${appIconButtonClasses.containedEdgeEnd},&.${appIconButtonClasses.containedTonalEdgeEnd},&.${appIconButtonClasses.outlinedEdgeEnd}`]:
                {
                  marginRight: theme.spacing(-1.5 / 2),
                },
            },
          },
      },
    },
    input: {},
    option: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      overflow: "auto",
    },
    listbox: {
      paddingTop: 0,
      paddingBottom: 0,
      "& .MuiAutocomplete-option": {
        padding: theme.spacing(1.5),
        position: "relative",
        minHeight: 40,
        // "&:after": {
        //   content: '""',
        //   position: "absolute",
        //   bottom: 0,
        //   left: "50%",
        //   transform: "translateX(-50%)",
        //   width: "calc(100% - 24px - 16px)",
        //   height: 1,
        //   backgroundColor: theme.palette.divider,
        // },
        // "&:last-of-type:after": {
        //   height: 0,
        // },
        [`&[aria-selected="true"]`]: {
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
    },
    noOptions: {
      padding: theme.spacing(1.125, 1.5),
      minHeight: 40 + 10 * 2,
      display: "flex",
      alignItems: "center",
      color: theme.palette.text.secondary,
      fontSize: theme.typography.bodyReg14.fontSize,
      fontWeight: theme.typography.bodyReg14.fontWeight,
      lineHeight: theme.typography.bodyReg14.lineHeight,
      fontFamily: theme.typography.bodyReg14.fontFamily,
    },
    loading: {
      padding: theme.spacing(1.125, 1.5),
      minHeight: 40 + 10 * 2,
      display: "flex",
      alignItems: "center",
      color: theme.palette.common.neutral,
      fontSize: theme.typography.bodyReg16.fontSize,
      fontWeight: theme.typography.bodyReg16.fontWeight,
      lineHeight: theme.typography.bodyReg16.lineHeight,
      fontFamily: theme.typography.bodyReg16.fontFamily,
    },
    hasPopupIcon: {
      [`&.${classes.root} .MuiOutlinedInput-root`]: {
        paddingRight: 28 + 10 + 1 - 6,
      },
      [`&.${classes.hasClearIcon}.${classes.root} .MuiOutlinedInput-root`]: {
        paddingRight: 28 * 2 + 10 + 1 - 6,
      },
      "& .MuiInputBase-inputAdornedEnd": {
        paddingLeft: 0,
      },
      "& .MuiInputBase-inputAdornedStart": {
        paddingRight: 0,
      },
    },
    hasClearIcon: {
      [`&.${classes.root} .MuiOutlinedInput-root`]: {
        paddingRight: 28 + 8 + 1,
      },
      [`&.${classes.hasClearIcon}.${classes.root} .MuiOutlinedInput-root`]: {
        paddingRight: 28 * 2 + 8 + 1,
      },
      "& .MuiInputBase-inputAdornedEnd": {
        paddingLeft: 0,
      },
      "& .MuiInputBase-inputAdornedStart": {
        paddingRight: 0,
      },
    },
    popupIndicator: {
      transition: theme.transitions.create(["transform"]),
    },
    endAdornment: {},
    selectedIcon: {
      fontSize: 24,
      marginRight: -2,
      color: "inherit",
    },
    popupIcon: {
      fontSize: 24,
      color: theme.palette.common.darkNeutral,
    },
    clearIcon: {
      fontSize: 20,
      color: theme.palette.common.darkNeutral,
    },
    tag: {
      [`.${classes.root} &`]: {
        margin: 3,
        marginLeft: 0,
        "& + .MuiAutocomplete-input.MuiInputBase-inputAdornedStart": {
          paddingLeft: 3,
        },
      },
    },
  };
});

export default useStyles;
