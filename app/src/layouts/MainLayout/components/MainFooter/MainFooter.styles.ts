import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "disabled">({
  name: "MainFooter",
  uniqId: "T7bGB7",
})((theme) => {
  return {
    root: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },
    logoImg: {
      height: 44,
      width: "auto",
      maxWidth: "100%",
      [theme.breakpoints.down("md")]: {
        height: 38,
      },
    },
    content: {
      padding: theme.spacing(3.75 * 2, 0),
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(3.75, 0),
      },
    },
    allRightsReserved: {
      padding: theme.spacing(0.5, 0),
      backgroundColor: theme.palette.common.white,
    },
    disabled: {},
  };
});

export default useStyles;
