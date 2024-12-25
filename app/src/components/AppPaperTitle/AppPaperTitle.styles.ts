import { generateUtilityClasses } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const appPaperTitleClasses = generateUtilityClasses("AppPaperTitle", [
  "root",
]);

const useStyles = makeStyles({
  name: "AppPaperTitle",
})((theme) => {
  return {
    root: {
      padding: theme.spacing(2),
    },
  };
});

export default useStyles;
