import AdminAppBarToolbar from "@/components/AdminAppBarToolbar";
import AdminAppBar from "@/layouts/AdminLayout/components/AdminAppBar";
import Sidebar from "@/layouts/AdminLayout/components/Sidebar";

import { useAppSelector } from "@/hooks";

import useStyles from "./AdminLayout.styles";

type AdminLayoutProps = {
  appBarTitle?: string;
  children: React.ReactNode;
};

const SidebarWithAdminAppBar = (
  props: Pick<AdminLayoutProps, "appBarTitle">
) => {
  const { appBarTitle } = props;

  const $s_adminSidebarCollapseOpened = useAppSelector(
    (state) => state.common.adminSidebarCollapseOpened
  );

  const { classes, cx } = useStyles();

  return (
    <>
      <Sidebar />
      <AdminAppBar
        className={cx(classes.adminAppBar, {
          [classes.adminAppBarSidebarCollapsed]: $s_adminSidebarCollapseOpened,
        })}
        title={appBarTitle}
      />
    </>
  );
};

const AdminLayout = (props: AdminLayoutProps) => {
  const { appBarTitle, children } = props;

  const { classes } = useStyles();

  return (
    <>
      <div className={classes.root}>
        <SidebarWithAdminAppBar appBarTitle={appBarTitle} />
        <main className={classes.main}>
          <AdminAppBarToolbar />
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
