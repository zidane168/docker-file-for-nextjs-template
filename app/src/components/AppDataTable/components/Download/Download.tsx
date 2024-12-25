import { toast } from "react-toastify";
import * as yup from "yup";

import { loadingScreenOverlayService } from "@/services";
import { axiosHelpers, formikHelpers } from "@/utils/helpers";
import { commonConstants } from "@/utils/constants";

import AppIconButton from "@/components/AppIconButton";
import AppSvgIcon from "@/components/AppSvgIcon";
import AppDataTableContext from "@/components/AppDataTable/AppDataTable.context";
import AppDialog from "@/components/AppDialog";
import AppDialogContent from "@/components/AppDialogContent";
import AppDialogTitle from "@/components/AppDialogTitle";
import AppDialogActions from "@/components/AppDialogActions";
import AppButton from "@/components/AppButton";
import AppTextField from "@/components/AppTextField";
import { Field, Form, Formik, useFormikContext } from "formik";
import AppInputAdornment from "@/components/AppInputAdornment";
import AppMenu from "@/components/AppMenu";
import AppMenuItem from "@/components/AppMenuItem";
import AppListItemText from "@/components/AppListItemText";
import AppTooltip from "@/components/AppTooltip";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DownloadIcon from "@@/public/images/icons/download.svg";

import { useContext, useMemo, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { useIsMounted } from "@/hooks";

import type { FastFieldProps, FormikProps } from "formik";

type DownloadFormValues = {
  filename: string;
  file_extension: string;
};

type DownloadDialogProps = {
  open?: boolean;
  onClose?: () => void;
};

type FileExtensionSelectProps = {
  fileExtension?: string;
  onFileExtensionChange?: (fileExtension: string) => void;
};

const SubmitButton = () => {
  const { values, validateForm, handleSubmit } =
    useFormikContext<DownloadFormValues>();

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
      {t("download")}
    </AppButton>
  );
};

const FileExtensionSelect = (props: FileExtensionSelectProps) => {
  const { fileExtension: controlledFileExtension, onFileExtensionChange } =
    props;

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen = !!menuAnchorEl;

  const handleFileExtensionChange = (fileExtension: string) => () => {
    onFileExtensionChange && onFileExtensionChange(fileExtension);
    setMenuAnchorEl(null);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppButton
        color="text.primary"
        edge="end"
        endIcon={
          <ArrowDropDownIcon
            sx={(theme) => ({
              transition: theme.transitions.create(["rotate"]),
              rotate: !!menuOpen ? "180deg" : "0deg",
            })}
          />
        }
        onClick={handleMenuOpen}
      >
        {controlledFileExtension}
      </AppButton>
      <AppMenu
        anchorEl={menuAnchorEl}
        open={menuOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleMenuClose}
      >
        {commonConstants.excelExtensions.map((excelExtension) => (
          <AppMenuItem
            key={excelExtension}
            selected={excelExtension === controlledFileExtension}
            onClick={handleFileExtensionChange(excelExtension)}
          >
            <AppListItemText>{excelExtension}</AppListItemText>
          </AppMenuItem>
        ))}
      </AppMenu>
    </>
  );
};

const DownloadDialog = (props: DownloadDialogProps) => {
  const { open, onClose } = props;

  const { localeText, fetchedDataParams, downloadDataFile } =
    useContext(AppDataTableContext);

  const formikRef = useRef<FormikProps<DownloadFormValues> | null>(null);

  const { t } = useTranslation();

  const initialValues = useMemo<DownloadFormValues>(() => {
    return {
      filename: "",
      file_extension: ".xlsx",
    };
  }, []);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      filename: yup.string().trim().required(t("filenameIsRequired")),
    });
  }, []);

  const handleSubmit = async (values: DownloadFormValues) => {
    if (!downloadDataFile) return;

    loadingScreenOverlayService.fire(t("pending"));

    const { data, message, success } = await downloadDataFile({
      ...fetchedDataParams,
    });
    if (!success || !isMounted()) {
      !!message && toast.error(message);
      loadingScreenOverlayService.close();
      return;
    }
    try {
      const blobUrl = URL.createObjectURL(data!);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${values.filename}${values.file_extension}`;
      link.click();
      URL.revokeObjectURL(blobUrl);
      toast.success(t("downloadedSuccessfully"));
      onClose && onClose();
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
        <AppDialogTitle onClose={onClose}>{localeText.download}</AppDialogTitle>
        <AppDialogContent>
          <Field name="filename">
            {({ field, form, meta }: FastFieldProps) => (
              <AppTextField
                label={t("filename")!}
                required
                fullWidth
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
                endAdornment={
                  <AppInputAdornment position="end">
                    <FileExtensionSelect
                      fileExtension={form.values.file_extension}
                      onFileExtensionChange={(fileExtension) => {
                        form.setFieldValue("file_extension", fileExtension);
                      }}
                    />
                  </AppInputAdornment>
                }
                {...field}
              />
            )}
          </Field>
        </AppDialogContent>
        <AppDialogActions>
          <SubmitButton />
        </AppDialogActions>
      </AppDialog>
    </Formik>
  );
};

const Download = () => {
  const { localeText } = useContext(AppDataTableContext);

  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);

  const handleDownloadDialogOpen = () => {
    setDownloadDialogOpen(true);
  };

  const handleDownloadDialogClose = () => {
    setDownloadDialogOpen(false);
  };

  return (
    <>
      <AppTooltip title={localeText.download}>
        <AppIconButton variant="outlined" onClick={handleDownloadDialogOpen}>
          <AppSvgIcon component={DownloadIcon} fontSize="inherit" />
        </AppIconButton>
      </AppTooltip>
      <DownloadDialog
        open={downloadDialogOpen}
        onClose={handleDownloadDialogClose}
      />
    </>
  );
};

export default Download;
