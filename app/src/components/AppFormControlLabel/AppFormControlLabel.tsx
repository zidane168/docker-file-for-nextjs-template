import { forwardRef } from "react";

import { FormControlLabel } from "@mui/material";

import type { FormControlLabelProps } from "@mui/material";

import useStyles from "./AppFormControlLabel.styles";

type CustomAppFormControlLabelProps = {
  variant?: "text" | "filled" | "outlined";
  fullWidth?: boolean;
  fullHeight?: boolean;
  disableGutters?: boolean;
  appClasses?: Partial<ReturnType<typeof useStyles>>;
  color?: "primary" | "secondary" | "error" | AppThemeColor;
};

export type AppFormControlLabelProps = Omit<
  FormControlLabelProps,
  keyof CustomAppFormControlLabelProps
> &
  CustomAppFormControlLabelProps;

const AppFormControlLabel = forwardRef(
  (props: AppFormControlLabelProps, ref: React.ForwardedRef<any>) => {
    const {
      className,
      classes: muiClasses,
      appClasses,
      variant = "text",
      labelPlacement = "end",
      fullWidth,
      fullHeight,
      checked,
      disableGutters,
      color = "primary",
      sx,
      ...rest
    } = props;

    const { classes, theme, css, cx } = useStyles(
      {
        color,
      },
      {
        props: {
          classes: appClasses,
        },
      }
    );

    return (
      <FormControlLabel
        ref={ref}
        {...rest}
        checked={checked}
        labelPlacement={labelPlacement}
        classes={{
          ...muiClasses,
          label: cx(classes.label, muiClasses?.label),
          labelPlacementStart: cx(
            classes.labelPlacementStart,
            {
              [classes.filledLabelPlacementStart]: variant === "filled",
              [classes.outlinedLabelPlacementStart]: variant === "outlined",
            },
            muiClasses?.labelPlacementStart
          ),
          labelPlacementTop: cx(
            classes.labelPlacementTop,
            {
              [classes.filledLabelPlacementTop]: variant === "filled",
              [classes.outlinedLabelPlacementTop]: variant === "outlined",
            },
            muiClasses?.labelPlacementTop
          ),
          labelPlacementBottom: cx(
            classes.labelPlacementBottom,
            {
              [classes.filledLabelPlacementBottom]: variant === "filled",
              [classes.outlinedLabelPlacementBottom]: variant === "outlined",
            },
            muiClasses?.labelPlacementBottom
          ),
          root: cx(
            {
              [classes.filled]: variant === "filled",
              [classes.outlined]: variant === "outlined",
              [classes.labelPlacementEnd]: labelPlacement === "end",
              [classes.filledLabelPlacementEnd]:
                variant === "filled" && labelPlacement === "end",
              [classes.outlinedLabelPlacementEnd]:
                variant === "outlined" && labelPlacement === "end",
              [classes.fullWidth]: !!fullWidth,
              [classes.fullHeight]: !!fullHeight,
              [classes.checked]: !!checked,
              [classes.disableGutters]: !!disableGutters,
            },
            muiClasses?.root,
            className,
            sx && css(theme.unstable_sx(sx) as any)
          ),
        }}
      />
    );
  }
);

export default AppFormControlLabel;
