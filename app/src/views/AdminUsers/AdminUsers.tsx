import { toast } from "react-toastify";
import axios from "axios";
import { bindActionCreators } from "redux";

import { storeAdminUserAction } from "@/store";
import { axiosHelpers, commonHelpers, reduxHelpers } from "@/utils/helpers";
import { alertDialogService, loadingScreenOverlayService } from "@/services";
import { commonConstants, permissionConstants } from "@/utils/constants";

import AdminContent from "@/components/AdminContent";
import AppDataTable from "@/components/AppDataTable";
import AppChip from "@/components/AppChip";
import AppIconButton from "@/components/AppIconButton";
import AppMenuItem from "@/components/AppMenuItem";
import AppMenu from "@/components/AppMenu/AppMenu";
import AppLink from "@/components/AppLink";
import AppButton from "@/components/AppButton";
import AppListItemText from "@/components/AppListItemText";
import AdminActionBar from "@/components/AdminActionBar";
import AppListItemIcon from "@/components/AppListItemIcon";
import AppSvgIcon from "@/components/AppSvgIcon";

import {
  useAppDispatch,
  useAppMomentWithLocale,
  useAppSelector,
  usePermission,
} from "@/hooks";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "next-i18next";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import AdminUsersContext from "@/views/AdminUsers/AdminUsers.context";

import type { CancelTokenSource } from "axios";
import type { AppState } from "@/store";
import type {
  AppDataTableApiRef,
  AppDataTableProps,
  CustomFilterField,
  DataTableColumn,
} from "@/components/AppDataTable/AppDataTable";
import AppSelect from "@/components/AppSelect";
import AppSelectMenuItem from "@/components/AppSelectMenuItem";

type AdminUserActionProps = {
  adminUser: AppState["adminUser"]["adminUsers"][number];
};

const AdminUserAction = (props: AdminUserActionProps) => {
  const { adminUser } = props;

  const { changeAdminUserStatus, deleteAdminUser } =
    useContext(AdminUsersContext);

  const { t } = useTranslation();

  const { canAccess } = usePermission();
  const canUpdateAdminUser = canAccess(
    permissionConstants.ADMIN_USER_UPDATE_NAME
  );
  const canDeleteAdminUser = canAccess(
    permissionConstants.ADMIN_USER_DELETION_NAME
  );

  const [actionMenuAnchorEl, setActionMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const actionMenuOpen = !!actionMenuAnchorEl;

  const $s_authUserId = useAppSelector((state) => state.auth.authUser?.id);

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionMenuAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  const handleAdminUserStatusChange = () => {
    changeAdminUserStatus({
      id: adminUser.id,
      is_enabled: adminUser.is_enabled === 1 ? 0 : 1,
    });
    setActionMenuAnchorEl(null);
  };

  const handleAdminUserDelete = () => {
    deleteAdminUser(adminUser);
    setActionMenuAnchorEl(null);
  };

  return (
    <>
      <AppIconButton
        borderRadius="circular"
        color="text.primary"
        edge="xy"
        size="small"
        onClick={handleActionMenuOpen}
      >
        <MoreVertIcon fontSize="inherit" />
      </AppIconButton>
      <AppMenu
        anchorEl={actionMenuAnchorEl}
        open={actionMenuOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleActionMenuClose}
      >
        <AppMenuItem
          component={AppLink}
          href={`/admin/users/${commonHelpers.generateSlug(
            adminUser.username,
            adminUser.id
          )}`}
          hoverColor="none"
          underline="none"
          onClick={handleActionMenuClose}
        >
          <AppListItemIcon>
            <AppSvgIcon
              component={ModeEditOutlineOutlinedIcon}
              fontSize="inherit"
            />
          </AppListItemIcon>
          <AppListItemText>{t("edit")}</AppListItemText>
        </AppMenuItem>
        {$s_authUserId !== adminUser.id && canUpdateAdminUser && (
          <AppMenuItem onClick={handleAdminUserStatusChange}>
            <AppListItemIcon>
              <AppSvgIcon
                component={
                  adminUser.is_enabled ? LockOutlinedIcon : LockOpenOutlinedIcon
                }
                fontSize="inherit"
              />
            </AppListItemIcon>
            <AppListItemText>
              {adminUser.is_enabled ? t("inactive") : t("active")}
            </AppListItemText>
          </AppMenuItem>
        )}
        {$s_authUserId !== adminUser.id && canDeleteAdminUser && (
          <AppMenuItem onClick={handleAdminUserDelete}>
            <AppListItemIcon>
              <AppSvgIcon component={DeleteOutlineIcon} fontSize="inherit" />
            </AppListItemIcon>
            <AppListItemText>{t("delete")}</AppListItemText>
          </AppMenuItem>
        )}
      </AppMenu>
    </>
  );
};

const AdminUsers = () => {
  const { t } = useTranslation();

  const { momentWithLocale } = useAppMomentWithLocale();

  const { canAccess } = usePermission();

  const fetchedAdminUsersSourceRef = useRef<CancelTokenSource | null>(null);
  const updatedAdminUserStatusSourceRef = useRef<CancelTokenSource | null>(
    null
  );
  const deletedAdminUserSourceRef = useRef<CancelTokenSource | null>(null);
  const appDataTableRef = useRef<AppDataTableApiRef | null>(null);

  const dispatch = useAppDispatch();

  const $s_adminUserAction = useMemo(
    () => bindActionCreators(storeAdminUserAction, dispatch),
    [dispatch]
  );

  const $s_adminUsers = useAppSelector((state) => state.adminUser.adminUsers);
  const $s_adminUsersCount = useAppSelector(
    (state) => state.adminUser.adminUsersCount
  );
  const $s_adminUsersLoading = useAppSelector(
    (state) => state.adminUser.adminUsersLoading
  );
  const $s_adminUsersError = useAppSelector(
    (state) => state.adminUser.adminUsersError
  );

  const columns = useMemo<DataTableColumn<(typeof $s_adminUsers)[number]>[]>(
    () => [
      {
        accessorKey: "name",
        enableSorting: false,
        cell: (info) => info.getValue(),
        header: () => t("name"),
      },
      {
        accessorKey: "username",
        enableSorting: false,
        cell: (info) => info.getValue(),
        header: () => t("username"),
      },
      {
        id: "role",
        enableSorting: false,
        cell: (info) => info.row.original.role?.name,
        header: () => t("role"),
      },
      {
        accessorKey: "created_at",
        sortDescFirst: true,
        tableCellProps: {
          align: "right",
        },
        cell: (info) =>
          momentWithLocale(info.row.original.created_at, "X").format(
            commonConstants.DEFAULT_DATE_TIME_FORMAT
          ),
        header: () => t("dateCreated"),
      },
      {
        accessorKey: "is_enabled",
        enableSorting: false,
        tableCellProps: {
          align: "center",
        },
        cell: (info) => {
          const isEnabled = info.getValue();

          return (
            <AppChip
              label={t(isEnabled ? "active" : "inactive")}
              color={isEnabled ? "success.main" : "error.main"}
              borderRadius="rounded"
              variant="filledTonal"
            />
          );
        },
        header: () => t("status"),
      },
      {
        id: "actions",
        enableSorting: false,
        tableCellProps: {
          align: "center",
          sx: {
            width: 0,
          },
        },
        cell: (info) => {
          return <AdminUserAction adminUser={info.row.original} />;
        },
        header: () => t("actions"),
      },
    ],
    [t, momentWithLocale]
  );

  const initialState = useMemo<AppDataTableProps["initialState"]>(() => {
    return {
      sorting: [
        {
          id: "created_at",
          desc: true,
        },
      ],
      columnPinning: {
        right: ["actions"],
      },
    };
  }, [t]);

  const customFilterFields = useMemo<
    CustomFilterField<(typeof $s_adminUsers)[number]>[]
  >(() => {
    return [
      {
        id: "is_enabled",
        label: t("status"),
        gridItemProps: {
          size: {
            xs: "auto",
          },
        },
        renderInput: ({ inputProps, meta }) => {
          console.log(inputProps.value);
          return (
            <AppSelect
              {...(inputProps as any)}
              displayEmpty
              placeholder={meta.label}
            >
              <AppSelectMenuItem>{t("status")}</AppSelectMenuItem>
              <AppSelectMenuItem value={1}>{t("active")}</AppSelectMenuItem>
              <AppSelectMenuItem value={0}>{t("inactive")}</AppSelectMenuItem>
            </AppSelect>
          );
        },
      },
    ];
  }, [t]);

  const handleAdminUsersFetch: AppDataTableProps["onFetch"] = (params) => {
    fetchedAdminUsersSourceRef.current?.cancel &&
      fetchedAdminUsersSourceRef.current.cancel();
    fetchedAdminUsersSourceRef.current = axios.CancelToken.source();
    $s_adminUserAction.fetchAdminUsersSaga({
      params: {
        page: params.pageIndex + 1,
        per_page: params.pageSize,
        filters: {
          keyword: params.globalFilter,
          ...params.customFilters.reduce((item, customFilter) => {
            switch (customFilter.id) {
              // case "product_service_id": {
              //   Object.assign(item, {
              //     [customFilter.id]: customFilter.value?.id,
              //   });
              //   break;
              // }
              default: {
                Object.assign(item, {
                  [customFilter.id]: customFilter.value,
                });
                break;
              }
            }
            return item;
          }, {}),
        },
        // sorts: params.sorting.reduce((sortedItem, sorting) => {
        //   Object.assign(sortedItem, {
        //     [sorting.id]: sorting.desc ? "desc" : "asc",
        //   });
        //   return sortedItem;
        // }, {} as Record<string, string>),
      },
      cancelToken: fetchedAdminUsersSourceRef.current.token,
    });
  };

  const changeAdminUserStatus = async (params: {
    id: number;
    is_enabled: BooleanNumber;
  }) => {
    loadingScreenOverlayService.fire(`${t("pending")}...`);
    updatedAdminUserStatusSourceRef.current = axios.CancelToken.source();
    const response = await reduxHelpers.callActionWithPromise(
      $s_adminUserAction.updateAdminUserStatusSaga,
      {
        params: {
          id: params.id,
          is_enabled: params.is_enabled,
        },
        cancelToken: updatedAdminUserStatusSourceRef.current.token,
      }
    );
    if (!!response.isCancelled) return;
    if (axiosHelpers.checkRequestSuccess(response)) {
      toast.success(
        t(
          !!params.is_enabled
            ? "activatedSuccessfully"
            : "deactivatedSuccessfully"
        )
      );
    } else toast.error(response.message);
    loadingScreenOverlayService.close();
  };

  const deleteAdminUser = async (
    adminUser: AppState["adminUser"]["adminUsers"][number]
  ) => {
    const { isConfirmed } = await alertDialogService.fire({
      title: t("deleteAdminUser"),
      content: t("areYouSureYouWantToDeleteName", {
        name: adminUser.username,
      }),
    });

    if (!isConfirmed) return;

    loadingScreenOverlayService.fire(`${t("pending")}...`);
    deletedAdminUserSourceRef.current = axios.CancelToken.source();
    const response = await reduxHelpers.callActionWithPromise(
      $s_adminUserAction.deleteAdminUserSaga,
      {
        params: {
          id: adminUser.id,
        },
        cancelToken: deletedAdminUserSourceRef.current.token,
      }
    );
    if (!!response.isCancelled) return;
    if (axiosHelpers.checkRequestSuccess(response)) {
      toast.success(t("deletedSuccessfully"));
      appDataTableRef.current && appDataTableRef.current.refetch();
    } else toast.error(response.message);
    loadingScreenOverlayService.close();
  };

  useEffect(() => {
    if (!$s_adminUsersLoading && !!$s_adminUsersError)
      toast.error($s_adminUsersError);
  }, [$s_adminUsersLoading, $s_adminUsersError]);

  useEffect(() => {
    return () => {
      fetchedAdminUsersSourceRef.current?.cancel &&
        fetchedAdminUsersSourceRef.current.cancel();
      deletedAdminUserSourceRef.current?.cancel &&
        deletedAdminUserSourceRef.current.cancel();
      updatedAdminUserStatusSourceRef.current?.cancel &&
        updatedAdminUserStatusSourceRef.current.cancel();
    };
  }, []);

  return (
    <AdminUsersContext.Provider
      value={{
        changeAdminUserStatus,
        deleteAdminUser,
      }}
    >
      <AdminContent>
        <AdminActionBar
          title={t("listAdminUsers")}
          actionNode={
            canAccess(permissionConstants.ADMIN_USER_CREATION_NAME) && (
              <AppButton
                variant="contained"
                color="success.main"
                textColor="common.white"
                component={AppLink}
                href="/admin/users/new"
                underline="none"
                hoverColor="none"
                // startIcon={<AddIcon fontSize="inherit" />}
              >
                {t("new")}
              </AppButton>
            )
          }
          sx={{ mb: 1 }}
        />
        <AppDataTable
          // name="adminUsers"
          apiRef={appDataTableRef}
          data={$s_adminUsers}
          loading={$s_adminUsersLoading || !!$s_adminUsersError}
          customFilterFields={customFilterFields}
          initialState={initialState}
          searchable
          dataCount={$s_adminUsersCount}
          refetchable
          columns={columns}
          onFetch={handleAdminUsersFetch}
        />
      </AdminContent>
    </AdminUsersContext.Provider>
  );
};

export default AdminUsers;
