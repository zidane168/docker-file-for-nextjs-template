import { NextSeo } from "next-seo";
import { DialogsProvider } from "@toolpad/core/useDialogs";

import { NoSsr } from "@mui/material";
import RouterLoadingLinearProgress from "@/components/RouterLoadingLinearProgress";
import AlertDialog from "@/components/AlertDialog";
import AppToastContainer from "@/components/AppToastContainer";
import LoadingScreenOverlay from "@/components/LoadingScreenOverlay";
import AppInitialize from "@/layouts/RootLayout/components/AppInitialize";
import CheckAuthUser from "@/layouts/RootLayout/components/CheckAuthUser/CheckAuthUser";
import FirebaseNotification from "@/layouts/RootLayout/components/FirebaseNotification";

import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useIsMounted } from "@/hooks";

import type { NextSeoProps } from "next-seo";

export type RootLayoutProps = {
  nextSeoProps?: NextSeoProps;
  children: React.ReactNode;
};

const RootLayout = (props: RootLayoutProps) => {
  const { nextSeoProps, children } = props;

  const [pageRefreshing, setPageRefreshing] = useState(false);

  const { i18n } = useTranslation();

  useEffect(() => {
    if (!isMounted()) return;
    setPageRefreshing(true);
  }, [i18n.language]);

  useEffect(() => {
    if (!isMounted()) return;
    pageRefreshing && setPageRefreshing(false);
  }, [pageRefreshing]);

  const isMounted = useIsMounted();

  return (
    <DialogsProvider>
      <NextSeo {...nextSeoProps} />
      <NoSsr>
        <FirebaseNotification />
        <AppInitialize />
        <CheckAuthUser />
        <RouterLoadingLinearProgress />
        <AlertDialog />
        <AppToastContainer />
        <LoadingScreenOverlay />
      </NoSsr>
      {!pageRefreshing && <>{children}</>}
    </DialogsProvider>
  );
};

export default RootLayout;
