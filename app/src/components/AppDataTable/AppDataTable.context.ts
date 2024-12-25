import { createContext } from "react";

import type {
  CustomFilterField,
  CustomFilter,
  OnFetchParams,
  AppDataTableProps,
} from "./AppDataTable";

export type AppDataTableContextValue = {
  customFilterFields: CustomFilterField<any>[];
  customFilters: CustomFilter[];
  localeText: {
    search: string;
    download: string;
    upload: string;
  };
  isServerSide: boolean;
  dataCount: number;
  globalFilter: string;
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  fetchedDataParams: OnFetchParams;
  changeGlobalFilter: (globalFilter: string) => void;
  changePageIndex: (pageIndex: number) => void;
  changePageSize: (pageSize: number) => void;
  changeCustomFilters: (customFilters: CustomFilter[]) => void;
  clearCustomFilters: () => void;
  removeCustomFilter: (customFilterId: CustomFilter["id"]) => void;
  downloadDataFile?: AppDataTableProps["downloadDataFile"];
  downloadDataSampleFile?: AppDataTableProps["downloadDataSampleFile"];
  uploadDataFile?: AppDataTableProps["uploadDataFile"];
  refetch: (params?: OnFetchParams) => void;
};

const AppDataTableContext = createContext<AppDataTableContextValue>(undefined!);

export default AppDataTableContext;
