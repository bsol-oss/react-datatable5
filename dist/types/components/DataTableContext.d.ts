/// <reference types="react" />
import { Table } from "@tanstack/react-table";
export interface DataTableContext<T> {
    table: Table<T>;
    refreshData: () => void;
}
export declare const TableContext: import("react").Context<DataTableContext<any>>;