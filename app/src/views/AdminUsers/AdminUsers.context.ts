import { createContext } from "react";

import type { AppState } from "@/store";

export type AdminUsersContextValue = {
  changeAdminUserStatus: (params: {
    id: number;
    is_enabled: BooleanNumber;
  }) => void;
  deleteAdminUser: (
    adminUser: AppState["adminUser"]["adminUsers"][number]
  ) => void;
};

const AdminUsersContext = createContext<AdminUsersContextValue>(undefined!);

export default AdminUsersContext;
