import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles({
  name: "Pagination",
})((theme) => {
  return {
    tablePagination: {
      marginTop: theme.spacing(2),
    },
    tablePaginationToolbar: {
      justifyContent: "center",
      padding: 0,
      "& .MuiTablePagination-spacer": {
        flex: 0,
      },
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        justifyContent: "center",
      },
    },
    paginationUl: {
      flexWrap: "nowrap",
      [theme.breakpoints.down("md")]: {
        flexWrap: "wrap",
        justifyContent: "center",
      },
    },
  };
});

export default useStyles;
