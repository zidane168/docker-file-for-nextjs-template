import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import _isEqual from "lodash/isEqual";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { commonConstants } from "@/utils/constants";
import {
  IMAGE_FILE_MAX_SIZE,
  VIDEO_FILE_MAX_SIZE,
  FILE_MAX_SIZE,
  imageExtensions,
  videoExtensions,
  otherFileExtensions,
  commonFileExtensions,
  excelExtensions,
} from "@/utils/constants/common.constants";

import { Box, ButtonBase, Divider, Grid } from "@mui/material";
import AppTypography from "@/components/AppTypography";
import AppSvgIcon from "@/components/AppSvgIcon";
import AppIconButton from "@/components/AppIconButton";
import AppImage from "@/components/AppImage";
import AppTooltip from "@/components/AppTooltip";
import AppFormHelperText from "@/components/AppFormHelperText";
import AppInputLabel from "@/components/AppInputLabel";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddAVideoIcon from "@mui/icons-material/VideoCall";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import PlayIcon from "@mui/icons-material/PlayArrow";
import FileSvg from "@mui/icons-material/Description";
import ArrowMoveLeft from "@mui/icons-material/ArrowLeft";
import ArrowMoveRight from "@mui/icons-material/ArrowRight";

import { Trans, useTranslation } from "next-i18next";
import { useIsMounted } from "@/hooks";

import useStyles from "./NativeFileUpload.styles";

import type { BoxProps, GridProps } from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { AppFormHelperTextProps } from "@/components/AppFormHelperText";
import type { AppInputLabelProps } from "@/components/AppInputLabel";

export type NativeFileValue = {
  uuid?: string;
  name: string;
  extension?: string;
  thumbnail?: string;
  value?: string;
  file?: File;
};

type CustomNativeFileUploadProps = {
  variant?: "video" | "image" | "file";
  acceptedFileExtensions?: Array<(typeof commonFileExtensions)[number]>;
  acceptedFileTypes?: Array<"video" | "image" | "excel" | "other">;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  moveable?: boolean;
  max?: number;
  value?: any;
  name?: string;
  label?: React.ReactNode;
  inputLabelProps?: AppInputLabelProps;
  helperText?: React.ReactNode;
  formHelperTextProps?: AppFormHelperTextProps;
  classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
  fileItemGridContainerProps?: GridProps;
  fileItemGridItemProps?: GridProps;
  getFileItemTag?: (file: any, index: number) => React.ReactNode;
  onChange?: (
    event: {
      target: {
        value?: any;
        name?: string;
      };
    },
    value: NativeFileValue
  ) => void;
};

export type NativeFileUploadProps = Omit<
  BoxProps,
  keyof CustomNativeFileUploadProps
> &
  CustomNativeFileUploadProps;

type NativeFileUploadTypeMap<P = {}, D extends React.ElementType = "div"> = {
  props: P & NativeFileUploadProps;
  defaultComponent: D;
};
type NativeFileUploadComponent = OverridableComponent<NativeFileUploadTypeMap>;

const mapValueToFileValue = <
  V extends Partial<NativeFileValue> | null | Partial<NativeFileValue>[]
>(
  value: V,
  options?: { multiple?: boolean }
): NativeFileValue[] => {
  const { multiple } = options || {};
  if (!!multiple) {
    return Array.isArray(value)
      ? value.map((v) => {
          const uuid = uuidv4();

          return {
            uuid: uuid,
            name: v.name!,
            extension: v.extension,
            thumbnail: v.thumbnail,
            value: v.value,
          };
        })
      : [];
  }
  const uuid = uuidv4();
  const v = value as NativeFileValue | null;
  return !!v
    ? [
        {
          uuid: uuid,
          name: v.name!,
          extension: v.extension,
          thumbnail: v.thumbnail,
          value: v.value,
        },
      ]
    : [];
};

const NativeFileUpload: NativeFileUploadComponent = forwardRef(
  (props: NativeFileUploadProps, ref: React.ForwardedRef<any>) => {
    const {
      required,
      disabled,
      error,
      multiple,
      moveable,
      name,
      max,
      value,
      label,
      inputLabelProps,
      helperText,
      formHelperTextProps,
      className,
      variant = "file",
      acceptedFileExtensions: controlledAcceptedFileExtensions,
      acceptedFileTypes,
      classes: appClasses,
      fileItemGridContainerProps,
      fileItemGridItemProps,
      getFileItemTag,
      onChange,
      ...rest
    } = props;

    const { t } = useTranslation();

    const [hightLight, setHightLight] = useState(false);
    const [files, setFiles] = useState<NativeFileValue[]>(
      mapValueToFileValue(value, { multiple })
    );

    const currentValueRef = useRef(value);
    const currentFilesRef = useRef(files);
    const createdObjectUrlsRef = useRef<string[]>([]);

    const { classes, cx } = useStyles(undefined, {
      props: {
        classes: appClasses,
      },
    });

    const inputRef = useRef<HTMLInputElement>(null!);

    const acceptedFileExtensions = useMemo(() => {
      if (!!controlledAcceptedFileExtensions) {
        return controlledAcceptedFileExtensions.map(
          (acceptedFileExtension) => `.${acceptedFileExtension}`
        );
      }
      if (!!acceptedFileTypes) {
        let newAcceptedFileExtensions: string[] = [];
        if (acceptedFileTypes.includes("image"))
          newAcceptedFileExtensions =
            newAcceptedFileExtensions.concat(imageExtensions);
        if (acceptedFileTypes.includes("excel"))
          newAcceptedFileExtensions =
            newAcceptedFileExtensions.concat(excelExtensions);
        if (acceptedFileTypes.includes("video"))
          newAcceptedFileExtensions =
            newAcceptedFileExtensions.concat(videoExtensions);
        if (acceptedFileTypes.includes("other"))
          newAcceptedFileExtensions =
            newAcceptedFileExtensions.concat(otherFileExtensions);
        return newAcceptedFileExtensions;
      }
      if (variant === "video") return videoExtensions as unknown as string[];
      if (variant === "image") return imageExtensions as unknown as string[];
      return commonFileExtensions as unknown as string[];
    }, [variant, controlledAcceptedFileExtensions, acceptedFileTypes]);

    const Icon = useMemo(() => {
      if (variant === "video") return AddAVideoIcon;
      if (variant === "image") return AddAPhotoIcon;
      return AddIcon;
    }, [variant]);

    const title = useMemo(() => {
      if (variant === "video")
        return (
          <Trans
            t={t}
            defaults="selectOrDragVideo_html"
            components={{
              p1: (
                <AppTypography
                  variant="bodySemi16"
                  color={disabled ? "text.disabled" : "text.primary"}
                  component="span"
                />
              ),
            }}
          />
        );
      if (variant === "image")
        return (
          <Trans
            t={t}
            defaults="selectOrDragPhoto_html"
            components={{
              p1: (
                <AppTypography
                  variant="bodySemi16"
                  color={disabled ? "text.disabled" : "text.primary"}
                  component="span"
                />
              ),
            }}
          />
        );
      return (
        <Trans
          t={t}
          defaults="selectOrDragFile_html"
          components={{
            p1: (
              <AppTypography
                variant="bodySemi16"
                color={disabled ? "text.disabled" : "text.primary"}
                component="span"
              />
            ),
          }}
        />
      );
    }, [variant, disabled, t]);

    const subtitle = useMemo(() => {
      if (variant === "video")
        return (
          <AppTypography color="text.secondary">
            (
            {!multiple || !!max
              ? t("uploadVideoMaxCountWithCount", {
                  count: !!multiple ? max ?? 1 : 1,
                })
              : t("uploadAtLeastCountVideoWithCount", {
                  count: 1,
                })}
            )
          </AppTypography>
        );
      if (variant === "image")
        return (
          <AppTypography color="text.secondary">
            (
            {!multiple || !!max
              ? t("uploadPhotoMaxCountWithCount", {
                  count: !!multiple ? max ?? 1 : 1,
                })
              : t("uploadAtLeastCountPhotoWithCount", {
                  count: 1,
                })}
            )
          </AppTypography>
        );
      return (
        <AppTypography color="text.secondary">
          (
          {!multiple || !!max
            ? t("uploadFileMaxCountWithCount", {
                count: !!multiple ? max ?? 1 : 1,
              })
            : t("uploadAtLeastCountFileWithCount", {
                count: 1,
              })}
          )
        </AppTypography>
      );
    }, [variant, max, multiple, t]);

    const changeFileValue = async (_files: File[]) => {
      if (multiple && !!max && (max ?? 1) < files.length + _files.length) {
        toast.error(t("uploadedFileMaxCountErrorMessage"));
        return;
      }
      const acceptedFiles: typeof files = [];
      const invalidFiles: string[] = [];
      const overSizedFiles: string[] = [];
      const overSizedVideoFiles: string[] = [];
      const overSizedImageFiles: string[] = [];

      _files.forEach((newFile) => {
        const fileExtension = `.${
          newFile.name.split(".").reverse()[0]
        }`.toLowerCase();
        if (
          commonConstants.imageExtensions.includes(fileExtension as any) &&
          newFile.size > IMAGE_FILE_MAX_SIZE
        )
          overSizedImageFiles.push(newFile.name);
        else if (
          commonConstants.videoExtensions.includes(fileExtension as any) &&
          newFile.size > VIDEO_FILE_MAX_SIZE
        )
          overSizedVideoFiles.push(newFile.name);
        else if (newFile.size > FILE_MAX_SIZE)
          overSizedFiles.push(newFile.name);
        else if (!acceptedFileExtensions.includes(fileExtension))
          invalidFiles.push(newFile.name);
        else {
          const uuid = uuidv4();
          const duplicateFileCount = files.filter(
            (f) => f.name === newFile.name
          ).length;
          if (duplicateFileCount > 0 && !!multiple) {
            const blob = newFile.slice(0, newFile.size, newFile.type);
            const originalName = newFile.name.split(".").slice(0, -1).join(".");
            newFile = new File(
              [blob],
              `${originalName}-${uuid}${fileExtension}`,
              {
                type: newFile.type,
              }
            );
          }

          const thumbnail = (imageExtensions as unknown as string).includes(
            fileExtension
          )
            ? URL.createObjectURL(newFile)
            : "";
          acceptedFiles.push({
            uuid,
            extension: fileExtension,
            name: newFile.name,
            file: newFile,
            thumbnail,
            value: "",
          });
          !!thumbnail && createdObjectUrlsRef.current.push(thumbnail);
        }
      });

      invalidFiles.length > 0 &&
        toast.error(
          t("invalidObjectMessage", {
            count: invalidFiles.length,
            object: invalidFiles.join(", "),
          })
        );

      overSizedFiles.length > 0 &&
        toast.error(
          t("uploadedFileMaxSizeErrorMessage", {
            count: invalidFiles.length,
            fileName: invalidFiles.join(", "),
            fileMaxSize: FILE_MAX_SIZE / 1000000,
          })!
        );
      overSizedImageFiles.length > 0 &&
        toast.error(
          t("uploadedFileMaxSizeErrorMessage", {
            count: invalidFiles.length,
            fileName: invalidFiles.join(", "),
            fileMaxSize: IMAGE_FILE_MAX_SIZE / 1000000,
          })
        );
      overSizedVideoFiles.length > 0 &&
        toast.error(
          t("uploadedFileMaxSizeErrorMessage", {
            count: invalidFiles.length,
            fileName: invalidFiles.join(", "),
            fileMaxSize: VIDEO_FILE_MAX_SIZE / 1000000,
          })
        );

      if (acceptedFiles.length < 1) return;

      const newFiles = multiple
        ? [...files, ...acceptedFiles]
        : [...acceptedFiles];
      currentFilesRef.current = newFiles;
      currentValueRef.current = multiple ? newFiles : newFiles[0];
      setFiles(newFiles);
      onChange &&
        onChange(
          {
            target: {
              name,
              value: currentValueRef.current,
            },
          },
          currentValueRef.current
        );
    };

    const handleRemove =
      ({ index }: { index: number }) =>
      () => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        currentFilesRef.current = newFiles;
        setFiles(newFiles);
        currentValueRef.current = multiple ? newFiles : newFiles[0];
        onChange &&
          onChange(
            {
              target: {
                name,
                value: currentValueRef.current,
              },
            },
            currentValueRef.current
          );
      };

    const handleChange: React.ChangeEventHandler<
      HTMLInputElement & EventTarget
    > = (event) => {
      const files = Array.from(event.target.files!);
      changeFileValue(files);
      event.target.value = "";
    };

    const handleDragOver: React.DragEventHandler = (event) => {
      event.preventDefault();
      if (!!disabled) return;
      setHightLight(true);
    };

    const handleDragLeave = () => {
      setHightLight(false);
    };

    const handleFileItemMoveRight = (fileIndex: number) => () => {
      const newFiles = [...currentFilesRef.current];
      if (fileIndex + 1 > newFiles.length - 1) return;
      const [reorderedNewFiles] = newFiles.splice(fileIndex, 1);
      newFiles.splice(fileIndex + 1, 0, reorderedNewFiles);
      currentFilesRef.current = newFiles;
      currentValueRef.current = multiple ? newFiles : newFiles[0];
      setFiles(newFiles);
      onChange &&
        onChange(
          {
            target: {
              name,
              value: currentValueRef.current,
            },
          },
          currentValueRef.current
        );
    };

    const handleFileItemMoveLeft = (fileIndex: number) => () => {
      if (fileIndex - 1 < 0) return;
      const newFiles = [...currentFilesRef.current];
      const [reorderedNewFiles] = newFiles.splice(fileIndex, 1);
      newFiles.splice(fileIndex - 1, 0, reorderedNewFiles);
      currentFilesRef.current = newFiles;
      currentValueRef.current = multiple ? newFiles : newFiles[0];
      setFiles(newFiles);
      onChange &&
        onChange(
          {
            target: {
              name,
              value: currentValueRef.current,
            },
          },
          currentValueRef.current
        );
    };

    const handleDrop: React.DragEventHandler = (event) => {
      event.preventDefault();
      setHightLight(false);
      if (!!disabled) return;
      const files = Array.from(event.dataTransfer.files);
      changeFileValue(files);
    };

    useEffect(() => {
      if (!isMounted()) return;
      if (!_isEqual(value, currentValueRef.current)) {
        currentValueRef.current = value;
        const newFiles = mapValueToFileValue(value, { multiple });
        currentFilesRef.current = newFiles;
        setFiles(newFiles);
      }
    }, [value, multiple]);

    useEffect(() => {
      if (!isMounted()) return;
      currentFilesRef.current = [];
      setFiles([]);
    }, [multiple]);

    useEffect(() => {
      if (!isMounted()) return;
      createdObjectUrlsRef.current = createdObjectUrlsRef.current.filter(
        (createdObjectUrl) => {
          if (files.some((file) => file.thumbnail === createdObjectUrl)) {
            return true;
          }
          URL.revokeObjectURL(createdObjectUrl);
          return false;
        }
      );
    }, [files]);

    useEffect(() => {
      return () => {
        createdObjectUrlsRef.current.forEach((createdObjectUrl) => {
          URL.revokeObjectURL(createdObjectUrl);
        });
      };
    }, []);

    const isMounted = useIsMounted();

    return (
      <Box
        ref={ref}
        className={cx(
          classes.root,
          {
            [classes.error]: !!error && !disabled,
            [classes.disabled]: !!disabled,
          },
          className
        )}
        {...rest}
      >
        {typeof label !== "undefined" && (
          <AppInputLabel
            error={error}
            required={required}
            {...inputLabelProps}
            className={cx(classes.inputLabel, inputLabelProps?.className)}
            component="p"
          >
            {label}
          </AppInputLabel>
        )}
        <ButtonBase
          component="label"
          className={cx(classes.outlinedUpload, {
            [classes.outlinedUploadDragOver]: !disabled && hightLight,
          })}
          disableRipple={!!disabled}
          disableTouchRipple={!!disabled}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            disabled={!!disabled}
            type="file"
            accept={acceptedFileExtensions.join(", ")}
            multiple={!!multiple}
            className={classes.outlinedUploadInput}
            onChange={handleChange}
          />
          <AppSvgIcon
            component={Icon}
            color={disabled ? "text.disabled" : "text.primary"}
          />
          <AppTypography
            mt={0.5}
            color={disabled ? "text.disabled" : "text.primary"}
          >
            {title}
          </AppTypography>
          {subtitle}
        </ButtonBase>
        {typeof helperText !== "undefined" && (
          <AppFormHelperText error={error} {...formHelperTextProps}>
            {helperText}
          </AppFormHelperText>
        )}
        {files.length > 0 && (
          <>
            <Divider sx={{ my: 2.5 }} />
            <Grid container spacing={2.5} {...fileItemGridContainerProps}>
              {files.map((file, fileIndex) => (
                <Grid
                  xs="auto"
                  {...fileItemGridItemProps}
                  key={file.uuid || `${file.name}-${fileIndex}`}
                  item
                >
                  <div className={classes.fileItem}>
                    <div className={classes.fileItemThumbnail}>
                      <div className={classes.fileItemToolbar}>
                        {moveable && (
                          <>
                            <AppTooltip placement="top" title={t("moveLeft")}>
                              <Box component="span" display="flex">
                                <AppIconButton
                                  variant="text"
                                  color="text.primary"
                                  borderRadius="circular"
                                  sx={{ p: 0.25, m: -0.25 }}
                                  disabled={fileIndex === 0}
                                >
                                  <AppSvgIcon
                                    component={ArrowMoveLeft}
                                    fontSize="inherit"
                                    onClick={handleFileItemMoveLeft(fileIndex)}
                                  />
                                </AppIconButton>
                              </Box>
                            </AppTooltip>
                            <AppTooltip placement="top" title={t("moveRight")}>
                              <Box component="span" display="flex">
                                <AppIconButton
                                  variant="text"
                                  color="text.primary"
                                  borderRadius="circular"
                                  sx={{ p: 0.25, m: -0.25 }}
                                  disabled={fileIndex === files.length - 1}
                                >
                                  <AppSvgIcon
                                    component={ArrowMoveRight}
                                    fontSize="inherit"
                                    onClick={handleFileItemMoveRight(fileIndex)}
                                  />
                                </AppIconButton>
                              </Box>
                            </AppTooltip>
                          </>
                        )}
                        <AppTooltip placement="top" title={t("delete")}>
                          <AppIconButton
                            variant="text"
                            color="text.primary"
                            borderRadius="circular"
                            sx={{ p: 0.25, m: -0.25 }}
                          >
                            <AppSvgIcon
                              component={CancelIcon}
                              fontSize="inherit"
                              onClick={handleRemove({
                                index: fileIndex,
                              })}
                            />
                          </AppIconButton>
                        </AppTooltip>
                      </div>
                      {!!file.thumbnail && (
                        <AppImage
                          src={file.thumbnail}
                          fill
                          objectFit="cover"
                          objectPosition="center"
                        />
                      )}
                      {(videoExtensions as unknown as string).includes(
                        file.extension!
                      ) ? (
                        <AppSvgIcon
                          className={classes.fileItemPlayIcon}
                          component={PlayIcon}
                        />
                      ) : (
                        !(imageExtensions as unknown as string).includes(
                          file.extension!
                        ) && <FileSvg className={classes.fileItemFileSvg} />
                      )}
                      <div className={classes.fileItemBottomToolbar}>
                        {getFileItemTag &&
                          !!getFileItemTag(file, fileIndex) && (
                            <div className={classes.fileItemTag}>
                              {getFileItemTag(file, fileIndex)}
                            </div>
                          )}
                      </div>
                    </div>
                    {!!file.name && (
                      <AppTypography className={classes.fileItemLabel}>
                        {file.name}
                      </AppTypography>
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    );
  }
);

export default NativeFileUpload;
