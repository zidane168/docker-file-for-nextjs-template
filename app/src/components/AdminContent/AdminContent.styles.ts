import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AdminContent",
})((theme) => {
  return {
    root: {
      padding: theme.spacing(3),
      [theme.breakpoints.down("md")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
  };
});

export default useStyles;
