export declare const useDataTableContext: () => {
    table: import("@tanstack/table-core").Table<any>;
    refreshData: () => void;
    globalFilter: import("@tanstack/table-core").GlobalFilterTableState;
    setGlobalFilter: import("@tanstack/table-core").OnChangeFn<import("@tanstack/table-core").GlobalFilterTableState>;
    loading: boolean;
    hasError: boolean;
};
