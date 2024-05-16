/// <reference types="react" />
import { ColumnDef, RowData } from "@tanstack/react-table";
export interface DataTableServerProps<T> {
    children: JSX.Element | JSX.Element[];
    url: string;
    columns: ColumnDef<T, any>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
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
export declare const DataTableServer: <TData>({ columns, url, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, children, }: DataTableServerProps<TData>) => import("react/jsx-runtime").JSX.Element;
