import axios from "axios";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";
import _isEqual from "lodash/isEqual";

import { appYup } from "@/libs";
import {
  axiosHelpers,
  commonHelpers,
  formikHelpers,
  reduxHelpers,
} from "@/utils/helpers";
import { commonConstants, permissionConstants } from "@/utils/constants";
import { storeAdminUserAction } from "@/store";
import { alertDialogService, loadingScreenOverlayService } from "@/services";

import Grid from "@mui/material/Grid2";
import { Form, Formik, useFormikContext } from "formik";
import AdminContent from "@/components/AdminContent";
import AppTypography from "@/components/AppTypography";
import AppBreadcrumbs from "@/components/AppBreadcrumbs";
import AppLink from "@/components/AppLink";
import AdminActionBar from "@/components/AdminActionBar";
import AppButton from "@/components/AppButton";
import GeneralInfo from "./components/GeneralInfo";
import Password from "./components/Password";
import Status from "./components/Status";

import AdminUserFormContext from "./AdminUserForm.context";

import AddIcon from "@mui/icons-material/Add";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useContext, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "next-i18next";
import {
  useAppDispatch,
  useOnLeavePageConfirmation,
  usePermission,
} from "@/hooks";
import { useRouter } from "next/router";

import type { FormikProps } from "formik";
import type { CancelTokenSource } from "axios";

export type AdminUserFormProps = {
  title?: React.ReactNode;
  breadcrumbs?: {
    label: React.ReactNode;
    href?: string;
  }[];
  initialValues?: Partial<AdminUserFormValues>;
  variant?: "created" | "updated";
};

export type AdminUserFormValues = {
  id: EmptySafeNumber;
  name: string;
  username: string;
  is_enabled: BooleanNumber;
  change_password_enabled: boolean;
  password: string;
  confirm_password: string;
  role: {
    id: number;
    name: string;
  } | null;
};

const LeavePageConfirmation = () => {
  const { values, initialValues } = useFormikContext<AdminUserFormValues>();

  useOnLeavePageConfirmation({
    shouldConfirmLeave: !_isEqual(values, initialValues),
  });

  return null;
};

const SubmitButton = () => {
  const { variant } = useContext(AdminUserFormContext);
  const { values, validateForm, handleSubmit } =
    useFormikContext<AdminUserFormValues>();

  const { t } = useTranslation();

  return (
    <AppButton
      variant="contained"
      textColor="common.white"
      type="submit"
      {...(variant === "created"
        ? {
            color: "success.main",
          }
        : {})}
      startIcon={
        variant === "created" ? (
          <AddIcon fontSize="inherit" />
        ) : (
          <SaveOutlinedIcon fontSize="inherit" />
        )
      }
      onClick={formikHelpers.handleValidateAndSubmit({
        handleSubmit,
        validateForm,
        values,
      })}
    >
      {t("save")}
    </AppButton>
  );
};

const SimpleForm = () => {
  const { breadcrumbs, title, variant, deleteAdminUser } =
    useContext(AdminUserFormContext);

  const { t } = useTranslation();

  const { canAccess } = usePermission();
  const canDeleteAdminUser = canAccess(
    permissionConstants.ADMIN_USER_DELETION_NAME
  );

  return (
    <AdminContent component={Form}>
      <LeavePageConfirmation />
      {(breadcrumbs?.length ?? 0) > 0 && (
        <AppBreadcrumbs sx={{ mb: 1 }}>
          {breadcrumbs?.map((breadcrumb) => {
            if (!!breadcrumb.href)
              return (
                <AppLink href={breadcrumb.href}>{breadcrumb.label}</AppLink>
              );
            return <AppTypography>{breadcrumb.label}</AppTypography>;
          })}
        </AppBreadcrumbs>
      )}
      <AdminActionBar
        title={title as any}
        actionNode={
          <>
            {variant === "updated" && canDeleteAdminUser && (
              <AppButton
                variant="outlined"
                color="error.main"
                noWrap
                startIcon={<DeleteOutlineIcon fontSize="small" />}
                onClick={deleteAdminUser}
              >
                {t("delete")}
              </AppButton>
            )}
            <SubmitButton />
          </>
        }
        sx={{
          mb: 1,
        }}
      />

      <Grid container spacing={2}>
        <Grid
          size={{
            xs: 12,
            md: 8,
          }}
        >
          <Grid container spacing={2}>
            <Grid
              size={{
                xs: 12,
              }}
            >
              <GeneralInfo />
            </Grid>
            <Grid
              size={{
                xs: 12,
              }}
            >
              <Password />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Status />
        </Grid>
      </Grid>
    </AdminContent>
  );
};

const AdminUserForm = (props: AdminUserFormProps) => {
  const {
    variant = "created",
    breadcrumbs,
    title,
    initialValues: controlledInitialValues,
  } = props;

  const saveAdminUserSource = useRef<CancelTokenSource | null>(null);
  const deleteAdminUserSourceRef = useRef<CancelTokenSource | null>(null);
  const formikRef = useRef<FormikProps<AdminUserFormValues> | null>(null);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const $s_adminUserAction = useMemo(
    () => bindActionCreators(storeAdminUserAction, dispatch),
    [dispatch]
  );

  const { t } = useTranslation();

  const initialValues = useMemo<AdminUserFormValues>(() => {
    return {
      id: controlledInitialValues?.id ?? "",
      name: controlledInitialValues?.name ?? "",
      username: controlledInitialValues?.username ?? "",
      confirm_password: "",
      password: "",
      is_enabled: !!controlledInitialValues?.is_enabled ? 1 : 0,
      role: controlledInitialValues?.role ?? null,
      change_password_enabled: false,
    };
  }, []);

  const validationSchema = useMemo(() => {
    return appYup.object().shape({
      name: appYup.string().trim().required(t("nameIsRequired")),
      username:
        variant === "created"
          ? appYup
              .string()
              .trim()
              .required(t("usernameIsRequired")!)
              .matches(commonConstants.USERNAME_RULE_REGEX, {
                excludeEmptyString: true,
                message: t("usernameContainsRules_text"),
              })
              .min(3, ({ min }) =>
                t("usernameMinCharacterWithCount", {
                  count: min,
                })
              )
              .max(20, ({ max }) =>
                t("usernameMaxCharacterWithCount", {
                  count: max,
                })
              )
          : appYup.string(),
      role: appYup.object().required(t("roleIsRequired")),
      password:
        variant === "created"
          ? appYup
              .string()
              .required(t("passwordIsRequired")!)
              .min(commonConstants.PASSWORD_MIN_LENGTH, ({ min }) =>
                t("passwordMinCharacterWithCount", {
                  count: min,
                })
              )
              .max(commonConstants.PASSWORD_MAX_LENGTH, ({ max }) =>
                t("passwordMaxCharacterWithCount", {
                  count: max,
                })
              )
          : appYup.string().when("change_password_enabled", {
              is: true,
              then: (schema) =>
                schema
                  .required(t("passwordIsRequired")!)
                  .min(commonConstants.PASSWORD_MIN_LENGTH, ({ min }) =>
                    t("passwordMinCharacterWithCount", {
                      count: min,
                    })
                  )
                  .max(commonConstants.PASSWORD_MAX_LENGTH, ({ max }) =>
                    t("passwordMaxCharacterWithCount", {
                      count: max,
                    })
                  ),
            }),
      confirm_password:
        variant === "created"
          ? appYup
              .string()
              .required(t("confirmPasswordIsRequired")!)
              .oneOf([appYup.ref("password")], t("confirmPasswordMustMatch")!)
          : appYup.string().when("change_password_enabled", {
              is: true,
              then: (schema) =>
                schema
                  .required(t("confirmPasswordIsRequired")!)
                  .oneOf(
                    [appYup.ref("password")],
                    t("confirmPasswordMustMatch")!
                  ),
            }),
    });
  }, [t, variant]);

  const deleteAdminUser = async () => {
    const values = formikRef.current?.values!;
    const initialValues = formikRef.current?.initialValues!;

    const { isConfirmed } = await alertDialogService.fire({
      title: t("deleteAdminUser"),
      content: t("areYouSureYouWantToDeleteName", {
        name: initialValues?.username!,
      }),
    });

    if (!isConfirmed) return;

    loadingScreenOverlayService.fire(`${t("pending")}...`);
    deleteAdminUserSourceRef.current = axios.CancelToken.source();
    const response = await reduxHelpers.callActionWithPromise(
      $s_adminUserAction.deleteAdminUserSaga,
      {
        params: {
          id: values?.id as number,
        },
        cancelToken: deleteAdminUserSourceRef.current.token,
      }
    );
    if (!!response.isCancelled) return;
    if (axiosHelpers.checkRequestSuccess(response)) {
      formikRef.current &&
        formikRef.current.resetForm({
          values: formikRef.current.values,
          errors: {},
          submitCount: 0,
          touched: {},
        });
      await commonHelpers.sleep(250);
      router.push("/admin/users");
      toast.success(t("deletedSuccessfully"));
    } else {
      loadingScreenOverlayService.close();
      toast.error(response.message);
    }
  };

  const handleUserFormSubmit = async (values: AdminUserFormValues) => {
    loadingScreenOverlayService.fire(`${t("pending")}...`);
    saveAdminUserSource.current = axios.CancelToken.source();

    if (variant === "created") {
      const response = await reduxHelpers.callActionWithPromise(
        $s_adminUserAction.createAdminUserSaga,
        {
          params: {
            name: values.name,
            username: values.username,
            role_id: values.role?.id!,
            password: values.password,
            password_confirmation: values.confirm_password,
            is_enabled: values.is_enabled,
          },
          cancelToken: saveAdminUserSource.current.token,
        }
      );
      if (!!response.isCancelled) return;
      if (axiosHelpers.checkRequestSuccess(response)) {
        toast.success(t("savedSuccessfully"));
        formikRef.current &&
          formikRef.current.resetForm({
            values,
            errors: {},
            submitCount: 0,
            touched: {},
          });
        await commonHelpers.sleep(250);
        router.push("/admin/users");
      } else {
        toast.error(response.message);
        loadingScreenOverlayService.close();
      }
      return;
    }

    const response = await reduxHelpers.callActionWithPromise(
      $s_adminUserAction.updateAdminUserSaga,
      {
        params: {
          id: values.id as number,
          name: values.name,
          role_id: values.role?.id!,
          password: values.password,
          password_confirmation: values.confirm_password,
          is_enabled: values.is_enabled,
        },
        cancelToken: saveAdminUserSource.current.token,
      }
    );
    if (!!response.isCancelled) return;
    if (axiosHelpers.checkRequestSuccess(response)) {
      formikRef.current &&
        formikRef.current.resetForm({
          values: {
            ...values,
            change_password_enabled: false,
            password: "",
            confirm_password: "",
          },
          errors: {},
          submitCount: 0,
          touched: {},
        });
      await commonHelpers.sleep(250);
      toast.success(t("savedSuccessfully"));
      router.push(
        `/admin/users/${commonHelpers.generateSlug(values.name, values.id)}`
      );
    } else {
      toast.error(response.message);
    }
    loadingScreenOverlayService.close();
  };

  useEffect(() => {
    return () => {
      saveAdminUserSource.current?.cancel &&
        saveAdminUserSource.current.cancel();
      loadingScreenOverlayService.close();
    };
  }, []);

  return (
    <AdminUserFormContext.Provider
      value={{
        variant,
        breadcrumbs,
        title,
        deleteAdminUser,
      }}
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUserFormSubmit}
      >
        <SimpleForm />
      </Formik>
    </AdminUserFormContext.Provider>
  );
};

export default AdminUserForm;
