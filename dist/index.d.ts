/// <reference types="react" />
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';
import * as _tanstack_table_core from '@tanstack/table-core';

interface DataTableProps<T> {
    children: JSX.Element | JSX.Element[];
    url: string;
    columns: ColumnDef<T, unknown>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
}
interface Result<T> {
    results: T[];
}
interface DataResponse<T> extends Result<T> {
    success: boolean;
    count: number;
    filterCount: number;
}
declare const DataTable: <TData>({ columns, url, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, children, }: DataTableProps<TData>) => react_jsx_runtime.JSX.Element;

declare const EditViewButton: () => react_jsx_runtime.JSX.Element;

declare const EditFilterButton: () => react_jsx_runtime.JSX.Element;

declare const EditSortingButton: () => react_jsx_runtime.JSX.Element;

interface PageSizeControlProps {
    pageSizes?: number[];
}
declare const PageSizeControl: ({ pageSizes, }: PageSizeControlProps) => react_jsx_runtime.JSX.Element;

declare const ResetFilteringButton: () => react_jsx_runtime.JSX.Element;

declare const ResetSortingButton: () => react_jsx_runtime.JSX.Element;

interface TableProps {
    children: ReactNode;
}
declare const Table: ({ children }: TableProps) => react_jsx_runtime.JSX.Element;

declare const TableBody: () => react_jsx_runtime.JSX.Element;

interface TableCardContainerProps {
    children: JSX.Element;
}
declare const TableCardContainer: ({ children, ...props }: TableCardContainerProps) => react_jsx_runtime.JSX.Element;

declare const TableCards: () => react_jsx_runtime.JSX.Element;

declare const TableFilter: () => react_jsx_runtime.JSX.Element;

declare const TableFooter: () => react_jsx_runtime.JSX.Element;

interface TableHeaderProps {
    canResize?: boolean;
}
declare const TableHeader: ({ canResize }: TableHeaderProps) => react_jsx_runtime.JSX.Element;

declare const TableSorter: () => react_jsx_runtime.JSX.Element;

interface useDataFromUrlReturn<T> {
    data: T;
    loading: boolean;
    hasError: boolean;
    refreshData: () => void;
}
interface useDataFromUrlProps<T> {
    url: string;
    params?: object;
    defaultData: T;
}
declare const useDataFromUrl: <T>({ url, params, defaultData, }: useDataFromUrlProps<T>) => useDataFromUrlReturn<T>;

declare const useDataTable: () => {
    table: _tanstack_table_core.Table<any>;
    refreshData: () => void;
};

interface PaginationProps {
}
declare const TablePagination: ({}: PaginationProps) => react_jsx_runtime.JSX.Element;

interface TextCellProps {
    label?: string;
    children: string | number | JSX.Element | JSX.Element[];
}
declare const TextCell: ({ label, children }: TextCellProps) => react_jsx_runtime.JSX.Element;

export { type DataResponse, DataTable, type DataTableProps, EditFilterButton, EditSortingButton, EditViewButton, PageSizeControl, type PageSizeControlProps, type PaginationProps, ResetFilteringButton, ResetSortingButton, type Result, Table, TableBody, TableCardContainer, type TableCardContainerProps, TableCards, TableFilter, TableFooter, TableHeader, type TableHeaderProps, TablePagination, type TableProps, TableSorter, TextCell, type TextCellProps, useDataFromUrl, type useDataFromUrlProps, type useDataFromUrlReturn, useDataTable };
