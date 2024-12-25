import { forwardRef } from "react";

import { commonHelpers } from "@/utils/helpers";

import AppMenuItem from "@/components/AppMenuItem";

import useStyles from "./AppSelectMenuItem.styles";

import type { AppMenuItemProps } from "@/components/AppMenuItem";

type CustomAppMenuItemProps = {
  disabledCheckedIcon?: boolean;
  native?: boolean;
};

type AppSelectMenuItemProps = Omit<
  AppMenuItemProps,
  keyof CustomAppMenuItemProps
> &
  CustomAppMenuItemProps;

const AppSelectMenuItem = forwardRef(
  (props: AppSelectMenuItemProps, ref: React.ForwardedRef<any>) => {
    const {
      component,
      selected,
      children,
      disabledCheckedIcon,
      classes: muiClasses,
      native,
      ...rest
    } = props;

    const { classes, cx } = useStyles();

    return (
      <AppMenuItem
        ref={ref}
        disableRipple={commonHelpers.isMobile()}
        {...rest}
        selected={selected}
        component={
          native !== false && commonHelpers.isMobile()
            ? "option"
            : component ?? "li"
        }
        classes={{
          ...muiClasses,
          selected: cx(classes.selected, muiClasses?.selected),
        }}
      >
        {children}
      </AppMenuItem>
    );
  }
);

export default AppSelectMenuItem;
