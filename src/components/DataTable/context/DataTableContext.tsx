import { OnChangeFn, Table } from "@tanstack/react-table";
import { createContext } from "react";

export interface DataTableContext<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: OnChangeFn<string>;
  type: "client" | "server";
}

export const DataTableContext = createContext<DataTableContext<unknown>>({
  table: {} as Table<unknown>,
  globalFilter: "",
  setGlobalFilter: () => {},
  type: "client",
});
