import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { commonHelpers } from "@/utils/helpers";

import MainLayout from "@/layouts/MainLayout";
import RootLayout from "@/layouts/RootLayout";
import PageLazyLoading from "@/components/PageLazyLoading";
import AuthGuard from "@/guards/AuthGuard";

import type { NextPageWithLayout } from "@/pages/_app";
import type { GetServerSideProps } from "next";

const ViewHome = dynamic(() => import("@/views/Home"), {
  ssr: false,
  loading: () => <PageLazyLoading />,
});

const Home: NextPageWithLayout = () => {
  return <ViewHome />;
};

Home.getLayout = (page) => {
  return (
    <RootLayout>
      <AuthGuard>
        <MainLayout>{page}</MainLayout>
      </AuthGuard>
    </RootLayout>
  );
};

export default Home;

export const getServerSideProps = (async (ctx) => {
  return {
    props: {
      ...(await commonHelpers.serverSideAppSettings(ctx)),
      ...(await serverSideTranslations(ctx.locale || "")),
    },
  };
}) satisfies GetServerSideProps;
