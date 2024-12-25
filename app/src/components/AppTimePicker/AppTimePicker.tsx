import moment from "moment";

import {
  ClickAwayListener,
  Popper,
  Grow,
  useEventCallback,
  IconButton,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import AppTextField from "@/components/AppTextField";
import AppSvgIcon from "@/components/AppSvgIcon";
import AppPaper from "@/components/AppPaper";
import AppMultiSectionDigitalClock from "@/components/AppMultiSectionDigitalClock";
import AppInputAdornment from "@/components/AppInputAdornment";
import AppIconButton from "@/components/AppIconButton";

import CloseIcon from "@@/public/images/icons/close.svg";
import TimeIcon from "@@/public/images/icons/time.svg";

import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  useContext,
} from "react";
import { useTheme } from "@mui/material/styles";
import { useIsMounted } from "@/hooks";
import { useTranslation } from "next-i18next";

import AppTimePickerContext from "@/components/AppTimePicker/AppTimePicker.context";

import useStyles from "./AppTimePicker.styles";

import type { Moment } from "moment";
import type { AppMultiSectionDigitalClockProps } from "@/components/AppMultiSectionDigitalClock";
import type { AppTimePickerContextValue } from "@/components/AppTimePicker/AppTimePicker.context";
import type { TimeFieldProps } from "@mui/x-date-pickers/TimeField";
import type { AppTextFieldProps } from "@/components/AppTextField";

class OverriddenAdapterMoment extends AdapterMoment {
  getWeekdays = () => {
    return this.moment.localeData(this.locale).weekdaysShort();
  };
}

type CustomAppTimePicker = {
  multiSectionDigitalClockProps?: AppMultiSectionDigitalClockProps;
  slotProps?: {
    textField?: AppTextFieldProps;
  };
  value?: string | null;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: Moment | null
  ) => void;
};

export type AppTimePickerProps = Omit<
  TimeFieldProps<Moment>,
  keyof CustomAppTimePicker
> &
  CustomAppTimePicker;

const MultiSectionDigitalClockPopper = () => {
  const {
    value,
    multiSectionDigitalClockPopperAnchorEl,
    multiSectionDigitalClockPopperOpen,
    appTimePickerProps,
    closeMultiSectionDigitalClockPopper,
    changeValue,
  } = useContext(AppTimePickerContext);

  const { multiSectionDigitalClockProps, format } = appTimePickerProps;

  const theme = useTheme();

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (multiSectionDigitalClockPopperAnchorEl) {
      const targetEle = event.target as Element;
      if (multiSectionDigitalClockPopperAnchorEl.contains(targetEle)) return;
    }
    closeMultiSectionDigitalClockPopper();
  };

  const handleChange: AppMultiSectionDigitalClockProps["onChange"] = (
    _,
    newValue,
    selectionState
  ) => {
    if (selectionState === "finish") {
      changeValue(moment(newValue, format));
      closeMultiSectionDigitalClockPopper();
    }
  };

  if (!multiSectionDigitalClockPopperAnchorEl) return null;

  return (
    <Popper
      open={!!multiSectionDigitalClockPopperOpen}
      anchorEl={multiSectionDigitalClockPopperAnchorEl}
      placement="bottom-end"
      transition
      keepMounted
      modifiers={[
        {
          name: "flip",
          enabled: true,
        },
        {
          name: "preventOverflow",
          enabled: true,
          options: {
            altAxis: true,
          },
        },
      ]}
      style={{
        zIndex: theme.zIndex.tooltip,
      }}
    >
      {({ TransitionProps, placement }) => (
        <ClickAwayListener onClickAway={handleClose}>
          <Grow
            {...TransitionProps}
            timeout={theme.transitions.duration.shortest}
            style={{
              transformOrigin:
                placement === "bottom-end" ? "100% 0 0" : "100% 100% 0",
            }}
          >
            <AppPaper elevation="menu" sx={{ maxWidth: "100vw" }}>
              <AppMultiSectionDigitalClock
                format={format}
                {...multiSectionDigitalClockProps}
                value={!!value && value.isValid() ? value.format(format) : ""}
                onChange={handleChange}
              />
            </AppPaper>
          </Grow>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

const TimeTextField = forwardRef((props: any, ref: React.ForwardedRef<any>) => {
  const { InputProps, ownerState, className, onChange, name, ...rest } = props;

  const { appTimePickerProps, toggleMultiSectionDigitalClockPopper } =
    useContext(AppTimePickerContext);

  const { value: timeValue, readOnly, disabled } = appTimePickerProps;

  const { classes, cx } = useStyles();

  const handleCalendarIconButtonClick = () => {
    toggleMultiSectionDigitalClockPopper();
  };

  const handleRemove = () => {
    onChange &&
      onChange({
        target: {
          name: name ?? "",
          value: "",
        },
      });
  };

  return (
    <AppTextField
      ref={ref}
      {...rest}
      name={name}
      className={cx(!!timeValue && classes.hasCloseIcon, className)}
      endAdornment={
        <AppInputAdornment position="end">
          {rest?.endAdornment}
          <IconButton
            className={classes.closeIcon}
            size="small"
            sx={{ color: "text.primary", p: 0.5 }}
            onClick={handleRemove}
          >
            <AppSvgIcon component={CloseIcon} fontSize="small" />
          </IconButton>
          {!readOnly && (
            <AppIconButton
              borderRadius={rest?.borderRadius}
              color="text.primary"
              edge="end"
              data-role="appTimePicker-toggleMultiSectionDigitalClock"
              disabled={disabled}
              onClick={handleCalendarIconButtonClick}
            >
              <AppSvgIcon component={TimeIcon} />
            </AppIconButton>
          )}
        </AppInputAdornment>
      }
      onChange={onChange}
    />
  );
});

const AppTimePicker = forwardRef(
  (props: AppTimePickerProps, ref: React.ForwardedRef<any>) => {
    const {
      value: controlledValue,
      format = "HH:mm",
      multiSectionDigitalClockProps,
      slotProps,
      minTime,
      maxTime,
      readOnly,
      onChange,
      ...rest
    } = props;

    const [value, setValue] = useState<Moment | null>(() => {
      return !!controlledValue && moment(controlledValue, format).isValid()
        ? moment(controlledValue, format)
        : null;
    });

    const [
      multiSectionDigitalClockPopperAnchorEl,
      setMultiSectionDigitalClockPopperAnchorEl,
    ] = useState<HTMLDivElement | null>(null);
    const multiSectionDigitalClockPopperOpen =
      !!multiSectionDigitalClockPopperAnchorEl;

    const { i18n } = useTranslation();

    const curValueRef = useRef(controlledValue);
    const timePickerRef = useRef<HTMLDivElement>(null!);

    const changeValue: AppTimePickerContextValue["changeValue"] = (
      newValue
    ) => {
      const newTimeValue =
        !!newValue && moment(newValue).isValid()
          ? newValue.format(format)
          : !!newValue
          ? null
          : "";
      curValueRef.current = newTimeValue;
      setValue(newValue);
      !!onChange &&
        onChange(
          {
            target: {
              value: newTimeValue,
              name: rest.name,
            },
          } as any,
          newValue
        );
    };

    const handleChange: TimeFieldProps<Moment>["onChange"] = (newValue) => {
      changeValue(newValue);
    };

    const toggleMultiSectionDigitalClockPopper = () => {
      setMultiSectionDigitalClockPopperAnchorEl(
        !!multiSectionDigitalClockPopperAnchorEl ? null : timePickerRef.current
      );
    };

    const closeMultiSectionDigitalClockPopper = () => {
      setMultiSectionDigitalClockPopperAnchorEl(null);
    };

    const openMultiSectionDigitalClockPopper = () => {
      setMultiSectionDigitalClockPopperAnchorEl(timePickerRef.current);
    };

    useImperativeHandle(ref, () => timePickerRef.current, []);

    const updateValue = useEventCallback(() => {
      curValueRef.current = controlledValue;
      const newValue: typeof value =
        !!controlledValue && moment(controlledValue, format).isValid()
          ? moment(controlledValue, format)
          : null;
      setValue(newValue);
    });

    useImperativeHandle(ref, () => timePickerRef.current, []);

    useEffect(() => {
      if (controlledValue !== curValueRef.current) {
        updateValue();
      }
    }, [controlledValue]);

    useEffect(() => {
      if (!isMounted()) return;
      updateValue();
    }, [format]);

    const isMounted = useIsMounted();

    return (
      <AppTimePickerContext.Provider
        value={{
          value,
          multiSectionDigitalClockPopperAnchorEl,
          multiSectionDigitalClockPopperOpen,
          appTimePickerProps: {
            ...props,
            format,
            multiSectionDigitalClockProps: {
              disableFuture: rest.disableFuture,
              disablePast: rest.disablePast,
              disabled: rest.disabled,
              minTime,
              maxTime,
              shouldDisableTime: rest.shouldDisableTime,
              ...multiSectionDigitalClockProps,
            },
          },
          changeValue,
          toggleMultiSectionDigitalClockPopper,
          openMultiSectionDigitalClockPopper,
          closeMultiSectionDigitalClockPopper,
        }}
      >
        <LocalizationProvider
          dateAdapter={OverriddenAdapterMoment}
          adapterLocale={i18n.language}
        >
          <TimeField
            ref={timePickerRef}
            value={value}
            format={format}
            {...rest}
            readOnly={readOnly}
            slotProps={{
              ...(slotProps as any),
            }}
            slots={{
              textField: TimeTextField,
            }}
            minTime={minTime}
            maxTime={maxTime}
            onChange={handleChange}
          />
          <MultiSectionDigitalClockPopper />
        </LocalizationProvider>
      </AppTimePickerContext.Provider>
    );
  }
);

export default AppTimePicker;
