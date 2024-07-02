/// <reference types="react" />
import * as react_jsx_runtime from 'react/jsx-runtime';
import { RowData, OnChangeFn, Updater, FilterFn, ColumnDef, RowSelectionState, ColumnFiltersState, SortingState, VisibilityState, Row, Table as Table$1 } from '@tanstack/react-table';
import { RankingInfo } from '@tanstack/match-sorter-utils';
import React$1, { ReactNode } from 'react';
import * as react_icons_lib from 'react-icons/lib';
import { TableProps as TableProps$1, TextProps, TooltipProps } from '@chakra-ui/react';
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
    children?: JSX.Element | JSX.Element[];
    data: TData[];
    columns: ColumnDef<TData, any>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
    onRowSelect?: (rowSelection: RowSelectionState) => void;
    columnOrder?: string[];
    columnFilters?: ColumnFiltersState;
    globalFilter?: string;
    density?: DensityState;
    pagination?: {
        pageIndex: number;
        pageSize: number;
    };
    sorting?: SortingState;
    rowSelection?: RowSelectionState;
    columnVisibility?: VisibilityState;
}
declare const DataTable: <TData>({ columns, data, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, onRowSelect, columnOrder: defaultColumnOrder, columnFilters: defaultColumnFilter, density, globalFilter: defaultGlobalFilter, pagination: defaultPagination, sorting: defaultSorting, rowSelection: defaultRowSelection, columnVisibility: defaultColumnVisibility, children, }: DataTableProps<TData>) => react_jsx_runtime.JSX.Element;

interface DataTableServerProps<TData> {
    children: JSX.Element | JSX.Element[];
    url: string;
    columns: ColumnDef<TData, any>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
    onRowSelect?: (row: RowSelectionState) => void;
    columnOrder?: string[];
    columnFilters?: ColumnFiltersState;
    globalFilter?: string;
    density?: DensityState;
    pagination?: {
        pageIndex: number;
        pageSize: number;
    };
    sorting?: SortingState;
    rowSelection?: RowSelectionState;
    loadingComponent?: JSX.Element;
    columnVisibility?: VisibilityState;
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
        displayName?: string;
    }
}
declare const DataTableServer: <TData>({ columns, url, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, onRowSelect, columnOrder: defaultColumnOrder, columnFilters: defaultColumnFilter, density, globalFilter: defaultGlobalFilter, pagination: defaultPagination, sorting: defaultSorting, rowSelection: defaultRowSelection, columnVisibility: defaultColumnVisibility, children, }: DataTableServerProps<TData>) => react_jsx_runtime.JSX.Element;

interface DefaultTableProps {
    totalText?: string;
    showFilter?: boolean;
    showFooter?: boolean;
    fitTableWidth?: boolean;
    fitTableHeight?: boolean;
    isMobile?: boolean;
}
declare const DefaultTable: ({ totalText, showFilter, showFooter, fitTableWidth, fitTableHeight, isMobile, }: DefaultTableProps) => react_jsx_runtime.JSX.Element;

interface DensityToggleButtonProps {
    icon?: React$1.ReactElement;
    text?: string;
}
declare const DensityToggleButton: ({ text, icon, }: DensityToggleButtonProps) => react_jsx_runtime.JSX.Element;

interface EditFilterButtonProps {
    text?: string;
    title?: string;
    closeText?: string;
    resetText?: string;
    icon?: React.ReactElement;
}
declare const EditFilterButton: ({ text, title, closeText, resetText, icon, ...props }: EditFilterButtonProps) => react_jsx_runtime.JSX.Element;

interface EditOrderButtonProps {
    title?: string;
    icon?: React$1.ReactElement;
    text?: string;
}
declare const EditOrderButton: ({ text, icon, title, }: EditOrderButtonProps) => react_jsx_runtime.JSX.Element;

interface EditSortingButtonProps {
    title?: string;
    icon?: React.ReactElement;
    text?: string;
}
declare const EditSortingButton: ({ text, icon, title, }: EditSortingButtonProps) => react_jsx_runtime.JSX.Element;

interface EditViewButtonProps {
    text?: string;
    icon?: React$1.ReactElement;
    title?: string;
}
declare const EditViewButton: ({ text, icon, title, }: EditViewButtonProps) => react_jsx_runtime.JSX.Element;

declare const GlobalFilter: ({ icon }: {
    icon?: react_icons_lib.IconType | undefined;
}) => react_jsx_runtime.JSX.Element;

interface PageSizeControlProps {
    pageSizes?: number[];
}
declare const PageSizeControl: ({ pageSizes, }: PageSizeControlProps) => react_jsx_runtime.JSX.Element;

interface ResetFilteringButtonProps {
    text?: string;
}
declare const ResetFilteringButton: ({ text, }: ResetFilteringButtonProps) => react_jsx_runtime.JSX.Element;

interface ResetSelectionButtonProps {
    text?: string;
}
declare const ResetSelectionButton: ({ text, }: ResetSelectionButtonProps) => react_jsx_runtime.JSX.Element;

interface ResetSortingButtonProps {
    text?: string;
}
declare const ResetSortingButton: ({ text, }: ResetSortingButtonProps) => react_jsx_runtime.JSX.Element;

declare const RowCountText: () => react_jsx_runtime.JSX.Element;

interface TableProps extends TableProps$1 {
    showLoading?: boolean;
    loadingComponent?: JSX.Element;
    children: ReactNode;
}
declare const Table: ({ children, showLoading, loadingComponent, ...props }: TableProps) => react_jsx_runtime.JSX.Element;

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

interface TableRendererProps<TData> {
    render: (render: Table$1<TData>) => React$1.ReactElement;
}
declare const TableComponent: <TData>({ render, }: TableRendererProps<TData>) => React$1.ReactElement<any, string | React$1.JSXElementConstructor<any>>;

declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: "text" | "range" | "select";
        filterOptions?: string[];
    }
}
declare const TableFilter: () => react_jsx_runtime.JSX.Element;

declare const TableFilterTags: () => react_jsx_runtime.JSX.Element;

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
    loading: boolean;
};

export { type DataResponse, DataTable, type DataTableProps, DataTableServer, type DataTableServerProps, DefaultTable, type DefaultTableProps, DensityToggleButton, type DensityToggleButtonProps, EditFilterButton, type EditFilterButtonProps, EditOrderButton, type EditOrderButtonProps, EditSortingButton, type EditSortingButtonProps, EditViewButton, type EditViewButtonProps, GlobalFilter, PageSizeControl, type PageSizeControlProps, type PaginationProps, ResetFilteringButton, type ResetFilteringButtonProps, ResetSelectionButton, type ResetSelectionButtonProps, ResetSortingButton, type ResetSortingButtonProps, type Result, RowCountText, Table, TableBody, type TableBodyProps, TableCardContainer, type TableCardContainerProps, TableCards, type TableCardsProps, TableComponent, TableFilter, TableFilterTags, TableFooter, type TableFooterProps, TableHeader, type TableHeaderProps, TableOrderer, TablePagination, type TableProps, type TableRendererProps, type TableRowSelectorProps, TableSelector, TableSorter, TableViewer, TextCell, type TextCellProps, useDataFromUrl, type useDataFromUrlProps, type useDataFromUrlReturn, useDataTable };
