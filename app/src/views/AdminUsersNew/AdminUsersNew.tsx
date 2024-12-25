import AdminUserForm from "@/containers/AdminUserForm";

import { useTranslation } from "next-i18next";

const AdminUsersNew = () => {
  const { t } = useTranslation();

  return (
    <AdminUserForm
      variant="created"
      title={t("newAdminUser")}
      breadcrumbs={[
        {
          label: t("listAdminUsers"),
          href: "/admin/users",
        },
        {
          label: t("newAdminUser"),
        },
      ]}
    />
  );
};

export default AdminUsersNew;
