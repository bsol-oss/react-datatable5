import { ReactNode } from "react";

import { UseQueryResult } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  Table,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { DensityFeature, DensityState } from "./controls/DensityFeature";
import { DataTableContext, DataTableLabel } from "./context/DataTableContext";
import { DataTableServerContext } from "./context/DataTableServerContext";
import { DataResponse } from "./useDataTableServer";
import { UseTranslationResponse } from "react-i18next";

export interface DataTableServerProps<TData = unknown> {
  children: ReactNode | ReactNode[];

  /**
   * Column definitions for the table.
   *
   * It will pass into as the column definitions in `@tanstack/react-table`
   *
   * @link https://tanstack.com/table/latest/docs/guide/column-defs
   */
  columns: ColumnDef<TData>[];
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  enableSubRowSelection?: boolean;
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
  query: UseQueryResult<DataResponse<TData>>;
  url: string;
  translate: UseTranslationResponse<any, any>;
  tableLabel?: DataTableLabel;
}

/**
 * DataTableServer will create a context to hold all values to
 * help the render of the DataTable in serverside
 *
 * The query is required to be a GET request that can receive
 * specified params and return a specified response
 *
 * The `useDataTableServer` can help to create the specified request and response
 *
 * @link https://tanstack.com/table/latest/docs/guide/column-defs
 */
export function DataTableServer<TData = unknown>({
  columns,
  enableRowSelection = true,
  enableMultiRowSelection = true,
  enableSubRowSelection = true,
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
  query,
  url,
  translate,
  children,
  tableLabel = {
    view: "View",
    edit: "Edit",
    filterButtonText: "Filter",
    filterTitle: "Filter",
    filterReset: "Reset",
    filterClose: "Close",
    reloadTooltip: "Reload",
    reloadButtonText: "Reload",
    resetSelection: "Reset Selection",
    resetSorting: "Reset Sorting",
    rowCountText: "Row Count",
    hasErrorText: "Has Error",
    globalFilterPlaceholder: "Search",
    trueLabel: "True",
    falseLabel: "False",
  },
}: DataTableServerProps<TData>) {
  const table = useReactTable({
    _features: [DensityFeature],
    data: (query.data?.data ?? []) as TData[],
    rowCount: query.data?.count ?? 0,
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

  return (
    <DataTableContext.Provider
      value={{
        table: table as Table<unknown>,
        globalFilter,
        setGlobalFilter,
        type: "server",
        translate,
        columns: columns as ColumnDef<unknown, unknown>[],
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
        density,
        setDensity,
        columnVisibility,
        setColumnVisibility,
        data: query.data?.data ?? [],
        tableLabel,
      }}
    >
      <DataTableServerContext.Provider value={{ url, query }}>
        {children}
      </DataTableServerContext.Provider>
    </DataTableContext.Provider>
  );
}
