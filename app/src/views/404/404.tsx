import AppButton from "@/components/AppButton";
import AppContainer from "@/components/AppContainer";
import AppLink from "@/components/AppLink";
import AppTypography from "@/components/AppTypography";

import PageNotFoundSvg from "@@/public/images/svgs/404.svg";

import { useTranslation } from "next-i18next";

import useStyles from "./404.styles";

const _404 = () => {
  const { classes } = useStyles();

  const { t } = useTranslation();

  return (
    <AppContainer className={classes.root} maxWidth="sm">
      <PageNotFoundSvg className={classes.pageNotFoundSvg} />
      <AppTypography variant="titleMed20" color="text.secondary" mb={1.25}>
        {t("sorry")}!
      </AppTypography>
      <AppTypography variant="titleMed20" color="text.secondary" mb={3.75}>
        {t("pageNotFound")}
      </AppTypography>
      <AppButton
        variant="contained"
        fullWidth
        component={AppLink}
        href="/appointments"
        hoverColor="none"
        underline="none"
      >
        {t("goToHome")}
      </AppButton>
    </AppContainer>
  );
};

export default _404;
