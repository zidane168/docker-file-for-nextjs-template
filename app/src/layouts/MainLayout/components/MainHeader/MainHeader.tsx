import { AppBar } from "@mui/material";
import AppContainer from "@/components/AppContainer";
import AppLink from "@/components/AppLink";
import MainHeaderAppBarToolbar from "@/components/MainHeaderToolbar";
import AppImage from "@/components/AppImage";

import { useTranslation } from "next-i18next";

import MainHeaderContext from "@/layouts/MainLayout/components/MainHeader/MainHeader.context";

import useStyles from "./MainHeader.styles";

const MainHeader = () => {
  const { classes } = useStyles();

  const { t } = useTranslation();

  return (
    <MainHeaderContext.Provider
      value={{
        navMenus: [],
      }}
    >
      <AppBar
        component="header"
        className={classes.root}
        elevation={0}
        color="default"
      >
        <AppContainer>
          <MainHeaderAppBarToolbar disableGutters>
            <AppLink href="/" underline="none" hoverColor="none" display="flex">
              <AppImage
                className={classes.logoImg}
                width={500}
                height={500}
                defaultPlaceholderVariant="none"
                src="/images/logo.png"
                unoptimized
              />
            </AppLink>
          </MainHeaderAppBarToolbar>
        </AppContainer>
      </AppBar>
      <MainHeaderAppBarToolbar />
    </MainHeaderContext.Provider>
  );
};

export default MainHeader;
