import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "MainLayout",
})((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.default,
      overflowX: "clip",
    },
    main: {
      minHeight: "calc(100dvh - 80px)",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      backgroundImage: "url(/images/main-bg.png)",
      backgroundRepeat: "repeat",
      backgroundSize: "100%",
      backgroundPosition: "bottom",
      [theme.breakpoints.up("xl")]: {
        backgroundSize: theme.breakpoints.values.xl,
      },
    },
    mainBottomContainer: {
      position: "relative",
    },
    bgCover: {
      position: "absolute",
      top: 0,
      left: "50%",
      translate: "-50% 0",
      width: "100%",
      height: "100%",
      overflowY: "clip",
      pointerEvents: "none",
    },
    bgCoverImg: {
      width: "calc(100%*3343/1320)",
      height: "auto",
      position: "absolute",
      left: "50%",
      translate: "-50% 0",
      color: theme.palette.background.default,
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    bgCoverMobileImg: {
      width: "calc(100%*598/390)",
      height: "auto",
      position: "absolute",
      left: "50%",
      translate: "-50% 0",
      color: theme.palette.background.default,
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  };
});

export default useStyles;
