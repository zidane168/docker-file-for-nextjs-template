import { createContext } from "react";

export interface PhoneNumberTextFieldContextValue {
  countryCode?: string;
  countryCodeSelectPopperAnchor: HTMLDivElement | null;
  countryCodeSelectPopperOpen: boolean;
  setCountryCodeSelectPopperOpen: React.Dispatch<boolean>;
  changeCountryCode: (newCountryCode: string) => void;
}

const PhoneNumberTextFieldContext =
  createContext<PhoneNumberTextFieldContextValue>(null!);

export default PhoneNumberTextFieldContext;
