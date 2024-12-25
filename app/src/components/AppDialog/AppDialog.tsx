import { forwardRef } from "react";

import { Dialog } from "@mui/material";

import AppPaper from "@/components/AppPaper";

import useStyles from "./AppDialog.styles";

import type { DialogProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type CustomDialogProps = {
  onClose?: (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | "buttonClick" | ""
  ) => void;
};

export type AppDialogProps = CustomDialogProps &
  Omit<DialogProps, keyof CustomDialogProps>;

type AppDialogTypeMap<P = {}, D extends React.ElementType = "div"> = {
  props: P & AppDialogProps;
  defaultComponent: D;
};
type AppDialogComponent = OverridableComponent<AppDialogTypeMap>;

const AppDialog: AppDialogComponent = forwardRef(
  (props: AppDialogProps, ref: React.ForwardedRef<any>) => {
    const { classes: muiClasses, ...rest } = props;

    const { classes, cx } = useStyles();

    return (
      <Dialog
        ref={ref}
        PaperComponent={AppPaper as any}
        {...rest}
        classes={{
          ...muiClasses,
          paperFullScreen: cx(
            classes.paperFullScreen,
            muiClasses?.paperFullScreen
          ),
          scrollBody: cx(classes.scrollBody, muiClasses?.scrollBody),
        }}
      />
    );
  }
);

export default AppDialog;
