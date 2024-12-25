import { forwardRef } from "react";

import { TablePagination } from "@mui/material";

import type { TablePaginationProps } from "@mui/material";

type CustomAppTablePaginationProps = {};

export type AppTablePaginationProps = Omit<
  TablePaginationProps,
  keyof CustomAppTablePaginationProps
> &
  CustomAppTablePaginationProps;

const AppTablePagination = forwardRef(
  (props: AppTablePaginationProps, ref: React.ForwardedRef<any>) => {
    return <TablePagination ref={ref} {...props} />;
  }
);

export default AppTablePagination;
