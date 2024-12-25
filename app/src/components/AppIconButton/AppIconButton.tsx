import { forwardRef } from "react";

import { commonHelpers } from "@/utils/helpers";

import { ButtonBase } from "@mui/material";

import useStyles, { appIconButtonClasses } from "./AppIconButton.styles";

import type { ButtonBaseProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type ButtonColor = "primary" | "secondary" | "inherit" | AppThemeColor;
type CheckboxEdge = "start" | "end" | "top" | "bottom" | "x" | "y" | "xy";
type ButtonTextColor = "default" | AppThemeColor;

type CustomIconButtonProps = {
  borderRadius?: "rounded" | "circular";
  edge?: CheckboxEdge | CheckboxEdge[];
  variant?: "text" | "contained" | "outlined" | "containedTonal";
  size?: "medium" | "small";
  color?: ButtonColor;
  textColor?: ButtonTextColor;
  disableHoverEffect?: boolean;
  appClasses?: Partial<ReturnType<typeof useStyles>>;
};

export type AppIconButtonProps = Omit<
  ButtonBaseProps,
  "size" | keyof CustomIconButtonProps
> &
  CustomIconButtonProps;

type AppIconButtonTypeMap<P = {}, D extends React.ElementType = "button"> = {
  props: P & AppIconButtonProps;
  defaultComponent: D;
};
type AppIconButtonComponent = OverridableComponent<AppIconButtonTypeMap>;

const AppIconButton: AppIconButtonComponent = forwardRef(
  (props: AppIconButtonProps, ref: React.ForwardedRef<any>) => {
    const {
      borderRadius,
      edge,
      classes: muiClasses,
      appClasses,
      className,
      variant = "text",
      color = "primary",
      textColor = "default",
      size = "medium",
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
          classes: appClasses,
        },
      }
    );

    const edges = Array.isArray(edge)
      ? edge
      : !commonHelpers.isEmpty(edge)
      ? [edge!]
      : [];

    const rootClasses = cx(
      [classes.root, appIconButtonClasses.root],
      {
        [`${classes.borderRadiusCircular} ${appIconButtonClasses.borderRadiusCircular}`]:
          borderRadius === "circular",

        [`${classes.borderRadiusRounded} ${appIconButtonClasses.borderRadiusRounded}`]:
          borderRadius === "rounded" && size === "medium",

        [`${classes.borderRadiusRoundedSizeSmall} ${appIconButtonClasses.borderRadiusRoundedSizeSmall}`]:
          borderRadius === "rounded" && size === "small",

        [`${classes.containedTonal} ${appIconButtonClasses.containedTonal}`]:
          variant === "containedTonal",

        [`${classes.containedTonalSizeMedium} ${appIconButtonClasses.containedTonalSizeMedium}`]:
          variant === "containedTonal" && size === "medium",

        [`${classes.containedTonalSizeSmall} ${appIconButtonClasses.containedTonalSizeSmall}`]:
          variant === "containedTonal" && size === "small",

        [`${classes.containedTonalEdgeStart} ${appIconButtonClasses.containedTonalEdgeStart}`]:
          edges.includes("start") && variant === "containedTonal",

        [`${classes.containedTonalEdgeEnd} ${appIconButtonClasses.containedTonalEdgeEnd}`]:
          edges.includes("end") && variant === "containedTonal",

        [`${classes.containedTonalEdgeTop} ${appIconButtonClasses.containedTonalEdgeTop}`]:
          edges.includes("top") && variant === "containedTonal",

        [`${classes.containedTonalEdgeBottom} ${appIconButtonClasses.containedTonalEdgeBottom}`]:
          edges.includes("bottom") && variant === "containedTonal",

        [`${classes.containedTonalEdgeX} ${appIconButtonClasses.containedTonalEdgeX}`]:
          edges.includes("x") && variant === "containedTonal",

        [`${classes.containedTonalEdgeY} ${appIconButtonClasses.containedTonalEdgeY}`]:
          edges.includes("y") && variant === "containedTonal",

        [`${classes.containedTonalEdgeXY} ${appIconButtonClasses.containedTonalEdgeXY}`]:
          edges.includes("xy") && variant === "containedTonal",

        // contained
        [`${classes.contained} ${appIconButtonClasses.contained}`]:
          variant === "contained",

        [`${classes.containedSizeMedium} ${appIconButtonClasses.containedSizeMedium}`]:
          variant === "contained" && size === "medium",

        [`${classes.containedSizeSmall} ${appIconButtonClasses.containedSizeSmall}`]:
          variant === "contained" && size === "small",

        [`${classes.containedEdgeStart} ${appIconButtonClasses.containedEdgeStart}`]:
          edges.includes("start") && variant === "contained",

        [`${classes.containedEdgeEnd} ${appIconButtonClasses.containedEdgeEnd}`]:
          edges.includes("end") && variant === "contained",

        [`${classes.containedEdgeTop} ${appIconButtonClasses.containedEdgeTop}`]:
          edges.includes("top") && variant === "contained",

        [`${classes.containedEdgeBottom} ${appIconButtonClasses.containedEdgeBottom}`]:
          edges.includes("bottom") && variant === "contained",

        [`${classes.containedEdgeX} ${appIconButtonClasses.containedEdgeX}`]:
          edges.includes("x") && variant === "contained",

        [`${classes.containedEdgeY} ${appIconButtonClasses.containedEdgeY}`]:
          edges.includes("y") && variant === "contained",

        [`${classes.containedEdgeXY} ${appIconButtonClasses.containedEdgeXY}`]:
          edges.includes("xy") && variant === "contained",

        // outlined
        [`${classes.outlined} ${appIconButtonClasses.outlined}`]:
          variant === "outlined",

        [`${classes.outlinedSizeMedium} ${appIconButtonClasses.outlinedSizeMedium}`]:
          variant === "outlined" && size === "medium",

        [`${classes.outlinedSizeSmall} ${appIconButtonClasses.outlinedSizeSmall}`]:
          variant === "outlined" && size === "small",

        [`${classes.outlinedEdgeStart} ${appIconButtonClasses.outlinedEdgeStart}`]:
          edges.includes("start") && variant === "outlined",

        [`${classes.outlinedEdgeEnd} ${appIconButtonClasses.outlinedEdgeEnd}`]:
          edges.includes("end") && variant === "outlined",

        [`${classes.outlinedEdgeTop} ${appIconButtonClasses.outlinedEdgeTop}`]:
          edges.includes("top") && variant === "outlined",

        [`${classes.outlinedEdgeBottom} ${appIconButtonClasses.outlinedEdgeBottom}`]:
          edges.includes("bottom") && variant === "outlined",

        [`${classes.outlinedEdgeX} ${appIconButtonClasses.outlinedEdgeX}`]:
          edges.includes("x") && variant === "outlined",

        [`${classes.outlinedEdgeY} ${appIconButtonClasses.outlinedEdgeY}`]:
          edges.includes("y") && variant === "outlined",

        [`${classes.outlinedEdgeXY} ${appIconButtonClasses.outlinedEdgeXY}`]:
          edges.includes("xy") && variant === "outlined",

        // text
        [`${classes.text} ${appIconButtonClasses.text}`]: variant === "text",

        [`${classes.textSizeMedium} ${appIconButtonClasses.textSizeMedium}`]:
          variant === "text" && size === "medium",

        [`${classes.textSizeSmall} ${appIconButtonClasses.textSizeSmall}`]:
          variant === "text" && size === "small",

        [`${classes.textEdgeStart} ${appIconButtonClasses.textEdgeStart}`]:
          edges.includes("start") && variant === "text",

        [`${classes.textEdgeEnd} ${appIconButtonClasses.textEdgeEnd}`]:
          edges.includes("end") && variant === "text",

        [`${classes.textEdgeTop} ${appIconButtonClasses.textEdgeTop}`]:
          edges.includes("top") && variant === "text",

        [`${classes.textEdgeBottom} ${appIconButtonClasses.textEdgeBottom}`]:
          edges.includes("bottom") && variant === "text",

        [`${classes.textEdgeX} ${appIconButtonClasses.textEdgeX}`]:
          edges.includes("x") && variant === "text",

        [`${classes.textEdgeY} ${appIconButtonClasses.textEdgeY}`]:
          edges.includes("y") && variant === "text",

        [`${classes.textEdgeXY} ${appIconButtonClasses.textEdgeXY}`]:
          edges.includes("xy") && variant === "text",
      },
      muiClasses?.root,
      className,
      sx && css(theme.unstable_sx(sx) as any)
    );

    return (
      <ButtonBase
        ref={ref}
        classes={{
          ...muiClasses,
          focusVisible: cx(
            classes.focusVisible,
            muiClasses?.focusVisible,
            appIconButtonClasses?.focusVisible
          ),
          disabled: cx(
            classes.disabled,
            muiClasses?.disabled,
            appIconButtonClasses.disabled
          ),
          root: rootClasses,
        }}
        {...rest}
      />
    );
  }
);

export default AppIconButton;
