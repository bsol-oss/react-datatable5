import {
  ColumnDef,
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { TableContext } from "./DataTableContext";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { DensityFeature, DensityState } from "./DensityFeature";

declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export interface DataTableProps<T> {
  children: JSX.Element | JSX.Element[];
  data: T[];
  columns: ColumnDef<T, any>[];
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
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [density, setDensity] = useState<DensityState>("md");

  const table = useReactTable<TData>({
    _features: [DensityFeature],
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
    state: {
      columnOrder,
      globalFilter,
      density,
    },
    onColumnOrderChange: (state) => {
      setColumnOrder(state);
    },
    enableRowSelection: enableRowSelection,
    enableMultiRowSelection: enableMultiRowSelection,
    enableSubRowSelection: enableSubRowSelection,
    columnResizeMode: "onChange",
    // global filter start
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    // global filter end
    onDensityChange: setDensity,
  });

  useEffect(() => {
    setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
  }, []);

  return (
    <TableContext.Provider
      value={{
        table: { ...table },
        refreshData: () => {
          throw new Error("not implemented");
        },
        globalFilter: globalFilter,
        setGlobalFilter: setGlobalFilter,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
