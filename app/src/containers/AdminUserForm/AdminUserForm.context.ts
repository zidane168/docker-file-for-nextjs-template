import { createContext } from "react";

import { AdminUserFormProps } from "./AdminUserForm";

export type AdminUserFormContextValue = {
  deleteAdminUser: () => void;
} & Pick<AdminUserFormProps, "title" | "breadcrumbs" | "variant">;

const AdminUserFormContext = createContext<AdminUserFormContextValue>(
  undefined!
);

export default AdminUserFormContext;
