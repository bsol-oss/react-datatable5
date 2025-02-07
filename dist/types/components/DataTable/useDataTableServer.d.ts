import { UseDataFromUrlProps, UseDataFromUrlReturn } from "./useDataFromUrl";
import { UseDataTableProps, UseDataTableReturn } from "./useDataTable";
export interface UseDataTableServerProps<TData> extends Omit<UseDataFromUrlProps<DataResponse<TData>>, keyof {
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
export interface UseDataTableServerReturn<TData> extends UseDataFromUrlReturn<DataResponse<TData>>, UseDataTableReturn {
}
export interface Result<T> {
    data: T[];
}
export interface DataResponse<T> extends Result<T> {
    count: number;
}
export declare const useDataTableServer: <TData>({ url, onFetchSuccess, default: { sorting: defaultSorting, pagination: defaultPagination, rowSelection: defaultRowSelection, columnFilters: defaultColumnFilters, columnOrder: defaultColumnOrder, columnVisibility: defaultColumnVisibility, globalFilter: defaultGlobalFilter, density: defaultDensity, }, debounce, debounceDelay, }: UseDataTableServerProps<TData>) => UseDataTableServerReturn<TData>;
