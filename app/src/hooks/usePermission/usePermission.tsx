import { storeAuthSelectors } from "@/store";

import useAppSelector from "@/hooks/useAppSelector";

const usePermission = () => {
  const $s_authUserRolePermissionNames = useAppSelector(
    storeAuthSelectors.selectAuthUserRolePermissionNames
  );

  const canAccess = (permissionName: string | string[]) => {
    return $s_authUserRolePermissionNames.some((authUserRolePermissionName) =>
      Array.isArray(permissionName)
        ? permissionName.indexOf(authUserRolePermissionName) > -1
        : permissionName === authUserRolePermissionName
    );
  };

  return {
    canAccess,
    loading: false,
  };
};

export default usePermission;
