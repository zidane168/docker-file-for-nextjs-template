import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppTab",
})((theme) => {
  return {
    root: {
      minHeight: 60,
      minWidth: 90 + 12,
      padding: theme.spacing(1.5, 3.5),
      color: theme.palette.text.secondary,
      ...(theme.typography.bodySemi16 as any),
    },
    selected: {
      ...(theme.typography.bodySemi16 as any),
    },
  };
});

export default useStyles;
