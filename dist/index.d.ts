/// <reference types="react" />
import { Row, Table as Table$1, RowData, OnChangeFn, Updater, SortingState, ColumnFiltersState, PaginationState, RowSelectionState, ColumnOrderState, VisibilityState, FilterFn, ColumnDef, Column } from '@tanstack/react-table';
import * as React$1 from 'react';
import React__default, { ReactNode, Dispatch, SetStateAction } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { TableHeaderProps as TableHeaderProps$1, TableRowProps, GridProps, TableRootProps, BoxProps, FlexProps, CardBodyProps, TextProps, ImageProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { UseQueryResult } from '@tanstack/react-query';
import { RankingInfo } from '@tanstack/match-sorter-utils';
import { JSONSchema7 } from 'json-schema';
import { ForeignKeyProps as ForeignKeyProps$1 } from '@/components/Form/components/fields/StringInputField';
import { AxiosRequestConfig } from 'axios';
import * as react_hook_form from 'react-hook-form';
import { FieldValues, UseFormReturn, SubmitHandler } from 'react-hook-form';

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

interface ReloadButtonProps {
    variant?: string;
}
declare const ReloadButton: ({ variant }: ReloadButtonProps) => react_jsx_runtime.JSX.Element;

declare const GlobalFilter: () => react_jsx_runtime.JSX.Element;

declare const TableSelector: () => react_jsx_runtime.JSX.Element;

interface SelectAllRowsToggleProps {
    selectAllIcon?: React__default.ReactElement;
    clearAllIcon?: React__default.ReactElement;
    selectAllText?: string;
    clearAllText?: string;
}
declare const SelectAllRowsToggle: ({ selectAllIcon, clearAllIcon, selectAllText, clearAllText, }: SelectAllRowsToggleProps) => react_jsx_runtime.JSX.Element;

declare const TableSorter: () => react_jsx_runtime.JSX.Element;

declare const TableViewer: () => react_jsx_runtime.JSX.Element;

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

declare const TableFilter: () => react_jsx_runtime.JSX.Element;

declare const TableFilterTags: () => react_jsx_runtime.JSX.Element;

interface TableProps extends TableRootProps {
    showLoading?: boolean;
    loadingComponent?: ReactNode;
    emptyComponent?: ReactNode;
    canResize?: boolean;
    showSelector?: boolean;
    children: ReactNode;
}
declare const Table: ({ children, emptyComponent, canResize, showLoading, showSelector, ...props }: TableProps) => string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | React$1.ReactPortal | React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | react_jsx_runtime.JSX.Element | null;

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

interface TableFooterProps {
    showSelector?: boolean;
    alwaysShowSelector?: boolean;
}
declare const TableFooter: ({ showSelector, alwaysShowSelector, }: TableFooterProps) => react_jsx_runtime.JSX.Element;

interface TableLoadingComponentProps {
    render: (loading: boolean) => ReactNode;
}
declare const TableLoadingComponent: ({ render, }: TableLoadingComponentProps) => react_jsx_runtime.JSX.Element;

interface TextCellProps {
    text?: string | number | null | undefined | string[];
    href?: string;
    onClick?: () => void;
    isCopyable?: boolean;
    isBadge?: boolean;
    alignEnd?: boolean;
    badgeColor?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink';
    colorPalette?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink';
    label?: string;
    noOfLines?: number[];
    children?: string | number | ReactNode | ReactNode[];
    containerProps?: FlexProps;
    textProps?: TextProps;
}
declare const TextCell: ({ text, href, onClick, isCopyable, isBadge, badgeColor, colorPalette, alignEnd, label, containerProps, textProps, children, }: TextCellProps) => react_jsx_runtime.JSX.Element;

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

type DensityState = 'xs' | 'sm' | 'md' | 'lg';
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
declare module '@tanstack/react-table' {
    interface TableState extends DensityTableState {
    }
    interface TableOptionsResolved<TData extends RowData> extends DensityOptions {
    }
    interface Table<TData extends RowData> extends DensityInstance {
    }
}

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

interface UseDataTableServerProps<TData> extends Omit<UseDataTableProps, 'keyPrefix'> {
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

declare module '@tanstack/react-table' {
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
     * Do not toggle the data array, it will cause the table to re-render in infinite loop.
     *
     * @default []
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
declare function DataTable<TData = unknown>({ columns, data, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, children, tableLabel, }: DataTableProps<TData>): react_jsx_runtime.JSX.Element;

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
interface DataTableContextProps<TData = unknown> extends Omit<DataTableProps, 'translate'> {
    table: Table$1<TData>;
    globalFilter: string;
    setGlobalFilter: OnChangeFn<string>;
    type: 'client' | 'server';
    tableLabel: DataTableLabel;
}

declare const useDataTableContext: <TData>() => DataTableContextProps<TData>;

interface GetColumnsConfigs<K extends RowData> {
    schema: JSONSchema7;
    include?: K[];
    ignore?: K[];
    width?: number[];
    meta?: {
        [key in K as string]?: object;
    };
    defaultWidth?: number;
}
declare const widthSanityCheck: <K extends unknown>(widthList: number[], ignoreList: K[], properties: { [key in K as string]?: object | undefined; }) => void;
declare const getColumns: <TData extends unknown>({ schema, include, ignore, width, meta, defaultWidth, }: GetColumnsConfigs<TData>) => ColumnDef<TData>[];

interface Translate {
    t: (key: string, options?: any) => string;
    i18n?: any;
    ready?: boolean;
}
interface UseFormProps {
    preLoadedValues?: FieldValues | undefined;
    keyPrefix?: string;
    namespace?: string;
    schema?: JSONSchema7;
}
declare const useForm: ({ preLoadedValues, keyPrefix: _keyPrefix, namespace: _namespace, schema, }: UseFormProps) => {
    form: react_hook_form.UseFormReturn<FieldValues, any, undefined>;
    idMap: Record<string, object>;
    setIdMap: React$1.Dispatch<React$1.SetStateAction<Record<string, object>>>;
    translate: Translate;
};

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
    where?: Array<{
        id: string;
        value: string | string[];
    }>;
}
type CustomQueryFn = (params: CustomQueryFnParams) => Promise<CustomQueryFnResponse>;
interface ForeignKeyProps {
    column: string;
    table: string;
    customQueryFn?: CustomQueryFn;
}

/**
 * Type definitions for error message configuration
 */
/**
 * Common validation error types that can be customized
 */
type ValidationErrorType = 'minLength' | 'maxLength' | 'pattern' | 'minimum' | 'maximum' | 'multipleOf' | 'format' | 'type' | 'enum' | 'required' | 'minItems' | 'maxItems' | 'uniqueItems' | 'minProperties' | 'maxProperties' | 'anyOf' | 'oneOf' | 'allOf' | 'const' | 'additionalProperties' | 'dependencies';
/**
 * Configuration for field-specific validation errors
 */
type FieldErrorConfig = Partial<Record<ValidationErrorType, string>>;
/**
 * Configuration for building error messages
 */
interface ErrorMessageConfig {
    /**
     * Required field error messages
     * Maps field names to their required error messages
     * Supports both plain strings and i18n translation keys
     *
     * @example
     * ```typescript
     * required: {
     *   username: "Username is required", // plain string
     *   email: "user.email.field_required" // i18n key
     * }
     * ```
     */
    required?: Record<string, string>;
    /**
     * Field-specific validation error messages
     * Maps field names to their validation error configurations
     *
     * @example
     * ```typescript
     * properties: {
     *   username: {
     *     minLength: "Username must be at least 3 characters",
     *     pattern: "Username can only contain letters and numbers"
     *   },
     *   age: {
     *     minimum: "Age must be at least 18",
     *     maximum: "Age cannot exceed 120"
     *   }
     * }
     * ```
     */
    properties?: Record<string, FieldErrorConfig>;
    /**
     * Global fallback error messages for validation types
     * These are used when no field-specific message is provided
     *
     * @example
     * ```typescript
     * {
     *   minLength: "This field is too short",
     *   minimum: "Value is too small"
     * }
     * ```
     */
    [key: string]: any;
}
/**
 * Result of buildErrorMessages that follows ajv-errors format
 */
interface ErrorMessageResult {
    required?: Record<string, string>;
    properties?: Record<string, FieldErrorConfig>;
    [key: string]: any;
}
/**
 * Schema-level error message builder
 *
 * Builds a complete errorMessage object compatible with ajv-errors plugin.
 * Supports both i18n translation keys and plain string messages.
 *
 * @param config - Error message configuration
 * @returns Complete errorMessage object for JSON Schema
 *
 * @example
 * ```typescript
 * // Simple required field errors
 * const errorMessage = buildErrorMessages({
 *   required: {
 *     username: "Username is required",
 *     email: "user.email.field_required" // i18n key
 *   }
 * });
 *
 * // With validation rules
 * const errorMessage = buildErrorMessages({
 *   required: {
 *     password: "Password is required"
 *   },
 *   properties: {
 *     password: {
 *       minLength: "Password must be at least 8 characters",
 *       pattern: "Password must contain letters and numbers"
 *     },
 *     age: {
 *       minimum: "Must be 18 or older",
 *       maximum: "Must be under 120"
 *     }
 *   }
 * });
 *
 * // With global fallbacks
 * const errorMessage = buildErrorMessages({
 *   required: {
 *     email: "Email is required"
 *   },
 *   minLength: "This field is too short", // applies to all fields
 *   minimum: "Value is too small"
 * });
 * ```
 */
declare const buildErrorMessages: (config: ErrorMessageConfig) => ErrorMessageResult;
/**
 * Converts buildErrorMessages result to ajv-errors compatible format
 */
declare const convertToAjvErrorsFormat: (errorMessages: ErrorMessageResult) => Record<string, any>;
/**
 * Helper function to build required field errors
 *
 * Simplifies creating required field error messages, especially useful
 * for generating i18n translation keys following a pattern.
 *
 * @param fields - Array of required field names
 * @param messageOrGenerator - Either a string template or function to generate messages
 * @returns Required field error configuration
 *
 * @example
 * ```typescript
 * // Plain string messages
 * const required = buildRequiredErrors(
 *   ["username", "email", "password"],
 *   (field) => `${field} is required`
 * );
 * // Result: { username: "username is required", email: "email is required", ... }
 *
 * // i18n translation keys
 * const required = buildRequiredErrors(
 *   ["username", "email"],
 *   (field) => `user.${field}.field_required`
 * );
 * // Result: { username: "user.username.field_required", email: "user.email.field_required" }
 *
 * // Same message for all fields
 * const required = buildRequiredErrors(
 *   ["username", "email"],
 *   "This field is required"
 * );
 * // Result: { username: "This field is required", email: "This field is required" }
 *
 * // With keyPrefix for i18n
 * const required = buildRequiredErrors(
 *   ["username", "email"],
 *   (field) => `${field}.field_required`,
 *   "user"
 * );
 * // Result: { username: "user.username.field_required", email: "user.email.field_required" }
 * ```
 */
declare const buildRequiredErrors: (fields: string[], messageOrGenerator: string | ((field: string) => string), keyPrefix?: string) => Record<string, string>;
/**
 * Helper function to build field-specific validation errors
 *
 * Creates property-specific error messages for multiple fields at once.
 *
 * @param config - Maps field names to their validation error configurations
 * @returns Properties error configuration
 *
 * @example
 * ```typescript
 * const properties = buildFieldErrors({
 *   username: {
 *     minLength: "Username must be at least 3 characters",
 *     pattern: "Username can only contain letters and numbers"
 *   },
 *   age: {
 *     minimum: "Must be 18 or older",
 *     maximum: "Must be under 120"
 *   },
 *   email: {
 *     format: "Please enter a valid email address"
 *   }
 * });
 * ```
 */
declare const buildFieldErrors: (config: Record<string, FieldErrorConfig>) => Record<string, FieldErrorConfig>;
/**
 * Helper function to create a complete error message configuration in one call
 *
 * Convenient wrapper that combines required and validation errors.
 *
 * @param required - Required field error messages
 * @param properties - Field-specific validation error messages
 * @param globalFallbacks - Global fallback error messages
 * @returns Complete error message configuration
 *
 * @example
 * ```typescript
 * const errorMessage = createErrorMessage(
 *   {
 *     username: "Username is required",
 *     email: "Email is required"
 *   },
 *   {
 *     username: {
 *       minLength: "Username must be at least 3 characters"
 *     },
 *     email: {
 *       format: "Please enter a valid email"
 *     }
 *   },
 *   {
 *     minLength: "This field is too short",
 *     format: "Invalid format"
 *   }
 * );
 * ```
 */
declare const createErrorMessage: (required?: Record<string, string>, properties?: Record<string, FieldErrorConfig>, globalFallbacks?: Partial<Record<ValidationErrorType, string>>) => ErrorMessageResult;

interface DateTimePickerLabels {
    monthNamesShort?: string[];
    weekdayNamesShort?: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
    quickActionLabels?: {
        yesterday?: string;
        today?: string;
        tomorrow?: string;
        plus7Days?: string;
    };
}
interface IdPickerLabels {
    undefined?: string;
    addMore?: string;
    typeToSearch?: string;
    total?: string;
    showing?: string;
    perPage?: string;
    emptySearchResult?: string;
    initialResults?: string;
}
interface EnumPickerLabels {
    undefined?: string;
    addMore?: string;
    typeToSearch?: string;
    total?: string;
    showing?: string;
    perPage?: string;
    emptySearchResult?: string;
    initialResults?: string;
}
interface FilePickerLabels {
    fileDropzone?: string;
    browseLibrary?: string;
    dialogTitle?: string;
    searchPlaceholder?: string;
    loading?: string;
    loadingFailed?: string;
    noFilesFound?: string;
    cancel?: string;
    select?: string;
    uploadTab?: string;
    browseTab?: string;
    uploading?: string;
    uploadFailed?: string;
}
interface FormButtonLabels {
    submit?: string;
    reset?: string;
    cancel?: string;
    confirm?: string;
    submitAgain?: string;
    submitSuccess?: string;
    add?: string;
    save?: string;
    addNew?: string;
    fieldRequired?: string;
}
interface TimePickerLabels {
    placeholder?: string;
    emptyMessage?: string;
}
interface LoadInitialValuesParams {
    ids: string[];
    foreign_key: ForeignKeyProps;
    setIdMap: React__default.Dispatch<React__default.SetStateAction<Record<string, object>>>;
}
interface LoadInitialValuesResult {
    data: {
        data: Record<string, any>[];
        count: number;
    };
    idMap: Record<string, object>;
}
interface CustomJSONSchema7 extends JSONSchema7 {
    gridColumn?: string;
    gridRow?: string;
    foreign_key?: ForeignKeyProps;
    variant?: string;
    renderDisplay?: (item: unknown) => ReactNode;
    itemToValue?: (item: unknown) => string;
    loadInitialValues?: (params: LoadInitialValuesParams) => Promise<LoadInitialValuesResult>;
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
    formatOptions?: Intl.NumberFormatOptions;
    numberStorageType?: 'string' | 'number';
    errorMessages?: Partial<Record<ValidationErrorType | string, string>>;
    filePicker?: FilePickerProps;
    tagPicker?: {
        queryFn?: (params: {
            in_table: string;
            where?: {
                id: string;
                value: string[];
            }[];
            limit?: number;
            offset?: number;
            searching?: string;
        }) => Promise<{
            data: {
                data: any[];
                count: number;
            };
            idMap?: Record<string, object>;
        }>;
    };
    dateTimePicker?: {
        showQuickActions?: boolean;
        quickActionLabels?: {
            yesterday?: string;
            today?: string;
            tomorrow?: string;
            plus7Days?: string;
        };
        showTimezoneSelector?: boolean;
    };
}
declare const defaultRenderDisplay: (item: unknown) => ReactNode;
interface TagPickerProps {
    column: string;
    schema: CustomJSONSchema7;
    prefix: string;
}
interface FilePickerMediaFile {
    id: string;
    name: string;
    url?: string;
    size?: string | number;
    comment?: string;
    type?: string;
}
interface FilePickerProps {
    onFetchFiles?: (search: string) => Promise<FilePickerMediaFile[]>;
    enableMediaLibrary?: boolean;
    filterImageOnly?: boolean;
    enableUpload?: boolean;
    onUploadFile?: (file: File) => Promise<string>;
}

interface FormRootProps<TData extends FieldValues> {
    schema: CustomJSONSchema7;
    requestUrl?: string;
    idMap: Record<string, object>;
    setIdMap: Dispatch<SetStateAction<Record<string, object>>>;
    form: UseFormReturn;
    /** Translate object for fallback text (components prefer label objects) */
    translate: Translate;
    children: ReactNode;
    order?: string[];
    ignore?: string[];
    include?: string[];
    onSubmit?: SubmitHandler<TData>;
    rowNumber?: number | string;
    requestOptions?: AxiosRequestConfig;
    getUpdatedData?: () => TData | Promise<TData> | void;
    customErrorRenderer?: (error: unknown) => ReactNode;
    customSuccessRenderer?: (resetHandler: () => void | Promise<void>) => ReactNode;
    displayConfig?: {
        showSubmitButton?: boolean;
        showResetButton?: boolean;
        showTitle?: boolean;
    };
    requireConfirmation?: boolean;
    dateTimePickerLabels?: DateTimePickerLabels;
    idPickerLabels?: IdPickerLabels;
    enumPickerLabels?: EnumPickerLabels;
    filePickerLabels?: FilePickerLabels;
    formButtonLabels?: FormButtonLabels;
    timePickerLabels?: TimePickerLabels;
    insideDialog?: boolean;
}
interface CustomJSONSchema7Definition extends JSONSchema7 {
    variant: string;
    in_table: string;
    column_ref: string;
    gridColumn: string;
    gridRow: string;
    foreign_key: ForeignKeyProps$1;
    children: ReactNode;
}
declare const idPickerSanityCheck: (column: string, foreign_key?: {
    table?: string | undefined;
    column?: string | undefined;
} | undefined) => void;
declare const FormRoot: <TData extends FieldValues>({ schema, idMap, setIdMap, form, translate, children, order, ignore, include, onSubmit, rowNumber, requestOptions, getUpdatedData, customErrorRenderer, customSuccessRenderer, displayConfig, requireConfirmation, dateTimePickerLabels, idPickerLabels, enumPickerLabels, filePickerLabels, formButtonLabels, timePickerLabels, insideDialog, }: FormRootProps<TData>) => react_jsx_runtime.JSX.Element;

interface DefaultFormProps<TData extends FieldValues> {
    formConfig: Omit<FormRootProps<TData>, "children">;
    showTitle?: boolean;
}
declare const DefaultForm: <TData extends FieldValues>({ formConfig, }: DefaultFormProps<TData>) => react_jsx_runtime.JSX.Element;

declare const FormTitle: () => react_jsx_runtime.JSX.Element;

declare const FormBody: () => react_jsx_runtime.JSX.Element;

type MediaLibraryBrowserPropsBase = {
    onFetchFiles?: (search: string) => Promise<FilePickerMediaFile[]>;
    filterImageOnly?: boolean;
    labels?: FilePickerLabels;
    enabled?: boolean;
};
type MediaLibraryBrowserPropsSingle = MediaLibraryBrowserPropsBase & {
    multiple?: false;
    onFileSelect?: (file: FilePickerMediaFile) => void;
    selectedFile?: FilePickerMediaFile;
    onSelectedFileChange?: (file: FilePickerMediaFile | undefined) => void;
};
type MediaLibraryBrowserPropsMultiple = MediaLibraryBrowserPropsBase & {
    multiple: true;
    onFileSelect?: (files: FilePickerMediaFile[]) => void;
    selectedFile?: FilePickerMediaFile[];
    onSelectedFileChange?: (files: FilePickerMediaFile[]) => void;
};
type MediaLibraryBrowserProps = MediaLibraryBrowserPropsSingle | MediaLibraryBrowserPropsMultiple;
declare const MediaLibraryBrowser: ({ onFetchFiles, filterImageOnly, labels, enabled, multiple, onFileSelect, selectedFile: controlledSelectedFile, onSelectedFileChange, }: MediaLibraryBrowserProps) => react_jsx_runtime.JSX.Element | null;

interface CalendarDate {
    date: Date;
    selected: boolean;
    selectable: boolean;
    today: boolean;
    isCurrentMonth: boolean;
}
interface Calendar {
    month: number;
    year: number;
    weeks: Array<Array<CalendarDate | null>>;
}
interface CalendarRenderProps {
    calendars: Calendar[];
    getBackProps: (props?: {
        calendars?: Calendar[];
        offset?: number;
    }) => {
        onClick: () => void;
    };
    getForwardProps: (props?: {
        calendars?: Calendar[];
        offset?: number;
    }) => {
        onClick: () => void;
    };
    getDateProps: (props: {
        dateObj: CalendarDate;
        onMouseEnter?: () => void;
    }) => {
        onClick: () => void;
        onMouseEnter?: () => void;
    };
}

interface CalendarProps extends CalendarRenderProps {
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
interface DatePickerProps {
    onDateSelected?: (obj: {
        date: Date;
        selected: Date | Date[];
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
        todayLabel?: string;
        yesterdayLabel?: string;
        tomorrowLabel?: string;
    };
    render?: (calendarData: CalendarRenderProps) => React__default.ReactNode;
}
interface DatePickerLabels {
    monthNamesShort: string[];
    weekdayNamesShort: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
    todayLabel?: string;
    yesterdayLabel?: string;
    tomorrowLabel?: string;
}
declare const DatePickerContext: React__default.Context<{
    labels: DatePickerLabels;
}>;
interface DatePickerInputProps {
    value?: string | Date;
    onChange?: (date?: string) => void;
    placeholder?: string;
    dateFormat?: string;
    displayFormat?: string;
    labels?: DatePickerLabels;
    timezone?: string;
    minDate?: Date;
    maxDate?: Date;
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    showOutsideDays?: boolean;
    monthsToDisplay?: number;
    insideDialog?: boolean;
    readOnly?: boolean;
    showHelperButtons?: boolean;
}
declare function DatePickerInput({ value, onChange, placeholder, dateFormat, displayFormat, labels, timezone, minDate, maxDate, firstDayOfWeek, showOutsideDays, monthsToDisplay, insideDialog, readOnly, showHelperButtons, }: DatePickerInputProps): react_jsx_runtime.JSX.Element;

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

interface RangeCalendarProps extends CalendarRenderProps {
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    selected?: Date[];
}
interface GetStyleProps {
    today: boolean;
    selected: boolean;
    unavailable: boolean;
    isInRange: boolean;
}
interface RangeDatePickerLabels {
    monthNamesFull: string[];
    weekdayNamesShort: string[];
    backButtonLabel?: string;
    forwardButtonLabel?: string;
}
interface RangeDatePickerProps {
    onDateSelected?: (obj: {
        selected: Date[];
        selectable: boolean;
        date: Date;
    }) => void;
    selected?: Date[];
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    showOutsideDays?: boolean;
    date?: Date;
    minDate?: Date;
    maxDate?: Date;
    monthsToDisplay?: number;
    labels?: RangeDatePickerLabels;
    /**
     * Whether to render the calendar in a popover with a trigger button.
     * @default true
     */
    withPopover?: boolean;
    /**
     * Controlled open state for the popover.
     */
    open?: boolean;
    /**
     * Callback when the popover open state changes.
     */
    onOpenChange?: (details: {
        open: boolean;
    }) => void;
    /**
     * The trigger button element. If not provided, a default button will be rendered.
     */
    trigger?: React__default.ReactNode;
    /**
     * Format string for displaying the selected date range in the trigger button.
     * @default "YYYY-MM-DD"
     */
    displayFormat?: string;
    /**
     * Placeholder text for the trigger button when no dates are selected.
     */
    placeholder?: string;
    /**
     * Whether to close the popover when clicking outside.
     * @default true
     */
    closeOnInteractOutside?: boolean;
    /**
     * Whether to portal the popover content.
     * @default true
     */
    portalled?: boolean;
    render?: (calendarData: CalendarRenderProps) => React__default.ReactNode;
}

interface RecordDisplayProps {
    object: object | null;
    boxProps?: BoxProps;
    prefix?: string;
}
declare const RecordDisplay: ({ object, boxProps, prefix, }: RecordDisplayProps) => react_jsx_runtime.JSX.Element;

interface TableDataDisplayProps {
    colorPalette?: string;
    emptyComponent?: ReactNode;
}
declare const TableDataDisplay: ({ colorPalette, emptyComponent, }: TableDataDisplayProps) => react_jsx_runtime.JSX.Element;

interface DefaultTableProps {
    showFooter?: boolean;
    showHeader?: boolean;
    tableProps?: Omit<TableProps, 'children'>;
    tableHeaderProps?: TableHeaderProps;
    tableBodyProps?: TableBodyProps;
    tableFooterProps?: TableFooterProps;
    controlProps?: TableControlsProps;
    variant?: '' | 'greedy';
    isLoading?: boolean;
}
declare const DefaultTable: ({ showFooter, showHeader, tableProps, tableHeaderProps, tableBodyProps, tableFooterProps, controlProps, variant, isLoading, }: DefaultTableProps) => react_jsx_runtime.JSX.Element;

interface DefaultTableServerProps extends DefaultTableProps {
    /**
     * Optional isLoading prop to override auto-detected loading state.
     * If not provided, will automatically detect from DataTableServerContext.
     */
    isLoading?: boolean;
}
/**
 * DefaultTableServer is a wrapper around DefaultTable that automatically
 * detects server-side loading state from DataTableServerContext.
 *
 * Use this component when working with DataTableServer to automatically
 * show skeleton loading state during data fetching.
 *
 * @example
 * ```tsx
 * <DataTableServer columns={columns} {...datatableServer}>
 *   <DefaultTableServer />
 * </DataTableServer>
 * ```
 */
declare const DefaultTableServer: ({ isLoading: isLoadingOverride, ...props }: DefaultTableServerProps) => react_jsx_runtime.JSX.Element;

interface DataDisplayProps {
    variant?: 'horizontal' | 'stats' | '';
}
declare const DataDisplay: ({ variant }: DataDisplayProps) => react_jsx_runtime.JSX.Element;

interface CalendarEvent<TData = unknown> {
    data: TData;
    date: Date;
    title?: string;
    color?: string;
}
interface CalendarDisplayProps<TData = unknown> {
    /**
     * Column ID or accessor key that contains the date for each event
     */
    dateColumn: string;
    /**
     * Optional function to extract date from row data
     * If not provided, will use the dateColumn to get the date
     */
    getDate?: (row: TData) => Date | string | number | null | undefined;
    /**
     * Optional function to get event title from row data
     * If not provided, will use the first column's value
     */
    getEventTitle?: (row: TData) => string;
    /**
     * Optional function to get event color from row data
     */
    getEventColor?: (row: TData) => string;
    /**
     * Optional function to render event content
     */
    renderEvent?: (event: CalendarEvent<TData>) => React.ReactNode;
    /**
     * First day of week (0 = Sunday, 1 = Monday, etc.)
     */
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    /**
     * Show days outside the current month
     */
    showOutsideDays?: boolean;
    /**
     * Number of months to display
     */
    monthsToDisplay?: number;
    /**
     * Calendar labels
     */
    labels?: {
        monthNamesShort: string[];
        weekdayNamesShort: string[];
        backButtonLabel?: string;
        forwardButtonLabel?: string;
    };
    /**
     * Callback when a date is clicked
     */
    onDateClick?: (date: Date, events: CalendarEvent<TData>[]) => void;
    /**
     * Callback when an event is clicked
     */
    onEventClick?: (event: CalendarEvent<TData>) => void;
    /**
     * Maximum number of events to show per day before showing "+N more"
     */
    maxEventsPerDay?: number;
    /**
     * Color palette for the calendar
     */
    colorPalette?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink';
    /**
     * Fixed placeholder text to show when width is too narrow
     * @default "..."
     */
    eventPlaceholder?: string;
    /**
     * Minimum width (in pixels) before showing placeholder instead of title
     * @default 80
     */
    minEventWidth?: number;
    /**
     * Minimum number of characters to show before ellipsis
     * @default 2
     */
    minCharsBeforeEllipsis?: number;
}
declare function CalendarDisplay<TData = unknown>({ dateColumn, getDate, getEventTitle, getEventColor, renderEvent, firstDayOfWeek, showOutsideDays, monthsToDisplay, labels, onDateClick, onEventClick, maxEventsPerDay, colorPalette, eventPlaceholder, minEventWidth, minCharsBeforeEllipsis, }: CalendarDisplayProps<TData>): react_jsx_runtime.JSX.Element | null;

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
declare function DataTableServer<TData = unknown>({ columns, enableRowSelection, enableMultiRowSelection, enableSubRowSelection, columnOrder, columnFilters, columnVisibility, density, globalFilter, pagination, sorting, rowSelection, setPagination, setSorting, setColumnFilters, setRowSelection, setGlobalFilter, setColumnOrder, setDensity, setColumnVisibility, query, url, children, tableLabel, }: DataTableServerProps<TData>): react_jsx_runtime.JSX.Element;

declare module '@tanstack/react-table' {
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
        filterVariant?: 'text' | 'range' | 'select' | 'tag' | 'boolean' | 'dateRange' | 'custom';
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
        /**
         * Priority for responsive column hiding when table width is too narrow.
         * Lower priority numbers = hide first (e.g., priority 1 hides before priority 10).
         * Columns without priority default to Infinity (highest priority, never auto-hide).
         * Only applies when canResize={false}.
         */
        responsivePriority?: number;
    }
}

export { CalendarDisplay, type CalendarDisplayProps, type CalendarEvent, type CalendarProps, CardHeader, type CardHeaderProps, type CustomJSONSchema7, type CustomJSONSchema7Definition, DataDisplay, type DataDisplayProps, type DataResponse, DataTable, type DataTableDefaultState, type DataTableProps, DataTableServer, type DataTableServerProps, DatePickerContext, DatePickerInput, type DatePickerInputProps, type DatePickerLabels, type DatePickerProps, type DateTimePickerLabels, DefaultCardTitle, DefaultForm, type DefaultFormProps, DefaultTable, type DefaultTableProps, DefaultTableServer, type DefaultTableServerProps, DensityToggleButton, type DensityToggleButtonProps, type EditFilterButtonProps, EditSortingButton, type EditSortingButtonProps, type EditViewButtonProps, EmptyState, type EmptyStateProps, type EnumPickerLabels, ErrorAlert, type ErrorAlertProps, type ErrorMessageConfig, type ErrorMessageResult, type FieldErrorConfig, type FilePickerLabels, type FilePickerMediaFile, type FilePickerProps, FilterDialog, FormBody, type FormButtonLabels, FormRoot, type FormRootProps, FormTitle, type GetColumnsConfigs, type GetDateColorProps, type GetMultiDatesProps, type GetRangeDatesProps, type GetStyleProps, type GetVariantProps, GlobalFilter, type IdPickerLabels, type LoadInitialValuesParams, type LoadInitialValuesResult, MediaLibraryBrowser, type MediaLibraryBrowserProps, PageSizeControl, type PageSizeControlProps, Pagination, type QueryParams, type RangeCalendarProps, type RangeDatePickerLabels, type RangeDatePickerProps, RecordDisplay, type RecordDisplayProps, ReloadButton, type ReloadButtonProps, ResetFilteringButton, ResetSelectionButton, ResetSortingButton, type Result, RowCountText, SelectAllRowsToggle, type SelectAllRowsToggleProps, Table, TableBody, type TableBodyProps, TableCardContainer, type TableCardContainerProps, TableCards, type TableCardsProps, TableComponent, TableControls, type TableControlsProps, TableDataDisplay, type TableDataDisplayProps, TableFilter, TableFilterTags, TableFooter, type TableFooterProps, TableHeader, type TableHeaderProps, type TableHeaderTexts, TableLoadingComponent, type TableLoadingComponentProps, type TableProps, type TableRendererProps, type TableRowSelectorProps, TableSelector, TableSorter, TableViewer, type TagPickerProps, TextCell, type TextCellProps, type TimePickerLabels, type Translate, type UseDataTableProps, type UseDataTableReturn, type UseDataTableServerProps, type UseDataTableServerReturn, type UseFormProps, type ValidationErrorType, ViewDialog, buildErrorMessages, buildFieldErrors, buildRequiredErrors, convertToAjvErrorsFormat, createErrorMessage, defaultRenderDisplay, getColumns, getMultiDates, getRangeDates, idPickerSanityCheck, useDataTable, useDataTableContext, useDataTableServer, useForm, widthSanityCheck };
