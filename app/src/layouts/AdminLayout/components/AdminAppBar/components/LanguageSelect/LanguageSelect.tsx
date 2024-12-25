import { appStorageService } from "@/services";
import { localeConfig } from "@/utils/config";

import AppSelect from "@/components/AppSelect";
import AppInputAdornment from "@/components/AppInputAdornment";
import AppImage from "@/components/AppImage";
import AppSelectMenuItem from "@/components/AppSelectMenuItem";
import AppIconButton from "@/components/AppIconButton";
import AppMenu from "@/components/AppMenu";
import AppMenuItem from "@/components/AppMenuItem";
import AppTypography from "@/components/AppTypography";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useIsMounted } from "@/hooks";

const LanguageSelect = () => {
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const languageMenuOpen = !!languageMenuAnchorEl;

  const router = useRouter();

  const { i18n } = useTranslation();

  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const locale = event.target.value;
    router.push(router.asPath, undefined, { locale });
    window.NextPublic.lang = locale as any;
    appStorageService.saveCookieLocale(locale);
    setLanguageMenuAnchorEl(null);
  };

  const selectedLanguage =
    localeConfig.localeToConfigMap[i18n.language] ??
    localeConfig.localeToConfigMap["en-US"];

  const handleLanguageMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setLanguageMenuAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchorEl(null);
  };

  useEffect(() => {
    if (!isMounted()) return;
    setLanguageMenuAnchorEl(null);
  }, [isMdDown]);

  const isMounted = useIsMounted();

  if (isMdDown)
    return (
      <>
        <AppIconButton edge="x" onClick={handleLanguageMenuOpen}>
          <AppImage
            src={selectedLanguage?.imageSrc}
            alt={`${selectedLanguage?.label} - language flag`}
            width={24}
            height={24}
            unoptimized
          />
        </AppIconButton>
        <AppMenu
          anchorEl={languageMenuAnchorEl}
          open={languageMenuOpen}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClose={handleLanguageMenuClose}
        >
          {localeConfig.localeConfigs.map((localeConfig) => (
            <AppMenuItem
              selected={localeConfig.locale === i18n.language}
              key={localeConfig.locale}
              value={localeConfig.locale}
              onClick={() =>
                handleLanguageChange({
                  target: {
                    value: localeConfig.locale,
                  },
                } as any)
              }
            >
              {localeConfig.label}
            </AppMenuItem>
          ))}
        </AppMenu>
      </>
    );

  return (
    <AppSelect
      bgColor="common.white"
      value={i18n.language}
      startAdornment={
        <AppInputAdornment position="start">
          <AppImage
            src={selectedLanguage?.imageSrc}
            alt={`${selectedLanguage?.label} - language flag`}
            width={24}
            height={24}
            unoptimized
          />
        </AppInputAdornment>
      }
      renderValue={() => (
        <AppTypography noWrap>{selectedLanguage.label}</AppTypography>
      )}
      onChange={handleLanguageChange as any}
    >
      {localeConfig.localeConfigs.map((localeConfig) => (
        <AppSelectMenuItem
          key={localeConfig.locale}
          value={localeConfig.locale}
        >
          {localeConfig.label}
        </AppSelectMenuItem>
      ))}
    </AppSelect>
  );
};

export default LanguageSelect;
