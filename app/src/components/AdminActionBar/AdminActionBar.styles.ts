import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AdminActionBar",
})((theme) => {
  return {
    root: {
      marginLeft: theme.spacing(-3),
      marginRight: theme.spacing(-3),
      flexWrap: "wrap",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      rowGap: theme.spacing(1),
      [theme.breakpoints.down("md")]: {
        marginLeft: theme.spacing(-2),
        marginRight: theme.spacing(-2),
      },
    },
    title: {
      flex: 1,
    },
    actionList: {
      overflow: "clip",
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(1),
    },
  };
});

export default useStyles;
