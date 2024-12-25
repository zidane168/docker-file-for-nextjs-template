import { makeStyles } from "tss-react/mui";
import { appPaperTitleClasses } from "../AppPaperTitle";

const useStyles = makeStyles({
  name: "AppPaperContent",
})((theme) => {
  return {
    root: {
      padding: theme.spacing(2),
      [`.${appPaperTitleClasses.root} + &`]: {
        paddingTop: 0,
      },
    },
  };
});

export default useStyles;
