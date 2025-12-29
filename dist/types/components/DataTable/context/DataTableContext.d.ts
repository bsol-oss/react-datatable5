/// <reference types="react" />
import { OnChangeFn, Table } from '@tanstack/react-table';
import { DataTableProps } from '../DataTable';
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
export interface DataTableContextProps<TData = unknown> extends Omit<DataTableProps, 'translate'> {
    table: Table<TData>;
    globalFilter: string;
    setGlobalFilter: OnChangeFn<string>;
    type: 'client' | 'server';
    tableLabel: DataTableLabel;
}
export declare const DataTableContext: import("react").Context<DataTableContextProps<unknown>>;
