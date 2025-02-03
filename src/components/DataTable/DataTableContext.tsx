import { OnChangeFn, Table } from "@tanstack/react-table";
import { createContext } from "react";
import { RefreshDataConfig } from "./useDataFromUrl";

export interface DataTableContext<TData> {
  table: Table<TData>;
  refreshData: (config: RefreshDataConfig) => void;
  globalFilter: string;
  setGlobalFilter: OnChangeFn<string>;
  loading: boolean;
  hasError: boolean;
}

export const TableContext = createContext<DataTableContext<any>>({
  table: {} as Table<any>,
  refreshData: () => {},
  globalFilter: "",
  setGlobalFilter: () => {},
  loading: false,
  hasError: false,
});
