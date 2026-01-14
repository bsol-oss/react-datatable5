import { InputDefaultProps } from './types';
export interface StringInputFieldProps extends InputDefaultProps {
}
export interface CustomQueryFnResponse {
    /**
     * The data of the query
     */
    data: any;
    /**
     * The id map of the data
     */
    idMap: Record<string, any>;
}
export interface CustomQueryFnParams {
    searching: string;
    limit: number;
    offset: number;
    where?: Array<{
        id: string;
        value: string | string[];
    }>;
}
export type CustomQueryFn = (params: CustomQueryFnParams) => Promise<CustomQueryFnResponse>;
export declare const StringInputField: ({ column, schema, prefix, }: StringInputFieldProps) => import("react/jsx-runtime").JSX.Element;
