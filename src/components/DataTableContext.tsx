import { Table } from "@tanstack/react-table";
import { createContext } from "react";

export interface DataTableContext<TData> {
  table: Table<TData>;
  refreshData: () => void;
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
}

export const TableContext = createContext<DataTableContext<any>>({
  table: {} as Table<any>,
  refreshData: () => {},
  globalFilter: "",
  setGlobalFilter: () => {},
});
