import { useState, useRef, useEffect } from "react";

import eventBusService from "@/services/eventBus";
import {
  LOADING_SCREEN_OVERLAY_CLOSE,
  LOADING_SCREEN_OVERLAY_FIRE,
} from "@/utils/constants/eventBus.constants";

import { Backdrop } from "@mui/material";
import AppLoading from "@/components/AppLoading";
import AppTypography from "@/components/AppTypography";

import useStyles from "./LoadingScreenOverlay.styles";

import type { LoadingScreenOverlayOptions } from "@/services/loadingScreenOverlay";

const LoadingScreenOverlay = () => {
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<LoadingScreenOverlayOptions>({
    content: "",
  });
  const resolveRef = useRef(null);
  const rejectRef = useRef(null);

  const fire = (
    data: LoadingScreenOverlayOptions,
    resolveFromPromise: any,
    rejectFromPromise: any
  ) => {
    resolveRef.current = resolveFromPromise;
    rejectRef.current = rejectFromPromise;
    setOptions({
      ...options,
      ...data,
    });
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    eventBusService.on(LOADING_SCREEN_OVERLAY_FIRE, fire);
    eventBusService.on(LOADING_SCREEN_OVERLAY_CLOSE, close);
    return () => {
      eventBusService.remove(LOADING_SCREEN_OVERLAY_FIRE, fire);
      eventBusService.remove(LOADING_SCREEN_OVERLAY_CLOSE, close);
    };
  }, []);

  return (
    <Backdrop className={classes.root} open={open}>
      <div className={classes.content}>
        <AppLoading
          variant="circularLogo"
          className={classes.loadingIcon}
          color="gradient"
          size={100}
        />
        {options.content && (
          <AppTypography color="common.white">{options.content}</AppTypography>
        )}
      </div>
    </Backdrop>
  );
};

export default LoadingScreenOverlay;
