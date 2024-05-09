import { ReactNode } from "react";
import { ColumnDef } from "@tanstack/react-table";
export interface DataTableProps<T> {
    children: ReactNode;
    url: string;
    columns: ColumnDef<T, unknown>[];
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
export declare const DataTable: <TData>({ columns, url, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, children, }: DataTableProps<TData>) => import("react/jsx-runtime").JSX.Element;
