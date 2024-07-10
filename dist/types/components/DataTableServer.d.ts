/// <reference types="react" />
import { ColumnDef, ColumnFiltersState, RowData, RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
import { DensityState } from "./DensityFeature";
export interface DataTableServerProps<TData> {
    children: JSX.Element | JSX.Element[];
    url: string;
    columns: ColumnDef<TData, any>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
    onRowSelect?: (rowSelectionState: RowSelectionState, data: TData[]) => void;
    columnOrder?: string[];
    columnFilters?: ColumnFiltersState;
    globalFilter?: string;
    density?: DensityState;
    pagination?: {
        pageIndex: number;
        pageSize: number;
    };
    sorting?: SortingState;
    rowSelection?: RowSelectionState;
    loadingComponent?: JSX.Element;
    columnVisibility?: VisibilityState;
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
        displayName?: string;
    }
}
export declare const DataTableServer: <TData>({ columns, url, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, onRowSelect, columnOrder: defaultColumnOrder, columnFilters: defaultColumnFilter, density, globalFilter: defaultGlobalFilter, pagination: defaultPagination, sorting: defaultSorting, rowSelection: defaultRowSelection, columnVisibility: defaultColumnVisibility, children, }: DataTableServerProps<TData>) => import("react/jsx-runtime").JSX.Element;
