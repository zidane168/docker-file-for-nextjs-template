import _debounce from "lodash/debounce";

import AppInputAdornment from "@/components/AppInputAdornment";
import AppTextField from "@/components/AppTextField";
import AppSvgIcon from "@/components/AppSvgIcon";
import AppIconButton from "@/components/AppIconButton";

import SearchIcon from "@@/public/images/icons/search.svg";
import CloseIcon from "@@/public/images/icons/close.svg";

import { useContext, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "@/hooks";

import AppDataTableContext from "@/components/AppDataTable/AppDataTable.context";

import useStyles from "./Search.styles";

const Search = () => {
  const { isServerSide, localeText, globalFilter, changeGlobalFilter } =
    useContext(AppDataTableContext);

  const [search, setSearch] = useState(globalFilter);
  const curGlobalFilterRef = useRef(globalFilter);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const debounceChangeGlobalFilter = useDebouncedCallback(
    (globalFilter: string) => {
      changeGlobalFilter(globalFilter);
    },
    500
  );

  const { classes } = useStyles();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    curGlobalFilterRef.current = event.target.value;
    if (!!isServerSide) debounceChangeGlobalFilter(event.target.value);
    else changeGlobalFilter(event.target.value);
  };

  useEffect(() => {
    if (curGlobalFilterRef.current !== globalFilter) {
      debounceChangeGlobalFilter.cancel();
      setSearch(globalFilter);
    }
  }, [globalFilter]);

  return (
    <AppTextField
      disableFormControl
      inputRef={searchInputRef}
      classes={{
        root: classes.searchInput,
        focused: classes.searchInputFocused,
      }}
      placeholder={localeText.search}
      startAdornment={
        <AppInputAdornment position="start">
          <AppSvgIcon component={SearchIcon} />
        </AppInputAdornment>
      }
      endAdornment={
        <AppInputAdornment
          className={classes.searchInputEndAdorment}
          position="end"
        >
          <AppIconButton
            borderRadius="circular"
            edge="end"
            onClick={() => searchInputRef.current?.blur()}
          >
            <AppSvgIcon component={CloseIcon} />
          </AppIconButton>
        </AppInputAdornment>
      }
      value={search || ""}
      onChange={handleSearchChange}
      onKeyDown={(event) => {
        event.keyCode === 13 && changeGlobalFilter(search);
      }}
    />
  );
};

export default Search;
