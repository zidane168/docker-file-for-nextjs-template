import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { commonHelpers } from "@/utils/helpers";

import LayoutAdmin from "@/layouts/AdminLayout";
import LayoutRoot from "@/layouts/RootLayout";
import PageLazyLoading from "@/components/PageLazyLoading";
import GuardAuth from "@/guards/AuthGuard";

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
    <LayoutRoot>
      <GuardAuth requiredAuth>
        <LayoutAdmin>{page}</LayoutAdmin>
      </GuardAuth>
    </LayoutRoot>
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
