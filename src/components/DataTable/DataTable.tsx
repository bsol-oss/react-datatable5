import {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import { useEffect } from "react";
import { TableContext } from "./DataTableContext";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { DensityFeature, DensityState } from "../Controls/DensityFeature";

declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export interface DataTableProps<TData> {
  children?: JSX.Element | JSX.Element[];
  data: TData[];
  columns: ColumnDef<TData, any>[];
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

export const DataTable = <TData,>({
  columns,
  data,
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
}: DataTableProps<TData>) => {
  const table = useReactTable<TData>({
    _features: [DensityFeature],
    data: data,
    rowCount: data.length,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      size: 150, //starting column size
      minSize: 10, //enforced during column resizing
      maxSize: 10000, //enforced during column resizing
    },
    enableRowSelection: enableRowSelection,
    enableMultiRowSelection: enableMultiRowSelection,
    enableSubRowSelection: enableSubRowSelection,
    columnResizeMode: "onChange",
    // global filter start
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: "fuzzy",
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
  });

  useEffect(() => {
    setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
  }, []);

  useEffect(() => {
    onRowSelect(table.getState().rowSelection, data);
  }, [table.getState().rowSelection]);

  return (
    <TableContext.Provider
      value={{
        table: { ...table },
        refreshData: () => {
          throw new Error("not implemented");
        },
        globalFilter: globalFilter,
        setGlobalFilter: setGlobalFilter,
        loading: false,
        hasError: false,
        pagination,
        sorting,
        columnFilters,
        rowSelection,
        columnOrder,
        columnVisibility,
        density,
        setPagination,
        setSorting,
        setColumnFilters,
        setRowSelection,
        setColumnOrder,
        setColumnVisibility,
        setDensity,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
