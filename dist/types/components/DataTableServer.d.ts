/// <reference types="react" />
import { ColumnDef, RowData, RowSelectionState } from "@tanstack/react-table";
import { DensityState } from "./DensityFeature";
export interface DataTableServerProps<TData> {
    children: JSX.Element | JSX.Element[];
    url: string;
    columns: ColumnDef<TData, any>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
    density?: DensityState;
    onRowSelect?: (row: RowSelectionState) => void;
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
        displayName: string;
    }
}
export declare const DataTableServer: <TData>({ columns, url, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, density, onRowSelect, children, }: DataTableServerProps<TData>) => import("react/jsx-runtime").JSX.Element;
