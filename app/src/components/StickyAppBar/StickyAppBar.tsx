import { cloneElement, useEffect, useRef, useState } from "react";
import { useEventCallback, useEventListener } from "@/hooks";

import useStyles from "./StickyAppBar.styles";

import type { AppBarProps } from "@mui/material";

export type StickyAppBarProps = {
  thresholdTopEle?: string;
  children: React.ReactNode;
};

const ElevationScroll = (props: StickyAppBarProps) => {
  const { children, thresholdTopEle } = props;

  const [topEleThreshold, setTopEleThreshold] = useState(0);
  const [sticking, setSticking] = useState(false);

  const appBarRef = useRef<HTMLDivElement>(null!);

  const { classes, cx } = useStyles();

  const handleStickyStateUpdate = useEventCallback(() => {
    let newAppBarDistanceFromTop = 0;
    let newTopEleThreshold = 0;
    if (!!thresholdTopEle) {
      const selectedThresholdTopEle = document.querySelector(thresholdTopEle);
      if (!!selectedThresholdTopEle) {
        const { height } = selectedThresholdTopEle.getBoundingClientRect();
        newTopEleThreshold = Math.round(height);
      }
    }

    if (!!appBarRef.current) {
      const { height, bottom } = appBarRef.current.getBoundingClientRect();
      newAppBarDistanceFromTop = Math.round(bottom - height);
    }
    setSticking(newAppBarDistanceFromTop - newTopEleThreshold <= 0);
    if (newTopEleThreshold < 0) return;
    // setTopEleThreshold((prevTopEleThreshold) =>
    //   [0, 1].includes(newTopEleThreshold - prevTopEleThreshold)
    //     ? prevTopEleThreshold
    //     : newTopEleThreshold
    // );
    setTopEleThreshold(newTopEleThreshold);
  });

  useEventListener("scroll", handleStickyStateUpdate);

  useEffect(() => {
    if (!thresholdTopEle) return;
    const selectedThresholdTopEle = document.querySelector(thresholdTopEle);
    if (selectedThresholdTopEle) {
      const resizeObserverThresholdTopEle = new ResizeObserver(
        handleStickyStateUpdate
      );
      resizeObserverThresholdTopEle.observe(selectedThresholdTopEle);

      return () => {
        resizeObserverThresholdTopEle.disconnect();
      };
    }
    return;
  }, [thresholdTopEle]);

  useEffect(() => {
    const appBarEl = appBarRef.current;
    if (!appBarEl) return;
    const resizeObserverAppBar = new ResizeObserver(handleStickyStateUpdate);
    resizeObserverAppBar.observe(appBarEl);

    return () => {
      resizeObserverAppBar.disconnect();
    };
  }, []);

  return cloneElement(
    children as any,
    {
      ref: appBarRef,
      className: cx(
        classes.root,
        sticking && classes?.sticking,
        (children as any).props.className
      ),
      style: {
        top: topEleThreshold,
        ...(children as any).props.style,
      },
    } as AppBarProps
  );
};

const StickyAppBar = (props: StickyAppBarProps) => {
  const { children, ...rest } = props;

  return <ElevationScroll {...rest}>{children}</ElevationScroll>;
};

export default StickyAppBar;
