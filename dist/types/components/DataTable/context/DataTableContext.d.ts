/// <reference types="react" />
import { OnChangeFn, Table } from "@tanstack/react-table";
import { UseTranslationResponse } from "react-i18next";
export interface DataTableContext<TData = unknown> {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: OnChangeFn<string>;
    type: "client" | "server";
    translate: UseTranslationResponse<any, any>;
}
export declare const DataTableContext: import("react").Context<DataTableContext<unknown>>;
