import { forwardRef } from "react";

import { TableHead } from "@mui/material";

import useStyles from "./AppTableHead.styles";

import type { TableHeadProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type CustomAppTableHeadProps = {};

export type AppTableHeadProps = Omit<
  TableHeadProps,
  keyof CustomAppTableHeadProps
> &
  CustomAppTableHeadProps;

type AppTableHeadTypeMap<P = {}, D extends React.ElementType = "table"> = {
  props: P & AppTableHeadProps;
  defaultComponent: D;
};
type AppTableHeadComponent = OverridableComponent<AppTableHeadTypeMap>;

const AppTableHead: AppTableHeadComponent = forwardRef(
  (props: AppTableHeadProps, ref: React.ForwardedRef<any>) => {
    const { className, classes: muiClasses, sx, ...rest } = props;

    const { classes, theme, cx, css } = useStyles();

    return (
      <TableHead
        ref={ref}
        {...rest}
        classes={{
          ...muiClasses,
          root: cx(
            classes.root,
            muiClasses?.root,
            className,
            sx && css(theme.unstable_sx(sx) as any)
          ),
        }}
      />
    );
  }
);

export default AppTableHead;
