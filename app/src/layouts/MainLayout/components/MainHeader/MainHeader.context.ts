import { createContext } from "react";

type NavMenu = {
  title: string;
  href: string;
  pathnameReg: RegExp;
  loading?: boolean;
  items?: NavMenu[];
};

export interface MainHeaderContextValue {
  navMenus: NavMenu[];
}

const MainHeaderContext = createContext<MainHeaderContextValue>(null!);

export default MainHeaderContext;
