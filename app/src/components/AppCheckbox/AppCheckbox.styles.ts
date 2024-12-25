import { makeStyles } from "tss-react/mui";
import _get from "lodash/get";

type StylesParams = {
  color: string;
  checkedIconColor: string;
};

const useStyles = makeStyles<StylesParams, "indeterminate" | "checked">({
  name: "AppCheckbox",
  uniqId: "YWqNfx",
})((theme, params, classes) => {
  let color = "";
  let checkedIconColor = "";

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
      color = theme.palette.secondary.main;
      break;
    }
    default: {
      color =
        _get(theme.palette, params?.color ?? "") ??
        (params?.color || theme.palette.primary.main);
      break;
    }
  }

  switch (params.checkedIconColor) {
    case "primary": {
      checkedIconColor = theme.palette.primary.main;
      break;
    }
    case "secondary": {
      checkedIconColor = theme.palette.secondary.main;
      break;
    }
    case "error": {
      checkedIconColor = theme.palette.secondary.main;
      break;
    }
    default: {
      checkedIconColor =
        _get(theme.palette, params?.color ?? "") ??
        (params?.color || theme.palette.primary.main);
      break;
    }
  }

  const spacing = 1;

  return {
    root: {
      padding: theme.spacing(spacing),
      [`&.${classes.indeterminate}`]: {
        color,
      },
      [`&.${classes.checked}`]: {
        color: checkedIconColor,
      },
    },
    checked: {},
    indeterminate: {},
    icon: {
      fontSize: theme.typography.pxToRem(24),
      color,
    },
    checkedIcon: {
      color: checkedIconColor,
    },
    edgeStart: {
      marginLeft: `calc(${theme.spacing(-spacing)} - 2px)`,
    },
    edgeEnd: {
      marginRight: `calc(${theme.spacing(-spacing)} - 2px)`,
    },
    edgeTop: {
      marginTop: `calc(${theme.spacing(-spacing)} - 2px)`,
    },
    edgeBottom: {
      marginBottom: `calc(${theme.spacing(-spacing)} - 2px)`,
    },
    edgeX: {
      marginLeft: `calc(${theme.spacing(-spacing)} - 2px)`,
      marginRight: `calc(${theme.spacing(-spacing)} - 2px)`,
    },
    edgeY: {
      marginTop: `calc(${theme.spacing(-spacing)} - 2px)`,
      marginBottom: `calc(${theme.spacing(-spacing)} - 2px)`,
    },
    edgeXY: {
      marginLeft: `calc(${theme.spacing(-spacing)} - 2px)`,
      marginRight: `calc(${theme.spacing(-spacing)} - 2px)`,
      marginTop: `calc(${theme.spacing(-spacing)} - 2px)`,
      marginBottom: `calc(${theme.spacing(-spacing)} - 2px)`,
    },
  };
});

export default useStyles;
