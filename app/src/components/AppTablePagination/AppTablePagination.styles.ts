import { makeStyles } from "tss-react/mui";
import _get from "lodash/get";
import { alpha, darken } from "@mui/system";

const useStyles = makeStyles({
  name: "AppTablePagination",
  uniqId: "LQ8mIG",
})((theme) => {
  return {
    select: {
      "& .MuiInputAdornment-root": {
        fontSize: 20,
        color: theme.palette.common.darkNeutral,
      },

      "& .MuiSelect-select, & .MuiNativeSelect-select": {
        fontSize: theme.typography.bodyReg14.fontSize,
        fontWeight: theme.typography.bodyReg14.fontWeight,
        lineHeight: "21px",
        fontFamily: theme.typography.bodyReg14.fontFamily,
        padding: theme.spacing("9.5px", 1.25),
        color: theme.palette.text.primary,
        display: "flex",
        alignItems: "center",
        "&.MuiInputBase-input": {
          paddingRight: 24 + 12 + 12 / 2 - 6,
        },
        "& *": {
          lineHeight: "21px",
        },
      },
      "&.Mui-error .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.error.main,
      },

      "& .MuiNativeSelect-icon, & .MuiSelect-icon": {
        fontSize: 24,
        color: theme.palette.common.black,
        right: `calc(${theme.spacing(1.5)} - 6px)`,
        transition: theme.transitions.create(["transform"]),
      },

      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          // borderColor: hoverBorderColor,
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.error.main,
        },
      },
      "& .Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          // borderColor: hoverBorderColor,
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.error.main,
        },
      },
    },

    selectMenuPaper: {
      maxHeight: "40dvh",
      overflow: "auto",
      boxShadow: theme.app.shadows.menu,
    },
    selectMenuList: {
      "& .MuiMenuItem-root": {
        ...theme.typography.bodyReg14,
        padding: theme.spacing(1.25, 1.5),
        minHeight: 40,
        color: theme.palette.text.secondary,
        [`&.Mui-selected`]: {
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
