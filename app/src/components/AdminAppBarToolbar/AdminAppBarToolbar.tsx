import { forwardRef } from "react";

import { Toolbar } from "@mui/material";

import useStyles from "./AdminAppBarToolbar.styles";

import type { ToolbarProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

export type CustomToolbarProps = {};

export type AdminAppBarToolbarProps = Omit<
  ToolbarProps,
  keyof CustomToolbarProps
> &
  CustomToolbarProps;

interface AdminAppBarToolbarTypeMap<
  P = {},
  D extends React.ElementType = "div"
> {
  props: P & AdminAppBarToolbarProps;
  defaultComponent: D;
}

type AdminAppBarToolbarComponent =
  OverridableComponent<AdminAppBarToolbarTypeMap>;

const AdminAppBarToolbar: AdminAppBarToolbarComponent = forwardRef(
  (props: AdminAppBarToolbarProps, ref: React.ForwardedRef<any>) => {
    const { classes: muiClasses, sx, ...rest } = props;

    const { classes, theme, cx, css } = useStyles();

    return (
      <Toolbar
        ref={ref}
        {...rest}
        classes={{
          ...muiClasses,
          root: cx(
            classes.root,
            muiClasses?.root,
            sx && css(theme.unstable_sx(sx) as any)
          ),
        }}
      />
    );
  }
);

export default AdminAppBarToolbar;
