import { forwardRef } from "react";

import { Box } from "@mui/material";

import useStyles, { appDrawerActionsClasses } from "./AppDrawerActions.styles";

import type { BoxProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type CustomDrawerActions = {
  stickyFooter?: boolean;
};

export type AppDrawerActionsProps = Omit<BoxProps, keyof CustomDrawerActions> &
  CustomDrawerActions;

type AppDrawerActionsTypeMap<P = {}, D extends React.ElementType = "div"> = {
  props: P & AppDrawerActionsProps;
  defaultComponent: D;
};
type AppDrawerActionsComponent = OverridableComponent<AppDrawerActionsTypeMap>;

const AppDrawerActions: AppDrawerActionsComponent = forwardRef(
  (props: AppDrawerActionsProps, ref: React.ForwardedRef<any>) => {
    const { className, children, stickyFooter, ...rest } = props;

    const { classes, cx } = useStyles();

    return (
      <Box
        className={cx(
          classes.root,
          appDrawerActionsClasses.root,
          !!stickyFooter &&
            `${classes.stickyFooter} ${appDrawerActionsClasses.stickyFooter}`,
          className
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);

export default AppDrawerActions;
