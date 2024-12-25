import axios from "axios";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";

import { storeAuthAction } from "@/store";
import { alertDialogService, loadingScreenOverlayService } from "@/services";
import { axiosHelpers, reduxHelpers } from "@/utils/helpers";

import AppButton from "@/components/AppButton";
import AppSvgIcon from "@/components/AppSvgIcon";
import AppIconButton from "@/components/AppIconButton";

import LogoutIcon from "@@/public/images/icons/logout.svg";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "next-i18next";
import { useMediaQuery, useTheme } from "@mui/material";

import type { CancelTokenSource } from "axios";

const AccountLogout = () => {
  const signOutSourceRef = useRef<CancelTokenSource | null>(null);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const $s_authAction = useMemo(
    () => bindActionCreators(storeAuthAction, dispatch),
    [dispatch]
  );

  const $s_authUser = useAppSelector((state) => state.auth.authUser);

  const { t } = useTranslation();

  const handleSignOut = async () => {
    const { isConfirmed } = await alertDialogService.fire({
      title: t("signOut"),
      content: t("areYouSureYouWantToSignOut"),
    });

    if (!isConfirmed) return;

    loadingScreenOverlayService.fire(t("pending"));

    signOutSourceRef.current = axios.CancelToken.source();

    const response = await reduxHelpers.callActionWithPromise(
      $s_authAction.signOutSaga,
      {
        cancelToken: signOutSourceRef.current.token,
      }
    );
    if (response.isCancelled) {
      loadingScreenOverlayService.close();
      return;
    }
    if (axiosHelpers.checkRequestSuccess(response)) {
      t("signOutSuccessfully");
      router.push(`/sign-in?redirect_path=${router.asPath}`);
    } else toast.error(response.message);
    loadingScreenOverlayService.close();
  };

  useEffect(() => {
    return () => {
      loadingScreenOverlayService.close();
      signOutSourceRef.current?.cancel && signOutSourceRef.current.cancel();
    };
  }, []);

  if (isMdDown)
    return (
      <AppIconButton edge="x" onClick={handleSignOut}>
        <AppSvgIcon component={LogoutIcon} fontSize="inherit" />
      </AppIconButton>
    );

  return (
    <AppButton
      edge="x"
      endIcon={<AppSvgIcon component={LogoutIcon} fontSize="inherit" />}
      onClick={handleSignOut}
      sx={{
        whiteSpace: "nowrap",
      }}
    >
      {$s_authUser?.username}
    </AppButton>
  );
};

export default AccountLogout;
