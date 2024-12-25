import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "appListSubheader",
})((theme) => {
  return {
    root: {
      lineHeight: "40px",
    },
    gutters: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5),
    },
  };
});

export default useStyles;
