import { forwardRef } from "react";

import { commonHelpers } from "@/utils/helpers";

import { ButtonBase } from "@mui/material";
import AppTypography from "@/components/AppTypography";

import useStyles, { appButtonClasses } from "./AppButton.styles";

import type { ButtonBaseProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type ButtonColor = "primary" | "secondary" | "inherit" | AppThemeColor;
type CheckboxEdge = "start" | "end" | "top" | "bottom" | "x" | "y" | "xy";
type ButtonTextColor = "default" | AppThemeColor;

type CustomButtonProps = {
  borderRadius?: "rounded" | "circular";
  edge?: CheckboxEdge | CheckboxEdge[];
  variant?: "text" | "contained" | "outlined" | "containedTonal";
  size?: "medium" | "small";
  fullMaxHeight?: boolean;
  color?: ButtonColor;
  textColor?: ButtonTextColor;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  fullWidth?: boolean;
  noWrap?: boolean;
  classes?: ButtonBaseProps["classes"] & ReturnType<typeof useStyles>;
};

export type AppButtonProps = CustomButtonProps &
  Omit<ButtonBaseProps, keyof CustomButtonProps>;

type AppButtonTypeMap<P = {}, D extends React.ElementType = "button"> = {
  props: P & AppButtonProps;
  defaultComponent: D;
};
type AppButtonComponent = OverridableComponent<AppButtonTypeMap>;

const AppButton: AppButtonComponent = forwardRef(
  (props: AppButtonProps, ref: React.ForwardedRef<any>) => {
    const {
      borderRadius = "rounded",
      edge,
      classes: muiClasses,
      className,
      variant = "text",
      color = "primary",
      textColor,
      size = "medium",
      fullMaxHeight,
      startIcon,
      endIcon,
      children,
      fullWidth,
      noWrap,
      sx,
      ...rest
    } = props;

    const { classes, theme, css, cx } = useStyles(
      {
        color: color!,
        textColor: textColor!,
      },
      {
        props: {
          classes: muiClasses,
        },
      }
    );

    const edges = Array.isArray(edge)
      ? edge
      : !commonHelpers.isEmpty(edge)
      ? [edge!]
      : [];

    const appClasses = cx([classes.root, appButtonClasses.root], {
      [`${classes.fullMaxHeightSizeMedium} ${appButtonClasses.fullMaxHeightSizeMedium}`]:
        !!fullMaxHeight && size === "medium",

      [`${classes.fullMaxHeightSizeSmall} ${appButtonClasses.fullMaxHeightSizeSmall}`]:
        !!fullMaxHeight && size === "small",

      [`${classes.borderRadiusCircular} ${appButtonClasses.borderRadiusCircular}`]:
        borderRadius === "circular",

      [`${classes.noWrap} ${appButtonClasses.noWrap}`]: !!noWrap,

      [`${classes.borderRadiusRounded} ${appButtonClasses.borderRadiusRounded}`]:
        borderRadius === "rounded" && size === "medium",

      [`${classes.borderRadiusRoundedSizeSmall} ${appButtonClasses.borderRadiusRoundedSizeSmall}`]:
        borderRadius === "rounded" && size === "small",

      // containedTonal
      [`${classes.containedTonal} ${appButtonClasses.containedTonal}`]:
        variant === "containedTonal",

      [`${classes.containedTonalSizeMedium} ${appButtonClasses.containedTonalSizeMedium}`]:
        variant === "containedTonal" && size === "medium",

      [`${classes.containedTonalSizeSmall} ${appButtonClasses.containedTonalSizeSmall}`]:
        variant === "containedTonal" && size === "small",

      [`${classes.containedTonalEdgeStart} ${appButtonClasses.containedTonalEdgeStart}`]:
        edges.includes("start") && variant === "containedTonal",

      [`${classes.containedTonalEdgeEnd} ${appButtonClasses.containedTonalEdgeEnd}`]:
        edges.includes("end") && variant === "containedTonal",

      [`${classes.containedTonalEdgeTop} ${appButtonClasses.containedTonalEdgeTop}`]:
        edges.includes("top") && variant === "containedTonal",

      [`${classes.containedTonalEdgeBottom} ${appButtonClasses.containedTonalEdgeBottom}`]:
        edges.includes("bottom") && variant === "containedTonal",

      [`${classes.containedTonalEdgeX} ${appButtonClasses.containedTonalEdgeX}`]:
        edges.includes("x") && variant === "containedTonal",

      [`${classes.containedTonalEdgeY} ${appButtonClasses.containedTonalEdgeY}`]:
        edges.includes("y") && variant === "containedTonal",

      [`${classes.containedTonalEdgeXY} ${appButtonClasses.containedTonalEdgeXY}`]:
        edges.includes("xy") && variant === "containedTonal",

      // Contained
      [`${classes.contained} ${appButtonClasses.contained}`]:
        variant === "contained",

      [`${classes.containedSizeMedium} ${appButtonClasses.containedSizeMedium}`]:
        variant === "contained" && size === "medium",

      [`${classes.containedSizeSmall} ${appButtonClasses.containedSizeSmall}`]:
        variant === "contained" && size === "small",

      [`${classes.containedEdgeStart} ${appButtonClasses.containedEdgeStart}`]:
        edges.includes("start") && variant === "contained",

      [`${classes.containedEdgeEnd} ${appButtonClasses.containedEdgeEnd}`]:
        edges.includes("end") && variant === "contained",

      [`${classes.containedEdgeTop} ${appButtonClasses.containedEdgeTop}`]:
        edges.includes("top") && variant === "contained",

      [`${classes.containedEdgeBottom} ${appButtonClasses.containedEdgeBottom}`]:
        edges.includes("bottom") && variant === "contained",

      [`${classes.containedEdgeX} ${appButtonClasses.containedEdgeX}`]:
        edges.includes("x") && variant === "contained",

      [`${classes.containedEdgeY} ${appButtonClasses.containedEdgeY}`]:
        edges.includes("y") && variant === "contained",

      [`${classes.containedEdgeXY} ${appButtonClasses.containedEdgeXY}`]:
        edges.includes("xy") && variant === "contained",

      // Outlined
      [`${classes.outlined} ${appButtonClasses.outlined}`]:
        variant === "outlined",

      [`${classes.outlinedSizeMedium} ${appButtonClasses.outlinedSizeMedium}`]:
        variant === "outlined" && size === "medium",

      [`${classes.outlinedSizeSmall} ${appButtonClasses.outlinedSizeSmall}`]:
        variant === "outlined" && size === "small",

      [`${classes.outlinedEdgeStart} ${appButtonClasses.outlinedEdgeStart}`]:
        edges.includes("start") && variant === "outlined",

      [`${classes.outlinedEdgeEnd} ${appButtonClasses.outlinedEdgeEnd}`]:
        edges.includes("end") && variant === "outlined",

      [`${classes.outlinedEdgeTop} ${appButtonClasses.outlinedEdgeTop}`]:
        edges.includes("top") && variant === "outlined",

      [`${classes.outlinedEdgeBottom} ${appButtonClasses.outlinedEdgeBottom}`]:
        edges.includes("bottom") && variant === "outlined",

      [`${classes.outlinedEdgeX} ${appButtonClasses.outlinedEdgeX}`]:
        edges.includes("x") && variant === "outlined",

      [`${classes.outlinedEdgeY} ${appButtonClasses.outlinedEdgeY}`]:
        edges.includes("y") && variant === "outlined",

      [`${classes.outlinedEdgeXY} ${appButtonClasses.outlinedEdgeXY}`]:
        edges.includes("xy") && variant === "outlined",

      // text
      [`${classes.text} ${appButtonClasses.text}`]: variant === "text",

      [`${classes.textSizeMedium} ${appButtonClasses.textSizeMedium}`]:
        variant === "text" && size === "medium",

      [`${classes.textSizeSmall} ${appButtonClasses.textSizeSmall}`]:
        variant === "text" && size === "small",

      [`${classes.textEdgeStart} ${appButtonClasses.textEdgeStart}`]:
        edges.includes("start") && variant === "text",

      [`${classes.textEdgeEnd} ${appButtonClasses.textEdgeEnd}`]:
        edges.includes("end") && variant === "text",

      [`${classes.textEdgeTop} ${appButtonClasses.textEdgeTop}`]:
        edges.includes("top") && variant === "text",

      [`${classes.textEdgeBottom} ${appButtonClasses.textEdgeBottom}`]:
        edges.includes("bottom") && variant === "text",

      [`${classes.textEdgeX} ${appButtonClasses.textEdgeX}`]:
        edges.includes("x") && variant === "text",

      [`${classes.textEdgeY} ${appButtonClasses.textEdgeY}`]:
        edges.includes("y") && variant === "text",

      [`${classes.textEdgeXY} ${appButtonClasses.textEdgeXY}`]:
        edges.includes("xy") && variant === "text",

      [`${classes.fullWidth} ${appButtonClasses.fullWidth}`]: !!fullWidth,
    });

    return (
      <ButtonBase
        ref={ref}
        classes={{
          focusVisible: cx(
            classes.focusVisible,
            muiClasses?.focusVisible,
            appButtonClasses.focusVisible
          ),
          disabled: cx(
            classes.disabled,
            muiClasses?.disabled,
            appButtonClasses.disabled
          ),
          root: cx(
            appClasses,
            muiClasses?.root,
            className,
            !!sx && css(theme.unstable_sx(sx) as any)
          ),
        }}
        type="button"
        {...rest}
      >
        {startIcon && (
          <span
            className={cx(
              classes.icon,
              classes.startIcon,
              appButtonClasses.startIcon
            )}
          >
            {startIcon}
          </span>
        )}
        {!!noWrap ? (
          <AppTypography variant="inherit" component={"span"} noWrap>
            {children}
          </AppTypography>
        ) : (
          children
        )}
        {endIcon && (
          <span
            className={cx(
              classes.icon,
              classes.endIcon,
              appButtonClasses.endIcon
            )}
          >
            {endIcon}
          </span>
        )}
      </ButtonBase>
    );
  }
);

export default AppButton;
