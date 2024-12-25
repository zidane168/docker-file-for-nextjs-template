import { forwardRef } from "react";

import { Box } from "@mui/material";

import useStyles from "./AdminContent.styles";

import type { BoxProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type CustomAdminContentProps = {
  disablePadding?: boolean;
};

export type AdminContentProps = Omit<BoxProps, keyof CustomAdminContentProps> &
  CustomAdminContentProps;

type AdminContentTypeMap<P = {}, D extends React.ElementType = "div"> = {
  props: P & AdminContentProps;
  defaultComponent: D;
};
type AdminContentComponent = OverridableComponent<AdminContentTypeMap>;

const AdminContent: AdminContentComponent = forwardRef(
  (props: AdminContentProps, ref: React.ForwardedRef<any>) => {
    const { className, children, disablePadding, ...rest } = props;

    const { classes, cx } = useStyles();

    return (
      <Box className={cx(classes.root, className)} ref={ref} {...rest}>
        {children}
      </Box>
    );
  }
);

export default AdminContent;
