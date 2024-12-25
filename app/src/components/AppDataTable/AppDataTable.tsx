import _isFunction from "lodash/isFunction";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";

import {
  useReactTable,
  getCoreRowModel,
  type PaginationState,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Box,
  createFilterOptions,
  TableSortLabel,
  useEventCallback,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AppTable from "@/components/AppTable";
import AppTableContainer from "@/components/AppTableContainer";
import AppTableHead from "@/components/AppTableHead";
import AppTableRow from "@/components/AppTableRow";
import AppTableCell from "@/components/AppTableCell/AppTableCell";
import AppTableBody from "@/components/AppTableBody";
import Search from "@/components/AppDataTable/components/Search";
import CustomFilter from "@/components/AppDataTable/components/CustomFilter";
import AppLoading from "@/components/AppLoading";
import AppIconButton from "@/components/AppIconButton";
import AppTooltip from "@/components/AppTooltip";
import AppSvgIcon from "@/components/AppSvgIcon";
import Upload from "./components/Upload";
import Download from "./components/Download";
import Pagination from "@/components/AppDataTable/components/Pagination";

import ImportExportIcon from "@@/public/images/icons/import-export.svg";
import ArrowDownwardIcon from "@@/public/images/icons/arrow-down.svg";
import CachedIcon from "@@/public/images/icons/cached.svg";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

import { useTranslation } from "next-i18next";
import { useDataTableState } from "@/components/AppDataTable/hooks";

import AppDataTableContext from "@/components/AppDataTable/AppDataTable.context";

import useStyles from "./AppDataTable.styles";

import type { AppTableCellProps } from "@/components/AppTableCell/AppTableCell";
import type {
  TableOptions,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import type { AppTableContainerProps } from "@/components/AppTableContainer";
import type { AppDataTableContextValue } from "@/components/AppDataTable/AppDataTable.context";
import type { CellContext } from "@tanstack/react-table";
import type { Grid2Props } from "@mui/material";

export type DataTableColumn<D extends Record<string, any>> = {
  tableCellProps?: AppTableCellProps;
  tableBodyCellProps?:
    | AppTableCellProps
    | ((info: CellContext<D, any>) => AppTableCellProps);
} & ColumnDef<D>;

export type OnFetchParams = {
  pageIndex: number;
  pageSize: number;
  globalFilter: string;
  sorting: SortingState;
  customFilters: CustomFilter[];
};

export type CustomFilterField<D extends Record<string, any> = {}> = {
  id: string;
  label?: string;
  multiple?: boolean;
  gridItemProps?: Grid2Props;
  renderInput: (payload: {
    inputProps: {
      name: string;
      value: any;
      onChange: React.ChangeEventHandler<HTMLInputElement>;
      onBlur: React.FocusEventHandler<HTMLInputElement>;
    };
    meta: {
      label: string;
    };
  }) => React.ReactNode;
  isOptionEqualToValue?: (item: D, customFilter: CustomFilter) => boolean;
};

export type CustomFilter = {
  id: string;
  value: any;
};

type AppDataTableState = {
  sorting: {
    id: string;
    desc: boolean;
  }[];
  columnPinning: {
    left: string[];
    right: string[];
  };
  customFilters: CustomFilter[];
  globalFilter: string;
  pagination: {
    pageSize: number;
    pageIndex: number;
  };
};

export type AppDataTableApiRef = {
  state: AppDataTableState;
  refetch: () => void;
  resetState: () => void;
  resetPageIndex: () => void;
  setSorting: React.Dispatch<SortingState>;
  changeGlobalFilter: (globalFilter: string) => void;
  changeCustomFilters: (customFilters: CustomFilter[]) => void;
};

export type AppDataTableProps<D extends Record<string, any> = {}> = {
  name?: string;
  title?: React.ReactNode;
  columns: DataTableColumn<D>[];
  customFilterFields?: CustomFilterField<D>[];
  data: TableOptions<D>["data"];
  dataCount?: number;
  initialState?: {
    sorting?: {
      id: string;
      desc: boolean;
    }[];
    columnPinning?: {
      left?: string[];
      right?: string[];
    };
    customFilters?: CustomFilter[];
    globalFilter?: string;
    rowSelection?: Record<number, boolean>;
    pagination?: {
      pageIndex?: number;
      pageSize?: number;
    };
  };
  loading?: boolean;
  searchable?: boolean;
  refetchable?: boolean;
  enableSortingRemoval?: boolean;
  localeText?: {
    search?: string;
    download?: string;
    upload?: string;
  };
  apiRef?: React.ForwardedRef<AppDataTableApiRef>;
  tableContainerProps?: AppTableContainerProps;
  tableBodyCellProps?:
    | AppTableCellProps
    | ((info: CellContext<D, any>) => AppTableCellProps);
  onFetch?: (params: OnFetchParams) => void;
  downloadDataFile?: (params: OnFetchParams) => Promise<{
    data: Blob | null;
    success: boolean;
    message?: string;
  }>;
  uploadDataFile?: (params: { file: File }) => Promise<{
    success: boolean;
    message?: string;
  }>;
  downloadDataSampleFile?: () => Promise<{
    data: Blob | null;
    success: boolean;
    message?: string;
  }>;
};

const AppImportExportIcon = forwardRef(
  (props: any, ref: React.ForwardedRef<any>) => {
    return <AppSvgIcon {...props} ref={ref} component={ImportExportIcon} />;
  }
);

const AppArrowDownwardIcon = forwardRef(
  (props: any, ref: React.ForwardedRef<any>) => {
    return <AppSvgIcon {...props} ref={ref} component={ArrowDownwardIcon} />;
  }
);

const AppDataTable = <D extends Record<string, any>>(
  props: AppDataTableProps<D>
) => {
  const {
    name,
    title,
    columns,
    data: controlledData,
    dataCount: controlledDataCount = 0,
    loading,
    searchable,
    initialState,
    enableSortingRemoval = false,
    refetchable,
    localeText: controlledLocaleText,
    apiRef,
    tableContainerProps,
    tableBodyCellProps,
    customFilterFields = [],
    onFetch,
    downloadDataSampleFile,
    downloadDataFile,
    uploadDataFile,
  } = props;

  const { t, i18n } = useTranslation();

  const key = i18n.language;

  const [{ pageIndex, pageSize }, setPagination] =
    useDataTableState<PaginationState>(
      !!name
        ? `DATA_TABLE_PAGINATION_${i18n.language.toUpperCase()}:${name}`
        : null,
      {
        pageIndex: initialState?.pagination?.pageIndex ?? 0,
        pageSize: initialState?.pagination?.pageSize ?? 10,
      }
    );
  const [sorting, setSorting] = useDataTableState<SortingState>(
    !!name ? `DATA_TABLE_SORTING_${key}:${name}` : null,
    initialState?.sorting ?? []
  );
  const [globalFilter, setGlobalFilter] = useDataTableState(
    !!name ? `DATA_TABLE_GLOBAL_FILTER_${key}:${name}` : null,
    initialState?.globalFilter ?? ""
  );
  const [customFilters, setCustomFilters] = useDataTableState<CustomFilter[]>(
    !!name ? `DATA_TABLE_CUSTOM_FILTER_${key}:${name}` : null,
    initialState?.customFilters ?? []
  );
  const [columnPinning] = useDataTableState<{
    left: string[];
    right: string[];
  }>(
    !!name
      ? `DATA_TABLE_ROW_SELECTION_${i18n.language.toUpperCase()}:${name}`
      : null,
    {
      left: initialState?.columnPinning?.left ?? [],
      right: initialState?.columnPinning?.right ?? [],
    }
  );

  const fetchedDataParams: OnFetchParams = {
    pageIndex,
    pageSize,
    sorting,
    globalFilter,
    customFilters,
  };

  const isServerSide = !!onFetch;

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    trim: true,
    limit: controlledData.length,
  });

  const data = useMemo(() => {
    if (
      customFilterFields.length > 0 &&
      customFilters.length > 0 &&
      !isServerSide
    ) {
      const newCustomFilters = customFilters.map((customFilter) => {
        return {
          ...customFilter,
          customFilterField:
            customFilterFields.find(
              (customFilterField) => customFilterField.id === customFilter.id
            ) ?? null,
        };
      });
      return controlledData.filter((item) => {
        return newCustomFilters.every((customFilter) => {
          if (!!customFilter.customFilterField?.isOptionEqualToValue) {
            return customFilter.customFilterField.isOptionEqualToValue(item, {
              id: customFilter.id,
              value: customFilter.value,
            });
          }
          return (
            filterOptions([item], {
              inputValue: `${customFilter.value}`,
              getOptionLabel: (option: any) => {
                const value = option[customFilter.id];
                return Array.isArray(value)
                  ? value.join(" ")
                  : `${value ?? ""}`;
              },
            }).length > 0
          );
        });
      });
    }
    return controlledData;
  }, [controlledData, customFilterFields, customFilters, isServerSide]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const reactTable = useReactTable({
    columns,
    data,
    pageCount: isServerSide
      ? Math.ceil(controlledDataCount / pageSize)
      : undefined,
    initialState: {
      sorting: initialState?.sorting,
      globalFilter: initialState?.globalFilter,
      pagination: {
        pageIndex: initialState?.pagination?.pageIndex ?? 0,
        pageSize: initialState?.pagination?.pageSize ?? 10,
      },
      columnPinning: {
        left: columnPinning?.left ?? [],
        right: columnPinning?.right ?? [],
      },
    },
    state: {
      sorting,
      globalFilter,
      pagination,
      columnPinning: {
        left: columnPinning?.left ?? [],
        right: columnPinning?.right ?? [],
      },
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: !isServerSide ? getPaginationRowModel() : undefined,
    getSortedRowModel: !isServerSide ? getSortedRowModel() : undefined,
    getFilteredRowModel: !isServerSide ? getFilteredRowModel() : undefined,
    manualPagination: isServerSide,
    manualSorting: isServerSide,
    manualFiltering: isServerSide,
    autoResetPageIndex: false,
    autoResetAll: false,
    enableSortingRemoval,
  });

  const { rows: reactTableRows, rowsById: reactTableIdToRowsMap } =
    reactTable.getRowModel();

  const pageCount = reactTable.getPageCount();
  const dataCount = isServerSide
    ? controlledDataCount
    : Object.entries(reactTableIdToRowsMap).length;

  const { classes, cx } = useStyles();

  const localeText = useMemo(() => {
    return {
      search: `${t("search")}...`,
      download: `${t("downloadFile")}`,
      upload: `${t("uploadFile")}`,
      ...controlledLocaleText,
    };
  }, [controlledLocaleText, t]);

  const changePageIndex = (newPage: number) => {
    reactTable.resetPageIndex();
    reactTable.setPageIndex(newPage);
  };

  const changeGlobalFilter = (globalFilter: string) => {
    reactTable.resetPageIndex();
    reactTable.setGlobalFilter(globalFilter);
  };

  const resetState = useEventCallback(() => {
    reactTable.resetGlobalFilter();
    reactTable.resetPageIndex();
    reactTable.resetPageSize();
    reactTable.resetSorting();
    setCustomFilters([]);
  });

  const changePageSize = (newPageSize: number) => {
    reactTable.resetPageIndex();
    reactTable.setPageSize(newPageSize);
  };

  const changeCustomFilters: AppDataTableContextValue["changeCustomFilters"] = (
    customFilters
  ) => {
    reactTable.resetPageIndex();
    setCustomFilters(customFilters);
  };

  const clearCustomFilters = () => {
    reactTable.resetPageIndex();
    setCustomFilters([]);
  };

  const removeCustomFilter = (customFilterId: CustomFilter["id"]) => {
    const newCustomFilter = [...customFilters].filter(
      (customFilter) => customFilter.id !== customFilterId
    );
    reactTable.resetPageIndex();
    setCustomFilters(newCustomFilter);
  };

  const executeOnFetchData = useEventCallback(onFetch ?? (() => {}));

  const refetch = useEventCallback((params?: OnFetchParams) => {
    executeOnFetchData({
      ...fetchedDataParams,
      ...params,
    });
  });

  const resetPageIndex = () => {
    reactTable.resetPageIndex();
  };

  useEffect(() => {
    executeOnFetchData({
      ...fetchedDataParams,
    });
  }, [
    fetchedDataParams.customFilters,
    fetchedDataParams.globalFilter,
    fetchedDataParams.pageIndex,
    fetchedDataParams.sorting,
    fetchedDataParams.pageSize,
  ]);

  useImperativeHandle(apiRef, () => ({
    state: {
      columnPinning,
      customFilters,
      globalFilter,
      sorting,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    refetch,
    setSorting,
    changeCustomFilters,
    changeGlobalFilter,
    resetState,
    resetPageIndex,
  }));

  return (
    <AppDataTableContext.Provider
      value={{
        customFilters,
        customFilterFields,
        localeText,
        isServerSide,
        globalFilter,
        dataCount,
        pageCount,
        pageIndex,
        pageSize,
        fetchedDataParams,
        changeCustomFilters,
        changePageIndex,
        changePageSize,
        changeGlobalFilter,
        clearCustomFilters,
        removeCustomFilter,
        downloadDataFile,
        downloadDataSampleFile,
        uploadDataFile,
        refetch,
      }}
    >
      {(searchable || customFilterFields.length > 0) && (
        <div className={classes.dataTableHeader}>
          <Grid
            container
            alignItems="flex-end"
            spacing={2}
            sx={{ width: "100%" }}
          >
            {!!title && (
              <Grid
                size={{
                  xs: 12,
                  md: "auto",
                }}
                sx={{ order: 1 }}
              >
                {title}
              </Grid>
            )}
            <Grid
              size={{
                xs: "grow",
              }}
              sx={{ order: 1 }}
            >
              {!!searchable ? <Search /> : <Box minHeight={50} />}
            </Grid>
            {customFilterFields.length > 0 && (
              <Grid
                size={{
                  xs: 12,
                  md: "auto",
                }}
                sx={(theme) => ({
                  order: 2,
                  [theme.breakpoints.down("md")]: {
                    order: 3,
                  },
                })}
              >
                <CustomFilter />
              </Grid>
            )}
            {customFilters.length > 0 && (
              <Grid
                size={{
                  xs: "auto",
                }}
                sx={(theme) => ({
                  order: 3,
                  [theme.breakpoints.down("md")]: {
                    order: 2,
                  },
                })}
              >
                <AppTooltip title={t("clearFilters")}>
                  <Box display="flex" component="span">
                    <AppIconButton
                      disabled={!!loading}
                      variant="outlined"
                      color="primary"
                      onClick={() => clearCustomFilters()}
                    >
                      <AppSvgIcon
                        component={FilterListOffIcon}
                        fontSize="inherit"
                      />
                    </AppIconButton>
                  </Box>
                </AppTooltip>
              </Grid>
            )}
            {!!uploadDataFile && (
              <Grid
                size={{
                  xs: "auto",
                }}
                sx={(theme) => ({
                  order: 3,
                  [theme.breakpoints.down("md")]: {
                    order: 2,
                  },
                })}
              >
                <Upload />
              </Grid>
            )}
            {!!downloadDataFile && (
              <Grid
                size={{
                  xs: "auto",
                }}
                sx={(theme) => ({
                  order: 3,
                  [theme.breakpoints.down("md")]: {
                    order: 2,
                  },
                })}
              >
                <Download />
              </Grid>
            )}
            {!!refetchable && (
              <Grid
                size={{
                  xs: "auto",
                }}
                sx={(theme) => ({
                  order: 3,
                  [theme.breakpoints.down("md")]: {
                    order: 2,
                  },
                })}
              >
                <AppTooltip title={t("refresh")}>
                  <Box display="flex" component="span">
                    <AppIconButton
                      disabled={!!loading}
                      variant="outlined"
                      color="primary"
                      onClick={() => refetch()}
                    >
                      <AppSvgIcon component={CachedIcon} fontSize="inherit" />
                    </AppIconButton>
                  </Box>
                </AppTooltip>
              </Grid>
            )}
          </Grid>
        </div>
      )}
      <AppTableContainer
        {...tableContainerProps}
        className={cx(
          classes.dataTableContainer,
          tableContainerProps?.className
        )}
      >
        <AppTable>
          <AppTableHead>
            {reactTable
              .getHeaderGroups()
              .map((headerGroup, headerGroupIndex) => {
                return (
                  <AppTableRow
                    className={classes.dataTableRow}
                    key={headerGroup.id || `index-${headerGroupIndex}`}
                  >
                    {headerGroup.headers.map((header, headerIndex) => {
                      if (header.isPlaceholder) return null;

                      const _tableCellProps = (header.column.columnDef as any)
                        .tableCellProps;
                      const _canSort = header.column.getCanSort();
                      const _isSorted = header.column.getIsSorted();
                      const _firstSortDir = header.column.getFirstSortDir();
                      const _pinned = header.column.getIsPinned();
                      console.log("_canSort", _canSort, _pinned);
                      return (
                        <AppTableCell
                          {..._tableCellProps}
                          key={header.id || `index-${headerIndex}`}
                          className={cx(
                            classes.dataTableCell,
                            _pinned === "left" &&
                              classes.dataTableCellPinnedLeft,
                            _pinned === "right" &&
                              classes.dataTableCellPinnedRight,
                            _tableCellProps?.className
                          )}
                        >
                          {_canSort ? (
                            <TableSortLabel
                              active={!!_isSorted}
                              direction={
                                _isSorted === "desc" ||
                                (_isSorted === false &&
                                  _firstSortDir === "desc")
                                  ? "desc"
                                  : _isSorted === "asc" ||
                                    (_isSorted === false &&
                                      _firstSortDir === "asc")
                                  ? "asc"
                                  : undefined
                              }
                              onClick={header.column.getToggleSortingHandler()}
                              IconComponent={
                                _isSorted
                                  ? AppArrowDownwardIcon
                                  : AppImportExportIcon
                              }
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </TableSortLabel>
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                          )}
                        </AppTableCell>
                      );
                    })}
                  </AppTableRow>
                );
              })}
          </AppTableHead>
          <AppTableBody className={classes.dataTableBody}>
            {loading ? (
              <AppTableRow className={classes.dataTableRow}>
                <AppTableCell
                  className={classes.dataTableCell}
                  align="center"
                  colSpan={9999}
                >
                  <Box display="flex" justifyContent="center">
                    <AppLoading size={32} />
                  </Box>
                </AppTableCell>
              </AppTableRow>
            ) : reactTableRows.length > 0 ? (
              reactTableRows.map((row, rowIndex) => {
                return (
                  <AppTableRow
                    className={classes.dataTableRow}
                    classes={{
                      hover: classes.dataTableRowHover,
                    }}
                    key={row.id || `index-${rowIndex}`}
                    hover
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => {
                      const _tableCellProps = (cell.column.columnDef as any)
                        .tableCellProps;
                      const _tableBodyCellProps = (cell.column.columnDef as any)
                        .tableBodyCellProps;
                      const _columnTableBodyCellProps = _isFunction(
                        _tableBodyCellProps
                      )
                        ? _tableBodyCellProps(cell.getContext())
                        : _tableBodyCellProps;
                      const _globalTableBodyCellProps = _isFunction(
                        tableBodyCellProps
                      )
                        ? tableBodyCellProps(cell.getContext())
                        : tableBodyCellProps;
                      const _pinned = cell.column.getIsPinned();

                      return (
                        <AppTableCell
                          key={cell.id || `index-${cellIndex}`}
                          {..._tableCellProps}
                          {..._columnTableBodyCellProps}
                          {..._globalTableBodyCellProps}
                          className={cx(
                            classes.dataTableCell,
                            _pinned === "left" &&
                              classes.dataTableCellPinnedLeft,
                            _pinned === "right" &&
                              classes.dataTableCellPinnedRight,
                            _tableCellProps?.className,
                            _columnTableBodyCellProps?.className,
                            _globalTableBodyCellProps?.className
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </AppTableCell>
                      );
                    })}
                  </AppTableRow>
                );
              })
            ) : (
              <AppTableRow className={classes.dataTableRow}>
                <AppTableCell
                  className={classes.dataTableCell}
                  align="center"
                  colSpan={9999}
                >
                  {t("noData")}
                </AppTableCell>
              </AppTableRow>
            )}
          </AppTableBody>
        </AppTable>
      </AppTableContainer>
      <Pagination />
    </AppDataTableContext.Provider>
  );
};

export default AppDataTable;
