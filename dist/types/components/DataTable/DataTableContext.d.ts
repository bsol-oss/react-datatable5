/// <reference types="react" />
import { OnChangeFn, PaginationState, RowSelectionState, SortingState, Table, VisibilityState, ColumnFiltersState, ColumnOrderState } from "@tanstack/react-table";
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
export declare const TableContext: import("react").Context<DataTableContext<any>>;
