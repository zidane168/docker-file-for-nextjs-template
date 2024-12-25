import { tableSortLabelClasses } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppTableCell",
})((theme) => {
  return {
    root: {
      wordBreak: "initial",
      fontSize: theme.typography.bodyReg14.fontSize,
      lineHeight: theme.typography.bodyReg14.lineHeight,
      fontWeight: theme.typography.bodyReg14.fontWeight,
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing("9.5px", 2),
      borderRight: `1px solid transparent`,
      borderLeft: `1px solid transparent`,
      [`& .${tableSortLabelClasses.root}`]: {
        color: theme.palette.common.white,
        "&:hover": {
          color: theme.palette.common.white,
          [`& .${tableSortLabelClasses.icon}`]: {
            opacity: 1,
          },
        },
        [`& .${tableSortLabelClasses.icon}`]: {
          fontSize: 20,
          color: theme.palette.common.white,
        },
      },
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
      },
    },
  };
});

export default useStyles;
