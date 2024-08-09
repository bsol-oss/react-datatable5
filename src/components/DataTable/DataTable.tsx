import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { TableContext } from "./DataTableContext";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { DensityFeature, DensityState } from "../Controls/DensityFeature";

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

export interface DataTableProps<TData> {
  children?: JSX.Element | JSX.Element[];
  data: TData[];
  columns: ColumnDef<TData, any>[];
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  enableSubRowSelection?: boolean;
  onRowSelect?: (rowSelectionState: RowSelectionState, data: TData[]) => void;
  columnOrder?: string[];
  columnFilters?: ColumnFiltersState;
  globalFilter?: string;
  density?: DensityState;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  sorting?: SortingState;
  rowSelection?: RowSelectionState;
  columnVisibility?: VisibilityState;
}

export const DataTable = <TData,>({
  columns,
  data,
  enableRowSelection = true,
  enableMultiRowSelection = true,
  enableSubRowSelection = true,
  onRowSelect = () => {},
  columnOrder: defaultColumnOrder = [],
  columnFilters: defaultColumnFilter = [],
  density = "sm",
  globalFilter: defaultGlobalFilter = "",
  pagination: defaultPagination = {
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  },
  sorting: defaultSorting = [],
  rowSelection: defaultRowSelection = {},
  columnVisibility: defaultColumnVisibility = {},
  children,
}: DataTableProps<TData>) => {
  const [columnOrder, setColumnOrder] = useState<string[]>(defaultColumnOrder);
  const [globalFilter, setGlobalFilter] = useState(defaultGlobalFilter);
  const [densityState, setDensity] = useState<DensityState>(density);
  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>(defaultRowSelection);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultColumnVisibility
  );

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
      density: densityState,
      rowSelection,
      columnVisibility,
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
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      columnFilters: defaultColumnFilter,
      sorting: defaultSorting,
      pagination: defaultPagination,
    },
  });

  useEffect(() => {
    setColumnOrder(table.getAllLeafColumns().map((column) => column.id));
  }, []);

  useEffect(() => {
    onRowSelect(table.getState().rowSelection, data);
  }, [table.getState().rowSelection]);

  return (
    <TableContext.Provider
      value={{
        table: { ...table },
        refreshData: () => {
          throw new Error("not implemented");
        },
        globalFilter: globalFilter,
        setGlobalFilter: setGlobalFilter,
        loading: false,
        hasError: false,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
