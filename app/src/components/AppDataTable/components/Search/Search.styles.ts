import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<void, "searchInputEndAdorment">({
  name: "Search",
  uniqId: "AwZKvq",
})((theme, _, classes) => {
  return {
    searchInput: {
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    searchInputFocused: {
      [theme.breakpoints.down("md")]: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: theme.palette.common.white,
        zIndex: 10,
        [`& .${classes.searchInputEndAdorment}`]: {
          display: "flex",
        },
      },
    },
    searchInputEndAdorment: {
      display: "none",
    },
  };
});

export default useStyles;
