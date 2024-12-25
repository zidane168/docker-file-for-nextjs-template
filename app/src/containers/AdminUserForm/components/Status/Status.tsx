import _isEqual from "lodash/isEqual";

import { permissionConstants } from "@/utils/constants";

import { FastField } from "formik";
import AppPaper from "@/components/AppPaper";
import AppPaperContent from "@/components/AppPaperContent";
import AppPaperTitle from "@/components/AppPaperTitle";
import AppFormControlLabel from "@/components/AppFormControlLabel";
import AppCheckbox from "@/components/AppCheckbox";
import AppTypography from "@/components/AppTypography";

import AdminUserFormContext from "../../AdminUserForm.context";

import { useContext } from "react";
import { useTranslation } from "next-i18next";
import { usePermission } from "@/hooks";

import type { FastFieldProps } from "formik";

const Status = () => {
  const { variant } = useContext(AdminUserFormContext);

  const { t } = useTranslation();

  const { canAccess } = usePermission();
  const canUpdateAdminUser =
    variant === "created" ||
    canAccess(permissionConstants.ADMIN_USER_UPDATE_NAME);

  return (
    <AppPaper elevation="paper">
      <AppPaperTitle>{t("status")}</AppPaperTitle>
      <AppPaperContent>
        <FastField name="is_enabled">
          {({ field, form }: FastFieldProps) => (
            <AppFormControlLabel
              control={
                <AppCheckbox
                  color={!!field.value ? "success.main" : "error.main"}
                  checkedIconColor="success.main"
                />
              }
              label={
                <AppTypography
                  variant="inherit"
                  component="span"
                  color={!!field.value ? "success.main" : "error.main"}
                >
                  {t(!!field.value ? "active" : "inactive")}
                </AppTypography>
              }
              disabled={!canUpdateAdminUser}
              checked={!!field.value}
              onChange={() =>
                form.setFieldValue(field.name, field.value === 1 ? 0 : 1)
              }
            />
          )}
        </FastField>
      </AppPaperContent>
    </AppPaper>
  );
};

export default Status;
