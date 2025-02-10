import { Column, RowData } from "@tanstack/react-table";
import { ReactNode } from "react";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    filterVariant?:
      | "text"
      | "range"
      | "select"
      | "tag"
      | "boolean"
      | "dateRange"
      | "custom";

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

export * from "./components/Controls/DensityToggleButton";
export * from "./components/Controls/EditFilterButton";
export * from "./components/Controls/EditOrderButton";
export * from "./components/Controls/EditSortingButton";
export * from "./components/Controls/EditViewButton";
export * from "./components/Controls/PageSizeControl";
export * from "./components/Controls/ResetFilteringButton";
export * from "./components/Controls/ResetSelectionButton";
export * from "./components/Controls/ResetSortingButton";
export * from "./components/Controls/RowCountText";
export * from "./components/Controls/TablePagination";
export * from "./components/DataTable/CardHeader";
export * from "./components/DataTable/DataDisplay";
export * from "./components/DataTable/DataTable";
export * from "./components/DataTable/DataTableServer";
export * from "./components/DataTable/DefaultTable";
export * from "./components/DataTable/ReloadButton";
export * from "./components/DataTable/Table";
export * from "./components/DataTable/TableBody";
export * from "./components/DataTable/TableCardContainer";
export * from "./components/DataTable/TableCards";
export * from "./components/DataTable/TableComponent";
export * from "./components/DataTable/TableControls";
export * from "./components/DataTable/TableFilter";
export * from "./components/DataTable/TableFilterTags";
export * from "./components/DataTable/TableFooter";
export * from "./components/DataTable/TableHeader";
export * from "./components/DataTable/TableLoadingComponent";
export * from "./components/DataTable/TableOrderer";
export * from "./components/DataTable/TableSelector";
export * from "./components/DataTable/TableSorter";
export * from "./components/DataTable/TableViewer";
export * from "./components/DataTable/TextCell";
export * from "./components/DataTable/useDataTable";
export * from "./components/DataTable/context/useDataTableContext";
export * from "./components/DataTable/useDataTableServer";
export * from "./components/DataTable/utils/getColumns";

export * from "./components/Filter/FilterOptions";
export * from "./components/Filter/GlobalFilter";

export * from "./components/Form/Form";

export * from "./components/DatePicker/DatePicker";
export * from "./components/DatePicker/getMultiDates";
export * from "./components/DatePicker/getRangeDates";
export * from "./components/DatePicker/RangeDatePicker";

