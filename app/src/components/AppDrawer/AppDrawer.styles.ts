import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppDrawer",
})((theme) => {
  const drawerWidth = theme.breakpoints.values.sm;

  return {
    paper: {
      borderRadius: 0,
    },
    paperAnchorRight: {
      width: drawerWidth,
      maxWidth: "calc(100vw - 64px)",
    },
  };
});

export default useStyles;
