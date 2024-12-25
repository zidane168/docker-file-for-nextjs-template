import { alpha } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "StickyAppBar",
})((theme) => {
  return {
    root: {
      zIndex: 100,
      position: "sticky",
      transition: theme.transitions.create(["background-color", "box-shadow"]),
    },
    sticking: {
      backgroundColor: alpha(theme.palette.background.default, 0.8),
      backdropFilter: "blur(6px)",
      boxShadow: "0px 8px 24px -4px rgba(27, 46, 94, 0.12)",
    },
  };
});

export default useStyles;
