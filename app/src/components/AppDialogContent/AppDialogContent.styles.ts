import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppDialogContent",
})((theme) => {
  return {
    root: {
      padding: theme.spacing(2, 3),
      ".MuiDialog-paperFullScreen &": {
        padding: theme.spacing(2, 3),
        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(2),
        },
      },
    },
  };
});

export default useStyles;
