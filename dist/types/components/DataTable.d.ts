/// <reference types="react" />
import { ColumnDef } from "@tanstack/react-table";
export interface DataTableProps<T> {
    children: JSX.Element | JSX.Element[];
    data: T[];
    columns: ColumnDef<T, any>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
}
export declare const DataTable: <TData>({ columns, data, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, children, }: DataTableProps<TData>) => import("react/jsx-runtime").JSX.Element;
