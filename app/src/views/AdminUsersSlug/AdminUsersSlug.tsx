import AdminUserForm from "@/containers/AdminUserForm";

import { useAppSelector } from "@/hooks";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";

import type { AdminUserFormProps } from "@/containers/AdminUserForm";

const AdminUsersSlug = () => {
  const { t } = useTranslation();

  const $s_adminUser = useAppSelector((state) => state.adminUser.adminUser);

  const initialValues = useMemo<AdminUserFormProps["initialValues"]>(() => {
    return {
      id: $s_adminUser?.id,
      name: $s_adminUser?.name,
      username: $s_adminUser?.username,
      role: $s_adminUser?.role,
      is_enabled: $s_adminUser?.is_enabled,
    };
  }, [$s_adminUser]);

  return (
    <AdminUserForm
      variant="updated"
      title={$s_adminUser?.name}
      initialValues={initialValues}
      breadcrumbs={[
        {
          label: t("listAdminUsers"),
          href: "/admin/users",
        },
        {
          label: $s_adminUser?.name,
        },
      ]}
    />
  );
};

export default AdminUsersSlug;
