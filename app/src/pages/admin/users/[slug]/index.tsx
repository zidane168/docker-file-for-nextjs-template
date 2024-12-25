import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { permissionConstants } from "@/utils/constants";
import { adminUserApi } from "@/utils/apis";
import { axiosHelpers, commonHelpers } from "@/utils/helpers";
import { jwtService } from "@/services";
import { reduxWrapper, storeAdminUserAction } from "@/store";

import AdminLayout from "@/layouts/AdminLayout";
import RootLayout from "@/layouts/RootLayout";
import PageLazyLoading from "@/components/PageLazyLoading";
import AuthGuard from "@/guards/AuthGuard";
import PermissionGuard from "@/guards/PermissionGuard";

import type { NextPageWithLayout } from "@/pages/_app";
import type { GetServerSideProps } from "next";
import type { FetchAdminUserResponseData } from "@/utils/apis/adminUser";

type AdminUsersSlugParams = {
  slug: string;
};

type AdminUsersSlugProps = {
  adminUser?: FetchAdminUserResponseData["data"] | null;
};

const ViewAdminUsersSlug = dynamic(() => import("@/views/AdminUsersSlug"), {
  ssr: false,
  loading: () => <PageLazyLoading />,
});

const AdminUsersSlug: NextPageWithLayout<AdminUsersSlugProps> = () => {
  return <ViewAdminUsersSlug />;
};

AdminUsersSlug.getLayout = (page, pageProps) => {
  const { adminUser } = pageProps;

  const title = adminUser?.username;

  return (
    <RootLayout
      nextSeoProps={{
        title,
      }}
    >
      <AuthGuard requiredAuth>
        <AdminLayout>
          <PermissionGuard name={permissionConstants.ADMIN_USER_VIEW_NAME}>
            {page}
          </PermissionGuard>
        </AdminLayout>
      </AuthGuard>
    </RootLayout>
  );
};

export default AdminUsersSlug;

export const getServerSideProps = reduxWrapper.getServerSideProps(
  (store) =>
    (async (ctx) => {
      const { params, locale, req } = ctx;

      const token = jwtService.getToken({
        req,
      });

      const _params = params as unknown as AdminUsersSlugParams;

      const adminUserId = commonHelpers.getSlugId(_params.slug);
      if (commonHelpers.isNumber(adminUserId)) {
        try {
          const { data: response } = await adminUserApi.fetchAdminUser({
            params: {
              id: adminUserId!,
            },
            headers: {
              Locale: (locale ?? "").toLowerCase(),
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          });

          if (axiosHelpers.checkRequestSuccess(response)) {
            store.dispatch(
              storeAdminUserAction.fetchAdminUserSucceededServer(
                response.data.data
              )
            );

            return {
              props: {
                ...(await commonHelpers.serverSideAppSettings(ctx)),
                ...(await serverSideTranslations(locale || "")),
                adminUser: response.data.data,
              },
            };
          }
        } catch (error: any) {
          if (error.response?.status === 403) {
            store.dispatch(
              storeAdminUserAction.fetchAdminUserSucceededServer(null)
            );
            return {
              props: {
                ...(await commonHelpers.serverSideAppSettings(ctx)),
                ...(await serverSideTranslations(locale || "")),
                adminUser: null,
              },
            };
          }
        }
      }
      store.dispatch(storeAdminUserAction.fetchAdminUserSucceededServer(null));
      return {
        props: {
          ...(await commonHelpers.serverSideAppSettings(ctx)),
          ...(await serverSideTranslations(locale || "")),
        },
        notFound: true,
      };
    }) satisfies GetServerSideProps<AdminUsersSlugProps>
);
