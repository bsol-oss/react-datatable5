import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Column } from '@tanstack/react-table';

interface DataTableProps<T> {
    children: ReactNode;
    url: string;
    columns: Column<T>[];
}
interface Result<T> {
    results: T[];
}
interface DataResponse<T> extends Result<T> {
    success: boolean;
    count: number;
    filterCount: number;
}
declare const DataTable: <TData>({ columns, url, children, }: DataTableProps<TData>) => react_jsx_runtime.JSX.Element;

declare const EditViewButton: () => react_jsx_runtime.JSX.Element;

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

declare const TableFilter: () => react_jsx_runtime.JSX.Element;

declare const TableFooter: () => react_jsx_runtime.JSX.Element;

interface TableHeaderProps {
    canResize?: boolean;
}
declare const TableHeader: ({ canResize }: TableHeaderProps) => react_jsx_runtime.JSX.Element;

interface PaginationProps {
}
declare const TablePagination: ({}: PaginationProps) => react_jsx_runtime.JSX.Element;

declare const TextCell: ({ label, children }: any) => react_jsx_runtime.JSX.Element;

export { type DataResponse, DataTable, type DataTableProps, EditViewButton, PageSizeControl, type PageSizeControlProps, type PaginationProps, ResetFilteringButton, ResetSortingButton, type Result, Table, TableBody, TableFilter, TableFooter, TableHeader, type TableHeaderProps, TablePagination, type TableProps, TextCell };
