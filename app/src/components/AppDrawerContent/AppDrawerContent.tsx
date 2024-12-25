import { forwardRef } from "react";

import { Box } from "@mui/material";

import useStyles, { appDrawerContentClasses } from "./AppDrawerContent.styles";

import type { BoxProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type CustomDrawerContentProps = {
  disablePadding?: boolean;
};

export type AppDrawerContentProps = Omit<
  BoxProps,
  keyof CustomDrawerContentProps
> &
  CustomDrawerContentProps;

type AppDrawerContentTypeMap<P = {}, D extends React.ElementType = "div"> = {
  props: P & AppDrawerContentProps;
  defaultComponent: D;
};
type AppDrawerContentComponent = OverridableComponent<AppDrawerContentTypeMap>;

const AppDrawerContent: AppDrawerContentComponent = forwardRef(
  (props: AppDrawerContentProps, ref: React.ForwardedRef<any>) => {
    const { className, children, disablePadding, ...rest } = props;

    const { classes, cx } = useStyles();

    return (
      <Box
        className={cx(
          classes.root,
          appDrawerContentClasses.root,
          !disablePadding &&
            `${classes.padding} ${appDrawerContentClasses.padding}`,
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

export default AppDrawerContent;
