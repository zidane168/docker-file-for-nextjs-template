import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "ButtonTab",
})((theme) => {
  return {
    root: {
      position: "relative",
      zIndex: 1,
      minHeight: 40,
      minWidth: 90 - 8,
      padding: theme.spacing("9.5px", 2.5),
      color: theme.palette.text.primary,
      borderRadius: theme.shape.borderRadius,
      ...(theme.typography.bodyReg16 as any),
    },
    selected: {
      ...(theme.typography.bodyReg16 as any),
    },
  };
});

export default useStyles;
