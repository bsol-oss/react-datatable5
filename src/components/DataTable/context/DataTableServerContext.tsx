import { UseQueryResult } from "@tanstack/react-query";
import { createContext } from "react";
import { DataResponse } from "../useDataTableServer";

export interface DataTableServerContext<
  T extends DataResponse = DataResponse<unknown>,
> {
  url: string;
  query: UseQueryResult<T>;
}

export const DataTableServerContext = createContext<DataTableServerContext>({
  url: "",
} as DataTableServerContext);
