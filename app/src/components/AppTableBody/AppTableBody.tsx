import { forwardRef } from "react";

import { TableBody } from "@mui/material";

import type { TableBodyProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type CustomAppTableBodyProps = {};

export type AppTableBodyProps = Omit<
  TableBodyProps,
  keyof CustomAppTableBodyProps
> &
  CustomAppTableBodyProps;

type AppTableBodyTypeMap<P = {}, D extends React.ElementType = "tbody"> = {
  props: P & AppTableBodyProps;
  defaultComponent: D;
};
type AppTableBodyComponent = OverridableComponent<AppTableBodyTypeMap>;

const AppTableBody: AppTableBodyComponent = forwardRef(
  (props: AppTableBodyProps, ref: React.ForwardedRef<any>) => {
    return <TableBody ref={ref} {...props} />;
  }
);

export default AppTableBody;
