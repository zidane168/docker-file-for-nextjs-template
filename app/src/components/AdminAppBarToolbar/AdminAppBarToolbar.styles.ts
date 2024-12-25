import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AdminAppBarToolbar",
})(() => {
  return {
    root: {
      minHeight: 40 + 16 * 2,
    },
  };
});

export default useStyles;
