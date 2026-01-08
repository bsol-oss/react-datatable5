import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  ColumnFiltersState,
  ColumnOrderState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { DensityState } from './controls/DensityFeature';
import { UseDataTableProps, UseDataTableReturn } from './useDataTable';

export interface UseDataTableServerProps<TData>
  extends Omit<UseDataTableProps, 'keyPrefix'> {
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

  /**
   * The url to fetch the data from.
   *
   * Remark:
   * it is the server responsibility to handle the params and return the data.
   * especially the pagination and sorting.
   *
   * The response must be like this:
   * ```ts
   * {
   *   data: TData[],
   *   count: number,
   * }
   * ```
   *
   * Example:
   * ```ts
   * const url = "https://jsonplaceholder.typicode.com/posts";
   * ```
   *
   * If not provided, the `queryFn` will be used.
   *
   * @default undefined
   */
  url?: string;

  placeholderData?: DataResponse<TData>;

  /**
   * The query function to fetch the data from.
   *
   * Remark:
   * it is the server responsibility to handle the params and return the data.
   * especially the pagination and sorting.
   *
   * Example:
   * ```ts
   * const queryFn = (params: QueryParams) => {
   *   return axios.get<DataResponse<TData>>(url, { params });
   * };
   * ```
   *
   * If not provided, the `url` will be used.
   *
   * @default undefined
   */
  queryFn?: (params: QueryParams) => Promise<DataResponse<TData>>;
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

export interface QueryParams {
  offset: number;
  limit: number;
  sorting: SortingState;
  where: ColumnFiltersState;
  searching: string;
}

export const useDataTableServer = <TData,>(
  props: UseDataTableServerProps<TData>
): UseDataTableServerReturn<TData> => {
  const {
    url,
    default: defaultProps,
    placeholderData,
    queryFn: customQueryFn,
    debounce = true,
    debounceDelay = 1000,
  } = props;
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
    defaultGlobalFilter || ''
  );
  const [density, setDensity] = useState<DensityState>(defaultDensity || 'sm');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultColumnVisibility || {}
  );
  const { pageSize, pageIndex } = pagination;

  // Debounce params if debounce is enabled
  const paramsKey = useMemo(
    () =>
      JSON.stringify({
        offset: pageIndex * pageSize,
        limit: pageSize,
        sorting,
        where: columnFilters,
        searching: globalFilter,
      }),
    [pageIndex, pageSize, sorting, columnFilters, globalFilter]
  );
  const debouncedParamsKey = debounce
    ? useDebounce(paramsKey, debounceDelay)
    : paramsKey;

  // Parse debounced params key back to params object
  const params: QueryParams = useMemo(() => {
    return JSON.parse(debouncedParamsKey);
  }, [debouncedParamsKey]);

  const defaultQueryFn = async () => {
    if (!url) {
      throw new Error('url is required');
    }
    const response = await axios.get<DataResponse<TData>>(url, {
      params,
    });
    return response.data;
  };

  const query = useQuery<DataResponse<TData>>({
    queryKey: [url, JSON.stringify(params)],
    queryFn:
      customQueryFn !== undefined
        ? () => customQueryFn(params)
        : defaultQueryFn,
    placeholderData,
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
