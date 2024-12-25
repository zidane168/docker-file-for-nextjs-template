export const ADMIN_SIDEBAR_WIDTH = 260;
export const ADMIN_SIDEBAR_COLLAPSED_WIDTH = 16 * 2 + 24;

export const DEFAULT_REDIRECT_PATHNAME = "/admin/users";

export const DEFAULT_DATE_TIME_FORMAT = "DD/MM/YYYY [•] HH:mm";

export const FETCHED_MAXIMUM_PAGE = 5;

export const ADMIN_HEADER_ELE_ID = "AdminHeader-root";

export const NAME_TEXT_MIN_LENGTH = 3;
export const NAME_TEXT_MAX_LENGTH = 50;
export const TITLE_TEXT_MIN_LENGTH = 5;
export const TITLE_TEXT_MAX_LENGTH = 200;
export const DESCRIPTION_TEXT_MAX_LENGTH = 1000;
export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_MAX_LENGTH = 20;

export const FILE_MAX_SIZE = 2000 * 1000000; // 2000MB
export const VIDEO_FILE_MAX_SIZE = 100 * 1000000; // 100MB
export const IMAGE_FILE_MAX_SIZE = 5 * 1000000; // 5MB
export const videoExtensions = [
  ".mp4",
  ".m4p",
  ".m4v",
  ".webm",
  ".mpg",
  ".mp2",
  ".mpeg",
  ".mpe",
  ".mpv",
  ".ogg",
  ".avi",
  ".wmv",
  ".qt",
  ".flv",
  ".swf",
  ".avchd",
  ".mov",
] as const;
export const imageExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
  ".webp",
  ".gif",
  ".jfif",
  ".pjpeg",
  ".pjp",
] as const;
export const excelExtensions = [
  ".xlsx",
  ".xla",
  ".xlam",
  ".xls",
  ".xls",
  ".xlsb",
  ".xlsm",
  ".xlt",
  ".xltm",
  ".xltx",
  ".xlw",
] as const;
export const otherFileExtensions = [".pdf"] as const;
export const commonFileExtensions = [
  ...videoExtensions,
  ...imageExtensions,
  ...otherFileExtensions,
  ...excelExtensions,
] as const;

export const USERNAME_RULE_REGEX =
  /(^[0-9a-z]+$)|(^[0-9a-z]+([\.\_][0-9a-z]+)+)$/;
