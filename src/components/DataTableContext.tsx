import { Table } from "@tanstack/react-table";
import { createContext } from "react";

interface DataTableContext<T> {
  // tableWidth: number;
  // setTableWidth: (num: number) => void;
  table: Table<T>;
}

export const TableContext = createContext<DataTableContext<any>>({
  table: undefined,
  refreshData: () => {},
});
