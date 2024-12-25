import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppDialog",
})(() => {
  return {
    paperFullScreen: {
      borderRadius: "initial",
    },
    scrollBody: {
      scrollBehavior: "smooth",
    },
  };
});

export default useStyles;
