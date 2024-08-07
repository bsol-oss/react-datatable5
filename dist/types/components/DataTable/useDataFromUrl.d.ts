export interface useDataFromUrlReturn<T> {
    data: T;
    loading: boolean;
    hasError: boolean;
    refreshData: () => void;
}
export interface useDataFromUrlProps<T> {
    url: string;
    params?: object;
    defaultData: T;
    disableFirstFetch?: boolean;
    onFetchSuccess?: (data: T) => void;
}
export declare const useDataFromUrl: <T>({ url, params, disableFirstFetch, onFetchSuccess, defaultData, }: useDataFromUrlProps<T>) => useDataFromUrlReturn<T>;
