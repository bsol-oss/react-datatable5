/// <reference types="react" />
import { ColumnDef } from "@tanstack/react-table";
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
export declare const DataTableServer: <TData>({ columns, url, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, children, }: DataTableServerProps<TData>) => import("react/jsx-runtime").JSX.Element;
