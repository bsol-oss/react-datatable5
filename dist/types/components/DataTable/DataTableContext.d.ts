/// <reference types="react" />
import { GlobalFilterTableState, OnChangeFn, Table } from "@tanstack/react-table";
export interface DataTableContext<TData> {
    table: Table<TData>;
    refreshData: () => void;
    globalFilter: GlobalFilterTableState;
    setGlobalFilter: OnChangeFn<GlobalFilterTableState>;
    loading: boolean;
    hasError: boolean;
}
export declare const TableContext: import("react").Context<DataTableContext<any>>;
