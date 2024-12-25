import moment from "moment";

import { ClickAwayListener, Popper, Grow, IconButton } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import AppTextField from "@/components/AppTextField";
import AppSvgIcon from "@/components/AppSvgIcon";
import AppPaper from "@/components/AppPaper";
import AppDateCalendar from "@/components/AppDateCalendar";
import AppInputAdornment from "@/components/AppInputAdornment";
import AppIconButton from "@/components/AppIconButton";

import CloseIcon from "@@/public/images/icons/close.svg";
import CalendarMonthIcon from "@@/public/images/icons/calendar-month.svg";

import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  useContext,
} from "react";
import { useTheme } from "@mui/material/styles";
import { useEventCallback, useIsMounted } from "@/hooks";
import { useTranslation } from "next-i18next";

import AppDatePickerContext from "@/components/AppDatePicker/AppDatePicker.context";

import useStyles from "./AppDatePicker.styles";

import type { Moment } from "moment";
import type { AppDateCalendarProps } from "@/components/AppDateCalendar";
import type { AppDatePickerContextValue } from "@/components/AppDatePicker/AppDatePicker.context";
import type { DateFieldProps } from "@mui/x-date-pickers/DateField";
import type { AppTextFieldProps } from "@/components/AppTextField";

class OverriddenAdapterMoment extends AdapterMoment {
  getWeekdays = () => {
    return this.moment.localeData(this.locale).weekdaysShort();
  };
}

type CustomAppDatePicker = {
  disableInput?: boolean;
  disableClearable?: boolean;
  dateCalendarProps?: AppDateCalendarProps;
  slotProps?: {
    textField?: AppTextFieldProps;
  };
  value?: string | null;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: Moment | null
  ) => void;
};

export type AppDatePickerProps = Omit<
  DateFieldProps<Moment>,
  keyof CustomAppDatePicker
> &
  CustomAppDatePicker;

const CalendarPickerPopper = () => {
  const {
    value,
    calendarPickerPopperAnchorEl,
    calendarPickerPopperOpen,
    appDatePickerProps,
    closeCalendarPickerPopper,
    changeValue,
  } = useContext(AppDatePickerContext);

  const { dateCalendarProps, format } = appDatePickerProps;

  const theme = useTheme();

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (calendarPickerPopperAnchorEl) {
      const targetEle = event.target as Element;
      if (calendarPickerPopperAnchorEl.contains(targetEle)) return;
    }
    closeCalendarPickerPopper();
  };

  const handleChange: AppDateCalendarProps["onChange"] = (
    _,
    newValue,
    selectionState
  ) => {
    if (selectionState === "finish") {
      changeValue(moment(newValue, format));
      closeCalendarPickerPopper();
    }
  };

  if (!calendarPickerPopperAnchorEl) return null;

  return (
    <Popper
      open={!!calendarPickerPopperOpen}
      anchorEl={calendarPickerPopperAnchorEl}
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
              <AppDateCalendar
                format={format}
                {...dateCalendarProps}
                dayOfWeekFormatter={(day) => day.format("ddd")}
                value={!!value ? value.format(format) : null}
                onChange={handleChange}
              />
            </AppPaper>
          </Grow>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

const DateTextField = forwardRef((props: any, ref: React.ForwardedRef<any>) => {
  const { InputProps, ownerState, className, onChange, name, ...rest } = props;

  const { appDatePickerProps, toggleCalendarPickerPopper } =
    useContext(AppDatePickerContext);

  const {
    value: dateValue,
    readOnly,
    disabled,
    disableInput,
    disableClearable,
  } = appDatePickerProps;

  const { classes, cx } = useStyles();

  const handleCalendarMonthIconButtonClick = () => {
    toggleCalendarPickerPopper();
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
      disableFormControl
      {...rest}
      readOnly={!!disableInput || !!rest.readOnly}
      name={name}
      className={cx(
        !!dateValue && classes.hasCloseIcon,
        !!disableInput && classes.pointer,
        className
      )}
      endAdornment={
        <AppInputAdornment position="end" sx={{ position: "relative" }}>
          {rest?.endAdornment}
          {!disableClearable && (
            <IconButton
              className={classes.closeIcon}
              size="small"
              sx={{ color: "text.primary", p: 0.5 }}
              onClick={handleRemove}
            >
              <AppSvgIcon component={CloseIcon} fontSize="small" />
            </IconButton>
          )}
          {!readOnly && (
            <AppIconButton
              borderRadius={rest?.borderRadius}
              color="common.darkNeutral"
              edge="end"
              size="small"
              data-role="appDatePicker-toggleCalendarPicker"
              disabled={disabled}
              onClick={handleCalendarMonthIconButtonClick}
            >
              <AppSvgIcon component={CalendarMonthIcon} />
            </AppIconButton>
          )}
        </AppInputAdornment>
      }
      onChange={onChange}
      onClick={(event) => {
        rest?.onClick(event);
        if (!!disableInput) {
          toggleCalendarPickerPopper();
        }
      }}
    />
  );
});

const AppDatePicker = forwardRef(
  (props: AppDatePickerProps, ref: React.ForwardedRef<any>) => {
    const {
      value: controlledValue,
      format = "YYYY-MM-DD",
      dateCalendarProps,
      slotProps,
      minDate,
      maxDate,
      readOnly,
      disableInput,
      disableClearable,
      onChange,
      ...rest
    } = props;

    const [value, setValue] = useState<Moment | null>(() => {
      return !!controlledValue && moment(controlledValue, format).isValid()
        ? moment(controlledValue, format)
        : null;
    });

    const [calendarPickerPopperAnchorEl, setCalendarPickerPopperAnchorEl] =
      useState<HTMLDivElement | null>(null);
    const calendarPickerPopperOpen = !!calendarPickerPopperAnchorEl;

    const { i18n } = useTranslation();

    const curValueRef = useRef(controlledValue);
    const datePickerRef = useRef<HTMLDivElement>(null!);

    const changeValue: AppDatePickerContextValue["changeValue"] = (
      newValue
    ) => {
      const newDateValue =
        !!newValue && moment(newValue).isValid()
          ? newValue.format(format)
          : !!newValue
            ? null
            : "";
      curValueRef.current = newDateValue;
      setValue(newValue);
      !!onChange &&
        onChange(
          {
            target: {
              value: newDateValue,
              name: rest.name,
            },
          } as any,
          newValue
        );
    };

    const handleChange: DateFieldProps<Moment>["onChange"] = (newValue) => {
      changeValue(newValue);
    };

    const toggleCalendarPickerPopper = () => {
      setCalendarPickerPopperAnchorEl(
        !!calendarPickerPopperAnchorEl ? null : datePickerRef.current
      );
    };

    const closeCalendarPickerPopper = () => {
      setCalendarPickerPopperAnchorEl(null);
    };

    const openCalendarPickerPopper = () => {
      setCalendarPickerPopperAnchorEl(datePickerRef.current);
    };

    useImperativeHandle(ref, () => datePickerRef.current, []);

    const updateValue = useEventCallback(() => {
      curValueRef.current = controlledValue;
      const newValue: typeof value =
        !!controlledValue && moment(controlledValue, format).isValid()
          ? moment(controlledValue, format)
          : null;
      setValue(newValue);
    });

    useImperativeHandle(ref, () => datePickerRef.current, []);

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
      <AppDatePickerContext.Provider
        value={{
          value,
          calendarPickerPopperAnchorEl,
          calendarPickerPopperOpen,
          appDatePickerProps: {
            ...props,
            disableInput,
            disableClearable,
            format,
            dateCalendarProps: {
              disableFuture: rest.disableFuture,
              disablePast: rest.disablePast,
              disabled: rest.disabled,
              minDate,
              maxDate,
              shouldDisableDate: rest.shouldDisableDate,
              shouldDisableMonth: rest.shouldDisableMonth,
              shouldDisableYear: rest.shouldDisableYear,
              ...dateCalendarProps,
            },
          },
          changeValue,
          toggleCalendarPickerPopper,
          openCalendarPickerPopper,
          closeCalendarPickerPopper,
        }}
      >
        <LocalizationProvider
          dateAdapter={OverriddenAdapterMoment}
          adapterLocale={i18n.language}
        >
          <DateField
            ref={datePickerRef}
            value={value}
            format={format}
            {...rest}
            readOnly={readOnly}
            slotProps={{
              ...(slotProps as any),
            }}
            slots={{
              textField: DateTextField,
            }}
            minDate={minDate}
            maxDate={maxDate}
            onChange={handleChange}
          />
          <CalendarPickerPopper />
        </LocalizationProvider>
      </AppDatePickerContext.Provider>
    );
  }
);

export default AppDatePicker;
