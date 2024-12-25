import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "hasCloseIcon" | "closeIcon">({
  name: "AppTimePicker",
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
  };
});

export default useStyles;
