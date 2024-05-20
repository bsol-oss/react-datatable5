/// <reference types="react" />
import * as react_jsx_runtime from 'react/jsx-runtime';
import { RowData, OnChangeFn, Updater, FilterFn, ColumnDef, RowSelectionState, Row } from '@tanstack/react-table';
import { RankingInfo } from '@tanstack/match-sorter-utils';
import { ReactNode } from 'react';
import { TextProps, TooltipProps } from '@chakra-ui/react';
import * as _tanstack_table_core from '@tanstack/table-core';

type DensityState = "sm" | "md" | "lg";
interface DensityTableState {
    density: DensityState;
}
interface DensityOptions {
    enableDensity?: boolean;
    onDensityChange?: OnChangeFn<DensityState>;
}
interface DensityInstance {
    setDensity: (updater: Updater<DensityState>) => void;
    toggleDensity: (value?: DensityState) => void;
    getDensityValue: (value?: DensityState) => number;
}
declare module "@tanstack/react-table" {
    interface TableState extends DensityTableState {
    }
    interface TableOptionsResolved<TData extends RowData> extends DensityOptions {
    }
    interface Table<TData extends RowData> extends DensityInstance {
    }
}

declare module "@tanstack/react-table" {
    interface FilterFns {
        fuzzy: FilterFn<unknown>;
    }
    interface FilterMeta {
        itemRank: RankingInfo;
    }
}
interface DataTableProps<TData> {
    children: JSX.Element | JSX.Element[];
    data: TData[];
    columns: ColumnDef<TData, any>[];
    density?: DensityState;
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
    onRowSelect?: (rowSelection: RowSelectionState) => void;
}
declare const DataTable: <TData>({ columns, data, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, density, onRowSelect, children, }: DataTableProps<TData>) => react_jsx_runtime.JSX.Element;

interface DataTableServerProps<TData> {
    children: JSX.Element | JSX.Element[];
    url: string;
    columns: ColumnDef<TData, any>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
    density?: DensityState;
    onRowSelect?: (row: RowSelectionState) => void;
}
interface Result<T> {
    results: T[];
}
interface DataResponse<T> extends Result<T> {
    success: boolean;
    count: number;
    filterCount: number;
}
declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        displayName: string;
    }
}
declare const DataTableServer: <TData>({ columns, url, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, density, onRowSelect, children, }: DataTableServerProps<TData>) => react_jsx_runtime.JSX.Element;

declare const DensityToggleButton: () => react_jsx_runtime.JSX.Element;

declare const EditFilterButton: () => react_jsx_runtime.JSX.Element;

declare const EditOrderButton: () => react_jsx_runtime.JSX.Element;

declare const EditSortingButton: () => react_jsx_runtime.JSX.Element;

declare const EditViewButton: () => react_jsx_runtime.JSX.Element;

declare const GlobalFilter: () => react_jsx_runtime.JSX.Element;

interface PageSizeControlProps {
    pageSizes?: number[];
}
declare const PageSizeControl: ({ pageSizes, }: PageSizeControlProps) => react_jsx_runtime.JSX.Element;

declare const ResetFilteringButton: () => react_jsx_runtime.JSX.Element;

declare const ResetSelectionButton: () => react_jsx_runtime.JSX.Element;

declare const ResetSortingButton: () => react_jsx_runtime.JSX.Element;

interface TableProps {
    children: ReactNode;
}
declare const Table: ({ children, ...props }: TableProps) => react_jsx_runtime.JSX.Element;

interface TableBodyProps {
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
}
interface TableRowSelectorProps<TData> {
    index: number;
    row: Row<TData>;
    hoveredRow: number;
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
}
declare const TableBody: ({ pinnedBgColor, }: TableBodyProps) => react_jsx_runtime.JSX.Element;

interface TableCardContainerProps {
    children: JSX.Element;
}
declare const TableCardContainer: ({ children, ...props }: TableCardContainerProps) => react_jsx_runtime.JSX.Element;

interface TableCardsProps {
}
declare const TableCards: ({}: TableCardsProps) => react_jsx_runtime.JSX.Element;

declare const TableFilter: () => react_jsx_runtime.JSX.Element;

interface TableFooterProps {
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
}
declare const TableFooter: ({ pinnedBgColor, }: TableFooterProps) => react_jsx_runtime.JSX.Element;

interface TableHeaderProps {
    canResize?: boolean;
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
}
declare const TableHeader: ({ canResize, pinnedBgColor, }: TableHeaderProps) => react_jsx_runtime.JSX.Element;

declare const TableOrderer: () => react_jsx_runtime.JSX.Element;

interface PaginationProps {
}
declare const TablePagination: ({}: PaginationProps) => react_jsx_runtime.JSX.Element;

declare const TableSelector: () => react_jsx_runtime.JSX.Element;

declare const TableSorter: () => react_jsx_runtime.JSX.Element;

declare const TableViewer: () => react_jsx_runtime.JSX.Element;

interface TextCellProps extends TextProps {
    label?: string;
    noOfLines?: number[];
    padding?: string;
    children: string | number | JSX.Element | JSX.Element[];
    tooltipProps?: TooltipProps;
}
declare const TextCell: ({ label, noOfLines, padding, children, tooltipProps, ...props }: TextCellProps) => react_jsx_runtime.JSX.Element;

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
    globalFilter: string;
    setGlobalFilter: (filter: string) => void;
};

export { type DataResponse, DataTable, type DataTableProps, DataTableServer, type DataTableServerProps, DensityToggleButton, EditFilterButton, EditOrderButton, EditSortingButton, EditViewButton, GlobalFilter, PageSizeControl, type PageSizeControlProps, type PaginationProps, ResetFilteringButton, ResetSelectionButton, ResetSortingButton, type Result, Table, TableBody, type TableBodyProps, TableCardContainer, type TableCardContainerProps, TableCards, type TableCardsProps, TableFilter, TableFooter, type TableFooterProps, TableHeader, type TableHeaderProps, TableOrderer, TablePagination, type TableProps, type TableRowSelectorProps, TableSelector, TableSorter, TableViewer, TextCell, type TextCellProps, useDataFromUrl, type useDataFromUrlProps, type useDataFromUrlReturn, useDataTable };
