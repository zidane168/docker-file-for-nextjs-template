import { NoSsr } from "@mui/material";
import MainHeader from "@/layouts/MainLayout/components/MainHeader";
import MainFooter from "@/layouts/MainLayout/components/MainFooter";

import useStyles from "./MainLayout.styles";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <NoSsr>
        <MainHeader />
      </NoSsr>
      <main className={classes.main}>{children}</main>
      <NoSsr>
        <footer className={classes.mainBottomContainer}>
          <MainFooter />
        </footer>
      </NoSsr>
    </div>
  );
};

export default MainLayout;
