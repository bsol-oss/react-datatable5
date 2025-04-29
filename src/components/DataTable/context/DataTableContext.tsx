import {
  OnChangeFn,
  Table
} from "@tanstack/react-table";
import { createContext } from "react";
import { UseTranslationResponse } from "react-i18next";
import { DataTableProps } from "../DataTable";

export interface DataTableContext<TData = unknown> extends DataTableProps {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: OnChangeFn<string>;
  type: "client" | "server";
  translate: UseTranslationResponse<any, unknown>;
}

export const DataTableContext = createContext<DataTableContext>({
  table: {} as Table<unknown>,
  globalFilter: "",
  setGlobalFilter: () => {},
  type: "client",
  translate: {} as UseTranslationResponse<any, unknown>,
  data: [],
  columns: [],
  columnOrder: [],
  columnFilters: [],
  density: "sm",
  sorting: [],
  setPagination: function (): void {
    throw new Error("Function not implemented.");
  },
  setSorting: function (): void {
    throw new Error("Function not implemented.");
  },
  setColumnFilters: function (): void {
    throw new Error("Function not implemented.");
  },
  setRowSelection: function (): void {
    throw new Error("Function not implemented.");
  },
  setColumnOrder: function (): void {
    throw new Error("Function not implemented.");
  },
  setDensity: function (): void {
    throw new Error("Function not implemented.");
  },
  setColumnVisibility: function (): void {
    throw new Error("Function not implemented.");
  },
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  rowSelection: {},
  columnVisibility: {},
});
