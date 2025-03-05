import { OnChangeFn, Table } from "@tanstack/react-table";
import { createContext } from "react";
import { UseTranslationResponse } from "react-i18next";

export interface DataTableContext<TData = unknown> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: OnChangeFn<string>;
  type: "client" | "server";
  translate: UseTranslationResponse<any, any>;
}

export const DataTableContext = createContext<DataTableContext>({
  table: {} as Table<unknown>,
  globalFilter: "",
  setGlobalFilter: () => {},
  type: "client",
  translate: {} as UseTranslationResponse<any, any>,
});
