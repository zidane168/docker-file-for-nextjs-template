import type { AppState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectHasAuth = (state: AppState) => !!state.auth.authUser?.id;

export const selectAuthUserRolePermissions = (state: AppState) =>
  state.auth.authUser?.role?.permissions;

export const selectPermissionNameToAuthUserRolePermissionMap = createSelector(
  [selectAuthUserRolePermissions],
  (authUserRolePermissions) => {
    return (authUserRolePermissions ?? []).reduce(
      (
        keyToItemMap: {
          [permissionName: string]: typeof authUserRolePermission;
        },
        authUserRolePermission
      ) => {
        Object.assign(keyToItemMap, {
          [authUserRolePermission.name]: authUserRolePermission,
        });
        return keyToItemMap;
      },
      {}
    );
  }
);

export const selectAuthUserRolePermissionNames = createSelector(
  [selectAuthUserRolePermissions],
  (authUserRolePermissions) => {
    return (authUserRolePermissions ?? []).map((authUserRolePermission) => {
      return authUserRolePermission.name;
    });
  }
);
