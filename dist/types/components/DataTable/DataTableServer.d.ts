/// <reference types="react" />
import { ColumnDef, ColumnFiltersState, ColumnOrderState, GlobalFilterTableState, OnChangeFn, PaginationState, RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
import { DensityState } from "../Controls/DensityFeature";
export interface DataTableServerProps<TData> {
    children: JSX.Element | JSX.Element[];
    url: string;
    columns: ColumnDef<TData, any>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
    onRowSelect?: (rowSelectionState: RowSelectionState, data: TData[]) => void;
    columnOrder: ColumnOrderState;
    columnFilters: ColumnFiltersState;
    globalFilter: GlobalFilterTableState;
    density: DensityState;
    pagination: PaginationState;
    sorting: SortingState;
    rowSelection: RowSelectionState;
    columnVisibility: VisibilityState;
    setPagination: OnChangeFn<PaginationState>;
    setSorting: OnChangeFn<SortingState>;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
    setRowSelection: OnChangeFn<RowSelectionState>;
    setGlobalFilter: OnChangeFn<GlobalFilterTableState>;
    setColumnOrder: OnChangeFn<ColumnOrderState>;
    setDensity: OnChangeFn<DensityState>;
    setColumnVisibility: OnChangeFn<VisibilityState>;
}
export interface Result<T> {
    results: T[];
}
export interface DataResponse<T> extends Result<T> {
    success: boolean;
    count: number;
    filterCount: number;
}
export declare const DataTableServer: <TData>({ columns, url, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, onRowSelect, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, children, }: DataTableServerProps<TData>) => import("react/jsx-runtime").JSX.Element;
