import AppDataTableContext from "@/components/AppDataTable/AppDataTable.context";
import AppPagination from "@/components/AppPagination";
import AppTablePagination from "@/components/AppTablePagination";

import { Trans, useTranslation } from "next-i18next";
import { useContext } from "react";

import useStyles from "./Pagination.styles";

const Pagination = () => {
  const { dataCount, pageIndex, pageSize, changePageIndex, changePageSize } =
    useContext(AppDataTableContext);

  const { classes } = useStyles();

  const { t } = useTranslation();

  const handlePageChange = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    changePageIndex(newPage - 1);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPageSize = Number(event.target.value);
    changePageSize(newPageSize);
  };

  return (
    <AppTablePagination
      component="div"
      classes={{
        root: classes.tablePagination,
        toolbar: classes.tablePaginationToolbar,
      }}
      count={dataCount}
      rowsPerPageOptions={[10, 20, 50, 100]}
      page={pageIndex}
      rowsPerPage={pageSize}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      ActionsComponent={(tablePaginationProps) => {
        return (
          <AppPagination
            classes={{
              ul: classes.paginationUl,
            }}
            shape="rounded"
            showLastButton
            showFirstButton
            page={tablePaginationProps.page + 1}
            count={Math.ceil(
              tablePaginationProps.count / tablePaginationProps.rowsPerPage
            )}
            siblingCount={2}
            onChange={(event: any, newPage: number) =>
              handlePageChange(event, newPage)
            }
          />
        );
      }}
      labelDisplayedRows={(tablePaginationProps) => {
        return (
          <Trans
            t={t}
            defaults="dataTablePaginationContentWithCount"
            values={{
              count: tablePaginationProps.count,
              from: tablePaginationProps.from,
              to: tablePaginationProps.to,
            }}
          />
        );
      }}
    />
  );
};

export default Pagination;
