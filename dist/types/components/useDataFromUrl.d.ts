interface useDataFromUrlReturn<T> {
    data: T;
    loading: boolean;
    hasError: boolean;
    refreshData: () => void;
}
interface useDataFromUrlProps<T> {
    url: string;
    params?: object;
    defaultData: T;
}
declare const useDataFromUrl: <T>({ url, params, defaultData, }: useDataFromUrlProps<T>) => useDataFromUrlReturn<T>;
export default useDataFromUrl;
