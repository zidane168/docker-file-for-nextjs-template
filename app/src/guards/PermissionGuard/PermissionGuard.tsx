import AppButton from "@/components/AppButton";
import AppLink from "@/components/AppLink";
import AppTypography from "@/components/AppTypography";

import RoadBlockSvg from "@@/public/images/svgs/roadblock.svg";

import { usePermission } from "@/hooks";
import { useTranslation } from "next-i18next";

import useStyles from "./PermissionGuard.styles";

type PermissionGuardProps = {
  name: string | string[];
  children: React.ReactNode;
};

const PermissionDenied = () => {
  const { classes } = useStyles();

  const { t } = useTranslation();

  return (
    <div className={classes.permissionDenied}>
      <RoadBlockSvg className={classes.roadBlockSvg} />
      <AppTypography variant="titleMed22" mb={6}>
        {t("accessDenied")}
      </AppTypography>
      <AppButton
        variant="contained"
        component={AppLink}
        href="/"
        hoverColor="none"
        underline="none"
      >
        {t("goToHome")}
      </AppButton>
    </div>
  );
};

const PermissionGuard = (props: PermissionGuardProps) => {
  const { children, name } = props;
  const { canAccess, loading } = usePermission();

  return (
    <>{loading ? <></> : canAccess(name) ? children : <PermissionDenied />}</>
  );
};

export default PermissionGuard;
