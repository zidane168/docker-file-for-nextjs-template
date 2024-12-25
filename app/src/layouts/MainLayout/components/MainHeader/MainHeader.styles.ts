import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "MainHeader",
})((theme) => {
  return {
    root: {
      overflowX: "clip",
      backgroundColor: theme.palette.common.white,
      boxShadow: "0px 4px 8px 0px #00000014",
    },
    toolbar: {
      gap: theme.spacing(3.75),
      [theme.breakpoints.down("md")]: {
        gap: theme.spacing(1.25),
      },
    },
    logoImg: {
      height: 36,
      width: "auto",
      maxWidth: "100%",
      objectFit: "contain",
      objectPosition: "center",
      [theme.breakpoints.down("md")]: {
        height: 38,
      },
    },
  };
});

export default useStyles;
