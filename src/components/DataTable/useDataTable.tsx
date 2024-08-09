import { useContext } from "react";
import { TableContext } from "./DataTableContext";

export const useDataTable = () => {
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
