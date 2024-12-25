import getCountryFlag from "country-flag-icons/unicode";

import { countryCodes } from "@/utils/constants/countryCode.constants";
import { commonConfig } from "@/utils/config";

import { Box, ClickAwayListener, Popper } from "@mui/material";
import AppInputAdornment from "@/components/AppInputAdornment";
import PhoneNumberTextFieldContext from "@/components/PhoneNumberTextField/PhoneNumberTextField.context";
import AutocompleteListboxVirtualization from "@/components/AutocompleteListboxVirtualization";
import PhoneNumberFormat from "@/components/PhoneNumberFormat";
import AppAutocomplete from "@/components/AppAutocomplete";
import AppTypography from "@/components/AppTypography";
import AppPaper from "@/components/AppPaper";
import AppButton from "@/components/AppButton";
import AppSvgIcon from "@/components/AppSvgIcon";
import AppTextField from "@/components/AppTextField";

import ArrowDropdownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";

import useStyles from "./PhoneNumberTextField.styles";

import type { AppTextFieldProps } from "@/components/AppTextField";

export type CustomPhoneNumberTextFieldProps = {
  phoneNumberFieldName?: string;
  phoneNumber?: string;
  countryCodeFieldName?: string;
  countryCode?: string;
  onPhoneNumberChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    phone: string
  ) => void;
  onCountryCodeChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    countryCode: string
  ) => void;
};

export type PhoneNumberTextFieldProps = Omit<
  AppTextFieldProps,
  "inputComponent" | "inputProps" | keyof CustomPhoneNumberTextFieldProps
> &
  CustomPhoneNumberTextFieldProps;

const CountryCodeSelectPopper = () => {
  const {
    countryCode,
    countryCodeSelectPopperAnchor,
    countryCodeSelectPopperOpen,
    setCountryCodeSelectPopperOpen,
    changeCountryCode,
  } = useContext(PhoneNumberTextFieldContext);

  const { theme, classes } = useStyles();

  const { t } = useTranslation();

  const setFixedWidth = (data: any) => {
    if (countryCodeSelectPopperAnchor) {
      const clientWidth = countryCodeSelectPopperAnchor.clientWidth;
      if (clientWidth) {
        data.state.styles.popper.width =
          clientWidth < 320 ? `${clientWidth}px` : "320px";
      }
    }
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (countryCodeSelectPopperAnchor) {
      const targetEle = event.target as Element;
      if (countryCodeSelectPopperAnchor.contains(targetEle)) return;
    }
    setCountryCodeSelectPopperOpen(false);
  };

  if (!countryCodeSelectPopperAnchor) return null;

  return (
    <Popper
      open={!!countryCodeSelectPopperOpen}
      anchorEl={countryCodeSelectPopperAnchor}
      placement="bottom-start"
      modifiers={[
        {
          name: "fixedWidth",
          enabled: true,
          fn: setFixedWidth,
          phase: "beforeWrite",
          options: {
            order: 840,
          },
        },
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
      <ClickAwayListener onClickAway={handleClose}>
        <AppPaper elevation="menu" sx={{ overflow: "clip" }}>
          <AppAutocomplete
            classes={{
              root: classes.countryCodeAutocomplete,
              popper: classes.countryCodeAutocompletePopper,
            }}
            fullWidth
            defaultInputProps={{
              placeholder: `${t("search")}...`,
              autoFocus: true,
            }}
            open
            forcePopupIcon={false}
            options={countryCodes}
            PaperComponent={Box}
            ListboxComponent={AutocompleteListboxVirtualization as any}
            renderOption={(props, option) => [
              {
                ...props,
                selected: option.number === countryCode,
              },
              (
                <AppTypography
                  component="div"
                  display="flex"
                  alignItems="center"
                  whiteSpace="pre-wrap"
                  width="100%"
                  gap={1}
                  variant={option.number === countryCode ? "body1" : "body1"}
                >
                  <AppTypography variant="inherit" fontSize={20} lineHeight={1}>
                    {getCountryFlag(option?.code)}
                  </AppTypography>
                  <AppTypography variant="inherit" flex={1} noWrap>
                    {option?.name}
                  </AppTypography>
                  <AppTypography variant="inherit">
                    {option?.dial_code}
                  </AppTypography>
                </AppTypography>
              ) as React.ReactNode,
            ]}
            getOptionLabel={(option: any) =>
              `${option?.code} ${option?.name} ${option?.dial_code}`
            }
            onClose={(_, reason) => {
              if (reason === "escape") {
                setCountryCodeSelectPopperOpen(false);
              }
            }}
            onChange={(_: any, newValue) => {
              if (!newValue) return;
              changeCountryCode(newValue.number);
              setCountryCodeSelectPopperOpen(false);
            }}
            disablePortal
            disableClearable
          />
        </AppPaper>
      </ClickAwayListener>
    </Popper>
  );
};

const PhoneNumberTextField = (props: PhoneNumberTextFieldProps) => {
  const {
    name,
    phoneNumberFieldName,
    phoneNumber,
    countryCodeFieldName,
    countryCode = commonConfig.DEFAULT_PHONE_COUNTRY_CODE,
    disabled,
    readOnly,
    startAdornment,
    onChange,
    onCountryCodeChange,
    onPhoneNumberChange,
    ...rest
  } = props;

  const [countryCodeSelectPopperAnchor, setCountryCodeSelectPopperAnchor] =
    useState<HTMLDivElement | null>(null);
  const [countryCodeSelectPopperOpen, setCountryCodeSelectPopperOpen] =
    useState(false);

  const textFieldRef = useRef<HTMLDivElement>(null!);

  const { classes, cx } = useStyles();

  const changeCountryCode = (newCountryCode: string) => {
    onCountryCodeChange &&
      onCountryCodeChange(
        {
          target: {
            name: countryCodeFieldName ?? "",
            value: newCountryCode,
          },
        } as any,
        newCountryCode
      );
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onPhoneNumberChange &&
      onPhoneNumberChange(
        {
          target: {
            name: phoneNumberFieldName ?? "",
            value: event.target.value,
          },
        } as any,
        event.target.value
      );
    onChange && onChange(event);
  };

  const handleCountryCodeSelectToggle = () => {
    if (disabled || readOnly) return;
    setCountryCodeSelectPopperAnchor(textFieldRef.current);
    setCountryCodeSelectPopperOpen(!countryCodeSelectPopperOpen);
  };

  useEffect(() => {
    if (!!readOnly || !!disabled) {
      setCountryCodeSelectPopperOpen(false);
    }
  }, [readOnly, disabled]);

  return (
    <PhoneNumberTextFieldContext.Provider
      value={{
        countryCode,
        countryCodeSelectPopperAnchor,
        countryCodeSelectPopperOpen,
        setCountryCodeSelectPopperOpen,
        changeCountryCode,
      }}
    >
      <AppTextField
        ref={textFieldRef}
        type="tel"
        {...rest}
        disabled={disabled}
        readOnly={readOnly}
        name={name}
        inputComponent={PhoneNumberFormat}
        inputProps={{
          countryCode,
        }}
        startAdornment={
          <>
            <AppInputAdornment position="start">
              <AppButton
                disableRipple={!!disabled || !!readOnly}
                disableTouchRipple={!!disabled || !!readOnly}
                disabled={!!disabled}
                variant="text"
                edge="x"
                color="text.primary"
                endIcon={
                  !disabled &&
                  !readOnly && (
                    <AppSvgIcon
                      className={cx(
                        classes.arrowDropdownIcon,
                        countryCodeSelectPopperOpen && classes.rotated
                      )}
                      component={ArrowDropdownIcon}
                      fontSize="inherit"
                      color="inherit"
                    />
                  )
                }
                sx={{
                  cursor: !!disabled || !!readOnly ? "auto" : undefined,
                }}
                onClick={handleCountryCodeSelectToggle}
              >
                +{countryCode}
              </AppButton>
            </AppInputAdornment>
            {startAdornment}
          </>
        }
        value={phoneNumber}
        onChange={handlePhoneChange}
      />
      <CountryCodeSelectPopper />
    </PhoneNumberTextFieldContext.Provider>
  );
};

export default PhoneNumberTextField;
