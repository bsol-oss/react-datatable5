import { ColumnFiltersState, ColumnOrderState, OnChangeFn, PaginationState, RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
import { DensityState } from "../Controls/DensityFeature";
export interface UseDataTableProps {
    default?: {
        sorting?: SortingState;
        columnFilters?: ColumnFiltersState;
        pagination?: PaginationState;
        rowSelection?: RowSelectionState;
        columnOrder?: ColumnOrderState;
        globalFilter?: string;
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
export declare const useDataTable: ({ default: { sorting: defaultSorting, pagination: defaultPagination, rowSelection: defaultRowSelection, columnFilters: defaultColumnFilters, columnOrder: defaultColumnOrder, columnVisibility: defaultColumnVisibility, globalFilter: defaultGlobalFilter, density: defaultDensity, }, }?: UseDataTableProps) => UseDataTableReturn;
