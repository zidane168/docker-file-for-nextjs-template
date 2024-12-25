import { forwardRef } from "react";

import { TableCell } from "@mui/material";

import type { TableCellProps } from "@mui/material";

import useStyles from "./AppTableCell.styles";

type CustomAppTableCellProps = {};

export type AppTableCellProps = Omit<
  TableCellProps,
  keyof CustomAppTableCellProps
> &
  CustomAppTableCellProps;

const AppTableCell = forwardRef(
  (props: AppTableCellProps, ref: React.ForwardedRef<any>) => {
    const { classes: muiClasses, className, sx, ...rest } = props;

    const { classes, theme, cx, css } = useStyles();

    return (
      <TableCell
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

export default AppTableCell;
