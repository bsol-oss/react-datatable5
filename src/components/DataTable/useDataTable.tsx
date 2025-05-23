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
import { DensityState } from "./controls/DensityFeature";
import { useTranslation, UseTranslationResponse } from "react-i18next";

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
  keyPrefix?: string;
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
  translate: UseTranslationResponse<any, any>;
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
      globalFilter: defaultGlobalFilter = "",
      density: defaultDensity = "sm",
    } = {
      sorting: [],
      pagination: {
        pageIndex: 0, //initial page index
        pageSize: 10, //age size
      },
      rowSelection: {},
      columnFilters: [],
      columnOrder: [],
      columnVisibility: {},
      globalFilter: "",
      density: "sm",
    },
    keyPrefix = "",
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
      globalFilter: "",
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
  const [globalFilter, setGlobalFilter] = useState<string>(defaultGlobalFilter);
  const [density, setDensity] = useState<DensityState>(defaultDensity);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultColumnVisibility
  );
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
    translate,
  };
};
