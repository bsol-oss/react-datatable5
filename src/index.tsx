import { Column, RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    displayName?: string;
    /**
     * @note you should provide a proper `filterfn` to handle the filtering when choosing `boolean`, `dateRange` and `custom`
     */
    filterVariant?:
      | "text"
      | "range"
      | "select"
      | "tag"
      | "boolean"
      | "dateRange"
      | "custom";
    filterOptions?: string[];
    filterRangeConfig?: {
      min: number;
      max: number;
      step: number;
      defaultValue: [number, number];
    };
    renderFilter?: (column: Column<TData>) => JSX.Element;
  }
}

export * from "./components/DataTable/DataTable";
export * from "./components/DataTable/DataTableServer";
export * from "./components/DataTable/DefaultTable";
export * from "./components/Controls/DensityToggleButton";
export * from "./components/Controls/EditFilterButton";
export * from "./components/Controls/EditOrderButton";
export * from "./components/Controls/EditSortingButton";
export * from "./components/Controls/EditViewButton";
export * from "./components/Filter/FilterOptions";
export * from "./components/Filter/GlobalFilter";
export * from "./components/Controls/PageSizeControl";
export * from "./components/Controls/ResetFilteringButton";
export * from "./components/Controls/ResetSelectionButton";
export * from "./components/Controls/ResetSortingButton";
export * from "./components/Controls/RowCountText";
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
export * from "./components/DataTable/TablePagination";
export * from "./components/DataTable/TableReloadButton";
export * from "./components/DataTable/TableSelector";
export * from "./components/DataTable/TableSorter";
export * from "./components/DataTable/TableViewer";
export * from "./components/DataTable/TextCell";
export * from "./components/DataTable/useDataFromUrl";
export * from "./components/DataTable/useDataTable";
