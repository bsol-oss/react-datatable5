export declare const useDataTableContext: () => {
    table: import("@tanstack/table-core").Table<any>;
    refreshData: () => void;
    globalFilter: string;
    setGlobalFilter: import("@tanstack/table-core").OnChangeFn<string>;
    loading: boolean;
    hasError: boolean;
};
