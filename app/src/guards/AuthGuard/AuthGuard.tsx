import { localeConfig } from "@/utils/config";

import { Dialog, DialogContent, LinearProgress } from "@mui/material";

import LogoSvg from "@@/public/images/i-media.svg";

import { useEffect, useMemo } from "react";
import { useAppSelector, useAuthUser, useIsMounted } from "@/hooks";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import useStyles from "./AuthGuard.styles";

type AuthGuardProps = {
  children?: any;
  requiredAuth?: boolean;
};

const LoadingFullScreen = (props: {
  loading?: boolean;
  children?: React.ReactNode;
}) => {
  const { loading, children } = props;

  const { classes } = useStyles();

  return (
    <>
      <>
        <Dialog className={classes.loadingDialog} open={!!loading} fullScreen>
          <DialogContent className={classes.loadingDialogContent}>
            <div className={classes.loadingContent}>
              <LogoSvg className={classes.loadingContentLogo} />
              <LinearProgress className={classes.loadingLinearProgress} />
            </div>
          </DialogContent>
        </Dialog>
      </>
      {!loading && children}
    </>
  );
};

const CheckAuth = (props: AuthGuardProps & { loading?: boolean }) => {
  const { requiredAuth, loading } = props;

  const { i18n } = useTranslation();

  const router = useRouter();

  const { hasAuth, authChecking } = useAuthUser();
  const $s_authUserExpiredToken = useAppSelector(
    (state) => state.auth.authUserExpiredToken
  );

  const pathname = router.asPath;

  const unAuthPaths = useMemo(() => {
    const pathResults: string[] = [];
    const locales = ["", ...(localeConfig.locales ?? [])];
    locales.forEach((locale) => {
      ["/sign-in"].forEach((path) => {
        pathResults.push(
          `${!!locale ? `/${locale.toLowerCase()}` : ""}${path}`
        );
      });
    });
    return pathResults;
  }, []);

  useEffect(() => {
    if (
      !authChecking &&
      !loading &&
      !hasAuth &&
      !unAuthPaths.includes(pathname) &&
      requiredAuth
    ) {
      router.push(
        {
          pathname: "/sign-in",
          query: {
            ...router.query,
            redirect_path: window?.location?.pathname,
          },
        },
        undefined,
        {
          locale: i18n.language,
        }
      );
    } else if (
      unAuthPaths.includes(window?.location?.pathname) &&
      !authChecking &&
      hasAuth &&
      isMounted()
    ) {
      router.push(`/appointments`);
    }
  }, [
    hasAuth,
    authChecking,
    pathname,
    i18n.language,
    requiredAuth,
    loading,
    $s_authUserExpiredToken,
  ]);

  const isMounted = useIsMounted();

  return null;
};

const AuthGuard = (props: AuthGuardProps) => {
  const { children, requiredAuth } = props;

  const $s_userAuthChecking = useAppSelector(
    (state) => state.auth.authUserChecking
  );
  const $s_hasAuth = useAppSelector((state) => !!state.auth.authUser?.id);

  const loading = useMemo(() => {
    return $s_userAuthChecking;
  }, [$s_userAuthChecking]);

  return (
    <>
      <CheckAuth {...props} loading={loading} />
      <LoadingFullScreen loading={loading}>
        {(!requiredAuth || !!$s_hasAuth) && children}
      </LoadingFullScreen>
    </>
  );
};

export default AuthGuard;
