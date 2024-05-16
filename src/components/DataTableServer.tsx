import { useEffect, useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  RowData,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { TableContext } from "./DataTableContext";
import { useDataFromUrl } from "./useDataFromUrl";

export interface DataTableServerProps<T> {
  children: JSX.Element | JSX.Element[];
  url: string;
  columns: ColumnDef<T, any>[]; // TODO: find the appropriate types
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  enableSubRowSelection?: boolean;
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
    displayName: string;
  }
}

export const DataTableServer = <TData,>({
  columns,
  url,
  enableRowSelection = true,
  enableMultiRowSelection = true,
  enableSubRowSelection = true,
  children,
}: DataTableServerProps<TData>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [rowSelection, setRowSelection] = useState({});
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");

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
  });

  useEffect(() => {
    refreshData();
  }, [pagination, sorting, columnFilters, globalFilter]);

  useEffect(() => {
    setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
  }, []);

  return (
    <TableContext.Provider
      value={{
        table: { ...table },
        refreshData: refreshData,
        globalFilter,
        setGlobalFilter,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
