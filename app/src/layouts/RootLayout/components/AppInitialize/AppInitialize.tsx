// import axios from "axios";
// import { bindActionCreators } from "redux";

// import { storeCommonAction, storeServiceAction } from "@/store";
// import { commonConfig } from "@/utils/config";

// import { useAppDispatch } from "@/hooks";
import {
  useEffect,
  // useMemo, useRef
} from "react";
import { useTranslation } from "react-i18next";

// import type { CancelTokenSource } from "axios";

const AppInitialize = () => {
  const { i18n } = useTranslation();

  // const fetchServicesSourceRef = useRef<CancelTokenSource | null>(null);

  // const dispatch = useAppDispatch();

  // const $s_commonAction = useMemo(
  //   () => bindActionCreators(storeCommonAction, dispatch),
  //   [dispatch]
  // );

  useEffect(() => {
    // fetch common api
    return () => {};
  }, [i18n.language]);

  return null;
};

export default AppInitialize;
