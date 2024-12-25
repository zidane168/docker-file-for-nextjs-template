import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppMenuList",
})((theme) => {
  return {
    padding: {
      paddingTop: theme.spacing(1.25),
      paddingBottom: theme.spacing(1.25),
    },
  };
});

export default useStyles;
