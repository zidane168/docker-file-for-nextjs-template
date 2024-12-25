import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { commonHelpers } from "@/utils/helpers";

import LayoutRoot from "@/layouts/RootLayout";
import PageLazyLoading from "@/components/PageLazyLoading";
import GuardAuth from "@/guards/AuthGuard";

import type { NextPageWithLayout } from "@/pages/_app";
import type { GetServerSideProps } from "next";

const ViewSignIn = dynamic(() => import("@/views/SignIn"), {
  ssr: false,
  loading: () => <PageLazyLoading />,
});

const SignIn: NextPageWithLayout = () => {
  return <ViewSignIn />;
};

SignIn.getLayout = (page, _, { translation }) => {
  const { t } = translation;

  return (
    <LayoutRoot
      nextSeoProps={{
        title: t("signIn"),
      }}
    >
      <GuardAuth>{page}</GuardAuth>
    </LayoutRoot>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await commonHelpers.serverSideAppSettings(ctx)),
      ...(await serverSideTranslations(ctx.locale || "")),
    },
  };
};

export default SignIn;
