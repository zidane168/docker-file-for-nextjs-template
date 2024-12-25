import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { commonHelpers } from "@/utils/helpers";

import AdminLayout from "@/layouts/AdminLayout";
import RootLayout from "@/layouts/RootLayout";
import PageLazyLoading from "@/components/PageLazyLoading";
import AuthGuard from "@/guards/AuthGuard";
import PermissionGuard from "@/guards/PermissionGuard";

import type { NextPageWithLayout } from "@/pages/_app";
import type { GetServerSideProps } from "next";
import { permissionConstants } from "@/utils/constants";

const ViewAdminUsers = dynamic(() => import("@/views/AdminUsers"), {
  ssr: false,
  loading: () => <PageLazyLoading />,
});

const AdminUsers: NextPageWithLayout = () => {
  return <ViewAdminUsers />;
};

AdminUsers.getLayout = (page, _, { translation }) => {
  const { t } = translation;

  const title = `${t("adminUsers")} - ${t("admin")}`;

  return (
    <RootLayout
      nextSeoProps={{
        title,
      }}
    >
      <AuthGuard requiredAuth>
        <AdminLayout appBarTitle={t("adminUsers")}>
          <PermissionGuard name={permissionConstants.ADMIN_USER_VIEW_NAME}>
            {page}
          </PermissionGuard>
        </AdminLayout>
      </AuthGuard>
    </RootLayout>
  );
};

export default AdminUsers;

export const getServerSideProps = (async (ctx) => {
  return {
    props: {
      ...(await commonHelpers.serverSideAppSettings(ctx)),
      ...(await serverSideTranslations(ctx.locale || "")),
    },
  };
}) satisfies GetServerSideProps;
