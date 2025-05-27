/// <reference types="react" />
import { OnChangeFn, Table } from "@tanstack/react-table";
import { UseTranslationResponse } from "react-i18next";
import { DataTableProps } from "../DataTable";
export interface DataTableLabel {
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
    globalFilterPlaceholder: string;
    trueLabel: string;
    falseLabel: string;
}
export interface DataTableContextProps<TData = unknown> extends DataTableProps {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: OnChangeFn<string>;
    type: "client" | "server";
    translate: UseTranslationResponse<any, unknown>;
    tableLabel: DataTableLabel;
}
export declare const DataTableContext: import("react").Context<DataTableContextProps<unknown>>;
