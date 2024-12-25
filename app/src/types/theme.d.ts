import React from "react";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {}

  interface ZIndex {
    backdrop: number;
    bottomBar: number;
  }

  interface Duration {
    switchMedium: number;
  }

  interface CommonColors {
    darkNeutral: string;
    neutral: string;
    lightNeutral: string;
    lighterNeutral: string;
    lightestNeutral: string;
  }

  interface TypeAction {
    tonalOpacity: number;
  }

  interface TypeBackground {}

  interface FontStyleOptions {
    fontWeightBlack: number;
    fontWeightExtraBold: number;
    fontWeightSemiBold: number;
  }

  interface TypographyVariants {
    captionReg12: React.CSSProperties;
    captionMed12: React.CSSProperties;
    captionSemi12: React.CSSProperties;

    bodyReg14: React.CSSProperties;
    bodyMed14: React.CSSProperties;
    bodySemi14: React.CSSProperties;

    bodyReg16: React.CSSProperties;
    bodyMed16: React.CSSProperties;
    bodySemi16: React.CSSProperties;

    subtitleReg18: React.CSSProperties;
    subtitleMed18: React.CSSProperties;
    subtitleSemi18: React.CSSProperties;

    subtitleReg20: React.CSSProperties;
    subtitleMed20: React.CSSProperties;
    subtitleSemi20: React.CSSProperties;

    titleReg22: React.CSSProperties;
    titleMed22: React.CSSProperties;
    titleSemi22: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    captionReg12?: React.CSSProperties;
    captionMed12?: React.CSSProperties;
    captionSemi12?: React.CSSProperties;

    bodyReg14?: React.CSSProperties;
    bodyMed14?: React.CSSProperties;
    bodySemi14?: React.CSSProperties;

    bodyReg16?: React.CSSProperties;
    bodyMed16?: React.CSSProperties;
    bodySemi16?: React.CSSProperties;

    subtitleReg18?: React.CSSProperties;
    subtitleMed18?: React.CSSProperties;
    subtitleSemi18?: React.CSSProperties;

    subtitleReg20?: React.CSSProperties;
    subtitleMed20?: React.CSSProperties;
    subtitleSemi20?: React.CSSProperties;

    titleReg22?: React.CSSProperties;
    titleMed22?: React.CSSProperties;
    titleSemi22?: React.CSSProperties;
  }

  interface Theme {
    app: {
      shadows: {
        bottomAppBar: string;
        menu: string;
        paper: string;
      };
      sizes: {
        small: number;
        medium: number;
        large: number;
      };
      spacings: {
        gutters: number;
        guttersSmall: number;
      };
      utils: {
        remToPx: (rem: string | number) => number;
      };
    };
  }

  interface ThemeOptions {
    app?: {
      shadows?: {
        bottomAppBar?: string;
        menu?: string;
        paper?: string;
      };
      sizes?: {
        small?: number;
        medium?: number;
        large?: number;
      };
      spacings?: {
        gutters?: number;
        guttersSmall?: number;
      };
      utils?: {
        remToPx?: (rem: string) => number;
      };
    };
  }
}

declare module "@mui/material/styles/createTypography" {
  interface FontStyle
    extends Required<{
      fontWeightBlack?: React.CSSProperties["fontWeight"];
      fontWeightExtraBold?: React.CSSProperties["fontWeight"];
      fontWeightSemiBold?: React.CSSProperties["fontWeight"];
    }> {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    captionReg12: true;
    captionMed12: true;
    captionSemi12: true;

    bodyReg14: true;
    bodyMed14: true;
    bodySemi14: true;

    bodyReg16: true;
    bodyMed16: true;
    bodySemi16: true;

    subtitleReg18: true;
    subtitleMed18: true;
    subtitleSemi18: true;

    subtitleReg20: true;
    subtitleMed20: true;
    subtitleSemi20: true;

    titleReg22: true;
    titleMed22: true;
    titleSemi22: true;

    body1: false;
    body2: false;
    caption: false;
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    overline: false;
    subtitle1: false;
    subtitle2: false;
  }
}
