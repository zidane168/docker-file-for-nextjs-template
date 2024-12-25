import { createContext } from "react";

import type { Moment } from "moment";
import type { AppDatePickerProps } from "@/components/AppDatePicker/AppDatePicker";

export interface AppDatePickerContextValue {
  value: Moment | null;
  calendarPickerPopperAnchorEl: HTMLDivElement | null;
  calendarPickerPopperOpen: boolean;
  disabled?: boolean;
  appDatePickerProps: AppDatePickerProps;
  changeValue: (value: Moment | null) => void;
  toggleCalendarPickerPopper: () => void;
  closeCalendarPickerPopper: () => void;
  openCalendarPickerPopper: () => void;
}

const AppDatePickerContext = createContext<AppDatePickerContextValue>(null!);

export default AppDatePickerContext;
