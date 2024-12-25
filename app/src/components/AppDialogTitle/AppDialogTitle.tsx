import React, { forwardRef } from "react";

import { Box, DialogTitle } from "@mui/material";
import AppSvgIcon from "@/components/AppSvgIcon";
import AppIconButton from "@/components/AppIconButton";
import AppTypography from "@/components/AppTypography";

import CloseIcon from "@@/public/images/icons/close.svg";

import useStyles from "./AppDialogTitle.styles";

import type { DialogTitleProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { AppDialogProps } from "@/components/AppDialog/AppDialog";

type AppClasses = ReturnType<typeof useStyles>["classes"];

type CustomDialogTitleProps = {
  startActions?: React.ReactNode;
  endActions?: React.ReactNode;
  appClasses?: Partial<AppClasses>;
  onClose?: AppDialogProps["onClose"];
};

export type AppDialogTitleProps = Omit<
  DialogTitleProps,
  keyof CustomDialogTitleProps
> &
  CustomDialogTitleProps;

type AppDialogTitleTypeMap<P = {}, D extends React.ElementType = "div"> = {
  props: P & AppDialogTitleProps;
  defaultComponent: D;
};
type AppDialogTitleComponent = OverridableComponent<AppDialogTitleTypeMap>;

const AppDialogTitle: AppDialogTitleComponent = forwardRef(
  (props: AppDialogTitleProps, ref: React.ForwardedRef<any>) => {
    const {
      className,
      classes: muiClasses,
      appClasses,
      children,
      startActions,
      endActions,
      noWrap,
      sx,
      onClose,
      ...rest
    } = props;

    const { classes, theme, css, cx } = useStyles(undefined, {
      props: {
        classes: appClasses,
      },
    });

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClose && onClose(event, "buttonClick");
    };

    return (
      <DialogTitle
        ref={ref}
        classes={{
          ...muiClasses,
          root: cx(
            classes.root,
            className,
            sx && css(theme.unstable_sx(sx) as any)
          ),
        }}
        noWrap={noWrap}
        component="div"
        {...rest}
      >
        {!!startActions && (
          <div className={classes.startActions}>{startActions}</div>
        )}
        <AppTypography
          className={classes.title}
          variant="subtitleMed18"
          noWrap={noWrap}
          component="div"
        >
          {children}
        </AppTypography>
        {(!!endActions || !!onClose) && (
          <div className={classes.endActions}>
            {endActions}
            {!!onClose && (
              <Box component="span" display="flex" mr="-6px">
                <AppIconButton
                  color="text.primary"
                  borderRadius="circular"
                  edge="xy"
                  onClick={handleClose}
                >
                  <AppSvgIcon component={CloseIcon} fontSize="inherit" />
                </AppIconButton>
              </Box>
            )}
          </div>
        )}
      </DialogTitle>
    );
  }
);

export default AppDialogTitle;
