import { forwardRef } from "react";

import { TablePagination } from "@mui/material";
import AppSvgIcon from "../AppSvgIcon";

import KeyboardArrowDown from "@@/public/images/icons/keyboard-arrow-down.svg";

import useStyles from "./AppTablePagination.styles";

import type { TablePaginationProps } from "@mui/material";

type CustomAppTablePaginationProps = {};

export type AppTablePaginationProps = Omit<
  TablePaginationProps,
  keyof CustomAppTablePaginationProps
> &
  CustomAppTablePaginationProps;

const SelectArrowIcon = forwardRef(
  (props: any, ref: React.ForwardedRef<any>) => {
    return (
      <AppSvgIcon
        ref={ref}
        {...props}
        component={KeyboardArrowDown}
        fontSize="inherit"
      />
    );
  }
);

const AppTablePagination = forwardRef(
  (props: AppTablePaginationProps, ref: React.ForwardedRef<any>) => {
    const { slotProps, ...rest } = props;

    const { classes, cx } = useStyles();

    return (
      <TablePagination
        ref={ref}
        {...rest}
        slotProps={{
          ...slotProps,
          select: {
            variant: "outlined",
            IconComponent: SelectArrowIcon,
            ...slotProps?.select,
            classes: {
              ...slotProps?.select?.classes,
              root: cx(classes.select, slotProps?.select?.classes?.root),
            },
            slotProps: {
              ...slotProps?.select?.slotProps,
            },
            MenuProps: {
              ...slotProps?.select?.MenuProps,
              classes: {
                ...slotProps?.select?.MenuProps?.classes,
                paper: cx(
                  classes.selectMenuPaper,
                  slotProps?.select?.MenuProps?.classes?.paper
                ),
                list: cx(
                  classes.selectMenuList,
                  slotProps?.select?.MenuProps?.classes?.list
                ),
              },
            },
          },
        }}
      />
    );
  }
);

export default AppTablePagination;
