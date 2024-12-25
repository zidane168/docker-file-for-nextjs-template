import { forwardRef } from "react";

import { commonHelpers } from "@/utils/helpers";

import { Checkbox } from "@mui/material";

import AppSvgIcon from "@/components/AppSvgIcon";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

import useStyles from "./AppCheckbox.styles";

import type { CheckboxProps } from "@mui/material";

type CheckboxColor = "primary" | "secondary" | "inherit" | AppThemeColor;
type CheckboxEdge = "start" | "end" | "top" | "bottom" | "x" | "y" | "xy";

type CustomAppCheckbox = {
  color?: CheckboxColor;
  checkedIconColor?: CheckboxColor;
  edge?: CheckboxEdge | CheckboxEdge[];
};

export type AppCheckboxProps = CustomAppCheckbox &
  Omit<CheckboxProps, "size" | keyof CustomAppCheckbox>;

const AppCheckbox = forwardRef(
  (props: AppCheckboxProps, ref: React.ForwardedRef<any>) => {
    const {
      color = "primary",
      checkedIconColor = "primary",
      edge,
      classes: muiClasses,
      ...rest
    } = props;

    const { classes, cx } = useStyles({ color, checkedIconColor });

    const edges = Array.isArray(edge)
      ? edge
      : !commonHelpers.isEmpty(edge)
      ? [edge!]
      : [];

    const rootClasses = cx(classes.root, {
      [classes.edgeStart]: edges.includes("start"),
      [classes.edgeEnd]: edges.includes("end"),
      [classes.edgeTop]: edges.includes("top"),
      [classes.edgeBottom]: edges.includes("bottom"),
      [classes.edgeX]: edges.includes("x"),
      [classes.edgeY]: edges.includes("y"),
      [classes.edgeXY]: edges.includes("xy"),
    });

    return (
      <Checkbox
        classes={{
          ...muiClasses,
          root: cx(rootClasses, muiClasses?.root),
          checked: cx(classes.checked, muiClasses?.checked),
          indeterminate: cx(classes.indeterminate, muiClasses?.indeterminate),
        }}
        ref={ref}
        icon={
          <AppSvgIcon
            className={classes.icon}
            component={CheckBoxOutlineBlankIcon}
          />
        }
        checkedIcon={
          <AppSvgIcon
            className={cx(classes.icon, classes.checkedIcon)}
            component={CheckBoxIcon}
          />
        }
        indeterminateIcon={
          <AppSvgIcon
            className={classes.icon}
            component={IndeterminateCheckBoxIcon}
          />
        }
        {...rest}
        size="medium"
      />
    );
  }
);

export default AppCheckbox;
