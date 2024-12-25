import _isEqual from "lodash/isEqual";

import { formikHelpers } from "@/utils/helpers";
import { permissionConstants } from "@/utils/constants";

import Grid from "@mui/material/Grid2";
import { Box, Collapse } from "@mui/material";
import { FastField } from "formik";
import AppPaper from "@/components/AppPaper";
import AppPaperContent from "@/components/AppPaperContent";
import AppPaperTitle from "@/components/AppPaperTitle";
import AppFormControlLabel from "@/components/AppFormControlLabel";
import AppCheckbox from "@/components/AppCheckbox";
import PasswordTextField from "@/components/PasswordTextField";

import AdminUserFormContext from "../../AdminUserForm.context";

import { useContext } from "react";
import { useTranslation } from "next-i18next";
import { usePermission } from "@/hooks";

import type { FastFieldProps } from "formik";

const Password = () => {
  const { variant } = useContext(AdminUserFormContext);

  const { t } = useTranslation();

  const { canAccess } = usePermission();
  const canUpdateAdminUser =
    variant === "created" ||
    canAccess(permissionConstants.ADMIN_USER_UPDATE_NAME);

  return (
    <AppPaper elevation="paper">
      <AppPaperTitle>{t("password")}</AppPaperTitle>
      <AppPaperContent>
        <FastField
          name="change_password_enabled"
          shouldUpdate={formikHelpers.shouldUpdate([
            "password",
            "confirm_password",
          ])}
        >
          {({ field, form }: FastFieldProps) => (
            <>
              {variant === "updated" && (
                <AppFormControlLabel
                  control={<AppCheckbox />}
                  label={t("changePassword")}
                  checked={!!field.value}
                  onChange={() => form.setFieldValue(field.name, !field.value)}
                />
              )}
              <Collapse in={variant === "created" || !!field.value}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <FastField name="password">
                        {({ field, form, meta }: FastFieldProps) => (
                          <PasswordTextField
                            label={t("password")!}
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
                    <Grid size={{ xs: 12 }}>
                      <FastField name="confirm_password">
                        {({ field, form, meta }: FastFieldProps) => (
                          <PasswordTextField
                            label={t("confirmPassword")!}
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
                  </Grid>
                </Box>
              </Collapse>
            </>
          )}
        </FastField>
      </AppPaperContent>
    </AppPaper>
  );
};

export default Password;
