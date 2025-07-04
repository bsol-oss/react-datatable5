import {
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
  ColumnFiltersState,
  ColumnOrderState,
} from "@tanstack/react-table";
import { createContext } from "react";
import { DensityState } from "../Controls/DensityFeature";

export interface DataTableContext<TData> {
  table: Table<TData>;
  refreshData: () => void;
  globalFilter: string;
  setGlobalFilter: OnChangeFn<string>;
  loading: boolean;
  hasError: boolean;
  pagination: PaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  rowSelection: RowSelectionState;
  columnOrder: ColumnOrderState;
  columnVisibility: VisibilityState;
  density: DensityState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setSorting: OnChangeFn<SortingState>;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  setRowSelection: OnChangeFn<RowSelectionState>;
  setColumnOrder: OnChangeFn<ColumnOrderState>;
  setColumnVisibility: OnChangeFn<VisibilityState>;
  setDensity: OnChangeFn<DensityState>;
}

export const TableContext = createContext<DataTableContext<any>>({
  table: {} as Table<any>,
  refreshData: () => {},
  globalFilter: "",
  setGlobalFilter: () => {},
  loading: false,
  hasError: false,
  setPagination: () => {},
  setSorting: () => {},
  setColumnFilters: () => {},
  setRowSelection: () => {},
  setColumnOrder: () => {},
  setColumnVisibility: () => {},
  setDensity: () => {},
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  sorting: [],
  columnFilters: [],
  rowSelection: {},
  columnOrder: [],
  columnVisibility: {},
  density: "md",
});
