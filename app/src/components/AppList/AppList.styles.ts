import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppList",
})((theme) => {
  return {
    padding: {
      paddingTop: theme.spacing(1.25),
      paddingBottom: theme.spacing(1.25),
    },
    edgeTop: {
      marginTop: theme.spacing(-1.25),
    },
    edgeBottom: {
      marginBottom: theme.spacing(-1.25),
    },
    edgeStart: {
      marginLeft: theme.spacing(-1.25),
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(-1.25),
      },
    },
    edgeEnd: {
      marginRight: theme.spacing(-1.25),
      [theme.breakpoints.down("sm")]: {
        marginRight: theme.spacing(-1.25),
      },
    },
    edgeX: {
      marginLeft: theme.spacing(-1.25),
      marginRight: theme.spacing(-1.25),
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(-1.25),
        marginRight: theme.spacing(-1.25),
      },
    },
    edgeY: {
      marginTop: theme.spacing(-1.25),
      marginBottom: theme.spacing(-1.25),
    },
    edgeXY: {
      marginTop: theme.spacing(-1.25),
      marginBottom: theme.spacing(-1.25),
      marginLeft: theme.spacing(-1.25),
      marginRight: theme.spacing(-1.25),
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(-1.25),
        marginRight: theme.spacing(-1.25),
      },
    },
  };
});

export default useStyles;
