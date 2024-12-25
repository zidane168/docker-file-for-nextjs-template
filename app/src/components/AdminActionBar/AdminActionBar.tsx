import { forwardRef } from "react";

import { commonConstants } from "@/utils/constants";

import AppToolbar from "@/components/AppToolbar";
import AppTypography from "@/components/AppTypography";
import StickyAppBar from "@/components/StickyAppBar";

import useStyles from "./AdminActionBar.styles";

import type { AppToolbarProps } from "@/components/AppToolbar";
import type { AppTypographyProps } from "@/components/AppTypography";

export type AdminActionBarProps = {
  title?: React.ReactNode;
  titleTypographyProps?: AppTypographyProps;
  actionNode?: React.ReactNode;
} & AppToolbarProps;

const AdminActionBar = forwardRef(
  (props: AdminActionBarProps, ref: React.ForwardedRef<any>) => {
    const {
      className,
      title,
      titleTypographyProps,
      actionNode,
      children,
      ...rest
    } = props;

    const { classes, cx } = useStyles();

    return (
      <StickyAppBar thresholdTopEle={`#${commonConstants.ADMIN_HEADER_ELE_ID}`}>
        <AppToolbar ref={ref} className={cx(classes.root, className)} {...rest}>
          <AppTypography
            variant="titleMed22"
            textTransform={"capitalize"}
            className={classes.title}
            {...titleTypographyProps}
          >
            {title}
          </AppTypography>
          {!!actionNode && (
            <>
              <div className={classes.actionList}>{actionNode}</div>
            </>
          )}
        </AppToolbar>
      </StickyAppBar>
    );
  }
);

export default AdminActionBar;
