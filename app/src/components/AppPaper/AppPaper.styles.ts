import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppPaper",
})((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.common.white,
      borderRadius: theme.shape.borderRadius,
    },
    elevationMenu: {
      boxShadow: theme.app.shadows.menu,
    },
    elevationPaper: {
      boxShadow: theme.app.shadows.paper,
    },
  };
});

export default useStyles;
