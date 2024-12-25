import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AlertDialog",
})((theme) => {
  return {
    dialog: {
      zIndex: theme.zIndex.modal + 25,
    },
    dialogTitleText: {
      overflow: "initial",
      whiteSpace: "initial",
    },
    dialogActions: {
      display: "flex",
      justifyContent: "center",
      gap: theme.spacing(2),
      "& > .MuiButton-root,& > .MuiButtonBase-root": {
        marginLeft: 0,
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
      },
    },
    actionButtonFullWidth: {
      flex: 1,
      minWidth: 100,
      maxWidth: "100%",
    },
  };
});

export default useStyles;
