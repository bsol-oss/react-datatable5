/// <reference types="react" />
import { OnChangeFn, Table } from "@tanstack/react-table";
import { UseTranslationResponse } from "react-i18next";
import { DataTableProps } from "../DataTable";
export interface DataTableContext<TData = unknown> extends DataTableProps {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: OnChangeFn<string>;
    type: "client" | "server";
    translate: UseTranslationResponse<any, unknown>;
    tableLabel: {
        view: string;
        edit: string;
        filterButtonText: string;
        filterTitle: string;
        filterReset: string;
        filterClose: string;
        reloadTooltip: string;
        reloadButtonText: string;
        resetSelection: string;
        resetSorting: string;
        rowCountText: string;
        hasErrorText: string;
    };
}
export declare const DataTableContext: import("react").Context<DataTableContext<unknown>>;
