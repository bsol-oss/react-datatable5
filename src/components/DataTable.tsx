import { useEffect, useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { TableContext } from "./DataTableContext";

export interface DataTableProps<T> {
  children: JSX.Element | JSX.Element[];
  data: T[];
  columns: ColumnDef<T, any>[]; // TODO: find the appropriate types
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  enableSubRowSelection?: boolean;
}

export const DataTable = <TData,>({
  columns,
  data,
  enableRowSelection = true,
  enableMultiRowSelection = true,
  enableSubRowSelection = true,
  children,
}: DataTableProps<TData>) => {
  // const [sorting, setSorting] = useState<SortingState>([]);
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here
  // const [pagination, setPagination] = useState({
  //   pageIndex: 0, //initial page index
  //   pageSize: 10, //default page size
  // });
  // const [rowSelection, setRowSelection] = useState({});
  // const [columnOrder, setColumnOrder] = useState<string[]>([]);

  const table = useReactTable<TData>({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: {
      size: 150, //starting column size
      minSize: 10, //enforced during column resizing
      maxSize: 10000, //enforced during column resizing
    },
    enableRowSelection: enableRowSelection,
    enableMultiRowSelection: enableMultiRowSelection,
    enableSubRowSelection: enableSubRowSelection,
    columnResizeMode: "onChange",
  });

  return (
    <TableContext.Provider
      value={{
        table: { ...table },
        refreshData: () => {
          throw new Error("not implemented");
        },
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
