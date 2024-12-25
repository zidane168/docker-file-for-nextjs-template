import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { commonHelpers } from "@/utils/helpers";

import LayoutRoot from "@/layouts/RootLayout";
import PageLazyLoading from "@/components/PageLazyLoading";

import type { NextPageWithLayout } from "@/pages/_app";
import type { GetServerSideProps } from "next";

const View404 = dynamic(() => import("@/views/404"), {
  ssr: true,
  loading: () => <PageLazyLoading />,
});

const Error: NextPageWithLayout = () => {
  return <View404 />;
};

Error.getLayout = (page, _, { translation }) => {
  const { t } = translation;

  return (
    <LayoutRoot
      nextSeoProps={{
        title: t("pageNotFound")!,
      }}
    >
      {page}
    </LayoutRoot>
  );
};

export const getServerSideProps = (async (ctx) => {
  return {
    props: {
      ...(await commonHelpers.serverSideAppSettings(ctx)),
      ...(await serverSideTranslations(ctx.locale || "")),
    },
  };
}) satisfies GetServerSideProps;

export default Error;
