import { forwardRef } from "react";
import AppTypography from "../AppTypography";

import useStyles, { appPaperTitleClasses } from "./AppPaperTitle.styles";

import type { AppTypographyProps } from "../AppTypography";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type CustomAppAppTypographyProps = {
  classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
};

export type AppPaperTitleProps = Omit<
  AppTypographyProps,
  keyof CustomAppAppTypographyProps
> &
  CustomAppAppTypographyProps;

type AppPaperTitleTypeMap<P = {}, D extends React.ElementType = "h6"> = {
  props: P & AppPaperTitleProps;
  defaultComponent: D;
};
type AppPaperTitleComponent = OverridableComponent<AppPaperTitleTypeMap>;

const AppPaperTitle: AppPaperTitleComponent = forwardRef(
  (props: AppPaperTitleProps, ref: React.ForwardedRef<any>) => {
    const { className, classes: appClasses, sx, ...rest } = props;

    const { classes, theme, css, cx } = useStyles(undefined, {
      props: {
        classes: appClasses,
      },
    });

    return (
      <AppTypography
        ref={ref}
        variant="subtitleReg20"
        {...rest}
        className={cx(
          classes.root,
          className,
          appPaperTitleClasses.root,
          sx && css(theme.unstable_sx(sx) as any)
        )}
      />
    );
  }
);

export default AppPaperTitle;
