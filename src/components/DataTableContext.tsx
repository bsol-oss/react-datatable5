import { Table } from "@tanstack/react-table";
import { createContext } from "react";

export interface DataTableContext<T> {
  table: Table<T>;
  refreshData: () => void;
}

export const TableContext = createContext<DataTableContext<any>>({
  table: {} as Table<any>,
  refreshData: () => {},
});
