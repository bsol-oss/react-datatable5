/// <reference types="react" />
import { ColumnDef, ColumnFiltersState, ColumnOrderState, OnChangeFn, PaginationState, RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
import { DensityState } from "../Controls/DensityFeature";
import { UseDataFromUrlReturn } from "./useDataFromUrl";
import { DataResponse } from "./useDataTableServer";
export interface DataTableServerProps<TData> extends UseDataFromUrlReturn<DataResponse<TData>> {
    children: JSX.Element | JSX.Element[];
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
export declare const DataTableServer: <TData>({ columns, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, onRowSelect, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, data, loading, hasError, refreshData, children, }: DataTableServerProps<TData>) => import("react/jsx-runtime").JSX.Element;
