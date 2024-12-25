import { createContext } from "react";

import type { Moment } from "moment";
import type { AppTimePickerProps } from "@/components/AppTimePicker/AppTimePicker";

export interface AppTimePickerContextValue {
  value: Moment | null;
  multiSectionDigitalClockPopperAnchorEl: HTMLDivElement | null;
  multiSectionDigitalClockPopperOpen: boolean;
  disabled?: boolean;
  appTimePickerProps: AppTimePickerProps;
  changeValue: (value: Moment | null) => void;
  toggleMultiSectionDigitalClockPopper: () => void;
  closeMultiSectionDigitalClockPopper: () => void;
  openMultiSectionDigitalClockPopper: () => void;
}

const AppTimePickerContext = createContext<AppTimePickerContextValue>(null!);

export default AppTimePickerContext;
