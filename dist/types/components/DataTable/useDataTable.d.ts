export declare const useDataTable: () => {
    table: import("@tanstack/table-core").Table<any>;
    refreshData: () => void;
    globalFilter: string;
    setGlobalFilter: (filter: string) => void;
    loading: boolean;
    hasError: boolean;
};
