import { useEffect } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { DensityFeature, DensityState } from "../Controls/DensityFeature";
import { TableContext } from "./DataTableContext";
import { useDataFromUrl } from "./useDataFromUrl";

export interface DataTableServerProps<TData> {
  children: JSX.Element | JSX.Element[];
  url: string;
  columns: ColumnDef<TData, any>[]; // TODO: find the appropriate types
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  enableSubRowSelection?: boolean;
  onRowSelect?: (rowSelectionState: RowSelectionState, data: TData[]) => void;
  columnOrder: ColumnOrderState;
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  density: DensityState;
  pagination: PaginationState;
  sorting: SortingState;
  rowSelection: RowSelectionState;
  columnVisibility: VisibilityState;
  setPagination: OnChangeFn<PaginationState>;
  setSorting: OnChangeFn<SortingState>;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  setRowSelection: OnChangeFn<RowSelectionState>;
  setGlobalFilter: OnChangeFn<string>;
  setColumnOrder: OnChangeFn<ColumnOrderState>;
  setDensity: OnChangeFn<DensityState>;
  setColumnVisibility: OnChangeFn<VisibilityState>;
}

export interface Result<T> {
  results: T[];
}

export interface DataResponse<T> extends Result<T> {
  success: boolean;
  count: number;
  filterCount: number;
}

export const DataTableServer = <TData,>({
  columns,
  url,
  enableRowSelection = true,
  enableMultiRowSelection = true,
  enableSubRowSelection = true,
  onRowSelect = () => {},
  columnOrder,
  columnFilters,
  columnVisibility,
  density,
  globalFilter,
  pagination,
  sorting,
  rowSelection,
  setPagination,
  setSorting,
  setColumnFilters,
  setRowSelection,
  setGlobalFilter,
  setColumnOrder,
  setDensity,
  setColumnVisibility,
  children,
}: DataTableServerProps<TData>) => {
  const { data, loading, hasError, refreshData } = useDataFromUrl<
    DataResponse<TData>
  >({
    url: url,
    defaultData: {
      success: false,
      results: [],
      count: 0,
      filterCount: 0,
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
  });
  const table = useReactTable<TData>({
    _features: [DensityFeature],
    data: data.results,
    rowCount: data.count ?? 0,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    columnResizeMode: "onChange",
    defaultColumn: {
      size: 150, //starting column size
      minSize: 10, //enforced during column resizing
      maxSize: 10000, //enforced during column resizing
    },
    enableRowSelection: enableRowSelection,
    enableMultiRowSelection: enableMultiRowSelection,
    enableSubRowSelection: enableSubRowSelection,
    state: {
      pagination,
      sorting,
      columnFilters,
      rowSelection,
      columnOrder,
      globalFilter,
      density,
      columnVisibility,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnOrderChange: (state) => {
      setColumnOrder(state);
    },
    onGlobalFilterChange: (state) => {
      setGlobalFilter(state);
    },
    onDensityChange: setDensity,
    onColumnVisibilityChange: setColumnVisibility,
    // for tanstack-table ts bug start
    filterFns: {
      fuzzy: () => {
        return false;
      },
    },
    // for tanstack-table ts bug end
  });

  useEffect(() => {
    refreshData();
  }, [pagination, sorting, columnFilters, globalFilter, url]);

  useEffect(() => {
    setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
  }, []);

  useEffect(() => {
    onRowSelect(table.getState().rowSelection, data.results);
  }, [table.getState().rowSelection]);

  useEffect(() => {
    table.resetPagination();
  }, [sorting, columnFilters, globalFilter, url]);

  return (
    <TableContext.Provider
      value={{
        table: { ...table },
        refreshData: refreshData,
        globalFilter,
        setGlobalFilter,
        loading: loading,
        hasError: hasError,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
