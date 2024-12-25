import _isEqual from "lodash/isEqual";

import { formikHelpers } from "@/utils/helpers";
import { permissionConstants } from "@/utils/constants";

import Grid from "@mui/material/Grid2";
import { FastField } from "formik";
import AppPaper from "@/components/AppPaper";
import AppPaperContent from "@/components/AppPaperContent";
import AppTextField from "@/components/AppTextField";
import AsyncAutocomplete from "@/components/AsyncAutocomplete";
import AppPaperTitle from "@/components/AppPaperTitle";

import AdminUserFormContext from "../../AdminUserForm.context";

import { useContext } from "react";
import { useTranslation } from "next-i18next";
import { usePermission } from "@/hooks";

import type { FastFieldProps } from "formik";
import AppQuill from "@/components/AppQuill";

const GeneralInfo = () => {
  const { variant } = useContext(AdminUserFormContext);

  const { t } = useTranslation();

  const { canAccess } = usePermission();
  const canUpdateAdminUser =
    variant === "created" ||
    canAccess(permissionConstants.ADMIN_USER_UPDATE_NAME);

  return (
    <AppPaper elevation="paper">
      <AppPaperTitle>{t("generalInfo")}</AppPaperTitle>
      <AppPaperContent>
        <Grid container spacing={2}>
          <Grid
            size={{
              xs: 12,
            }}
          >
            <FastField name="username">
              {({ field, form, meta }: FastFieldProps) => (
                <AppTextField
                  label={t("username")!}
                  required
                  fullWidth
                  readOnly={!canUpdateAdminUser}
                  disabled={variant !== "created"}
                  error={
                    canUpdateAdminUser &&
                    !!formikHelpers.showError({
                      error: meta.error,
                      submitCount: form.submitCount,
                      touched: meta.touched,
                    })
                  }
                  helperText={
                    canUpdateAdminUser &&
                    formikHelpers.showError({
                      error: meta.error,
                      submitCount: form.submitCount,
                      touched: meta.touched,
                    })
                  }
                  {...field}
                />
              )}
            </FastField>
          </Grid>
          <Grid
            size={{
              xs: 12,
            }}
          >
            <FastField name="name">
              {({ field, form, meta }: FastFieldProps) => (
                <AppTextField
                  label={t("name")!}
                  required
                  fullWidth
                  readOnly={!canUpdateAdminUser}
                  error={
                    canUpdateAdminUser &&
                    !!formikHelpers.showError({
                      error: meta.error,
                      submitCount: form.submitCount,
                      touched: meta.touched,
                    })
                  }
                  helperText={
                    canUpdateAdminUser &&
                    formikHelpers.showError({
                      error: meta.error,
                      submitCount: form.submitCount,
                      touched: meta.touched,
                    })
                  }
                  {...field}
                />
              )}
            </FastField>
          </Grid>
          <Grid
            size={{
              xs: 12,
            }}
          >
            <FastField name="role">
              {({ field, form, meta }: FastFieldProps) => (
                <AsyncAutocomplete
                  fullWidth
                  module="roles"
                  readOnly={!canUpdateAdminUser}
                  defaultInputProps={{
                    label: t("role"),
                    required: true,
                    error:
                      canUpdateAdminUser &&
                      !!formikHelpers.showError({
                        error: meta.error,
                        touched: meta.touched,
                        submitCount: form.submitCount,
                      }),
                    helperText:
                      canUpdateAdminUser &&
                      formikHelpers.showError({
                        error: meta.error,
                        touched: meta.touched,
                        submitCount: form.submitCount,
                      }),
                  }}
                  {...field}
                />
              )}
            </FastField>
          </Grid>
          <Grid
            size={{
              xs: 12,
            }}
          >
            <AppQuill />
          </Grid>
        </Grid>
      </AppPaperContent>
    </AppPaper>
  );
};

export default GeneralInfo;
