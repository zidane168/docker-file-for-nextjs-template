import { forwardRef } from "react";

import { TableContainer } from "@mui/material";

import type { TableContainerProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type CustomAppTableContainerProps = {};

export type AppTableContainerProps = Omit<
  TableContainerProps,
  keyof CustomAppTableContainerProps
> &
  CustomAppTableContainerProps;

type AppTableContainerTypeMap<P = {}, D extends React.ElementType = "div"> = {
  props: P & AppTableContainerProps;
  defaultComponent: D;
};
type AppTableContainerComponent =
  OverridableComponent<AppTableContainerTypeMap>;

const AppTableContainer: AppTableContainerComponent = forwardRef(
  (props: AppTableContainerProps, ref: React.ForwardedRef<any>) => {
    return <TableContainer ref={ref} {...props} />;
  }
);

export default AppTableContainer;
