import { storageService } from "@/services";

import { Component } from "react";
import AppButton from "@/components/AppButton";
import AppContainer from "@/components/AppContainer";
import AppLink from "@/components/AppLink";
import AppTypography from "@/components/AppTypography";

import PageErrorSvg from "@@/public/images/svgs/dizzy-robot.svg";

import { withTranslation } from "next-i18next";

import { withStyles } from "tss-react/mui";

import type { WithTranslation } from "react-i18next";
import type { Theme } from "@mui/material";
import type { CSSObject } from "tss-react";

interface Props extends WithTranslation<"common"> {
  children?: React.ReactNode;
  classes?: Partial<ReturnType<typeof styles>>;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    console.error("Uncaught error:", error.message);
    storageService.clearLocal();
    storageService.clearSession();
  }

  // public handleGoToHome() {
  //   if (typeof window === "undefined") return;
  //   if (window.location.pathname === "/") window.location.reload();
  // }

  public render() {
    const { children, t } = this.props;
    const classes = withStyles.getClasses(this.props);

    if (this.state.hasError) {
      return (
        <AppContainer className={classes.root} maxWidth="sm">
          <PageErrorSvg className={classes.pageErrorSvg} />
          <AppTypography variant="titleMed22" mb={6}>
            {t("500error")}
          </AppTypography>
          <AppButton
            variant="contained"
            fullWidth
            component={AppLink}
            href="/"
            hoverColor="none"
            underline="none"
          >
            {t("goToHome")}
          </AppButton>
        </AppContainer>
      );
    }

    return children;
  }
}

const styles = (theme: Theme) => {
  return {
    root: {
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column" as any,
      alignItems: "center",
      justifyContent: "center",
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    } as CSSObject,
    pageErrorSvg: {
      height: 140,
      marginBottom: theme.spacing(3),
    } as CSSObject,
  };
};

const ErrorBoundaryStyled = withStyles(ErrorBoundary, styles, {
  name: "ErrorBoundary",
});

const ErrorBoundaryStyledWithTranslation =
  withTranslation()(ErrorBoundaryStyled);

export default ErrorBoundaryStyledWithTranslation;
