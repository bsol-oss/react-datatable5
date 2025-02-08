import { OnChangeFn, Table } from "@tanstack/react-table";
import { createContext } from "react";
import { RefreshDataConfig } from "./useDataFromUrl";
import { UseQueryResult } from "@tanstack/react-query";

export interface DataTableContext<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: OnChangeFn<string>;
  query: UseQueryResult<TData>;
}

export const TableContext = createContext<DataTableContext<any>>({
  table: {} as Table<any>,
  globalFilter: "",
  setGlobalFilter: () => {},
  query: {} as UseQueryResult<any>,
});
