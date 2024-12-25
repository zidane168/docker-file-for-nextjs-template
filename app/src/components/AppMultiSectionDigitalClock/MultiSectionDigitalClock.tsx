import { forwardRef, useEffect, useRef, useState } from "react";

import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import AppButton, { AppButtonProps } from "@/components/AppButton";

import { useTranslation } from "next-i18next";
import {
  useAppMomentWithLocale,
  useEventCallback,
  useIsMounted,
} from "@/hooks";

import useStyles from "./MultiSectionDigitalClock.styles";

import type { Moment } from "moment";
import type { MultiSectionDigitalClockProps } from "@mui/x-date-pickers";
import type { PickerSelectionState } from "@mui/x-date-pickers/internals";
import type { DateOrTimeViewWithMeridiem } from "@mui/x-date-pickers/internals/models";

type CustomAppMultiSectionDigitalClockSlotProps = {
  digitalClockSectionItem?: AppButtonProps & { selected?: boolean };
};

type CustomAppMultiSectionDigitalClockProps = {
  format?: string;
  name?: string;
  value?: any;
  slotProps?: Omit<
    MultiSectionDigitalClockProps<Moment>["slotProps"],
    keyof CustomAppMultiSectionDigitalClockSlotProps
  > &
    CustomAppMultiSectionDigitalClockSlotProps;
  onChange?: (
    event: {
      target: {
        name: string;
        value: any;
      };
    },
    value: string | string[],
    selectionState?: PickerSelectionState,
    selectedView?: DateOrTimeViewWithMeridiem
  ) => void;
};

export type AppMultiSectionDigitalClockProps = Omit<
  MultiSectionDigitalClockProps<Moment>,
  keyof CustomAppMultiSectionDigitalClockProps
> &
  CustomAppMultiSectionDigitalClockProps;

class OverriddenAdapterMoment extends AdapterMoment {}

const AppDigitalClockSectionItem = forwardRef(
  (
    props: NonNullable<
      CustomAppMultiSectionDigitalClockSlotProps["digitalClockSectionItem"]
    >,
    ref: React.ForwardedRef<any>
  ) => {
    const { selected, className, classes: muiClasses, sx, ...rest } = props;

    const { classes, theme, css, cx } = useStyles();

    return (
      <AppButton
        ref={ref}
        size="small"
        fullWidth
        {...rest}
        classes={{
          ...muiClasses,
          root: cx(
            classes.digitalClockSectionItem,
            muiClasses?.root,
            className,
            !!selected && classes.selected,
            sx && css(theme.unstable_sx(sx) as any)
          ),
          disabled: cx(classes.disabled, muiClasses?.disabled),
        }}
      />
    );
  }
);

const AppMultiSectionDigitalClock = forwardRef(
  (props: AppMultiSectionDigitalClockProps, ref: React.ForwardedRef<any>) => {
    const {
      className,
      slots,
      slotProps,
      value: controlledValue,
      name = "",
      format = "HH:mm",
      classes: muiClasses,
      sx,
      timeSteps,
      onChange,
      ...rest
    } = props;

    const { momentWithLocale } = useAppMomentWithLocale();

    const [value, setValue] = useState(() => {
      const controlledValueMoment = momentWithLocale(controlledValue, format);
      return controlledValueMoment?.isValid() ? controlledValueMoment : null;
    });
    const curControlledValueRef = useRef(controlledValue);

    const { classes, theme, cx, css } = useStyles();

    const { i18n } = useTranslation();

    const handleChange: MultiSectionDigitalClockProps<Moment>["onChange"] = (
      valueMoment,
      selectionState,
      selectedView
    ) => {
      const newValue = !!valueMoment ? valueMoment!.format(format) : "";
      curControlledValueRef.current = newValue;
      setValue(valueMoment);
      onChange &&
        onChange(
          {
            target: {
              name,
              value: newValue,
            },
          },
          valueMoment as any,
          selectionState,
          selectedView
        );
    };

    const updateValue = useEventCallback(() => {
      const controlledValueMoment = momentWithLocale(controlledValue, format);
      curControlledValueRef.current = controlledValue;
      setValue(controlledValueMoment.isValid() ? controlledValueMoment : null);
    });

    useEffect(() => {
      if (controlledValue !== curControlledValueRef.current) {
        updateValue();
      }
    }, [controlledValue]);

    useEffect(() => {
      if (!isMounted()) return;
      updateValue();
    }, [format]);

    const isMounted = useIsMounted();

    return (
      <LocalizationProvider
        dateAdapter={OverriddenAdapterMoment}
        adapterLocale={i18n.language}
      >
        <MultiSectionDigitalClock
          ref={ref}
          className={cx(classes.root, className)}
          ampm={false}
          views={["hours", "minutes"]}
          {...rest}
          timeSteps={{
            minutes: 1,
            seconds: 1,
            ...timeSteps,
          }}
          classes={{
            ...muiClasses,
            root: cx(
              classes.root,
              muiClasses?.root,
              className,
              !!sx && css(theme.unstable_sx(sx) as any)
            ),
          }}
          slots={{
            digitalClockSectionItem: AppDigitalClockSectionItem,
          }}
          value={value}
          onChange={handleChange}
        />
      </LocalizationProvider>
    );
  }
);

export default AppMultiSectionDigitalClock;
