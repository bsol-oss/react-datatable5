import { UseDataFromUrlProps, UseDataFromUrlReturn } from "./useDataFromUrl";
import { UseDataTableProps, UseDataTableReturn } from "./useDataTable";
export interface UseDataTableServerProps<TData> extends Omit<UseDataFromUrlProps<DataResponse<TData>>, keyof {
    defaultData: any;
}>, UseDataTableProps {
}
export interface UseDataTableServerReturn<TData> extends UseDataFromUrlReturn<DataResponse<TData>>, UseDataTableReturn {
}
export interface Result<T> {
    results: T[];
}
export interface DataResponse<T> extends Result<T> {
    success: boolean;
    count: number;
}
export declare const useDataTableServer: <TData>({ url, onFetchSuccess, default: { sorting: defaultSorting, pagination: defaultPagination, rowSelection: defaultRowSelection, columnFilters: defaultColumnFilters, columnOrder: defaultColumnOrder, columnVisibility: defaultColumnVisibility, globalFilter: defaultGlobalFilter, density: defaultDensity, }, }: UseDataTableServerProps<TData>) => UseDataTableServerReturn<TData>;
