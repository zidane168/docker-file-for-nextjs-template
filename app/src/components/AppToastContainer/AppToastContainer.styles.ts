import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "AppToastContainer",
})((theme) => {
  return {
    root: {
      zIndex: theme.zIndex.snackbar,
      padding: 0,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        left: "0 !important",
        top: 0,
        margin: 0,
      },
    },
    toastContainerBottomLeft: {
      left: theme.spacing(3),
      bottom: 0,
    },
    toastContainerBottomRight: {
      right: theme.spacing(3),
      bottom: 0,
    },
    toastContainerBottomCenter: {
      bottom: 0,
    },
    toastContainerTopLeft: {
      left: theme.spacing(3),
      top: 0,
    },
    toastContainerTopRight: {
      right: theme.spacing(3),
      top: 0,
    },
    toastContainerTopCenter: {
      top: 0,
    },
    toast: {
      borderRadius: theme.shape.borderRadius,
      fontFamily: theme.typography.bodyReg16.fontFamily,
      fontSize: theme.typography.bodyReg16.fontSize,
      lineHeight: theme.typography.bodyReg16.lineHeight,
      fontWeight: theme.typography.bodyReg16.fontWeight,
      color: theme.palette.text.primary,
      padding: theme.spacing(2),
      boxShadow: "0px 8px 24px -4px rgba(27, 46, 94, 0.12)",
      margin: 0,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      "& .Toastify__toast-icon": {
        width: "auto",
        marginRight: theme.spacing(2),
      },
      [theme.breakpoints.down("md")]: {
        margin: theme.spacing(3),
      },
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(2),
      },
    },
    body: {
      padding: 0,
      margin: 0,
    },
  };
});

export default useStyles;
