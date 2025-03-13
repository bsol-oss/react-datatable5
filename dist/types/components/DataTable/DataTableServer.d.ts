import { ReactNode } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { ColumnDef, ColumnFiltersState, ColumnOrderState, OnChangeFn, PaginationState, RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
import { DensityState } from "./controls/DensityFeature";
import { DataResponse } from "./useDataTableServer";
import { UseTranslationResponse } from "react-i18next";
export interface DataTableServerProps<TData extends DataResponse = DataResponse<unknown>> {
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
    query: UseQueryResult<TData>;
    url: string;
    translate: UseTranslationResponse<any, any>;
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
export declare function DataTableServer<TData extends DataResponse = DataResponse<unknown>>({ columns, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, query, url, translate, children, }: DataTableServerProps<TData>): import("react/jsx-runtime").JSX.Element;
