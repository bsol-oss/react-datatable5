import { ColumnFiltersState, SortingState, PaginationState } from "@tanstack/react-table";
export declare const useDataTableContext: () => {
    table: import("@tanstack/react-table").Table<any>;
    setPagination: (pagination: PaginationState) => void;
    setSorting: (sorting: SortingState) => void;
    setColumnFilters: (columnFilters: ColumnFiltersState) => void;
};
