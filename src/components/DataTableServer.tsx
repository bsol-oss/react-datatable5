import { useEffect, useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  RowData,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { TableContext } from "./DataTableContext";
import { DensityFeature, DensityState } from "./DensityFeature";
import { useDataFromUrl } from "./useDataFromUrl";

export interface DataTableServerProps<TData> {
  children: JSX.Element | JSX.Element[];
  url: string;
  columns: ColumnDef<TData, any>[]; // TODO: find the appropriate types
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  enableSubRowSelection?: boolean;
  onRowSelect?: (row: RowSelectionState) => void;
  columnOrder?: string[];
  columnFilters?: ColumnFiltersState;
  globalFilter?: string;
  density?: DensityState;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  sorting?: SortingState;
  rowSelection?: RowSelectionState;
  loadingComponent?: JSX.Element;
}

export interface Result<T> {
  results: T[];
}

export interface DataResponse<T> extends Result<T> {
  success: boolean;
  count: number;
  filterCount: number;
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    displayName?: string;
  }
}

export const DataTableServer = <TData,>({
  columns,
  url,
  enableRowSelection = true,
  enableMultiRowSelection = true,
  enableSubRowSelection = true,
  onRowSelect = () => {},
  columnOrder: defaultColumnOrder = [],
  columnFilters: defaultColumnFilter = [],
  density = "sm",
  globalFilter: defaultGlobalFilter = "",
  pagination: defaultPagination = {
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  },
  sorting: defaultSorting = [],
  rowSelection: defaultRowSelection = {},
  children,
}: DataTableServerProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(defaultColumnFilter); // can set initial column filter state here
  const [pagination, setPagination] = useState(defaultPagination);
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(defaultRowSelection);
  const [columnOrder, setColumnOrder] = useState<string[]>(defaultColumnOrder);
  const [globalFilter, setGlobalFilter] = useState<string>(defaultGlobalFilter);
  const [densityState, setDensity] = useState<DensityState>(density);
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
  });
  const table = useReactTable<TData>({
    _features: [DensityFeature],
    data: data.results,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    columnResizeMode: "onChange",
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      sorting,
      columnFilters,
      rowSelection,
      columnOrder,
      globalFilter,
      density: densityState,
    },
    defaultColumn: {
      size: 150, //starting column size
      minSize: 10, //enforced during column resizing
      maxSize: 10000, //enforced during column resizing
    },
    enableRowSelection: enableRowSelection,
    enableMultiRowSelection: enableMultiRowSelection,
    enableSubRowSelection: enableSubRowSelection,
    onColumnOrderChange: (state) => {
      setColumnOrder(state);
    },
    onGlobalFilterChange: (state) => {
      setGlobalFilter(state);
    },
    rowCount: data.filterCount,
    // for tanstack-table ts bug start
    filterFns: {
      fuzzy: () => {
        return false;
      },
    },
    // for tanstack-table ts bug end
    onDensityChange: setDensity,
  });

  useEffect(() => {
    refreshData();
  }, [pagination, sorting, columnFilters, globalFilter]);

  useEffect(() => {
    setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
  }, []);

  useEffect(() => {
    onRowSelect(table.getState().rowSelection);
  }, [table.getState().rowSelection]);

  return (
    <TableContext.Provider
      value={{
        table: { ...table },
        refreshData: refreshData,
        globalFilter,
        setGlobalFilter,
        loading: loading,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
