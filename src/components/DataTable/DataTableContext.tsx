import {
  GlobalFilterTableState,
  OnChangeFn,
  Table,
} from "@tanstack/react-table";
import { createContext } from "react";

export interface DataTableContext<TData> {
  table: Table<TData>;
  refreshData: () => void;
  globalFilter: GlobalFilterTableState;
  setGlobalFilter: OnChangeFn<GlobalFilterTableState>;
  loading: boolean;
  hasError: boolean;
}

export const TableContext = createContext<DataTableContext<any>>({
  table: {} as Table<any>,
  refreshData: () => {},
  globalFilter: { globalFilter: "" },
  setGlobalFilter: () => {},
  loading: false,
  hasError: false,
});
