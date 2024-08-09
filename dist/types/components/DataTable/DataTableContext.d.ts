/// <reference types="react" />
import { Table } from "@tanstack/react-table";
export interface DataTableContext<TData> {
    table: Table<TData>;
    refreshData: () => void;
    globalFilter: string;
    setGlobalFilter: (filter: string) => void;
    loading: boolean;
    hasError: boolean;
}
export declare const TableContext: import("react").Context<DataTableContext<any>>;
