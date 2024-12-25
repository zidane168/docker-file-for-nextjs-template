import { toast } from "react-toastify";
import * as yup from "yup";

import { loadingScreenOverlayService } from "@/services";
import { axiosHelpers, formikHelpers } from "@/utils/helpers";

import AppIconButton from "@/components/AppIconButton";
import AppSvgIcon from "@/components/AppSvgIcon";
import AppDataTableContext from "@/components/AppDataTable/AppDataTable.context";
import AppDialog from "@/components/AppDialog";
import AppDialogContent from "@/components/AppDialogContent";
import AppDialogTitle from "@/components/AppDialogTitle";
import AppDialogActions from "@/components/AppDialogActions";
import AppButton from "@/components/AppButton";
import { Field, Form, Formik, useFormikContext } from "formik";
import AppTooltip from "@/components/AppTooltip";
import NativeFileUpload from "@/components/NativeFileUpload";

import UploadIcon from "@@/public/images/icons/upload.svg";
import DownloadIcon from "@@/public/images/icons/download.svg";

import { useContext, useMemo, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { useIsMounted } from "@/hooks";

import type { FastFieldProps, FormikProps } from "formik";
import type { NativeFileValue } from "@/components/NativeFileUpload";

type UploadFormValues = {
  file: NativeFileValue | null;
};

type UploadDialogProps = {
  open?: boolean;
  onClose?: () => void;
};

const SubmitButton = () => {
  const { values, validateForm, handleSubmit } =
    useFormikContext<UploadFormValues>();

  const { t } = useTranslation();

  return (
    <AppButton
      variant="contained"
      type="submit"
      noWrap
      fullWidth
      onClick={formikHelpers.handleValidateAndSubmit({
        handleSubmit,
        validateForm,
        values,
      })}
    >
      {t("upload")}
    </AppButton>
  );
};

const UploadDialog = (props: UploadDialogProps) => {
  const { open, onClose } = props;

  const { localeText, refetch, uploadDataFile, downloadDataSampleFile } =
    useContext(AppDataTableContext);

  const { t } = useTranslation();

  const formikRef = useRef<FormikProps<UploadFormValues> | null>(null);

  const initialValues = useMemo<UploadFormValues>(() => {
    return {
      file: null,
    };
  }, []);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      file: yup.object().nullable().required(t("fileIsRequired")),
    });
  }, []);

  const handleSubmit = async (values: UploadFormValues) => {
    if (!uploadDataFile) return;

    loadingScreenOverlayService.fire(t("pending"));

    const { message, success } = await uploadDataFile({
      file: values.file?.file!,
    });
    if (!success || !isMounted()) {
      !!message && toast.error(message);
      loadingScreenOverlayService.close();
      return;
    }
    toast.success(t("uploadedSuccessfully"));
    onClose && onClose();
    formikRef.current &&
      formikRef.current.resetForm({
        values: initialValues,
        touched: {},
        errors: {},
        submitCount: 0,
      });

    loadingScreenOverlayService.close();

    refetch();
  };

  const handleSampleFileDownload = async () => {
    if (!downloadDataSampleFile) return;

    loadingScreenOverlayService.fire(t("pending"));

    const { data, message, success } = await downloadDataSampleFile();
    if (!success || !isMounted()) {
      !!message && toast.error(message);
      loadingScreenOverlayService.close();
      return;
    }
    try {
      const blobUrl = URL.createObjectURL(data!);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "sample.xlsx";
      link.click();
      URL.revokeObjectURL(blobUrl);
      toast.success(t("downloadedSuccessfully"));
      formikRef.current &&
        formikRef.current.resetForm({
          values: initialValues,
          touched: {},
          errors: {},
          submitCount: 0,
        });
    } catch (error) {
      const message = axiosHelpers.getErrorMessage(error);
      toast.error(message);
    }
    loadingScreenOverlayService.close();
  };

  const isMounted = useIsMounted();

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <AppDialog
        open={open!!}
        maxWidth="sm"
        fullWidth
        PaperProps={{ component: Form }}
        onClose={onClose}
      >
        <AppDialogTitle onClose={onClose}>{localeText.upload}</AppDialogTitle>
        <AppDialogContent dividers>
          <Field name="file">
            {({ field, form, meta }: FastFieldProps) => (
              <NativeFileUpload
                label={t("file")}
                variant="file"
                acceptedFileTypes={["excel"]}
                error={
                  !!formikHelpers.showError({
                    error: meta.error,
                    submitCount: form.submitCount,
                    touched: meta.touched,
                  })
                }
                helperText={formikHelpers.showError({
                  error: meta.error,
                  submitCount: form.submitCount,
                  touched: meta.touched,
                })}
                value={field.value}
                fileItemGridItemProps={{
                  xs: 4,
                }}
                onChange={(_, value) => {
                  form.setFieldValue("file", value);
                }}
              />
            )}
          </Field>
        </AppDialogContent>
        <AppDialogActions>
          {!!downloadDataSampleFile && (
            <AppButton
              fullWidth
              variant="outlined"
              noWrap
              startIcon={
                <AppSvgIcon component={DownloadIcon} fontSize="inherit" />
              }
              onClick={handleSampleFileDownload}
            >
              {t("sampleFile")}
            </AppButton>
          )}
          <SubmitButton />
        </AppDialogActions>
      </AppDialog>
    </Formik>
  );
};

const Upload = () => {
  const { localeText } = useContext(AppDataTableContext);

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleUploadDialogOpen = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setUploadDialogOpen(false);
  };

  return (
    <>
      <AppTooltip title={localeText.upload}>
        <AppIconButton variant="outlined" onClick={handleUploadDialogOpen}>
          <AppSvgIcon component={UploadIcon} fontSize="inherit" />
        </AppIconButton>
      </AppTooltip>
      <UploadDialog open={uploadDialogOpen} onClose={handleUploadDialogClose} />
    </>
  );
};

export default Upload;
