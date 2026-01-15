import { Column, RowData } from '@tanstack/react-table';
import { ReactNode } from 'react';
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
        /**
         * Grid column span for data display layout.
         * Used in DataDisplay component.
         */
        gridColumn?: string | string[];
        /**
         * Grid row span for data display layout.
         * Used in DataDisplay component.
         */
        gridRow?: string | object;
    }
}
export type { TableHeaderTexts } from './components/DataTable/display/TableHeader';
export * from './components/DataTable/controls/DensityToggleButton';
export * from './components/DataTable/controls/EditSortingButton';
export * from './components/DataTable/controls/FilterDialog';
export * from './components/DataTable/controls/PageSizeControl';
export * from './components/DataTable/controls/Pagination';
export * from './components/DataTable/controls/ResetFilteringButton';
export * from './components/DataTable/controls/ResetSelectionButton';
export * from './components/DataTable/controls/ResetSortingButton';
export * from './components/DataTable/controls/RowCountText';
export * from './components/DataTable/controls/ViewDialog';
export * from './components/DataTable/controls/ReloadButton';
export * from './components/Filter/GlobalFilter';
export * from './components/DataTable/controls/TableSelector';
export * from './components/DataTable/controls/SelectAllRowsToggle';
export * from './components/DataTable/controls/TableSorter';
export * from './components/DataTable/controls/TableViewer';
export * from './components/DataTable/controls/TableControls';
export * from './components/DataTable/controls/TableFilters';
export * from './components/DataTable/controls/TableFilterTags';
export * from './components/DataTable/display/Table';
export * from './components/DataTable/display/TableBody';
export * from './components/DataTable/display/TableCardContainer';
export * from './components/DataTable/display/TableCards';
export * from './components/DataTable/display/TableComponent';
export * from './components/DataTable/display/TableFooter';
export * from './components/DataTable/display/TableHeader';
export * from './components/DataTable/display/TableLoadingComponent';
export * from './components/DataTable/display/TextCell';
export * from './components/DataTable/display/CardHeader';
export * from './components/DataTable/display/EmptyState';
export * from './components/DataTable/display/ErrorAlert';
export * from './components/DataTable/useDataTable';
export * from './components/DataTable/useDataTableServer';
export * from './components/DataTable/context/useDataTableContext';
export * from './components/Form/components/core/DefaultForm';
export * from './components/Form/components/core/FormRoot';
export * from './components/Form/components/core/FormTitle';
export * from './components/Form/components/core/FormBody';
export * from './components/Form/components/types/CustomJSONSchema7';
export * from './components/Form/components/MediaLibraryBrowser';
export * from './components/Form/useForm';
export * from './components/DatePicker/DatePicker';
export * from './components/DatePicker/getMultiDates';
export * from './components/DatePicker/getRangeDates';
export * from './components/DatePicker/RangeDatePicker';
export * from './components/DataTable/display/RecordDisplay';
export * from './components/DataTable/display/TableDataDisplay';
export * from './components/DataTable/DefaultTable';
export * from './components/DataTable/DefaultTableServer';
export * from './components/DataTable/display/DataDisplay';
export * from './components/DataTable/display/CalendarDisplay';
export * from './components/DataTable/DataTable';
export * from './components/DataTable/DataTableServer';
