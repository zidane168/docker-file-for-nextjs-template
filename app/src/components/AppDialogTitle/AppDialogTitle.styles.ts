import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppDialogTitle",
  uniqId: "UvmDdi",
})((theme) => {
  return {
    root: {
      display: "flex",
      gap: theme.spacing(2),
      padding: theme.spacing(2, 3),
      ".MuiDialog-paperFullScreen &": {
        padding: theme.spacing(2, 3),
        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(2),
        },
      },
    },
    title: {
      flex: 1,
      "&:empty:before": {
        content: "'\\00a0'",
      },
    },
    startActions: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
    },
    endActions: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
    },
  };
});

export default useStyles;
