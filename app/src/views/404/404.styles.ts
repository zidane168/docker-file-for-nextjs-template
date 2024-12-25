import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "404",
})((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100dvh",
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    pageNotFoundSvg: {
      height: 140,
      width: "auto",
      maxWidth: "100%",
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(2.5),
    },
  };
});

export default useStyles;
