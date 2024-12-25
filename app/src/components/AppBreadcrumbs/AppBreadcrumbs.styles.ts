import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppBreadcrumbs",
})((theme) => {
  return {
    separatorIcon: {
      fontSize: 14,
      color: theme.palette.text.secondary,
    },
  };
});

export default useStyles;
