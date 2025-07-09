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
import { DensityState } from "./controls/DensityFeature";
import { UseDataTableProps, UseDataTableReturn } from "./useDataTable";
import { useTranslation } from "react-i18next";

export interface UseDataTableServerProps<TData> extends UseDataTableProps {
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

  placeholderData?: DataResponse<TData>;
}

export interface UseDataTableServerReturn<TData> extends UseDataTableReturn {
  query: UseQueryResult<DataResponse<TData>, Error>;
}

export interface Result<T = unknown> {
  data: T[];
}

export interface DataResponse<T = unknown> extends Result<T> {
  count: number;
}

export const useDataTableServer = <TData,>(
  props: UseDataTableServerProps<TData>
): UseDataTableServerReturn<TData> => {
  const { url, default: defaultProps, keyPrefix, placeholderData } = props;
  const {
    sorting: defaultSorting,
    pagination: defaultPagination,
    rowSelection: defaultRowSelection,
    columnFilters: defaultColumnFilters,
    columnOrder: defaultColumnOrder,
    columnVisibility: defaultColumnVisibility,
    globalFilter: defaultGlobalFilter,
    density: defaultDensity,
  } = defaultProps || {};

  const [sorting, setSorting] = useState<SortingState>(defaultSorting || []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    defaultColumnFilters || []
  ); // can set initial column filter state here
  const [pagination, setPagination] = useState<PaginationState>(
    defaultPagination || {
      pageIndex: 0, //initial page index
      pageSize: 10, //default page size
    }
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    defaultRowSelection || {}
  );
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    defaultColumnOrder || []
  );
  const [globalFilter, setGlobalFilter] = useState<string>(
    defaultGlobalFilter || ""
  );
  const [density, setDensity] = useState<DensityState>(defaultDensity || "sm");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultColumnVisibility || {}
  );
  const { pageSize, pageIndex } = pagination;
  const params = {
    offset: pageIndex * pageSize,
    limit: pageSize,
    sorting,
    where: columnFilters,
    searching: globalFilter,
  };

  const query = useQuery<DataResponse<TData>>({
    queryKey: [url, JSON.stringify(params)],
    queryFn: () => {
      return axios
        .get<DataResponse<TData>>(url, {
          params,
        })
        .then((res) => res.data);
    },
    placeholderData,
  });
  const translate = useTranslation("", { keyPrefix });

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
    translate,
  };
};
