import { forwardRef, useId } from "react";

import { Swiper } from "swiper/react";
import {
  Pagination,
  Navigation,
  Virtual,
  Autoplay,
  EffectFade,
  Thumbs,
  Controller,
} from "swiper/modules";
import AppSvgIcon from "@/components/AppSvgIcon";
import { Box, ButtonBase } from "@mui/material";

import ArrowLeftIcon from "@@/public/images/icons/arrow-left.svg";
import ArrowRightIcon from "@@/public/images/icons/arrow-right.svg";

import useStyles from "./AppSwiper.styles";

import type { BoxProps } from "@mui/material";
import type { SwiperProps } from "swiper/react";
import type { PaginationOptions, NavigationOptions } from "swiper/types";

type CustomAppSwiperProps = {
  pagination?: PaginationOptions;
  navigation?: NavigationOptions;
  classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
  rootProps?: BoxProps;
};

export type AppSwiperProps = Omit<
  SwiperProps,
  "modules" & keyof CustomAppSwiperProps
> &
  CustomAppSwiperProps;

const AppSwiper = forwardRef(
  (props: AppSwiperProps, ref: React.ForwardedRef<any>) => {
    const {
      pagination,
      navigation,
      speed = 1000,
      classes: appClasses,
      rootProps,
      ...rest
    } = props;

    const id = useId();

    const { classes, cx } = useStyles(undefined, {
      props: {
        classes: appClasses,
      },
    });

    const swiperCustomPaginationClassName = `AppSwiper-customPagination-${id.replaceAll(
      ":",
      ""
    )}`;
    const swiperCustomNavigationNextButtonClassName = `AppSwiper-buttonNext-${id.replaceAll(
      ":",
      ""
    )}`;
    const swiperCustomNavigationPrevButtonClassName = `AppSwiper-buttonPrev-${id.replaceAll(
      ":",
      ""
    )}`;
    const navigationEnabled =
      (typeof navigation === "boolean" && !!navigation) ||
      !!navigation?.enabled;
    const paginationEnabled =
      (typeof pagination === "boolean" && !!pagination) ||
      !!pagination?.enabled;

    return (
      <Box {...rootProps} className={cx(classes.root, rootProps?.className)}>
        <Swiper
          ref={ref}
          {...rest}
          speed={speed}
          navigation={{
            disabledClass: classes.navigationArrowButtonDisabled,
            nextEl: `.${swiperCustomNavigationNextButtonClassName}`,
            prevEl: `.${swiperCustomNavigationPrevButtonClassName}`,
            ...(navigation as any),
            enabled: navigationEnabled,
          }}
          pagination={{
            el: `.${swiperCustomPaginationClassName}`,
            clickable: true,
            renderBullet: function (_: any, className: string) {
              return `<span class="${cx(
                className,
                classes.paginationBullet
              )}"></span>`;
            },
            ...(pagination as any),
          }}
          modules={[
            Pagination,
            Navigation,
            Virtual,
            Autoplay,
            Thumbs,
            EffectFade,
            Controller,
          ]}
          {...rest}
        />
        {!navigation?.prevEl && (
          <ButtonBase
            className={cx(
              swiperCustomNavigationPrevButtonClassName,
              classes.navigationArrow,
              classes.navigationArrowPrev,
              classes.navigationArrowButton,
              !navigationEnabled && classes.hidden
            )}
          >
            <AppSvgIcon component={ArrowLeftIcon} fontSize="inherit" />
          </ButtonBase>
        )}
        {!navigation?.nextEl && (
          <ButtonBase
            className={cx(
              swiperCustomNavigationNextButtonClassName,
              classes.navigationArrow,
              classes.navigationArrowNext,
              classes.navigationArrowButton,
              !navigationEnabled && classes.hidden
            )}
          >
            <AppSvgIcon component={ArrowRightIcon} fontSize="inherit" />
          </ButtonBase>
        )}
        <div
          className={cx(
            swiperCustomPaginationClassName,
            "swiper-pagination",
            classes.pagination,
            !paginationEnabled && classes.hidden
          )}
        />
      </Box>
    );
  }
);

export default AppSwiper;
