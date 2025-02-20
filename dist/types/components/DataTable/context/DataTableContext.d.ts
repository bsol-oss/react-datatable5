/// <reference types="react" />
import { OnChangeFn, Table } from "@tanstack/react-table";
export interface DataTableContext<TData = unknown> {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: OnChangeFn<string>;
    type: "client" | "server";
}
export declare const DataTableContext: import("react").Context<DataTableContext<unknown>>;
