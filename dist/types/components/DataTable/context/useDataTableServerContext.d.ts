import { DataTableServerContext } from './DataTableServerContext';
export interface UseDataTableServerContext extends DataTableServerContext {
    isEmpty: boolean;
}
export declare const useDataTableServerContext: () => UseDataTableServerContext;
