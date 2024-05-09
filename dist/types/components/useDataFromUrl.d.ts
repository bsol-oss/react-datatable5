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
}
export declare const useDataFromUrl: <T>({ url, params, defaultData, }: useDataFromUrlProps<T>) => useDataFromUrlReturn<T>;
