import { Table } from "@tanstack/react-table";
import React from "react";
import { useDataTableContext } from "./useDataTable";

export interface TableRendererProps<TData> {
  render: (render: Table<TData>) => React.ReactElement;
}

export const TableComponent = <TData,>({
  render = () => {
    throw Error("Not Implemented");
  },
}: TableRendererProps<TData>) => {
  const { table } = useDataTableContext();
  return render(table);
};
