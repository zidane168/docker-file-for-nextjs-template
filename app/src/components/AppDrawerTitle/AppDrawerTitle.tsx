import { forwardRef } from "react";

import { Box } from "@mui/material";
import AppTypography from "@/components/AppTypography";
import AppIconButton from "@/components/AppIconButton";

import useStyles, { appDrawerTitleClasses } from "./AppDrawerTitle.styles";

import type { BoxProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

import CloseIcon from "@mui/icons-material/Close";

type CustomDrawerTitleProps = {
  stickyHeader?: boolean;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
};

export type AppDrawerTitleProps = Omit<BoxProps, keyof CustomDrawerTitleProps> &
  CustomDrawerTitleProps;

type AppDrawerTitleTypeMap<P = {}, D extends React.ElementType = "div"> = {
  props: P & AppDrawerTitleProps;
  defaultComponent: D;
};
type AppDrawerTitleComponent = OverridableComponent<AppDrawerTitleTypeMap>;

const AppDrawerTitle: AppDrawerTitleComponent = forwardRef(
  (props: AppDrawerTitleProps, ref: React.ForwardedRef<any>) => {
    const { className, children, stickyHeader, onClose, ...rest } = props;

    const { classes, cx } = useStyles();

    return (
      <Box
        className={cx(
          classes.root,
          appDrawerTitleClasses.root,
          !!stickyHeader &&
            `${classes.stickyHeader} ${appDrawerTitleClasses.stickyHeader}`,
          className
        )}
        ref={ref}
        {...rest}
      >
        <AppTypography variant="titleMed24" flex={1}>
          {children}
        </AppTypography>
        {!!onClose && (
          <AppIconButton
            borderRadius="circular"
            color="text.primary"
            edge="x"
            onClick={onClose}
          >
            <CloseIcon />
          </AppIconButton>
        )}
      </Box>
    );
  }
);

export default AppDrawerTitle;
