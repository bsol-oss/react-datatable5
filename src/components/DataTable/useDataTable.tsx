import {
  ColumnFiltersState,
  ColumnOrderState,
  GlobalFilterTableState,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { DensityState } from "../Controls/DensityFeature";

export interface UseDataTableProps {
  default: {
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
    pagination?: PaginationState;
    rowSelection?: RowSelectionState;
    columnOrder?: ColumnOrderState;
    globalFilter?: GlobalFilterTableState;
    columnVisibility?: VisibilityState;
    density?: DensityState;
  };
}

export interface UseDataTableReturn {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
  rowSelection: RowSelectionState;
  columnOrder: ColumnOrderState;
  globalFilter: GlobalFilterTableState;
  columnVisibility: VisibilityState;
  density: DensityState;
  setPagination: OnChangeFn<PaginationState>;
  setSorting: OnChangeFn<SortingState>;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  setRowSelection: OnChangeFn<RowSelectionState>;
  setGlobalFilter: OnChangeFn<GlobalFilterTableState>;
  setColumnOrder: OnChangeFn<ColumnOrderState>;
  setDensity: OnChangeFn<DensityState>;
  setColumnVisibility: OnChangeFn<VisibilityState>;
}

export const useDataTable = (
  {
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
      globalFilter: defaultGlobalFilter = { globalFilter: "" },
      density: defaultDensity = "sm",
    },
  }: UseDataTableProps = {
    default: {
      sorting: [],
      pagination: {
        pageIndex: 0, //initial page index
        pageSize: 10, //age size
      },
      rowSelection: {},
      columnFilters: [],
      columnOrder: [],
      columnVisibility: {},
      globalFilter: { globalFilter: "" },
      density: "sm",
    },
  }
): UseDataTableReturn => {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(defaultColumnFilters); // can set initial column filter state here
  const [pagination, setPagination] =
    useState<PaginationState>(defaultPagination);
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(defaultRowSelection);
  const [columnOrder, setColumnOrder] =
    useState<ColumnOrderState>(defaultColumnOrder);
  const [globalFilter, setGlobalFilter] =
    useState<GlobalFilterTableState>(defaultGlobalFilter);
  const [density, setDensity] = useState<DensityState>(defaultDensity);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultColumnVisibility
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
