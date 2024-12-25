import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles<
  void,
  "dataTableCell" | "dataTableRow" | "dataTableRowHover"
>({
  name: "AppDataTable",
  uniqId: "ydhcl5",
})((theme, _, classes) => {
  return {
    dataTableContainer: {
      borderRadius: theme.shape.borderRadius,
    },
    dataTableHeader: {
      display: "flex",
      gap: theme.spacing(2),
      marginBottom: theme.spacing(2),
      position: "relative",
    },
    dataTableBody: {
      [`& .${classes.dataTableRow}`]: {
        backgroundColor: theme.palette.common.white,
        "&:last-of-type": {
          [`& .${classes.dataTableCell}`]: {
            borderWidth: 0,
          },
        },
      },
    },
    dataTableRow: {
      [`&.${classes.dataTableRowHover}:hover`]: {
        backgroundColor: theme.palette.common.lightestNeutral,
      },
    },
    dataTableCell: {},
    dataTableRowHover: {},
    dataTableCellPinnedLeft: {
      position: "sticky",
      left: 0,
      backgroundColor: "inherit",
    },
    dataTableCellPinnedRight: {
      position: "sticky",
      right: 0,
      backgroundColor: "inherit",
    },
  };
});

export default useStyles;
