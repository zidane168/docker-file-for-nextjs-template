import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "hasCloseIcon" | "closeIcon">({
  name: "AppDatePicker",
  uniqId: "5CweDZ",
})((__, _, classes) => {
  return {
    hasCloseIcon: {
      "&:hover": {
        [`& .${classes.closeIcon}`]: {
          opacity: 1,
        },
      },
    },
    closeIcon: {
      opacity: 0,
      pointerEvents: "none",
      [`.${classes.hasCloseIcon} &`]: {
        display: "flex",
        pointerEvents: "auto",
      },
    },
    pointer: {
      cursor: "pointer",
      "& input": {
        cursor: "pointer",
      },
    },
  };
});

export default useStyles;
