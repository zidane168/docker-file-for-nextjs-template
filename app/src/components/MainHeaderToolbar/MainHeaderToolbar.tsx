import { forwardRef } from "react";

import { Toolbar } from "@mui/material";

import useStyles from "./MainHeaderToolbar.styles";

import type { ToolbarProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

export type CustomMainHeaderToolbarProps = {};

export type MainHeaderToolbarProps = Omit<
  ToolbarProps,
  keyof CustomMainHeaderToolbarProps
> &
  CustomMainHeaderToolbarProps;

interface MainHeaderToolbarTypeMap<
  P = {},
  D extends React.ElementType = "div"
> {
  props: P & MainHeaderToolbarProps;
  defaultComponent: D;
}

type MainHeaderToolbarComponent =
  OverridableComponent<MainHeaderToolbarTypeMap>;

const MainHeaderToolbar: MainHeaderToolbarComponent = forwardRef(
  (props: MainHeaderToolbarProps, ref: React.ForwardedRef<any>) => {
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

export default MainHeaderToolbar;
