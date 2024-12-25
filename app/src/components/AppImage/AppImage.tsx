import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";

import { commonConfig } from "@/utils/config";
import { imageHelpers } from "@/utils/helpers";

import Image from "next/image";

import { useEventCallback, useIsMounted } from "@/hooks";

import useStyles from "./AppImage.styles";

import type { ImageProps } from "next/image";
import type { SxProps } from "@mui/material";

type CustomAppImageProps = {
  objectFit?: "fill" | "contain" | "cover" | "scale-down" | "none" | string;
  objectPosition?: string;
  defaultImgSrc?: ImageProps["src"];
  defaultPlaceholderVariant?: "default" | "shimmer" | "none";
  src?: ImageProps["src"];
  alt?: string;
  sx?: SxProps;
};

export type AppImageProps = Omit<ImageProps, keyof CustomAppImageProps> &
  CustomAppImageProps;

const AppImage = forwardRef(
  (props: AppImageProps, ref: React.ForwardedRef<any>) => {
    const {
      className,
      src,
      width,
      height,
      defaultImgSrc = imageHelpers.generateEncodedErrorImageSvg(),
      alt,
      objectFit,
      objectPosition,
      unoptimized,
      placeholder: controlledPlaceholder,
      defaultPlaceholderVariant = "default",
      sx,
      loader,
      onError,
      ...rest
    } = props;

    const [imgSrc, setImgSrc] = useState<ImageProps["src"]>(
      src || defaultImgSrc
    );
    const [isErrorImg, setIsErrorImg] = useState(!src);

    const { classes, theme, css, cx } = useStyles({
      objectFit,
      objectPosition,
      width,
      height,
    });

    const placeholder = useMemo(() => {
      const defaultPlaceholderVariantMap = {
        shimmer: imageHelpers.generateEncodedShimmerSvg(),
        default: imageHelpers.generateEncodedShimmerSvg(),
        none: undefined,
      };
      return (
        controlledPlaceholder ??
        defaultPlaceholderVariantMap[defaultPlaceholderVariant!]
      );
    }, [controlledPlaceholder, defaultPlaceholderVariant, width, height]);

    const handleError = useCallback(
      (event: React.SyntheticEvent<HTMLImageElement>) => {
        setIsErrorImg(true);
        setImgSrc(defaultImgSrc);
        onError && onError(event);
      },
      [defaultImgSrc]
    );

    const handleLoader = useMemo(() => {
      if (!!isErrorImg) {
        return () => {
          return defaultImgSrc;
        };
      }

      return loader;
    }, [loader, isErrorImg, defaultImgSrc]);

    const updateImgSrc = useEventCallback(() => {
      setImgSrc(src! || defaultImgSrc);
      setIsErrorImg(!src);
    });

    useEffect(() => {
      if (!isMounted()) return;
      updateImgSrc();
    }, [src]);

    const isMounted = useIsMounted();

    return (
      <Image
        ref={ref}
        {...rest}
        placeholder={placeholder as any}
        unoptimized={isErrorImg ? true : unoptimized}
        loader={handleLoader as any}
        width={width}
        height={height}
        className={cx(
          classes.root,
          classes.img,
          isErrorImg && classes.errorImg,
          className,
          sx && css(theme.unstable_sx(sx) as any)
        )}
        src={imgSrc}
        alt={alt || commonConfig.DOCUMENT_TITLE}
        onError={handleError}
      />
    );
  }
);

export default AppImage;
