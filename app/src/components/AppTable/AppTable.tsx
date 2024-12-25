import { forwardRef } from "react";

import { Table } from "@mui/material";

import type { TableProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type CustomAppTableProps = {};

export type AppTableProps = Omit<TableProps, keyof CustomAppTableProps> &
  CustomAppTableProps;

type AppTableTypeMap<P = {}, D extends React.ElementType = "table"> = {
  props: P & AppTableProps;
  defaultComponent: D;
};
type AppTableComponent = OverridableComponent<AppTableTypeMap>;

const AppTable: AppTableComponent = forwardRef(
  (props: AppTableProps, ref: React.ForwardedRef<any>) => {
    return <Table ref={ref} {...props} />;
  }
);

export default AppTable;
