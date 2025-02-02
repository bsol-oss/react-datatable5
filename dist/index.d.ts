/// <reference types="react" />
import { RowData, OnChangeFn, Updater, FilterFn, ColumnDef, RowSelectionState, ColumnOrderState, ColumnFiltersState, PaginationState, SortingState, VisibilityState, Row, Table as Table$1, Column } from '@tanstack/react-table';
import * as React$1 from 'react';
import React__default, { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { RankingInfo } from '@tanstack/match-sorter-utils';
import { IconType } from 'react-icons';
import { TableHeaderProps as TableHeaderProps$1, TableRootProps, GridProps, CardBodyProps, TextProps } from '@chakra-ui/react';
import * as _tanstack_table_core from '@tanstack/table-core';

interface DensityToggleButtonProps {
    icon?: React__default.ReactElement;
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
declare const EditFilterButton: ({ text, title, closeText, resetText, icon, }: EditFilterButtonProps) => react_jsx_runtime.JSX.Element;

interface EditOrderButtonProps {
    title?: string;
    icon?: React__default.ReactElement;
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
    icon?: React__default.ReactElement;
    title?: string;
}
declare const EditViewButton: ({ text, icon, title, }: EditViewButtonProps) => react_jsx_runtime.JSX.Element;

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
    children?: ReactNode | ReactNode[];
    data: TData[];
    columns: ColumnDef<TData, any>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
    onRowSelect?: (rowSelectionState: RowSelectionState, data: TData[]) => void;
    columnOrder: ColumnOrderState;
    columnFilters: ColumnFiltersState;
    globalFilter: string;
    density: DensityState;
    pagination: PaginationState;
    sorting: SortingState;
    rowSelection: RowSelectionState;
    columnVisibility: VisibilityState;
    setPagination: OnChangeFn<PaginationState>;
    setSorting: OnChangeFn<SortingState>;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
    setRowSelection: OnChangeFn<RowSelectionState>;
    setGlobalFilter: OnChangeFn<string>;
    setColumnOrder: OnChangeFn<ColumnOrderState>;
    setDensity: OnChangeFn<DensityState>;
    setColumnVisibility: OnChangeFn<VisibilityState>;
}
declare const DataTable: <TData>({ columns, data, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, onRowSelect, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, children, }: DataTableProps<TData>) => react_jsx_runtime.JSX.Element;

interface UseDataFromUrlReturn<T> {
    data: T;
    loading: boolean;
    hasError: boolean;
    /**
     * Delays sending the request when the `refreshData` function is called multiple times within a short period.
     */
    refreshData: (config?: {
        debounce?: boolean;
        delay?: number;
    }) => void;
}
interface UseDataFromUrlProps<T> {
    url: string;
    params?: object;
    defaultData: T;
    disableFirstFetch?: boolean;
    onFetchSuccess?: (data: T) => void;
}
declare const useDataFromUrl: <T>({ url, params, disableFirstFetch, onFetchSuccess, defaultData, }: UseDataFromUrlProps<T>) => UseDataFromUrlReturn<T>;

interface DataTableDefaultState {
    sorting?: SortingState;
    columnFilters?: ColumnFiltersState;
    pagination?: PaginationState;
    rowSelection?: RowSelectionState;
    columnOrder?: ColumnOrderState;
    globalFilter?: string;
    columnVisibility?: VisibilityState;
    density?: DensityState;
}
interface UseDataTableProps {
    default?: DataTableDefaultState;
}
interface UseDataTableReturn {
    sorting: SortingState;
    columnFilters: ColumnFiltersState;
    pagination: PaginationState;
    rowSelection: RowSelectionState;
    columnOrder: ColumnOrderState;
    globalFilter: string;
    columnVisibility: VisibilityState;
    density: DensityState;
    setPagination: OnChangeFn<PaginationState>;
    setSorting: OnChangeFn<SortingState>;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
    setRowSelection: OnChangeFn<RowSelectionState>;
    setGlobalFilter: OnChangeFn<string>;
    setColumnOrder: OnChangeFn<ColumnOrderState>;
    setDensity: OnChangeFn<DensityState>;
    setColumnVisibility: OnChangeFn<VisibilityState>;
}
declare const useDataTable: ({ default: { sorting: defaultSorting, pagination: defaultPagination, rowSelection: defaultRowSelection, columnFilters: defaultColumnFilters, columnOrder: defaultColumnOrder, columnVisibility: defaultColumnVisibility, globalFilter: defaultGlobalFilter, density: defaultDensity, }, }?: UseDataTableProps) => UseDataTableReturn;

interface UseDataTableServerProps<TData> extends Omit<UseDataFromUrlProps<DataResponse<TData>>, keyof {
    defaultData: any;
}>, UseDataTableProps {
    /**
     * Delay to send the request if the `refreshData` called multiple times
     *
     * default: `true`
     */
    debounce?: boolean;
    /**
     * The time to wait before sending the request
     *
     * default: `1000`
     */
    debounceDelay?: number;
}
interface UseDataTableServerReturn<TData> extends UseDataFromUrlReturn<DataResponse<TData>>, UseDataTableReturn {
}
interface Result<T> {
    results: T[];
}
interface DataResponse<T> extends Result<T> {
    success: boolean;
    count: number;
}
declare const useDataTableServer: <TData>({ url, onFetchSuccess, default: { sorting: defaultSorting, pagination: defaultPagination, rowSelection: defaultRowSelection, columnFilters: defaultColumnFilters, columnOrder: defaultColumnOrder, columnVisibility: defaultColumnVisibility, globalFilter: defaultGlobalFilter, density: defaultDensity, }, debounce, debounceDelay, }: UseDataTableServerProps<TData>) => UseDataTableServerReturn<TData>;

interface DataTableServerProps<TData> extends UseDataFromUrlReturn<DataResponse<TData>> {
    children: ReactNode | ReactNode[];
    columns: ColumnDef<TData, any>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
    onRowSelect?: (rowSelectionState: RowSelectionState, data: TData[]) => void;
    columnOrder: ColumnOrderState;
    columnFilters: ColumnFiltersState;
    globalFilter: string;
    density: DensityState;
    pagination: PaginationState;
    sorting: SortingState;
    rowSelection: RowSelectionState;
    columnVisibility: VisibilityState;
    setPagination: OnChangeFn<PaginationState>;
    setSorting: OnChangeFn<SortingState>;
    setColumnFilters: OnChangeFn<ColumnFiltersState>;
    setRowSelection: OnChangeFn<RowSelectionState>;
    setGlobalFilter: OnChangeFn<string>;
    setColumnOrder: OnChangeFn<ColumnOrderState>;
    setDensity: OnChangeFn<DensityState>;
    setColumnVisibility: OnChangeFn<VisibilityState>;
}
declare const DataTableServer: <TData>({ columns, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, onRowSelect, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, data, loading, hasError, refreshData, children, }: DataTableServerProps<TData>) => react_jsx_runtime.JSX.Element;

interface DefaultCardProps<TData> {
    row: Row<TData>;
    imageColumnId?: keyof TData;
    titleColumnId?: keyof TData;
    tagColumnId?: keyof TData;
    tagIcon?: IconType;
    showTag?: boolean;
}
declare const DefaultCard: <TData>({ row, imageColumnId, titleColumnId, tagColumnId, tagIcon, showTag, }: DefaultCardProps<TData>) => react_jsx_runtime.JSX.Element;

interface TableControlsProps {
    totalText?: string;
    showFilter?: boolean;
    fitTableWidth?: boolean;
    fitTableHeight?: boolean;
    isMobile?: boolean;
    children?: ReactNode;
    showFilterName?: boolean;
    showFilterTags?: boolean;
    showReload?: boolean;
    filterOptions?: string[];
    extraItems?: ReactNode;
}
declare const TableControls: ({ totalText, showFilter, fitTableWidth, fitTableHeight, isMobile, children, showFilterName, showFilterTags, showReload, filterOptions, extraItems, }: TableControlsProps) => react_jsx_runtime.JSX.Element;

interface DefaultTableProps extends TableControlsProps {
    showFooter?: boolean;
    showSelector?: boolean;
    tableProps?: Omit<TableProps, "children">;
    tHeadProps?: TableHeaderProps$1;
}
declare const DefaultTable: ({ totalText, showFilter, showFooter, fitTableWidth, fitTableHeight, isMobile, filterOptions, showFilterTags, showFilterName, showReload, showSelector, extraItems, tableProps, tHeadProps, }: DefaultTableProps) => react_jsx_runtime.JSX.Element;

interface ReloadButtonProps {
    text?: string;
    variant?: string;
}
declare const ReloadButton: ({ text, variant, }: ReloadButtonProps) => react_jsx_runtime.JSX.Element;

interface TableProps extends TableRootProps {
    showLoading?: boolean;
    loadingComponent?: ReactNode;
    emptyComponent?: ReactNode;
    children: ReactNode;
}
declare const Table: ({ children, emptyComponent, ...props }: TableProps) => string | number | bigint | boolean | react_jsx_runtime.JSX.Element | Iterable<ReactNode> | Promise<string | number | bigint | boolean | React$1.ReactPortal | React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null;

interface TableBodyProps {
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
    showSelector?: boolean;
    alwaysShowSelector?: boolean;
}
interface TableRowSelectorProps<TData> {
    index: number;
    row: Row<TData>;
    hoveredRow: number;
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
    alwaysShowSelector?: boolean;
}
declare const TableBody: ({ pinnedBgColor, showSelector, alwaysShowSelector, }: TableBodyProps) => react_jsx_runtime.JSX.Element;

interface TableCardContainerProps extends GridProps {
    children: ReactNode;
}
declare const TableCardContainer: ({ children, ...props }: TableCardContainerProps) => react_jsx_runtime.JSX.Element;

interface TableCardsProps<TData> {
    isSelectable?: boolean;
    showDisplayNameOnly?: boolean;
    renderTitle?: (row: Row<TData>) => ReactNode | undefined;
    cardBodyProps?: CardBodyProps;
}
declare const DefaultCardTitle: () => react_jsx_runtime.JSX.Element;
declare const TableCards: <TData>({ isSelectable, showDisplayNameOnly, renderTitle, cardBodyProps }: TableCardsProps<TData>) => react_jsx_runtime.JSX.Element;

interface TableRendererProps<TData> {
    render: (render: Table$1<TData>) => React__default.ReactElement;
}
declare const TableComponent: <TData>({ render, }: TableRendererProps<TData>) => React__default.ReactElement<unknown, string | React__default.JSXElementConstructor<any>>;

declare const TableFilter: () => react_jsx_runtime.JSX.Element;

declare const TableFilterTags: () => react_jsx_runtime.JSX.Element;

interface TableFooterProps {
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
    showSelector?: boolean;
    alwaysShowSelector?: boolean;
}
declare const TableFooter: ({ pinnedBgColor, showSelector, alwaysShowSelector, }: TableFooterProps) => react_jsx_runtime.JSX.Element;

interface TableHeaderProps {
    canResize?: boolean;
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
    showSelector?: boolean;
    isSticky?: boolean;
    alwaysShowSelector?: boolean;
    tHeadProps?: TableHeaderProps$1;
}
declare const TableHeader: ({ canResize, pinnedBgColor, showSelector, isSticky, alwaysShowSelector, tHeadProps, }: TableHeaderProps) => react_jsx_runtime.JSX.Element;

interface TableLoadingComponentProps {
    render: (loading: boolean) => ReactNode;
}
declare const TableLoadingComponent: ({ render, }: TableLoadingComponentProps) => react_jsx_runtime.JSX.Element;

declare const TableOrderer: () => react_jsx_runtime.JSX.Element;

declare const TablePagination: () => react_jsx_runtime.JSX.Element;

declare const TableSelector: () => react_jsx_runtime.JSX.Element;

declare const TableSorter: () => react_jsx_runtime.JSX.Element;

declare const TableViewer: () => react_jsx_runtime.JSX.Element;

interface TextCellProps extends TextProps {
    label?: string;
    noOfLines?: number[];
    padding?: string;
    children: string | number | ReactNode | ReactNode[];
}
declare const TextCell: ({ label, padding, children, ...props }: TextCellProps) => react_jsx_runtime.JSX.Element;

declare const useDataTableContext: () => {
    table: _tanstack_table_core.Table<any>;
    refreshData: () => void;
    globalFilter: string;
    setGlobalFilter: _tanstack_table_core.OnChangeFn<string>;
    loading: boolean;
    hasError: boolean;
};

interface FilterOptionsProps {
    column: string;
}
declare const FilterOptions: ({ column }: FilterOptionsProps) => react_jsx_runtime.JSX.Element;

declare const GlobalFilter: () => react_jsx_runtime.JSX.Element;

declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        /**
         * The display name of the column, used for rendering headers.
         */
        displayName?: string;
        /**
         * Specifies the type of filter to be used for the column.
         *
         * @remarks You should provide a proper `filterfn` to handle filtering when choosing `boolean`, `dateRange`, and `custom`.
         *
         * @remarks You should decide `renderFilter` to display filter ui when choosing `custom`.
         *
         * Possible values:
         * - "text": A text input filter.
         * - "range": A numerical range filter.
         * - "select": A dropdown select filter.
         * - "tag": A tag-based filter.
         * - "boolean": A true/false filter.
         * - "dateRange": A date range filter.
         * - "custom": A custom filter function.
         */
        filterVariant?: "text" | "range" | "select" | "tag" | "boolean" | "dateRange" | "custom";
        /**
         * Options for the select filter variant, if applicable.
         */
        filterOptions?: string[];
        /**
         * Configuration for the range filter variant, if applicable.
         *
         * Properties:
         * - `min`: Minimum value for the range.
         * - `max`: Maximum value for the range.
         * - `step`: Step increment for the range.
         * - `defaultValue`: Default range values for the filter.
         */
        filterRangeConfig?: {
            min: number;
            max: number;
            step: number;
            defaultValue: [number, number];
        };
        /**
         * A function that renders the filter component for the column.
         *
         * @param column - The column for which the filter is being rendered.
         * @returns A JSX element representing the filter UI.
         */
        renderFilter?: (column: Column<TData>) => ReactNode;
    }
}

export { type DataResponse, DataTable, type DataTableDefaultState, type DataTableProps, DataTableServer, type DataTableServerProps, DefaultCard, type DefaultCardProps, DefaultCardTitle, DefaultTable, type DefaultTableProps, DensityToggleButton, type DensityToggleButtonProps, EditFilterButton, type EditFilterButtonProps, EditOrderButton, type EditOrderButtonProps, EditSortingButton, type EditSortingButtonProps, EditViewButton, type EditViewButtonProps, FilterOptions, type FilterOptionsProps, GlobalFilter, PageSizeControl, type PageSizeControlProps, ReloadButton, type ReloadButtonProps, ResetFilteringButton, type ResetFilteringButtonProps, ResetSelectionButton, type ResetSelectionButtonProps, ResetSortingButton, type ResetSortingButtonProps, type Result, RowCountText, Table, TableBody, type TableBodyProps, TableCardContainer, type TableCardContainerProps, TableCards, type TableCardsProps, TableComponent, TableControls, type TableControlsProps, TableFilter, TableFilterTags, TableFooter, type TableFooterProps, TableHeader, type TableHeaderProps, TableLoadingComponent, type TableLoadingComponentProps, TableOrderer, TablePagination, type TableProps, type TableRendererProps, type TableRowSelectorProps, TableSelector, TableSorter, TableViewer, TextCell, type TextCellProps, type UseDataFromUrlProps, type UseDataFromUrlReturn, type UseDataTableProps, type UseDataTableReturn, type UseDataTableServerProps, type UseDataTableServerReturn, useDataFromUrl, useDataTable, useDataTableContext, useDataTableServer };
