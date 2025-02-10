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

export interface UseDataTableServerProps extends UseDataTableProps {
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

  url: string;
}

export interface UseDataTableServerReturn<TData> extends UseDataTableReturn {
  query: UseQueryResult<DataResponse<TData>, Error>;
}

export interface Result<T> {
  data: T[];
}

export interface DataResponse<T> extends Result<T> {
  count: number;
}

export const useDataTableServer = <TData,>({
  url,
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
  // debounce = true,
  // debounceDelay = 1000,
}: UseDataTableServerProps): UseDataTableServerReturn<TData> => {
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

  const params = {
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
    sorting,
    where: columnFilters,
    searching: globalFilter,
  };

  const query = useQuery<DataResponse<TData>>({
    queryKey: [url, params],
    queryFn: () => {
      return axios
        .get<DataResponse<TData>>(url, {
          params,
        })
        .then((res) => res.data);
    },
    placeholderData: {
      count: 0,
      data: [],
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
