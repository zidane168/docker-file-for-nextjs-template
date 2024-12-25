import _isEqual from "lodash/isEqual";

import { commonHelpers } from "@/utils/helpers";

import Grid from "@mui/material/Grid2";
import { Field, Formik } from "formik";

import AppDataTableContext from "@/components/AppDataTable/AppDataTable.context";
import CustomFilterContext from "@/components/AppDataTable/components/CustomFilter/CustomFilter.context";

import { useContext, useEffect, useMemo, useRef } from "react";
import { useIsMounted } from "@/hooks";

import type { CustomFilterContextValue } from "@/components/AppDataTable/components/CustomFilter/CustomFilter.context";
import type { FormikProps } from "formik";
import type { FieldProps } from "formik";

const SimpleForm = () => {
  const { customFilterFields } = useContext(AppDataTableContext);
  const { changeFormCustomFilters } = useContext(CustomFilterContext);

  return (
    <Grid
      container
      justifyContent={{
        xs: "flex-end",
        md: "flex-start",
      }}
      spacing={2}
    >
      {customFilterFields.map((customFilterField, customFilterFieldIndex) => (
        <Grid
          key={customFilterField.id || `index-${customFilterFieldIndex}`}
          {...customFilterField.gridItemProps}
          {...(typeof customFilterField.gridItemProps?.size === "string"
            ? {
                size: customFilterField.gridItemProps.size,
              }
            : {
                size: {
                  xs: "auto",
                  ...(customFilterField.gridItemProps?.size as any),
                },
              })}
        >
          <Field name={customFilterField.id}>
            {({ field, form }: FieldProps) =>
              customFilterField.renderInput({
                inputProps: {
                  name: field.name,
                  value: field.value,
                  onBlur: field.onBlur,
                  onChange: (event) => {
                    const newValues = {
                      ...form.values,
                      [field.name]: event.target.value,
                    };
                    const newCustomFilters = Object.entries(newValues)
                      .map(([id, value]) => ({
                        id,
                        value: value,
                      }))
                      .filter(
                        (newCustomFilter) =>
                          !commonHelpers.isEmpty(newCustomFilter.value)
                      );
                    form.setValues(newValues);
                    changeFormCustomFilters(newCustomFilters);
                  },
                },
                meta: {
                  label: customFilterField.label ?? "",
                },
              })
            }
          </Field>
        </Grid>
      ))}
    </Grid>
  );
};

const CustomFilter = () => {
  const { customFilters, customFilterFields, changeCustomFilters } =
    useContext(AppDataTableContext);

  const formikRef = useRef<FormikProps<Record<string, any>>>(null);

  const curFormCustomFiltersRef = useRef(customFilters);

  const initialValues = useMemo<Record<string, any>>(() => {
    return customFilterFields.reduce((values, customFilterField) => {
      const customFilterValue =
        customFilters.find(
          (customFilter) => customFilter.id === customFilterField.id
        )?.value ?? "";
      Object.assign(values, {
        [customFilterField.id]: customFilterValue,
      });
      return values;
    }, {});
  }, [customFilters, customFilterFields]);

  const resetFormCustomFilter = () => {
    formikRef.current?.resetForm &&
      formikRef.current?.resetForm({
        values: customFilterFields.reduce((values, customFilterField) => {
          Object.assign(values, {
            [customFilterField.id]: "",
          });
          return values;
        }, {}),
      });
  };

  const changeFormCustomFilters: CustomFilterContextValue["changeFormCustomFilters"] =
    (customFilters) => {
      curFormCustomFiltersRef.current = customFilters;
      changeCustomFilters(customFilters);
    };

  useEffect(() => {
    if (!isMounted()) return;
    if (!_isEqual(curFormCustomFiltersRef.current, customFilters)) {
      formikRef.current?.resetForm &&
        formikRef.current.resetForm({
          values: initialValues,
        });
    }
  }, [initialValues]);

  const isMounted = useIsMounted();

  return (
    <CustomFilterContext.Provider
      value={{
        resetFormCustomFilter,
        changeFormCustomFilters,
      }}
    >
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        onSubmit={() => {}}
      >
        <SimpleForm />
      </Formik>
    </CustomFilterContext.Provider>
  );
};

export default CustomFilter;
