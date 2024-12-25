import { forwardRef } from "react";

import { commonHelpers } from "@/utils/helpers";

import { Radio } from "@mui/material";

import AppSvgIcon from "@/components/AppSvgIcon";

import CheckCircleIcon from "@@/public/images/icons/check-circle.svg";
import RadioButtonUncheckedIcon from "@@/public/images/icons/radio-button-unchecked.svg";

import useStyles from "./AppRadio.styles";

import type { RadioProps } from "@mui/material";

type RadioColor = "primary" | "secondary" | "inherit" | AppThemeColor;
type RadioEdge = "start" | "end" | "top" | "bottom" | "x" | "y" | "xy";

type CustomAppRadio = {
  color?: RadioColor;
  checkedIconColor?: RadioColor;
  edge?: RadioEdge | RadioEdge[];
};

type AppRadioProps = CustomAppRadio &
  Omit<RadioProps, "size" | keyof CustomAppRadio>;

const AppRadio = forwardRef(
  (props: AppRadioProps, ref: React.ForwardedRef<any>) => {
    const {
      color = "primary",
      checkedIconColor = "primary",
      edge,
      classes: muiClasses,
      ...rest
    } = props;

    const { classes, cx } = useStyles({
      color,
      checkedIconColor,
    });

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
      <Radio
        classes={{
          ...muiClasses,
          root: cx(rootClasses, muiClasses?.root),
        }}
        ref={ref}
        icon={
          <AppSvgIcon
            className={classes.icon}
            component={RadioButtonUncheckedIcon}
          />
        }
        checkedIcon={
          <AppSvgIcon
            className={cx(classes.icon, classes.checkedIcon)}
            component={CheckCircleIcon}
          />
        }
        {...rest}
        size="medium"
      />
    );
  }
);

export default AppRadio;
