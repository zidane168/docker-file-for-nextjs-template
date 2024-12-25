import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "SignIn",
})((theme) => {
  return {
    root: {
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.common.white,
    },
    logo: {
      height: 80,
      width: "auto",
      maxWidth: "100%",
      objectFit: "contain",
      objectPosition: "center",
      marginBottom: theme.spacing(3),
    },
    signIn: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      paddingTop: theme.spacing(3.75),
      paddingBottom: theme.spacing(3.75),
    },
    signInForm: {
      marginBottom: theme.spacing(3.75),
    },
    captchaImg: {
      width: "auto",
      height: 40,
      minWidth: 100,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.common.lightestNeutral,
    },
  };
});

export default useStyles;
