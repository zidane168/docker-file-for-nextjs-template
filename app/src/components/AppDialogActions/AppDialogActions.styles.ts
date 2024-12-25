import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppDialogActions",
})((theme) => {
  return {
    root: {
      gap: theme.spacing(1),
      padding: theme.spacing(2, 3),
      paddingTop: 0,
      ".MuiDialogContent-dividers + &": {
        paddingTop: theme.spacing(2),
      },
      ".MuiDialog-paperFullScreen &": {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(2),
          // marginTop: theme.spacing(-2),
          backgroundColor: theme.palette.common.white,
          // boxShadow: "0px -11px 24px -4px rgba(27, 46, 94, 0.08)",
        },
        paddingTop: theme.spacing(2),
        boxShadow: "0px -11px 24px -4px rgba(27, 46, 94, 0.08)",
      },
    },
  };
});

export default useStyles;
