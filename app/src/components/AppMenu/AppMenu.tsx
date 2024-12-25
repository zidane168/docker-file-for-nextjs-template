import { forwardRef } from "react";

import { Menu } from "@mui/material";

import useStyles from "./AppMenu.styles";

import type { MenuProps } from "@mui/material";

export type AppMenuProps = MenuProps;

const AppMenu = forwardRef(
  (props: AppMenuProps, ref: React.ForwardedRef<any>) => {
    const { classes: muiClasses, className, sx, ...rest } = props;

    const { classes, theme, cx, css } = useStyles();

    return (
      <Menu
        ref={ref}
        {...rest}
        classes={{
          ...muiClasses,
          root: cx(
            muiClasses?.root,
            className,
            !!sx && css(theme.unstable_sx(sx) as any)
          ),
          paper: cx(classes.paper, muiClasses?.paper),
        }}
      />
    );
  }
);

export default AppMenu;
