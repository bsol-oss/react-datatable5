import { UseQueryResult } from "@tanstack/react-query";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { UseDataTableProps, UseDataTableReturn } from "./useDataTable";
export interface UseDataTableServerProps<TData> extends UseDataTableProps {
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
export interface UseDataTableServerReturn<TData> extends UseDataTableReturn {
    query: UseQueryResult<DataResponse<TData>, Error>;
}
export interface Result<T = unknown> {
    data: T[];
}
export interface DataResponse<T = unknown> extends Result<T> {
    count: number;
}
export interface QueryParams {
    offset: number;
    limit: number;
    sorting: SortingState;
    where: ColumnFiltersState;
    searching: string;
}
export declare const useDataTableServer: <TData>(props: UseDataTableServerProps<TData>) => UseDataTableServerReturn<TData>;
