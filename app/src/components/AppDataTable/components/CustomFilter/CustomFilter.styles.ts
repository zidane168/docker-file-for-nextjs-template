import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "CustomFilter",
})((theme) => {
  return {
    root: {
      padding: theme.spacing("9px", 2),
    },
    customFilterForm: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    customFilterDrawerPaperAnchorRight: {
      maxWidth: "100dvw",
    },
  };
});

export default useStyles;
