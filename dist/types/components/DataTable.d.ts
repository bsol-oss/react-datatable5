/// <reference types="react" />
import { ColumnDef, FilterFn, RowSelectionState } from "@tanstack/react-table";
import { RankingInfo } from "@tanstack/match-sorter-utils";
import { DensityState } from "./DensityFeature";
declare module "@tanstack/react-table" {
    interface FilterFns {
        fuzzy: FilterFn<unknown>;
    }
    interface FilterMeta {
        itemRank: RankingInfo;
    }
}
export interface DataTableProps<TData> {
    children: JSX.Element | JSX.Element[];
    data: TData[];
    columns: ColumnDef<TData, any>[];
    density?: DensityState;
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
    onRowSelect?: (rowSelection: RowSelectionState) => void;
}
export declare const DataTable: <TData>({ columns, data, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, density, onRowSelect, children, }: DataTableProps<TData>) => import("react/jsx-runtime").JSX.Element;
