import { forwardRef } from "react";

import { TableRow } from "@mui/material";

import type { TableRowProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type CustomAppTableRowProps = {};

export type AppTableRowProps = Omit<
  TableRowProps,
  keyof CustomAppTableRowProps
> &
  CustomAppTableRowProps;

type AppTableRowTypeMap<P = {}, D extends React.ElementType = "tr"> = {
  props: P & AppTableRowProps;
  defaultComponent: D;
};
type AppTableRowComponent = OverridableComponent<AppTableRowTypeMap>;

const AppTableRow: AppTableRowComponent = forwardRef(
  (props: AppTableRowProps, ref: React.ForwardedRef<any>) => {
    return <TableRow ref={ref} {...props} />;
  }
);

export default AppTableRow;
