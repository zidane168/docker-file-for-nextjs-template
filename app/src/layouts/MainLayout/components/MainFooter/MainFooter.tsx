import { envConfig } from "@/utils/config";

import Grid from "@mui/material/Grid2";
import AppLink from "@/components/AppLink";
import AppImage from "@/components/AppImage";
import AppContainer from "@/components/AppContainer";
import AppTypography from "@/components/AppTypography";

import { useTranslation } from "next-i18next";

import useStyles from "./MainFooter.styles";

const MainFooter = () => {
  const { classes } = useStyles();

  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <AppContainer>
          <Grid container justifyContent="space-between" spacing={3.75}>
            <Grid size={{ xs: 12, md: "auto" }} order={1}>
              <AppLink
                href="/"
                underline="none"
                hoverColor="none"
                display="flex"
              >
                <AppImage
                  className={classes.logoImg}
                  src={"/images/logo.png"}
                  defaultPlaceholderVariant="none"
                  width={500}
                  height={500}
                />
              </AppLink>
            </Grid>
          </Grid>
        </AppContainer>
      </div>
      <div className={classes.allRightsReserved}>
        <AppContainer>
          <AppTypography align="center">
            {t("allRightsReservedContent_text")} | v.{envConfig.APP_VERSION}
          </AppTypography>
        </AppContainer>
      </div>
    </div>
  );
};

export default MainFooter;
