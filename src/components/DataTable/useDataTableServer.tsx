import {
  ColumnFiltersState,
  ColumnOrderState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { DensityState } from "../Controls/DensityFeature";
import {
  useDataFromUrl,
  UseDataFromUrlProps,
  UseDataFromUrlReturn,
} from "./useDataFromUrl";
import { UseDataTableProps, UseDataTableReturn } from "./useDataTable";

export interface UseDataTableServerProps<TData>
  extends Omit<
      UseDataFromUrlProps<DataResponse<TData>>,
      keyof { defaultData: any }
    >,
    UseDataTableProps {
  /**
   * Delay to send the request if the `refreshData` called multiple times
   * 
   * default: `true`
   */
  debounce?: boolean;
  /**
   * The time to wait before sending the request
   * 
   * default: `1000`
   */
  debounceDelay?: number;
}

export interface UseDataTableServerReturn<TData>
  extends UseDataFromUrlReturn<DataResponse<TData>>,
    UseDataTableReturn {}

export interface Result<T> {
  results: T[];
}

export interface DataResponse<T> extends Result<T> {
  success: boolean;
  count: number;
}

export const useDataTableServer = <TData,>({
  url,
  onFetchSuccess = () => {},
  default: {
    sorting: defaultSorting = [],
    pagination: defaultPagination = {
      pageIndex: 0, //initial page index
      pageSize: 10, //default page size
    },
    rowSelection: defaultRowSelection = {},
    columnFilters: defaultColumnFilters = [],
    columnOrder: defaultColumnOrder = [],
    columnVisibility: defaultColumnVisibility = {},
    globalFilter: defaultGlobalFilter = "",
    density: defaultDensity = "sm",
  } = {
    sorting: [],
    pagination: {
      pageIndex: 0, //initial page index
      pageSize: 10, //age size
    },
    rowSelection: {},
    columnFilters: [],
    columnOrder: [],
    columnVisibility: {},
    globalFilter: "",
    density: "sm",
  },
  debounce = true,
  debounceDelay = 1000,
}: UseDataTableServerProps<TData>): UseDataTableServerReturn<TData> => {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(defaultColumnFilters); // can set initial column filter state here
  const [pagination, setPagination] =
    useState<PaginationState>(defaultPagination);
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(defaultRowSelection);
  const [columnOrder, setColumnOrder] =
    useState<ColumnOrderState>(defaultColumnOrder);
  const [globalFilter, setGlobalFilter] = useState<string>(defaultGlobalFilter);
  const [density, setDensity] = useState<DensityState>(defaultDensity);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultColumnVisibility
  );
  const { data, loading, hasError, refreshData } = useDataFromUrl<
    DataResponse<TData>
  >({
    url: url,
    defaultData: {
      success: false,
      results: [],
      count: 0,
    },
    params: {
      pagination: JSON.stringify({
        offset: pagination.pageIndex * pagination.pageSize,
        rows: pagination.pageSize,
      }),
      sorting: JSON.stringify(
        sorting.length > 0
          ? { field: sorting[0].id, sort: sorting[0].desc ? "desc" : "asc" }
          : {}
      ),
      where: JSON.stringify(
        columnFilters.reduce((accumulator, filter) => {
          const obj: any = {};
          obj[filter.id] = filter.value;
          return { ...accumulator, ...obj };
        }, {})
      ),
      searching: globalFilter,
    },
    disableFirstFetch: true,
    onFetchSuccess: onFetchSuccess,
  });

  useEffect(() => {
    refreshData({ debounce, debounceDelay });
  }, [pagination, sorting, columnFilters, globalFilter, url]);
  return {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    pagination,
    setPagination,
    rowSelection,
    setRowSelection,
    columnOrder,
    setColumnOrder,
    globalFilter,
    setGlobalFilter,
    density,
    setDensity,
    columnVisibility,
    setColumnVisibility,
    data,
    loading,
    hasError,
    refreshData,
  };
};
