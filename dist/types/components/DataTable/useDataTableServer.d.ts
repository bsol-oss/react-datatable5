import { UseQueryResult } from "@tanstack/react-query";
import { UseDataTableProps, UseDataTableReturn } from "./useDataTable";
export interface UseDataTableServerProps extends UseDataTableProps {
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
    url: string;
}
export interface UseDataTableServerReturn<TData> extends UseDataTableReturn {
    query: UseQueryResult<DataResponse<TData>, Error>;
}
export interface Result<T> {
    data: T[];
}
export interface DataResponse<T> extends Result<T> {
    count: number;
}
export declare const useDataTableServer: <TData>({ url, default: { sorting: defaultSorting, pagination: defaultPagination, rowSelection: defaultRowSelection, columnFilters: defaultColumnFilters, columnOrder: defaultColumnOrder, columnVisibility: defaultColumnVisibility, globalFilter: defaultGlobalFilter, density: defaultDensity, }, }: UseDataTableServerProps) => UseDataTableServerReturn<TData>;
