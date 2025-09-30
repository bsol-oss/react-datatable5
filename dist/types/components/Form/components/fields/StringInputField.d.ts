import { InputDefaultProps } from "./types";
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
}
export type CustomQueryFn = (params: CustomQueryFnParams) => Promise<CustomQueryFnResponse>;
export interface ForeignKeyProps {
    column: string;
    table: string;
    display_column: string;
    customQueryFn?: CustomQueryFn;
}
export declare const StringInputField: ({ column, schema, prefix, }: StringInputFieldProps) => import("react/jsx-runtime").JSX.Element;
