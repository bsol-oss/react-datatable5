/// <reference types="react" />
import { ColumnDef, ColumnFiltersState, FilterFn, RowSelectionState, SortingState, VisibilityState } from "@tanstack/react-table";
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
export interface DataTableProps<TData> {
    children?: JSX.Element | JSX.Element[];
    data: TData[];
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
    columnVisibility?: VisibilityState;
}
export declare const DataTable: <TData>({ columns, data, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, onRowSelect, columnOrder: defaultColumnOrder, columnFilters: defaultColumnFilter, density, globalFilter: defaultGlobalFilter, pagination: defaultPagination, sorting: defaultSorting, rowSelection: defaultRowSelection, columnVisibility: defaultColumnVisibility, children, }: DataTableProps<TData>) => import("react/jsx-runtime").JSX.Element;
