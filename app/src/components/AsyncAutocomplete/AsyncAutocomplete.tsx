import axios from "axios";
import _isEqual from "lodash/isEqual";

import { axiosHelpers } from "@/utils/helpers";
import { roleApi } from "@/utils/apis";

import AppLoading from "@/components/AppLoading";
import AppTextField from "@/components/AppTextField";
import AppAutocomplete from "@/components/AppAutocomplete";
// import AppTypography from "@/components/AppTypography";
import VirtualizationListboxComponent from "./components/VirtualizationListboxComponent";
import AutocompleteListboxVirtualization from "@/components/AutocompleteListboxVirtualization";

import { useState, useRef, useEffect, useMemo } from "react";
import { useDebouncedCallback, useEventCallback, useIsMounted } from "@/hooks";
import { useTranslation } from "next-i18next";

import useStyles from "./AsyncAutocomplete.styles";

import type { AppAutocompleteProps } from "@/components/AppAutocomplete";
import type {
  CancelTokenSource,
  AxiosPromise,
  AxiosResponse,
  CancelToken,
} from "axios";
import type {
  AutocompleteRenderOptionState,
  AutocompleteInputChangeReason,
  AutocompleteValue,
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
  AutocompleteFreeSoloValueMapping,
  AutocompleteRenderInputParams,
  FilterOptionsState,
} from "@mui/material";
import type { FetchOptionRolesResponseData } from "@/utils/apis/role";

export type AsyncAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> = {
  module: Modules;
  moduleParams?: {
    [key: string]: any;
  };
  enabledInfiniteLoaderModule?: boolean;
  disabledModule?: boolean;
  name?: string;
  renderOption?: AsyncAutocompleteRenderOption<T>;
  // AppAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>["renderOption"]
  renderInput?: (
    params: AutocompleteRenderInputParams,
    moduleState: { options: any[]; isLoading: boolean }
  ) => React.ReactNode;
  onChange?: AsyncAutocompleteOnChange<T, Multiple, DisableClearable, FreeSolo>;
} & Omit<
  AppAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  | "options"
  | "renderInput"
  | "ListboxComponent"
  | "onChange"
  | "renderOption"
  | "ListboxComponent"
>;

type Modules = "roles";

type AsyncAutocompleteRenderOption<
  T = any,
  P = React.HTMLAttributes<HTMLLIElement>
> = (
  props: P,
  option: T,
  state: AutocompleteRenderOptionState
) => [P, React.ReactNode | React.ReactNode[]];

type AsyncAutocompleteOnInputChange = (
  event: React.SyntheticEvent<Element, Event>,
  value: string,
  reason: AutocompleteInputChangeReason
) => void;

type AsyncAutocompleteOnChange<T, Multiple, DisableClearable, FreeSolo> = (
  event: { target: { name: string; value: any } },
  value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<T>
) => void;

type ModuleMap<T, FreeSolo> = {
  [key in Modules]: {
    isServerSide?: boolean;
    keywordFieldName?: "search" | string;
    noOptionsText?: string;
    fetchData: (payload: {
      params: {
        page: number;
        limit: number;
        [x: string]: any;
      };
      cancelToken?: CancelToken;
    }) => AxiosPromise;
    customData: (response: AxiosResponse) => { list: Array<T>; count?: number };
    renderOption: AsyncAutocompleteRenderOption;
    getOptionLabel?: (
      option: T | AutocompleteFreeSoloValueMapping<FreeSolo>
    ) => string;
    isOptionEqualToValue?: (option: T, value: any) => boolean;
    filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[];
  };
};

const AsyncAutocomplete = <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  props: AsyncAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>
) => {
  const {
    module: controlledModule,
    moduleParams,
    enabledInfiniteLoaderModule,
    disabledModule,
    name,
    noOptionsText,
    multiple,
    ListboxProps,
    inputValue,
    classes: muiClasses,
    defaultInputProps,
    filterOptions,
    onInputChange,
    onOpen,
    onChange,
    onBlur,
    renderInput: controlledRenderInput,
    ...rest
  } = props;

  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(100);
  const [data, setData] = useState<T[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [internalInputValue, setInternalInputValue] = useState(
    inputValue ?? ""
  );

  const { classes, cx } = useStyles();
  const sourceRef = useRef<CancelTokenSource>(null!);
  const internalInputValueRef = useRef(inputValue);
  const inputReasonRef = useRef("");

  const {
    // t,
    // i18n,
  } = useTranslation();

  const moduleMap: ModuleMap<T, FreeSolo> = {
    roles: {
      isServerSide: true,
      fetchData: (payload) => {
        const { page, limit, ...restParams } = payload.params;

        return roleApi.fetchOptionRoles({
          params: {
            page: payload.params.page,
            per_page: payload.params.limit,
            ...restParams,
            filters: {
              keyword: payload.params.search!,
              ...restParams?.filters,
            },
          },
        });
      },
      customData: (response) => {
        const data = response.data as FetchOptionRolesResponseData;
        return {
          list: data.data ?? [],
          count: data.pagination.total ?? 0,
        } as any;
      },
      renderOption: (
        props,
        option: FetchOptionRolesResponseData["data"][number]
        // { selected }
      ) => {
        return [props, <>{option?.name}</>];
      },
      getOptionLabel: (option: any) => option?.name ?? "",
      isOptionEqualToValue: (option: any, value: any) => {
        return option?.id === value?.id;
      },
    },
  };

  const _module = moduleMap[controlledModule];

  const fetchData = async (payload?: {
    params?: any;
    isNextPage?: boolean;
  }) => {
    const { params, isNextPage } = payload || {};
    sourceRef.current?.cancel && sourceRef.current.cancel();
    sourceRef.current = axios.CancelToken.source();
    const setLoading = isNextPage ? setIsLoadingNextPage : setIsLoading;
    setLoading(true);
    setErrorMessage("");
    const { data: response } = await _module
      .fetchData({
        params,
        cancelToken: sourceRef.current.token,
      })
      .then((response) => {
        if (!axiosHelpers.checkRequestSuccess(response.data)) return response;

        const { list, count } = _module.customData(response.data);

        return {
          data: {
            ...response.data,
            data: {
              list,
              count: count || 0,
            },
          },
        };
      })
      .catch((error) => {
        return {
          data: {
            error: error,
            status: false,
            message: error?.response?.data?.message || error?.message,
          },
        };
      });

    if (!isMounted() || axios.isCancel(response?.error)) return;
    if (!axiosHelpers.checkRequestSuccess(response)) {
      setErrorMessage(response.message as string);
    } else {
      if (isNextPage && (response.data.list?.length || 0) > 0)
        setData((prevData) =>
          prevData.concat(
            response.data.list.filter((item: any) => {
              return !prevData.some((prevItem) => _isEqual(prevItem, item));
            })
          )
        );
      else if (!!response.data.list) setData(response.data.list);
      let page = params.page;
      let pageSize = params.limit;
      if (page * pageSize < (response.data.count || 0)) setHasNextPage(true);
      else setHasNextPage(false);
    }
    setLoading(false);
  };

  const debounceFetchData = useDebouncedCallback(fetchData, 250);

  const isServerSide = useMemo(() => {
    return !!_module.isServerSide;
  }, [_module.isServerSide]);

  const handleNextPageLoad = useEventCallback(() => {
    if (!!disabledModule) return;
    setPage((prevPage) => prevPage + 1);
    fetchData({
      params: {
        ...moduleParams,
        [_module.keywordFieldName || "search"]:
          inputReasonRef.current === "reset" ? undefined : internalInputValue,
        page: page + 1,
        limit: pageSize,
      },
      isNextPage: true,
    });
  });

  const autocompleteProps = useMemo(() => {
    if (!isServerSide)
      return {
        ListboxProps,
        filterOptions: filterOptions
          ? filterOptions
          : _module.filterOptions
          ? _module.filterOptions
          : undefined,
      };
    return {
      autoComplete: true,
      filterOptions: !!filterOptions
        ? filterOptions
        : !!_module.filterOptions
        ? _module.filterOptions
        : (x: any) => x,
      includeInputInList: true,
      // filterSelectedOptions: true,
      ListboxProps: {
        ...ListboxProps,
        hasNextPage,
        isLoadingNextPage,
        enabledInfiniteLoader: enabledInfiniteLoaderModule,
        onNextPageLoad: handleNextPageLoad,
      },
    };
  }, [
    ListboxProps,
    isServerSide,
    hasNextPage,
    isLoadingNextPage,
    enabledInfiniteLoaderModule,
  ]);

  const handleDataFetch = (
    payload?: { keyword: string },
    options?: { enabledDebounce: boolean }
  ) => {
    const { enabledDebounce } = options || {};
    const { keyword } = payload || {};

    if (isServerSide && !disabledModule) {
      setPage(1);
      setHasNextPage(true);
      const params = {
        ...moduleParams,
        ...payload,
        page: 1,
        limit: pageSize,
        [_module.keywordFieldName || "search"]: keyword,
      };
      if (enabledDebounce) debounceFetchData({ params });
      else fetchData({ params });
    }
  };

  const handleInputChange: AsyncAutocompleteOnInputChange = (
    event,
    newInputValue,
    reason
  ) => {
    inputReasonRef.current = reason;
    internalInputValueRef.current = newInputValue ?? "";
    setInternalInputValue(newInputValue ?? "");
    if (["input", "clear"].includes(reason)) {
      handleDataFetch({ keyword: newInputValue }, { enabledDebounce: true });
    }
    onInputChange && onInputChange(event, newInputValue, reason);
  };

  const handleChange: AsyncAutocompleteOnChange<
    T,
    Multiple,
    DisableClearable,
    FreeSolo
  > = (_, newValue: any, reason) => {
    onChange &&
      onChange(
        {
          target: {
            name: name || "",
            value: newValue,
          },
        },
        newValue,
        reason
      );
  };

  const handleOpen = (event: React.SyntheticEvent) => {
    handleDataFetch();
    onOpen && onOpen(event);
  };

  const renderInput = (params: AutocompleteRenderInputParams) => {
    const { InputProps, InputLabelProps, ...restParams } = params;

    return !!controlledRenderInput ? (
      controlledRenderInput(params, { options: data, isLoading })
    ) : (
      <AppTextField
        {...(restParams as any)}
        inputLabelProps={InputLabelProps}
        name={name}
        onBlur={onBlur ? (onBlur as any) : () => {}}
        {...defaultInputProps}
        autoComplete="new-password"
        ref={InputProps.ref}
        classes={{
          root: InputProps.className,
        }}
        startAdornment={InputProps.startAdornment}
        endAdornment={
          <>
            {data.length < 1 && isLoading ? <AppLoading size={24} /> : null}
            {InputProps.endAdornment}
          </>
        }
      />
    );
  };

  useEffect(() => {
    if (!isServerSide && !disabledModule) {
      setPage(1);
      debounceFetchData({
        params: {
          ...moduleParams,
          page: 1,
          page_size: pageSize,
        },
        isNextPage: false,
      });
    }
  }, [controlledModule, moduleParams]);

  useEffect(() => {
    if (inputValue !== internalInputValueRef.current) {
      setInternalInputValue(inputValue ?? "");
    }
  }, [inputValue]);

  const isMounted = useIsMounted();

  return (
    <>
      <AppAutocomplete
        disableCloseOnSelect={multiple}
        getOptionLabel={_module.getOptionLabel}
        isOptionEqualToValue={_module.isOptionEqualToValue}
        renderOption={_module.renderOption as any}
        loading={isLoading}
        {...rest}
        ListboxComponent={
          isServerSide
            ? (VirtualizationListboxComponent as any)
            : (AutocompleteListboxVirtualization as any)
        }
        {...autocompleteProps}
        inputValue={internalInputValue}
        classes={{
          ...muiClasses,
          listbox: cx(muiClasses?.listbox, classes.listBox),
        }}
        options={(isLoading || !!disabledModule ? [] : data) || []}
        multiple={multiple}
        noOptionsText={
          noOptionsText || errorMessage || _module.noOptionsText || undefined
        }
        renderInput={renderInput}
        onInputChange={handleInputChange}
        onOpen={handleOpen}
        onChange={handleChange as any}
      />
    </>
  );
};

export default AsyncAutocomplete;
