/// <reference types="react" />
import { OnChangeFn, Table } from "@tanstack/react-table";
export interface DataTableContext<TData> {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: OnChangeFn<string>;
}
export declare const DataTableContext: import("react").Context<DataTableContext<any>>;
