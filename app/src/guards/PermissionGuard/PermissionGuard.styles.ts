import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "PermissionGuard",
})(() => {
  return {
    permissionDenied: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flexGrow: 1,
    },
    roadBlockSvg: {
      height: 200,
      maxWidth: "100%",
    },
  };
});

export default useStyles;
