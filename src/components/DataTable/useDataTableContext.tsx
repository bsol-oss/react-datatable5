import { useContext } from "react";
import { TableContext } from "./DataTableContext";
import { ColumnFiltersState, SortingState, PaginationState } from "@tanstack/react-table";

export const useDataTableContext = () => {

  const {
    table,
    setPagination: setPaginationFromContext,
    setSorting: setSortingFromContext,
    setColumnFilters: setColumnFiltersFromContext,
  } = useContext(TableContext);

  const setPagination = (pagination: PaginationState) => {
    setPaginationFromContext(pagination);
  };

  const setSorting = (sorting: SortingState) => {
    setSortingFromContext(sorting);

    setPaginationFromContext((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  };

  const setColumnFilters = (columnFilters: ColumnFiltersState) => {
    setColumnFiltersFromContext(columnFilters);

    setPaginationFromContext((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
  };


  return {
    table,
    setPagination,
    setSorting,
    setColumnFilters,
  };
};
