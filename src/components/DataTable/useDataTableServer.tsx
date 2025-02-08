import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  ColumnOrderState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import axios from "axios";
import { useState } from "react";
import { DensityState } from "../Controls/DensityFeature";
import { UseDataTableProps, UseDataTableReturn } from "./useDataTable";

export interface UseDataTableServerProps<TData> {
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

export interface UseDataTableServerReturn<TData> {
  query: UseQueryResult<TData>;
}

export interface Result<T> {
  data: T[];
}

export interface DataResponse<T> extends Result<T> {
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

  const query = useQuery<TData>({
    queryKey: [url],
    queryFn: () => {
      return axios
        .get<TData>(url, {
          params: {
            offset: pagination.pageIndex * pagination.pageSize,
            limit: pagination.pageSize,
            sorting,
            where: columnFilters.reduce((accumulator, filter) => {
              const obj: any = {};
              obj[filter.id] = filter.value;
              return { ...accumulator, ...obj };
            }, {}),
            searching: globalFilter,
          },
        })
        .then((res) => res.data);
    },
  });

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
    query,
  };
};
