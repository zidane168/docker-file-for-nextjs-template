import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppInputAdornment",
})((theme) => {
  return {
    positionStart: {
      marginRight: theme.spacing(1.5),
    },
    positionEnd: {
      marginLeft: theme.spacing(1.5),
    },
  };
});

export default useStyles;
