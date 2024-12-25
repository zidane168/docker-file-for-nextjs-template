import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppTableHead",
})((theme) => {
  return {
    root: {
      "& .MuiTableCell-root": {
        fontSize: theme.typography.bodyMed14.fontSize,
        fontWeight: theme.typography.bodyMed14.fontWeight,
        padding: theme.spacing("9.75px", 2),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        borderRightColor: theme.palette.common.white,
        "&:type-of-last": {
          borderRightColor: "transparent",
        },
      },
    },
  };
});

export default useStyles;
