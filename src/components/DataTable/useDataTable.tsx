import {
  ColumnFiltersState,
  ColumnOrderState,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { DensityState } from "../Controls/DensityFeature";

export interface DataTableDefaultState {
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  pagination?: PaginationState;
  rowSelection?: RowSelectionState;
  columnOrder?: ColumnOrderState;
  globalFilter?: string;
  columnVisibility?: VisibilityState;
  density?: DensityState;
}

export interface UseDataTableProps {
  default?: DataTableDefaultState;
}

export interface UseDataTableReturn {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
  rowSelection: RowSelectionState;
  columnOrder: ColumnOrderState;
  globalFilter: string;
  columnVisibility: VisibilityState;
  density: DensityState;
  setPagination: OnChangeFn<PaginationState>;
  setSorting: OnChangeFn<SortingState>;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  setRowSelection: OnChangeFn<RowSelectionState>;
  setGlobalFilter: OnChangeFn<string>;
  setColumnOrder: OnChangeFn<ColumnOrderState>;
  setDensity: OnChangeFn<DensityState>;
  setColumnVisibility: OnChangeFn<VisibilityState>;
}

export const useDataTable = (props: UseDataTableProps): UseDataTableReturn => {
  const { default: defaultState } = props;
  const {
    sorting: defaultSorting,
    pagination: defaultPagination,
    rowSelection: defaultRowSelection,
    columnFilters: defaultColumnFilters,
    columnOrder: defaultColumnOrder,
    columnVisibility: defaultColumnVisibility,
    globalFilter: defaultGlobalFilter,
    density: defaultDensity,
  } = defaultState || {};
  const [sorting, setSorting] = useState<SortingState>(defaultSorting || []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    defaultColumnFilters || []
  );
  const [pagination, setPagination] = useState<PaginationState>(
    defaultPagination || { pageIndex: 0, pageSize: 10 }
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
  };
};
