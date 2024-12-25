import _get from "lodash/get";
import { makeStyles } from "tss-react/mui";

type StylesParams = {
  color: string;
};

const useStyles = makeStyles<StylesParams, "checked" | "label" | "fullWidth">({
  name: "OutlinedFormControlLabel",
  uniqId: "yI4vAM",
})((theme, params, classes) => {
  let color = "";

  switch (params.color) {
    case "primary": {
      color = theme.palette.primary.main;
      break;
    }
    case "secondary": {
      color = theme.palette.secondary.main;
      break;
    }
    case "error": {
      color = theme.palette.error.main;
      break;
    }
    default:
      color =
        _get(theme.palette, params?.color ?? "") ??
        (params?.color || theme.palette.primary.main);
      break;
  }

  return {
    filled: {
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.common.lighterNeutral,
      overflow: "clip",
      position: "relative",
      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        border: `1px solid transparent`,
        borderRadius: theme.shape.borderRadius,
        overflow: "clip",
      },
      [`&.${classes.checked}`]: {
        backgroundColor: theme.palette.common.lightNeutral,
        "&:before": {
          borderColor: color,
        },
      },
    },
    outlined: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        border: `1px solid ${theme.palette.text.primary}`,
        borderRadius: theme.shape.borderRadius,
        overflow: "clip",
      },
      [`&.${classes.checked}`]: {
        backgroundColor: theme.palette.common.lighterNeutral,
        "&:before": {
          borderColor: color,
        },
      },
    },
    disableGutters: {
      margin: 0,
    },

    label: {
      flex: 1,
      [`.${classes.checked} &`]: {
        color,
        fontWeight: 500,
      },
    },
    labelPlacementStart: {
      [`& .${classes.label}`]: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
    },
    labelPlacementEnd: {
      [`& .${classes.label}`]: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
    },
    labelPlacementTop: {
      [`& .${classes.label}`]: {
        paddingTop: theme.spacing(1),
      },
    },
    labelPlacementBottom: {
      [`& .${classes.label}`]: {
        paddingBottom: theme.spacing(1),
      },
    },

    outlinedLabelPlacementStart: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      [`& .${classes.label}`]: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
    },
    outlinedLabelPlacementEnd: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(2),
      [`& .${classes.label}`]: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
    },
    outlinedLabelPlacementTop: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [`& .${classes.label}`]: {
        paddingTop: 0,
      },
    },
    outlinedLabelPlacementBottom: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [`& .${classes.label}`]: {
        paddingBottom: 0,
      },
    },

    filledLabelPlacementStart: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      [`& .${classes.label}`]: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
    },
    filledLabelPlacementEnd: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(2),
      [`& .${classes.label}`]: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(1),
      },
    },
    filledLabelPlacementTop: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [`& .${classes.label}`]: {
        paddingTop: 0,
      },
    },
    filledLabelPlacementBottom: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [`& .${classes.label}`]: {
        paddingBottom: 0,
      },
    },
    fullWidth: {
      width: "100%",
    },
    fullHeight: {
      height: "100%",
    },
    checked: {},
  };
});

export default useStyles;
