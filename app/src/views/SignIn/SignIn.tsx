import { useEffect, useMemo, useRef } from "react";
import * as yup from "yup";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";

import { axiosHelpers, formikHelpers, reduxHelpers } from "@/utils/helpers";
import { storeAuthAction } from "@/store";
import { appStorageService, loadingScreenOverlayService } from "@/services";
import { commonConstants } from "@/utils/constants";
import { envConfig, localeConfig } from "@/utils/config";

import { FastField, Form, Formik } from "formik";
import AppTextField from "@/components/AppTextField";
import AppButton from "@/components/AppButton";
import AppContainer from "@/components/AppContainer";
import PasswordTextField from "@/components/PasswordTextField";
import AppImage from "@/components/AppImage";
import { Box } from "@mui/material";
import AppToolbar from "@/components/AppToolbar";
import AppSelect from "@/components/AppSelect";
import AppSelectMenuItem from "@/components/AppSelectMenuItem";
import AppTypography from "@/components/AppTypography";

import { useFormikContext } from "formik";
import { useAppDispatch } from "@/hooks";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useSearchParams } from "next/navigation";

import useStyles from "./SignIn.styles";

import type { FastFieldProps, FormikProps } from "formik";

type SignInFormValues = {
  username: string;
  password: string;
};

const SubmitButton = () => {
  const { handleSubmit, validateForm, values } =
    useFormikContext<SignInFormValues>();

  const { t } = useTranslation();

  return (
    <AppButton
      variant="contained"
      type="submit"
      fullWidth
      onClick={formikHelpers.handleValidateAndSubmit({
        handleSubmit,
        validateForm,
        values,
      })}
    >
      {t("login")}
    </AppButton>
  );
};

const LanguageSelect = () => {
  const router = useRouter();

  const { i18n } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const locale = event.target.value;
    router.push(router.asPath, undefined, { locale });
    window.NextPublic.lang = locale as any;
    appStorageService.saveCookieLocale(locale);
  };

  return (
    <AppSelect value={i18n.language} onChange={handleLanguageChange as any}>
      {localeConfig.localeConfigs.map((localeConfig) => (
        <AppSelectMenuItem
          key={localeConfig.locale}
          value={localeConfig.locale}
        >
          {localeConfig.label}
        </AppSelectMenuItem>
      ))}
    </AppSelect>
  );
};

const SimpleForm = () => {
  const { t } = useTranslation();

  const { classes } = useStyles();

  return (
    <Form className={classes.root}>
      <AppToolbar>
        <Box flex={1} />
        <LanguageSelect />
      </AppToolbar>
      <div className={classes.signIn}>
        <AppContainer maxWidth="sm">
          <Box display="flex" justifyContent="center" mb={3}>
            <AppImage
              src="/images/logo.png"
              width="296"
              height="111"
              className={classes.logo}
            />
          </Box>
          <div className={classes.signInForm}>
            <FastField name="username">
              {({ field, form, meta }: FastFieldProps) => (
                <AppTextField
                  fullWidth
                  label={t("username")}
                  required
                  sx={{
                    marginBottom: 2,
                  }}
                  error={
                    !!formikHelpers.showFieldError({
                      form,
                      meta,
                    })
                  }
                  helperText={formikHelpers.showFieldError({
                    form,
                    meta,
                  })}
                  {...field}
                />
              )}
            </FastField>

            <FastField name="password">
              {({ field, form, meta }: FastFieldProps) => (
                <PasswordTextField
                  fullWidth
                  label={t("password")}
                  required
                  sx={{
                    marginBottom: 2,
                  }}
                  error={
                    !!formikHelpers.showFieldError({
                      form,
                      meta,
                    })
                  }
                  helperText={formikHelpers.showFieldError({
                    form,
                    meta,
                  })}
                  {...field}
                />
              )}
            </FastField>
          </div>

          <SubmitButton />

          <AppTypography align="center" mt={2}>
            {t("versionName", {
              name: envConfig.APP_VERSION,
            })}
          </AppTypography>
        </AppContainer>
      </div>
    </Form>
  );
};

const SignIn = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const searchParamsRedirectPath = searchParams.get("redirect_path");

  const formikRef = useRef<FormikProps<SignInFormValues> | null>(null);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const $s_authAction = useMemo(
    () => bindActionCreators(storeAuthAction, dispatch),
    [dispatch]
  );

  const initialValues = useMemo<SignInFormValues>(() => {
    return {
      username: "",
      password: "",
    };
  }, []);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      username: yup.string().required(t("usernameIsRequired")!),
      password: yup.string().required(t("passwordIsRequired")!),
    });
  }, [t]);

  const handleSubmit = async (values: SignInFormValues) => {
    loadingScreenOverlayService.fire(t("pending")!);
    const response = await reduxHelpers.callActionWithPromise(
      $s_authAction.signInSaga,
      {
        params: {
          username: values.username,
          password: values.password,
        },
      }
    );
    if (axiosHelpers.checkRequestSuccess(response)) {
      toast.success(t("signInSuccessfully"));
      router.push(
        searchParamsRedirectPath || commonConstants.DEFAULT_REDIRECT_PATHNAME
      );
    } else {
      loadingScreenOverlayService.close();
      toast.error(response.message);
    }
  };

  useEffect(() => {
    return () => {
      loadingScreenOverlayService.close();
    };
  }, []);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <SimpleForm />
    </Formik>
  );
};

export default SignIn;
