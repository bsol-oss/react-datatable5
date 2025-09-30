/// <reference types="react" />
import { Row, RowData, OnChangeFn, Updater, FilterFn, ColumnDef, RowSelectionState, ColumnOrderState, ColumnFiltersState, PaginationState, SortingState, VisibilityState, Table as Table$1, Column } from '@tanstack/react-table';
import * as React$1 from 'react';
import React__default, { ReactNode, Dispatch, SetStateAction } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ImageProps, GridProps, TableRootProps, TableHeaderProps as TableHeaderProps$1, TableRowProps, BoxProps, FlexProps, CardBodyProps, TextProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import * as react_i18next from 'react-i18next';
import { UseTranslationResponse } from 'react-i18next';
import { RankingInfo } from '@tanstack/match-sorter-utils';
import { UseQueryResult } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import { ForeignKeyProps as ForeignKeyProps$1 } from '@/components/Form/components/fields/StringInputField';
import { AxiosRequestConfig } from 'axios';
import * as react_hook_form from 'react-hook-form';
import { UseFormReturn, FieldValues, SubmitHandler } from 'react-hook-form';
import { RenderProps, Props } from '@bsol-oss/dayzed-react19';

interface DensityToggleButtonProps {
    icon?: React__default.ReactElement;
    text?: string;
}
declare const DensityToggleButton: ({ text, icon, }: DensityToggleButtonProps) => react_jsx_runtime.JSX.Element;

interface EditSortingButtonProps {
    title?: string;
    icon?: React.ReactElement;
    text?: string;
}
declare const EditSortingButton: ({ text, icon, title, }: EditSortingButtonProps) => react_jsx_runtime.JSX.Element;

interface EditFilterButtonProps {
    icon?: React.ReactElement;
}
declare const FilterDialog: ({ icon, }: EditFilterButtonProps) => react_jsx_runtime.JSX.Element;

interface PageSizeControlProps {
    pageSizes?: number[];
}
declare const PageSizeControl: ({ pageSizes, }: PageSizeControlProps) => react_jsx_runtime.JSX.Element;

declare const Pagination: () => react_jsx_runtime.JSX.Element;

declare const ResetFilteringButton: () => react_jsx_runtime.JSX.Element;

declare const ResetSelectionButton: () => react_jsx_runtime.JSX.Element;

declare const ResetSortingButton: () => react_jsx_runtime.JSX.Element;

declare const RowCountText: () => react_jsx_runtime.JSX.Element;

interface EditViewButtonProps {
    icon?: React__default.ReactElement;
}
declare const ViewDialog: ({ icon }: EditViewButtonProps) => react_jsx_runtime.JSX.Element;

interface CardHeaderProps<TData> {
    row: Row<TData>;
    imageColumnId?: keyof TData;
    titleColumnId?: keyof TData;
    tagColumnId?: keyof TData;
    tagIcon?: IconType;
    showTag?: boolean;
    imageProps?: ImageProps;
}
declare const CardHeader: <TData>({ row, imageColumnId, titleColumnId, tagColumnId, tagIcon, showTag, imageProps, }: CardHeaderProps<TData>) => react_jsx_runtime.JSX.Element;

interface EmptyStateProps {
    title?: string;
    description?: string;
}
declare const EmptyState: ({ title, description, }: EmptyStateProps) => react_jsx_runtime.JSX.Element;

interface ErrorAlertProps {
    showMessage?: boolean;
}
declare const ErrorAlert: ({ showMessage }: ErrorAlertProps) => react_jsx_runtime.JSX.Element;

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
interface DataTableProps<TData = unknown> {
    children?: ReactNode | ReactNode[];
    /**
     * Data array for the table.
     *
     * It will pass into as the data in `@tanstack/react-table`
     *
     */
    data: TData[];
    /**
     * Column definitions for the table.
     *
     * It will pass into as the column definitions in `@tanstack/react-table`
     *
     * @link https://tanstack.com/table/latest/docs/guide/column-defs
     */
    columns: ColumnDef<TData, unknown>[];
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
    translate: UseTranslationResponse<any, any>;
    tableLabel?: DataTableLabel;
}
/**
 * DataTable will create a context to hold all values to
 * help the render of the DataTable in serverside
 *
 *
 * The query is required to be a GET request that can receive
 * specified params and return a specified response
 *
 * @link https://tanstack.com/table/latest/docs/guide/column-defs
 */
declare function DataTable<TData = unknown>({ columns, data, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, translate, children, tableLabel, }: DataTableProps<TData>): react_jsx_runtime.JSX.Element;

interface DataTableLabel {
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
interface DataTableContextProps<TData = unknown> extends DataTableProps {
    table: Table$1<TData>;
    globalFilter: string;
    setGlobalFilter: OnChangeFn<string>;
    type: "client" | "server";
    translate: UseTranslationResponse<any, unknown>;
    tableLabel: DataTableLabel;
}

declare const useDataTableContext: <TData>() => DataTableContextProps<TData>;

interface DataDisplayProps {
    variant?: "horizontal" | "stats" | "";
    translate?: UseTranslationResponse<any, any>;
}
declare const DataDisplay: ({ variant }: DataDisplayProps) => react_jsx_runtime.JSX.Element;

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
    keyPrefix?: string;
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
    translate: UseTranslationResponse<any, any>;
}
declare const useDataTable: ({ default: { sorting: defaultSorting, pagination: defaultPagination, rowSelection: defaultRowSelection, columnFilters: defaultColumnFilters, columnOrder: defaultColumnOrder, columnVisibility: defaultColumnVisibility, globalFilter: defaultGlobalFilter, density: defaultDensity, }, keyPrefix, }?: UseDataTableProps) => UseDataTableReturn;

interface UseDataTableServerProps<TData> extends UseDataTableProps {
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
    /**
     * The url to fetch the data from.
     *
     * Remark:
     * it is the server responsibility to handle the params and return the data.
     * especially the pagination and sorting.
     *
     * The response must be like this:
     * ```ts
     * {
     *   data: TData[],
     *   count: number,
     * }
     * ```
     *
     * Example:
     * ```ts
     * const url = "https://jsonplaceholder.typicode.com/posts";
     * ```
     *
     * If not provided, the `queryFn` will be used.
     *
     * @default undefined
     */
    url?: string;
    placeholderData?: DataResponse<TData>;
    /**
     * The query function to fetch the data from.
     *
     * Remark:
     * it is the server responsibility to handle the params and return the data.
     * especially the pagination and sorting.
     *
     * Example:
     * ```ts
     * const queryFn = (params: QueryParams) => {
     *   return axios.get<DataResponse<TData>>(url, { params });
     * };
     * ```
     *
     * If not provided, the `url` will be used.
     *
     * @default undefined
     */
    queryFn?: (params: QueryParams) => Promise<DataResponse<TData>>;
}
interface UseDataTableServerReturn<TData> extends UseDataTableReturn {
    query: UseQueryResult<DataResponse<TData>, Error>;
}
interface Result<T = unknown> {
    data: T[];
}
interface DataResponse<T = unknown> extends Result<T> {
    count: number;
}
interface QueryParams {
    offset: number;
    limit: number;
    sorting: SortingState;
    where: ColumnFiltersState;
    searching: string;
}
declare const useDataTableServer: <TData>(props: UseDataTableServerProps<TData>) => UseDataTableServerReturn<TData>;

interface DataTableServerProps<TData = unknown> {
    children: ReactNode | ReactNode[];
    /**
     * Column definitions for the table.
     *
     * It will pass into as the column definitions in `@tanstack/react-table`
     *
     * @link https://tanstack.com/table/latest/docs/guide/column-defs
     */
    columns: ColumnDef<TData>[];
    enableRowSelection?: boolean;
    enableMultiRowSelection?: boolean;
    enableSubRowSelection?: boolean;
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
    query: UseQueryResult<DataResponse<TData>>;
    url?: string;
    translate: UseTranslationResponse<any, any>;
    tableLabel?: DataTableLabel;
}
/**
 * DataTableServer will create a context to hold all values to
 * help the render of the DataTable in serverside
 *
 * The query is required to be a GET request that can receive
 * specified params and return a specified response
 *
 * The `useDataTableServer` can help to create the specified request and response
 *
 * @link https://tanstack.com/table/latest/docs/guide/column-defs
 */
declare function DataTableServer<TData = unknown>({ columns, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, query, url, translate, children, tableLabel, }: DataTableServerProps<TData>): react_jsx_runtime.JSX.Element;

interface TableControlsProps {
    totalText?: string;
    fitTableWidth?: boolean;
    fitTableHeight?: boolean;
    children?: ReactNode;
    showGlobalFilter?: boolean;
    showFilter?: boolean;
    showFilterName?: boolean;
    showFilterTags?: boolean;
    showReload?: boolean;
    showPagination?: boolean;
    showPageSizeControl?: boolean;
    showPageCountText?: boolean;
    showView?: boolean;
    filterTagsOptions?: {
        column: string;
        options: {
            label: string;
            value: string;
        }[];
    }[];
    extraItems?: ReactNode;
    loading?: boolean;
    hasError?: boolean;
    gridProps?: GridProps;
}
declare const TableControls: ({ fitTableWidth, fitTableHeight, children, showGlobalFilter, showFilter, showFilterName, showFilterTags, showReload, showPagination, showPageSizeControl, showPageCountText, showView, filterTagsOptions, extraItems, loading, hasError, gridProps, }: TableControlsProps) => react_jsx_runtime.JSX.Element;

interface TableProps extends TableRootProps {
    showLoading?: boolean;
    loadingComponent?: ReactNode;
    emptyComponent?: ReactNode;
    canResize?: boolean;
    children: ReactNode;
}
declare const Table: ({ children, emptyComponent, canResize, ...props }: TableProps) => string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | React$1.ReactPortal | React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | react_jsx_runtime.JSX.Element | null;

interface TableBodyProps {
    pinnedBgColor?: {
        light: string;
        dark: string;
    };
    showSelector?: boolean;
    alwaysShowSelector?: boolean;
    canResize?: boolean;
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
declare const TableBody: ({ showSelector, canResize, }: TableBodyProps) => react_jsx_runtime.JSX.Element;

interface TableFooterProps {
    showSelector?: boolean;
    alwaysShowSelector?: boolean;
}
declare const TableFooter: ({ showSelector, alwaysShowSelector, }: TableFooterProps) => react_jsx_runtime.JSX.Element;

interface TableHeaderTexts {
    pinColumn?: string;
    cancelPin?: string;
    sortAscending?: string;
    sortDescending?: string;
    clearSorting?: string;
}
interface TableHeaderProps {
    canResize?: boolean;
    showSelector?: boolean;
    isSticky?: boolean;
    tableHeaderProps?: TableHeaderProps$1;
    tableRowProps?: TableRowProps;
    /**
     * Default text configuration for all columns.
     * Can be overridden per column via meta.headerTexts.
     */
    defaultTexts?: TableHeaderTexts;
}
/**
 * TableHeader component with configurable text strings.
 *
 * @example
 * // Using default texts
 * <TableHeader />
 *
 * @example
 * // Customizing default texts for all columns
 * <TableHeader
 *   defaultTexts={{
 *     pinColumn: "Pin This Column",
 *     sortAscending: "Sort A-Z"
 *   }}
 * />
 *
 * @example
 * // Customizing texts per column via meta
 * const columns = [
 *   columnHelper.accessor("name", {
 *     header: "Name",
 *     meta: {
 *       headerTexts: {
 *         pinColumn: "Pin Name Column",
 *         sortAscending: "Sort Names A-Z"
 *       }
 *     }
 *   })
 * ];
 */
declare const TableHeader: ({ canResize, showSelector, isSticky, tableHeaderProps, tableRowProps, defaultTexts, }: TableHeaderProps) => react_jsx_runtime.JSX.Element;

interface DefaultTableProps {
    showFooter?: boolean;
    tableProps?: Omit<TableProps, "children">;
    tableHeaderProps?: TableHeaderProps;
    tableBodyProps?: TableBodyProps;
    tableFooterProps?: TableFooterProps;
    controlProps?: TableControlsProps;
    variant?: "" | "greedy";
}
declare const DefaultTable: ({ showFooter, tableProps, tableHeaderProps, tableBodyProps, tableFooterProps, controlProps, variant, }: DefaultTableProps) => react_jsx_runtime.JSX.Element;

interface ReloadButtonProps {
    variant?: string;
}
declare const ReloadButton: ({ variant, }: ReloadButtonProps) => react_jsx_runtime.JSX.Element;

interface TableCardContainerProps extends BoxProps {
    children: ReactNode;
    variant?: "carousel" | "";
    gap?: string;
    gridTemplateColumns?: string;
    direction?: FlexProps["direction"];
}
declare const TableCardContainer: ({ children, variant, gap, gridTemplateColumns, direction, ...props }: TableCardContainerProps) => react_jsx_runtime.JSX.Element;

interface TableCardsProps<TData> {
    isSelectable?: boolean;
    showDisplayNameOnly?: boolean;
    renderTitle?: (row: Row<TData>) => ReactNode | undefined;
    cardBodyProps?: CardBodyProps;
}
declare const DefaultCardTitle: () => react_jsx_runtime.JSX.Element;
declare const TableCards: <TData>({ isSelectable, showDisplayNameOnly, renderTitle, cardBodyProps, }: TableCardsProps<TData>) => react_jsx_runtime.JSX.Element;

interface TableRendererProps<TData> {
    render: (render: Table$1<TData>) => React__default.ReactElement;
}
declare const TableComponent: <TData>({ render, }: TableRendererProps<TData>) => React__default.ReactElement<unknown, string | React__default.JSXElementConstructor<any>>;

declare const TableFilter: () => react_jsx_runtime.JSX.Element;

declare const TableFilterTags: () => react_jsx_runtime.JSX.Element;

interface TableLoadingComponentProps {
    render: (loading: boolean) => ReactNode;
}
declare const TableLoadingComponent: ({ render, }: TableLoadingComponentProps) => react_jsx_runtime.JSX.Element;

declare const TableSelector: () => react_jsx_runtime.JSX.Element;

declare const TableSorter: () => react_jsx_runtime.JSX.Element;

declare const TableViewer: () => react_jsx_runtime.JSX.Element;

interface TextCellProps {
    label?: string;
    noOfLines?: number[];
    children: string | number | ReactNode | ReactNode[];
    containerProps?: FlexProps;
    textProps?: TextProps;
}
declare const TextCell: ({ label, containerProps, textProps, children, }: TextCellProps) => react_jsx_runtime.JSX.Element;

interface GetColumnsConfigs<K extends RowData> {
    schema: JSONSchema7;
    include?: K[];
    ignore?: K[];
    width?: number[];
    meta?: {
        [key in K as string]?: object;
    };
    defaultWidth?: number;
    translate?: UseTranslationResponse<any, any>;
}
declare const widthSanityCheck: <K extends unknown>(widthList: number[], ignoreList: K[], properties: { [key in K as string]?: object | undefined; }) => void;
declare const getColumns: <TData extends unknown>({ schema, include, ignore, width, meta, defaultWidth, translate, }: GetColumnsConfigs<TData>) => ColumnDef<TData>[];

interface TableDataDisplayProps {
    colorPalette?: string;
    emptyComponent?: ReactNode;
}
declare const TableDataDisplay: ({ colorPalette, emptyComponent, }: TableDataDisplayProps) => react_jsx_runtime.JSX.Element;

declare const GlobalFilter: () => react_jsx_runtime.JSX.Element;

interface CustomQueryFnResponse {
    /**
     * The data of the query
     */
    data: any;
    /**
     * The id map of the data
     */
    idMap: Record<string, any>;
}
interface CustomQueryFnParams {
    searching: string;
    limit: number;
    offset: number;
}
type CustomQueryFn = (params: CustomQueryFnParams) => Promise<CustomQueryFnResponse>;
interface ForeignKeyProps {
    column: string;
    table: string;
    display_column: string;
    customQueryFn?: CustomQueryFn;
}

interface CustomJSONSchema7 extends JSONSchema7 {
    gridColumn?: string;
    gridRow?: string;
    foreign_key?: ForeignKeyProps;
    variant?: string;
    renderDisplay?: (item: unknown) => ReactNode;
    inputRender?: (props: {
        column: string;
        schema: CustomJSONSchema7;
        prefix: string;
        formContext: UseFormReturn;
    }) => ReactNode;
    inputViewerRender?: (props: {
        column: string;
        schema: CustomJSONSchema7;
        prefix: string;
        formContext: UseFormReturn;
    }) => ReactNode;
    dateFormat?: string;
    displayDateFormat?: string;
    timeFormat?: string;
    displayTimeFormat?: string;
    showLabel?: boolean;
}

interface FormRootProps<TData extends FieldValues> {
    schema: CustomJSONSchema7;
    serverUrl: string;
    requestUrl?: string;
    idMap: Record<string, object>;
    setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
    form: UseFormReturn;
    translate: UseTranslationResponse<any, any>;
    children: ReactNode;
    order?: string[];
    ignore?: string[];
    include?: string[];
    onSubmit?: SubmitHandler<TData>;
    rowNumber?: number | string;
    requestOptions?: AxiosRequestConfig;
    getUpdatedData?: () => TData | Promise<TData> | void;
    customErrorRenderer?: (error: unknown) => ReactNode;
    displayConfig?: {
        showSubmitButton?: boolean;
        showResetButton?: boolean;
        showTitle?: boolean;
    };
}
interface CustomJSONSchema7Definition extends JSONSchema7 {
    variant: string;
    in_table: string;
    column_ref: string;
    display_column: string;
    gridColumn: string;
    gridRow: string;
    foreign_key: ForeignKeyProps$1;
    children: ReactNode;
}
declare const idPickerSanityCheck: (column: string, foreign_key?: {
    table?: string | undefined;
    column?: string | undefined;
    display_column?: string | undefined;
} | undefined) => void;
declare const FormRoot: <TData extends FieldValues>({ schema, idMap, setIdMap, form, serverUrl, translate, children, order, ignore, include, onSubmit, rowNumber, requestOptions, getUpdatedData, customErrorRenderer, displayConfig, }: FormRootProps<TData>) => react_jsx_runtime.JSX.Element;

interface DefaultFormProps<TData extends FieldValues> {
    formConfig: Omit<FormRootProps<TData>, "children">;
    showTitle?: boolean;
}
declare const DefaultForm: <TData extends FieldValues>({ formConfig, }: DefaultFormProps<TData>) => react_jsx_runtime.JSX.Element;

declare const FormTitle: () => react_jsx_runtime.JSX.Element;

declare const FormBody: <TData extends object>() => react_jsx_runtime.JSX.Element;

interface UseFormProps {
    preLoadedValues?: FieldValues | undefined;
    keyPrefix?: string;
}
declare const useForm: ({ preLoadedValues, keyPrefix }: UseFormProps) => {
    form: react_hook_form.UseFormReturn<FieldValues, any, undefined>;
    idMap: Record<string, object>;
    setIdMap: React$1.Dispatch<React$1.SetStateAction<Record<string, object>>>;
    translate: react_i18next.UseTranslationResponse<"", string>;
};

interface CalendarProps extends RenderProps {
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
interface GetDateColorProps {
    today: boolean;
    selected: boolean;
    selectable: boolean;
}
interface GetVariantProps {
    today: boolean;
    selected: boolean;
    selectable: boolean;
}
interface DatePickerProps extends Props {
    onDateSelected?: (obj: {
        date: Date;
    }) => void;
    selected: Date | Date[];
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    showOutsideDays?: boolean;
    date?: Date;
    minDate?: Date;
    maxDate?: Date;
    monthsToDisplay?: number;
    labels?: {
        monthNamesShort: string[];
        weekdayNamesShort: string[];
        backButtonLabel?: string;
        forwardButtonLabel?: string;
    };
    render?: (dayzedData: any) => React__default.ReactNode;
}
interface DatePickerLabels {
    monthNamesShort: string[];
    weekdayNamesShort: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
}

interface GetMultiDatesProps {
    selected: boolean;
    selectable: boolean;
    selectedDate: Date;
    selectedDates: Date[];
}
declare const getMultiDates: ({ selected, selectedDate, selectedDates, selectable, }: GetMultiDatesProps) => Date[];

interface GetRangeDatesProps {
    selectable: boolean;
    date: Date;
    selectedDates: Date[];
}
declare const getRangeDates: ({ selectable, date, selectedDates, }: GetRangeDatesProps) => Date[] | undefined;

interface RangeCalendarProps extends RenderProps {
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    selected?: Date[];
}
interface GetStyleProps {
    today: boolean;
    selected: boolean;
    unavailable: boolean;
    isInRange: boolean;
}
interface RangeDatePickerProps extends Props, RangeCalendarProps {
}

interface RecordDisplayProps {
    object: object | null;
    boxProps?: BoxProps;
    translate?: UseTranslationResponse<any, any>;
    prefix?: string;
}
declare const RecordDisplay: ({ object, boxProps, translate, prefix, }: RecordDisplayProps) => react_jsx_runtime.JSX.Element;

declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        /**
         * If `showCustomDisplay` is `true`, it will use the cell render to render the value.
         *
         * Effective in components: `DataDisplay`
         */
        showCustomDisplay?: boolean;
        /**
         * The display name of the column, used for rendering headers.
         */
        displayName?: string;
        /**
         * Text configuration for the column header menu items.
         * These strings can be customized per column.
         */
        headerTexts?: {
            pinColumn?: string;
            cancelPin?: string;
            sortAscending?: string;
            sortDescending?: string;
            clearSorting?: string;
        };
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
        filterOptions?: {
            label: string;
            value: string;
        }[];
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

export { type CalendarProps, CardHeader, type CardHeaderProps, type CustomJSONSchema7Definition, DataDisplay, type DataDisplayProps, type DataResponse, DataTable, type DataTableDefaultState, type DataTableProps, DataTableServer, type DataTableServerProps, type DatePickerLabels, type DatePickerProps, DefaultCardTitle, DefaultForm, type DefaultFormProps, DefaultTable, type DefaultTableProps, DensityToggleButton, type DensityToggleButtonProps, type EditFilterButtonProps, EditSortingButton, type EditSortingButtonProps, type EditViewButtonProps, EmptyState, type EmptyStateProps, ErrorAlert, type ErrorAlertProps, FilterDialog, FormBody, FormRoot, type FormRootProps, FormTitle, type GetColumnsConfigs, type GetDateColorProps, type GetMultiDatesProps, type GetRangeDatesProps, type GetStyleProps, type GetVariantProps, GlobalFilter, PageSizeControl, type PageSizeControlProps, Pagination, type QueryParams, type RangeCalendarProps, type RangeDatePickerProps, RecordDisplay, type RecordDisplayProps, ReloadButton, type ReloadButtonProps, ResetFilteringButton, ResetSelectionButton, ResetSortingButton, type Result, RowCountText, Table, TableBody, type TableBodyProps, TableCardContainer, type TableCardContainerProps, TableCards, type TableCardsProps, TableComponent, TableControls, type TableControlsProps, TableDataDisplay, type TableDataDisplayProps, TableFilter, TableFilterTags, TableFooter, type TableFooterProps, TableHeader, type TableHeaderProps, type TableHeaderTexts, TableLoadingComponent, type TableLoadingComponentProps, type TableProps, type TableRendererProps, type TableRowSelectorProps, TableSelector, TableSorter, TableViewer, TextCell, type TextCellProps, type UseDataTableProps, type UseDataTableReturn, type UseDataTableServerProps, type UseDataTableServerReturn, type UseFormProps, ViewDialog, getColumns, getMultiDates, getRangeDates, idPickerSanityCheck, useDataTable, useDataTableContext, useDataTableServer, useForm, widthSanityCheck };
