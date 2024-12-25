import { alpha, darken } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "rotated">({
  name: "AppDateCalendar",
  uniqId: "nDI3aS",
})((theme, _, classes) => {
  const mainColor = theme.palette.primary.main;

  return {
    root: {
      borderRadius: theme.shape.borderRadius,
      maxWidth: "100%",
      maxHeight: 350,
      height: "auto",
      "& .MuiPickersArrowSwitcher-root": {
        // marginRight: -9,
      },
      "& .MuiSvgIcon-root": {
        color: theme.palette.text.primary,
      },
      "& .MuiPickersCalendarHeader-root": {
        marginTop: theme.spacing(2.5),
        marginBottom: theme.spacing(1.25),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
      },
      "& .MuiPickersDay-dayOutsideMonth": {
        color: alpha(theme.palette.text.primary, 0.4),
      },
      "& .MuiPickersDay-root": {
        margin: 0,
        backgroundColor: "transparent",
        transition: theme.transitions.create(["background-color", "color"], {
          duration: theme.transitions.duration.shortest,
        }),
        width: 30,
        minWidth: 30,
        height: 30,
        borderRadius: theme.shape.borderRadius,
        "&:hover": {
          backgroundColor: alpha(mainColor, theme.palette.action.hoverOpacity),
        },
        "&.MuiPickersDay-today": {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
        },
        "&.Mui-selected": {
          backgroundColor: mainColor,
          borderColor: mainColor,
          color: theme.palette.common.white,
          "&:hover": {
            borderColor: darken(
              mainColor,
              theme.palette.contrastThreshold / 10
            ),
            backgroundColor: darken(
              mainColor,
              theme.palette.contrastThreshold / 10
            ),
          },
        },
        "&.Mui-disabled": {
          color: alpha(
            theme.palette.text.disabled,
            theme.palette.action.disabledOpacity
          ),
          "&.Mui-selected": {
            backgroundColor: mainColor,
            color: theme.palette.common.white,
          },
        },
        ...(theme.typography.bodyReg16 as any),
      },
      "& .MuiYearPicker-root": {
        paddingBottom: theme.spacing(1.25),
        marginLeft: theme.spacing(-2.5),
        marginRight: theme.spacing(-2.5),
        paddingRight: theme.spacing(1.25),
        paddingLeft: theme.spacing(1.25),
      },
      "& .MuiPickersYear-yearButton": {
        backgroundColor: "transparent",
        transition: theme.transitions.create(["background-color", "color"], {
          duration: theme.transitions.duration.shortest,
        }),
        height: 36,
        width: 72 + 2,
        margin: "5px 0",
        borderRadius: theme.shape.borderRadius,
        "&:hover": {
          borderColor: theme.palette.primary.main,
          backgroundColor: alpha(mainColor, theme.palette.action.hoverOpacity),
        },
        "&.Mui-selected": {
          backgroundColor: mainColor,
          borderColor: mainColor,
          color: theme.palette.common.white,
          "&:hover": {
            borderColor: darken(
              mainColor,
              theme.palette.contrastThreshold / 10
            ),
            backgroundColor: darken(
              mainColor,
              theme.palette.contrastThreshold / 10
            ),
          },
        },
        "&.Mui-disabled": {
          color: alpha(
            theme.palette.text.disabled,
            theme.palette.action.disabledOpacity
          ),
          "&.Mui-selected": {
            backgroundColor: mainColor,
            color: theme.palette.common.white,
          },
        },
        ...(theme.typography.bodyReg16 as any),
      },

      "& .MuiPickersMonth-monthButton": {
        backgroundColor: "transparent",
        transition: theme.transitions.create(["background-color", "color"], {
          duration: theme.transitions.duration.shortest,
        }),
        height: 36,
        width: 72 + 2,
        margin: theme.spacing(1.25, 0),
        borderRadius: theme.shape.borderRadius,
        "&:hover": {
          borderColor: theme.palette.primary.main,
          backgroundColor: alpha(mainColor, theme.palette.action.hoverOpacity),
        },
        "&.Mui-selected": {
          backgroundColor: mainColor,
          borderColor: mainColor,
          color: theme.palette.common.white,
          "&:hover": {
            borderColor: darken(
              mainColor,
              theme.palette.contrastThreshold / 10
            ),
            backgroundColor: darken(
              mainColor,
              theme.palette.contrastThreshold / 10
            ),
          },
        },
        "&.Mui-disabled": {
          color: alpha(
            theme.palette.text.disabled,
            theme.palette.action.disabledOpacity
          ),
          "&.Mui-selected": {
            backgroundColor: mainColor,
            color: theme.palette.common.white,
          },
        },
        ...(theme.typography.bodyReg16 as any),
      },
      "& .MuiPickersCalendarHeader-label": {
        ...(theme.typography.bodyReg16 as any),
      },
      [`& div[role="row"].MuiDayCalendar-header`]: {
        marginBottom: theme.spacing(1.25),
      },
      "& .MuiYearCalendar-root": {
        maxWidth: "100%",
        paddingBottom: theme.spacing(1.25),
      },
      "& .MuiDayCalendar-weekDayLabel": {
        color: theme.palette.text.secondary,
        margin: 0,
        width: 30,
        height: 30,
        ...(theme.typography.bodyReg16 as any),
        whiteSpace: "nowrap",
      },
      [`& div[role="row"]`]: {
        gap: theme.spacing(1.25),
        margin: 0,
        [theme.breakpoints.down(30 * 7 + 10 * 6 + 16 * 4)]: {
          gap: theme.spacing(0.5),
        },
      },
      [`& div[role="rowgroup"]`]: {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(1.25),
        [theme.breakpoints.down(30 * 7 + 10 * 6 + 16 * 4)]: {
          gap: theme.spacing(0),
        },
      },
      [`& .MuiPickersSlideTransition-root[role="presentation"]`]: {
        minHeight: 230 + 20,
      },
    },
    switchViewButton: {
      rotate: "0deg",
      transition: theme.transitions.create(["rotate"]),
      [`&.${classes.rotated}`]: {
        rotate: "180deg",
      },
    },
    rotated: {},
  };
});

export default useStyles;
