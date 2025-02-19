/// <reference types="react" />
import { UseQueryResult } from "@tanstack/react-query";
import { DataResponse } from "../useDataTableServer";
export interface DataTableServerContext<T extends DataResponse = DataResponse<unknown>> {
    url: string;
    query: UseQueryResult<T>;
}
export declare const DataTableServerContext: import("react").Context<DataTableServerContext<DataResponse<unknown>>>;
