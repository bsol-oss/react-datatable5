export interface RefreshDataConfig {
    debounce?: boolean;
    delay?: number;
}
export interface UseDataFromUrlReturn<T> {
    data: T;
    loading: boolean;
    hasError: boolean;
    /**
     * Delays sending the request when the `refreshData` function is called multiple times within a short period.
     */
    refreshData: (config?: RefreshDataConfig) => void;
}
export interface UseDataFromUrlProps<T> {
    url: string;
    params?: object;
    defaultData: T;
    disableFirstFetch?: boolean;
    onFetchSuccess?: (data: T) => void;
}
export declare const useDataFromUrl: <T>({ url, params, disableFirstFetch, onFetchSuccess, defaultData, }: UseDataFromUrlProps<T>) => UseDataFromUrlReturn<T>;
