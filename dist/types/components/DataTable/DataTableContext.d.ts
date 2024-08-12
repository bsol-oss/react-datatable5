/// <reference types="react" />
import { OnChangeFn, Table } from "@tanstack/react-table";
export interface DataTableContext<TData> {
    table: Table<TData>;
    refreshData: () => void;
    globalFilter: string;
    setGlobalFilter: OnChangeFn<string>;
    loading: boolean;
    hasError: boolean;
}
export declare const TableContext: import("react").Context<DataTableContext<any>>;
