import { useEffect, useRef } from "react";

import { eventBusService } from "@/services";
import {
  ALERT_DIALOG_CLOSE,
  ALERT_DIALOG_FIRE,
} from "@/utils/constants/eventBus.constants";
import { AlertDialogOptions } from "@/services/alertDialog";
import { isEmpty } from "@/utils/helpers/common";

import AppDialogTitle from "@/components/AppDialogTitle";
import AppDialogContent from "@/components/AppDialogContent";
import AppDialogActions from "@/components/AppDialogActions";
import AppDialog from "@/components/AppDialog";
import AppButton from "@/components/AppButton";

import { useTranslation } from "next-i18next";
import { useEventCallback } from "@/hooks";

import useStyles from "./AlertDialog.styles";

import { useDialogs, type DialogProps } from "@toolpad/core/useDialogs";

type DialogPropsPayload = {
  options: AlertDialogOptions;
  meta?: {
    resolve?: (payload?: any) => void;
  };
};

type AlertDialogRootProps = DialogProps<DialogPropsPayload>;

const AlertDialogRoot = (props: AlertDialogRootProps) => {
  const { payload, open, onClose } = props;

  const { resolve: controlledResolve } = payload?.meta || {};

  const resolveRef = useRef<typeof controlledResolve | null>(controlledResolve);

  const { t } = useTranslation();

  const defaultConfirmButtonProps: Partial<
    AlertDialogOptions["confirmButtonProps"]
  > = {
    show: true,
    children: "OK",
    color: "primary",
    variant: "contained",
    autoFocus: true,
  };
  const defaultCancelButtonProps: Partial<
    AlertDialogOptions["cancelButtonProps"]
  > = {
    show: true,
    children: t("cancel"),
    color: "primary",
    variant: "outlined",
  };

  const {
    alertDialogId,
    title,
    content,
    disabledActions,
    actions,
    confirmButtonProps,
    cancelButtonProps,
  } = {
    ...{
      alertDialogId: "",
      title: "",
      content: "",
      actions: null,
    },
    ...payload?.options,
  };

  const { show: confirmButtonPropsShow, ...otherConfirmButtonProps } = {
    ...defaultConfirmButtonProps,
    ...confirmButtonProps,
  };
  const { show: cancelButtonPropsShow, ...otherCancelButtonProps } = {
    ...defaultCancelButtonProps,
    ...cancelButtonProps,
  };

  const { classes, cx } = useStyles();

  const handleClose = (payload?: any) => {
    onClose && onClose();
    resolveRef.current && resolveRef.current(payload);
  };

  const handleAlertDialogClose = (closedAlertDialogId: any) => {
    if (
      typeof closedAlertDialogId === "undefined" ||
      closedAlertDialogId === alertDialogId
    )
      handleClose();
  };

  const removePromiseMethod = () => {
    resolveRef.current = null;
  };

  useEffect(() => {
    eventBusService.on(ALERT_DIALOG_CLOSE, handleAlertDialogClose);
    return () => {
      eventBusService.remove(ALERT_DIALOG_CLOSE, handleAlertDialogClose);
      removePromiseMethod();
    };
  }, []);

  return (
    <AppDialog
      open={open}
      classes={{
        root: classes.dialog,
      }}
      maxWidth="xs"
      scroll="body"
      onClose={() => handleClose({ isConfirmed: false })}
    >
      {!isEmpty(title) && (
        <AppDialogTitle
          appClasses={{
            title: classes.dialogTitleText,
          }}
        >
          {title}
        </AppDialogTitle>
      )}
      {!isEmpty(content) && <AppDialogContent>{content}</AppDialogContent>}
      {!disabledActions && (
        <AppDialogActions>
          {Array.isArray(actions) ? (
            actions.map((action, actIndex) => (
              <AppButton
                key={actIndex}
                onClick={() =>
                  handleClose({
                    payload: action.payload,
                    name: action.name,
                    isConfirmed: !!action.isConfirmAction,
                  })
                }
                color="text.primary"
                autoFocus
                noWrap
                fullWidth
                {...action.buttonProps}
                className={cx(
                  classes.actionButtonFullWidth,
                  action.buttonProps?.className
                )}
              >
                {action.children}
              </AppButton>
            ))
          ) : actions ? (
            actions
          ) : (
            <>
              {cancelButtonPropsShow && (
                <AppButton
                  noWrap
                  {...otherCancelButtonProps}
                  className={cx(
                    classes.actionButtonFullWidth,
                    otherCancelButtonProps?.className &&
                      otherCancelButtonProps.className
                  )}
                  onClick={() => handleClose({ isConfirmed: false })}
                />
              )}
              {confirmButtonPropsShow && (
                <AppButton
                  noWrap
                  {...otherConfirmButtonProps}
                  className={cx(
                    classes.actionButtonFullWidth,
                    otherConfirmButtonProps?.className &&
                      otherConfirmButtonProps.className
                  )}
                  onClick={() => handleClose({ isConfirmed: true })}
                />
              )}
            </>
          )}
        </AppDialogActions>
      )}
    </AppDialog>
  );
};

const AlertDialog = () => {
  const dialogs = useDialogs();

  const handleAlertDialogOpen = useEventCallback(
    (data: AlertDialogOptions, resolvePromise: any) => {
      dialogs.open(AlertDialogRoot, {
        options: {
          ...data,
          confirmButtonProps: {
            ...data?.confirmButtonProps,
          },
          cancelButtonProps: {
            ...data?.cancelButtonProps,
          },
        },
        meta: {
          resolve: resolvePromise,
        },
      });
    }
  );

  useEffect(() => {
    eventBusService.on(ALERT_DIALOG_FIRE, handleAlertDialogOpen);
    return () => {
      eventBusService.remove(ALERT_DIALOG_FIRE, handleAlertDialogOpen);
    };
  }, []);

  return null;
};

export default AlertDialog;
