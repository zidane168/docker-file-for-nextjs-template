import { toast } from "react-toastify";
import { commonConfig, envConfig, localeConfig } from "@/utils/config";
import _capitalize from "lodash/capitalize";
import _camelCase from "lodash/camelCase";
import _uniqueId from "lodash/uniqueId";
import _kebabCase from "lodash/kebabCase";
import _round from "lodash/round";
import parser from "ua-parser-js";
import { isValidPhoneNumber as isValidLibPhone } from "libphonenumber-js";
import moment from "moment";

import type { GetServerSidePropsContext } from "next";

export const isMobile = () => {
  return (
    typeof window !== "undefined" &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );
};

export const getPhoneModel = () => {
  if (typeof window !== "undefined" && /Android/i.test(navigator.userAgent))
    return "android";

  if (typeof window !== "undefined" && /iPhone/i.test(navigator.userAgent))
    return "iPhone";

  if (typeof window !== "undefined" && /iPad/i.test(navigator.userAgent))
    return "iPad";

  if (typeof window !== "undefined" && /BlackBerry/i.test(navigator.userAgent))
    return "blackBerry";

  return "";
};

export const isIos = () => {
  return (
    typeof window !== "undefined" &&
    ([
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
      navigator.userAgent.includes("Mac"))
  );
};

export const isPhoneIos = () => {
  return (
    typeof window !== "undefined" &&
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform)
  );
};

export const getMobileOperatingSystem = () => {
  if (typeof window === "undefined") return null;

  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;

  if (/windows phone/i.test(userAgent)) {
    return "WINDOW_PHONE";
  }

  if (/android/i.test(userAgent)) {
    return "ANDROID";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) || userAgent.includes("Mac")) {
    return "IOS";
  }

  return null;
};

export const isEmpty = (value: any) => {
  return (
    ["", null, undefined].includes(value) ||
    (Array.isArray(value) && value.length === 0)
  );
};

export const isSomeEmpty = (values: any[]) => {
  return Array.isArray(values)
    ? values.some((val) => {
        return isEmpty(val);
      })
    : false;
};

export const isEveryEmpty = (values: any[]) => {
  return Array.isArray(values)
    ? values.every((val) => {
        return isEmpty(val);
      })
    : false;
};

export const isNumber = (number: any) => {
  return !isEmpty(number) && !isNaN(Number(number));
};

export const isUrl = (url: string) => {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
};

export const formatNumber = (
  number?: number | string,
  options?: Intl.NumberFormatOptions
) => {
  if (!isNumber(number)) return number;
  const locale = window.NextPublic.lang;
  return new Intl.NumberFormat(locale, options).format(Number(number));
};

export const decodeHTML = (input: string) => {
  const e = document.createElement("textarea");
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue || "";
};

export const formatFormData = (data: Object) => {
  const fd = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "undefined") return;
    if (Array.isArray(value) && value.some((v) => v instanceof File)) {
      fd.append(`${key}[]`, value as any);
    } else {
      fd.append(
        key,
        typeof value === "string" || value instanceof File
          ? value
          : JSON.stringify(value)
      );
    }
  });
  return fd;
};

export const checkAndNoticeToastError = (error: string, loading: boolean) => {
  if (!!error && !loading) toast.error(error);
};

export const parseJSS = (stringStyles: string | React.CSSProperties) =>
  typeof stringStyles === "string"
    ? stringStyles.split(";").reduce((acc, style) => {
        const colonPosition = style.indexOf(":");

        if (colonPosition === -1) {
          return acc;
        }

        const camelCaseProperty = style
          .substr(0, colonPosition)
          .trim()
          .replace(/^-ms-/, "ms-")
          .replace(/-./g, (c) => c.substr(1).toUpperCase());
        let value = style.substr(colonPosition + 1).trim();

        return value ? { ...acc, [camelCaseProperty]: value } : acc;
      }, {})
    : {};

export const isBooleanNumber = (value: any) => {
  return ["0", "1", 0, 1].includes(value);
};

export const prepareRequestParams = <Data = {}>(
  data: Data,
  options?: { enableClearEmptyValue?: boolean }
) => {
  const newData = { ...data } as any;
  Object.keys(newData).forEach((key) => {
    if (
      newData[key] == null ||
      (!!options?.enableClearEmptyValue && isEmpty(newData[key]))
    ) {
      delete newData[key];
    }
  });
  return newData as Data;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const formatBytes = (bytes: number, decimals: number = 2) => {
  if (!+bytes) return "0 bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["bytes", "Kb", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getURL = (path: string) => {
  const baseURL =
    typeof window === "undefined" ? envConfig.BASE_URL : window.location.origin;
  return new URL(path, baseURL).toString();
};

export const generateClassName = (
  sheetName: string,
  ruleName: string,
  identifier?: string
) => {
  return `${_capitalize(commonConfig.APP_CACHE_KEY)}${_capitalize(
    _camelCase(sheetName)
  )}-${_camelCase(ruleName)}${!isEmpty(identifier) ? `-${identifier}` : ""}`;
};

export const generateUniqueId = _uniqueId;

export const generateSlug = (slug?: string, suffix?: string | number) => {
  const kebabCaseSlug = _kebabCase(slug ?? "");
  const suffixLengthCount = !isEmpty(suffix) ? String(suffix).length + 1 : 0;
  return `${kebabCaseSlug.slice(0, 60 - suffixLengthCount)}${
    !isEmpty(suffix) ? `-${suffix}` : ""
  }`;
};

export const generateProductSlug = (
  productName?: string,
  productId?: string | number
) => {
  return generateSlug(productName, `p${productId}`);
};

export const generateUserSlug = <
  User extends {
    id?: string | number;
    username?: string;
    nickname?: string;
    realname?: string;
    [x: string]: any;
  } | null
>(
  user?: User
) => {
  if (!!user?.username) return user.username;
  const slug = user?.nickname;
  const suffix = user?.id;
  const kebabCaseSlug = _kebabCase(slug ?? "");
  const suffixLengthCount = !isEmpty(suffix) ? String(suffix).length + 1 : 0;
  return `${kebabCaseSlug.slice(0, 60 - suffixLengthCount)}${
    !isEmpty(suffix) ? `#${suffix}` : ""
  }`
    .replaceAll("-", ".")
    .replaceAll("#", "-");
};

export const getSlugId = (slug?: string) => {
  const splittedSlugs = (slug || "").split("-");
  if (splittedSlugs.length < 2) return null;
  const id = splittedSlugs.reverse()[0];
  return isNumber(id) ? parseInt(id) : null;
};

export const getUserSlugId = (slug?: string) => {
  const splittedSlugs = (slug || "").split("-");
  if (splittedSlugs.length < 2) return null;
  const id = splittedSlugs.reverse()[0];
  return isNumber(id) ? parseInt(id) : null;
};

export const getProductSlugId = (slug?: string) => {
  const splittedSlugs = (slug || "").split("-");
  if (splittedSlugs.length < 2) return null;
  const id = splittedSlugs.reverse()[0];
  if (id.charAt(0) !== "p") return null;
  return isNumber(id.replace(/^p/, "")) ? parseInt(id.replace(/^p/, "")) : null;
};

export const getOneRouterQueryValue = <T = any>(queryValue: any): T => {
  return Array.isArray(queryValue)
    ? [...queryValue].reverse()?.[0] ?? ""
    : queryValue;
};

export const downloadFiles = async (
  images:
    | {
        src: string;
        name?: string;
      }[]
    | {
        src: string;
        name?: string;
      }
) => {
  const _images = Array.isArray(images) ? images : [images];

  const preparedImages = _images.map((img) => {
    let name = img.name;
    if (!name) {
      name = img.src.split("/").reverse()[0];
    }
    return {
      src: img.src,
      name,
    };
  });

  try {
    for (const preparedImage of preparedImages) {
      const response = await fetch(preparedImage.src);

      const blobImage = await response.blob();

      const href = URL.createObjectURL(blobImage);

      const anchorElement = document.createElement("a");
      anchorElement.href = href;
      anchorElement.download = preparedImage.name;

      document.body.appendChild(anchorElement);
      anchorElement.click();

      document.body.removeChild(anchorElement);
      URL.revokeObjectURL(href);
    }
  } catch (error: any) {
    const message = error?.response?.data || error.message;
    return {
      status: false,
      message,
    };
  }

  return {
    status: true,
  };
};

export const encodeBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const decodeBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str, "base64").toString("ascii")
    : window.atob(str);

export const filePathLoader = (path?: string) => {
  return !!path ? `${envConfig.CDN_HOST}${path ?? ""}` : "";
};

export const parseStyles = (stringStyles: string | React.CSSProperties) =>
  typeof stringStyles === "string"
    ? stringStyles.split(";").reduce((acc, style) => {
        const colonPosition = style.indexOf(":");

        if (colonPosition === -1) {
          return acc;
        }

        const camelCaseProperty = style
            .substr(0, colonPosition)
            .trim()
            .replace(/^-ms-/, "ms-")
            .replace(/-./g, (c) => c.substr(1).toUpperCase()),
          value = style.substr(colonPosition + 1).trim();

        return value ? { ...acc, [camelCaseProperty]: value } : acc;
      }, {})
    : {};

export const serverSideAppSettings = async (
  ctx?: GetServerSidePropsContext
) => {
  const deviceType = !!ctx?.req
    ? parser(ctx.req.headers["user-agent"]).device.type || "desktop"
    : "desktop";
  const nonceHeaderValue = !!ctx?.req ? ctx.req.headers["x-nonce"] : "";

  return {
    app: {
      deviceType,
      nonce: nonceHeaderValue,
    },
  };
};

export const validateUrl = (url?: string) => {
  try {
    return !!new URL(url!);
  } catch {}
  return false;
};

export const validateDomain = (domain?: string) => {
  return /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(
    domain ?? ""
  );
};

export const parseHtmlWithUrl = (str: string) => {
  const restrictedUrlRegex =
    /((http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.(?:com|org|net|edu|gov|mil|int|biz|info|tv|io|me|co|uk|jp|au|ca|de|fr|it|es|nl|se|ch|at|eu|ru|cn|in|br|mx|ar|za|eg|ng)\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*))/gm;

  return str.replace(restrictedUrlRegex, (matched) => {
    let newMatched = matched;
    const urlPrefixExisted = ["https:", "http:", "www."].some((keyWord) =>
      matched.includes(keyWord)
    );
    if (!urlPrefixExisted) {
      newMatched = `//www.${matched}`;
    }
    const urlHtml = `<a href="${newMatched}">${matched}</a>`;
    return urlHtml;
  });
};

export const isYoutubeUrl = (youtubeUrl?: string) => {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
  const match = (youtubeUrl ?? "").match(regExp);
  return !!match && match[2].length == 11;
};

export const formatYoutubeUrl = (youtubeUrl?: string) => {
  if (!isYoutubeUrl(youtubeUrl)) return youtubeUrl;
  return (youtubeUrl ?? "").replace(/shorts\//, "embed/");
};

export const isOverlappedTime = (
  timeSegments: {
    from: string;
    to: string;
  }[]
) => {
  if (timeSegments.length === 1) return false;

  const newTimeSegments = [...timeSegments];

  newTimeSegments.sort((timeSegment1, timeSegment2) =>
    (timeSegment1.from ?? "").localeCompare(timeSegment2.to ?? "")
  );
  for (let i = 0; i < newTimeSegments.length - 1; i++) {
    const currentEndTime = newTimeSegments[i].from ?? "";
    const nextStartTime = newTimeSegments[i + 1].to ?? "";

    if (currentEndTime > nextStartTime) {
      return true;
    }
  }

  return false;
};

export const sortTimeSegments = (
  timeSegments: {
    from: string;
    to: string;
  }[]
) => {
  if (timeSegments.length === 1) return timeSegments;

  const newTimeSegments = [...timeSegments];

  newTimeSegments.sort((timeSegment1, timeSegment2) =>
    (timeSegment1.from ?? "").localeCompare(timeSegment2.to ?? "")
  );

  return newTimeSegments;
};

export const isValidPhoneNumber = (payload: {
  code?: string;
  phone: string;
}) => {
  const { code, phone } = payload || {};

  const countryCode =
    typeof code === "string" ? `${parseInt(code)}` : undefined;

  switch (countryCode) {
    case "852": {
      return /^(?!900|911|99[0-8])[2-9]\d{7}$/.test(phone);
    }
    case "853": {
      return /^28\d{6}$|^6\d{7}$/.test(phone);
    }
    case "86": {
      return /^1[3-9]\d{9}$|^14[0-4]{10}$/.test(phone);
    }
    default: {
      return isValidLibPhone(phone, {
        defaultCallingCode: countryCode,
      });
    }
  }
};

export const generateFieldNameByLanguage = (
  fieldName: string,
  language?: string
) => {
  const lang =
    language ?? typeof window !== "undefined"
      ? window?.NextPublic?.lang
      : localeConfig.DEFAULT_LOCALE;

  switch (lang) {
    case "en-US": {
      return `${fieldName}_en`;
    }
    case "zh-HK": {
      return `${fieldName}_hk`;
    }
    case "zh-CN": {
      return `${fieldName}_cn`;
    }
    default: {
      return fieldName;
    }
  }
};

export const getFieldValueByLanguage = (
  item: Record<string, any>,
  fieldName: string,
  language?: string
) => {
  const lang =
    language ?? typeof window !== "undefined"
      ? window?.NextPublic?.lang
      : localeConfig.DEFAULT_LOCALE;

  switch (lang) {
    case "en-US": {
      return item[`${fieldName}_en`] ?? item[fieldName];
    }
    case "zh-HK": {
      return item[`${fieldName}_hk`] ?? item[fieldName];
    }
    case "zh-CN": {
      return item[`${fieldName}_cn`] ?? item[fieldName];
    }
    default: {
      return item[fieldName];
    }
  }
};

export const mapDatesToGroupedDates = (dates: string[]) => {
  const dateToGroupedDatesMap: {
    [date: string]: string[];
  } = {};
  dates.forEach((dateString) => {
    const dateStringItems = dateString.split(" ");
    const date =
      !!dateStringItems[0] && moment(dateStringItems[0], "YYYY-MM-DD").isValid()
        ? moment(dateStringItems[0], "YYYY-MM-DD").format("YYYY-MM-DD")
        : "";
    const time =
      !!dateStringItems[1] && moment(dateStringItems[1], "HH:mm").isValid()
        ? moment(dateStringItems[1], "HH:mm").format("HH:mm")
        : "";
    if (!dateToGroupedDatesMap[date]) {
      dateToGroupedDatesMap[date] = !!time ? [time] : [];
    } else if (!!time) {
      dateToGroupedDatesMap[date].push(time);
    }
  });
  const results = Object.keys(dateToGroupedDatesMap).map((date) => {
    const times = [...dateToGroupedDatesMap[date]];
    times.sort((prevTime, nextTime) => (prevTime >= nextTime ? 1 : -1));
    return {
      date,
      times,
    };
  });
  results.sort((prevDate, nextDate) => (prevDate >= nextDate ? 1 : -1));
  return results;
};

export const generatePhoneNumberHref = (payload: {
  number: string;
  code?: string;
}) => {
  const { number, code } = payload ?? {};
  if (!number) return "";
  return `tel:${[code ? `+${code}` : `+`, number].join("").trim()}`;
};

export const generatePhoneNumberDisplay = (payload: {
  number: string;
  code?: string;
}) => {
  const { number, code } = payload ?? {};
  if (!number) return "";
  return [code ? `+${code} ` : `+`, number].join("").trim();
};
