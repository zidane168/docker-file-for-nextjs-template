import { createContext } from "react";

import type { CustomFilter } from "@/components/AppDataTable/AppDataTable";

export type CustomFilterContextValue = {
  resetFormCustomFilter: () => void;
  changeFormCustomFilters: (customFilters: CustomFilter[]) => void;
};

const CustomFilterContext = createContext<CustomFilterContextValue>(undefined!);

export default CustomFilterContext;
