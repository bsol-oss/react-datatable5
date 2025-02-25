import { ColumnDef, ColumnFiltersState, ColumnOrderState, FilterFn, OnChangeFn, PaginationState, RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
import { ReactNode } from "react";
import { RankingInfo } from "@tanstack/match-sorter-utils";
import { DensityState } from "../Controls/DensityFeature";
declare module "@tanstack/react-table" {
    interface FilterFns {
        fuzzy: FilterFn<unknown>;
    }
    interface FilterMeta {
        itemRank: RankingInfo;
    }
}
export interface DataTableProps<TData = unknown> {
    children?: ReactNode | ReactNode[];
    /**
     * Data array for the table.
     *
     * It will pass into as the data in `@tanstack/react-table`
     *
     */
    data: TData[];
    /**
     * Column definitions for the table.
     *
     * It will pass into as the column definitions in `@tanstack/react-table`
     *
     * @link https://tanstack.com/table/latest/docs/guide/column-defs
     */
    columns: ColumnDef<TData, unknown>[];
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
/**
 * DataTable will create a context to hold all values to
 * help the render of the DataTable in serverside
 *
 *
 * The query is required to be a GET request that can receive
 * specified params and return a specified response
 *
 * @link https://tanstack.com/table/latest/docs/guide/column-defs
 */
export declare function DataTable<TData = unknown>({ columns, data, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, children, }: DataTableProps<TData>): import("react/jsx-runtime").JSX.Element;
