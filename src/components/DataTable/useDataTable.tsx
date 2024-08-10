import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export const useDataTableContext = () => {
  const {
    table,
    refreshData,
    globalFilter,
    setGlobalFilter,
    loading,
    hasError,
  } = useContext(TableContext);
  return {
    table,
    refreshData,
    globalFilter,
    setGlobalFilter,
    loading,
    hasError,
  };
};
