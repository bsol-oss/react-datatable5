import { ReactNode } from "react";
import { Column } from "@tanstack/react-table";
export interface DataTableProps<T> {
    children: ReactNode;
    url: string;
    columns: Column<T>[];
}
export interface Result<T> {
    results: T[];
}
export interface DataResponse<T> extends Result<T> {
    success: boolean;
    count: number;
    filterCount: number;
}
declare const DataTable: <TData>({ columns, url, children, }: DataTableProps<TData>) => import("react/jsx-runtime").JSX.Element;
export default DataTable;
