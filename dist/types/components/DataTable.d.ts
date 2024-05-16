/// <reference types="react" />
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { RankingInfo } from '@tanstack/match-sorter-utils';
declare module '@tanstack/react-table' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>;
    }
    interface FilterMeta {
        itemRank: RankingInfo;
    }
}
export interface DataTableProps<T> {
    children: JSX.Element | JSX.Element[];
    data: T[];
    columns: ColumnDef<T, any>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
}
export declare const DataTable: <TData>({ columns, data, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, children, }: DataTableProps<TData>) => import("react/jsx-runtime").JSX.Element;
