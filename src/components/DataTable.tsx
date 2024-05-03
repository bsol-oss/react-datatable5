import React, { ReactNode, useEffect, useState } from "react";
// import { Box, Container } from "@chakra-ui/react";

// import {
//   FilterContext,
//   TableStatusContext,
// } from "./globalpartials/GlobalContext";
// import { FilterInterface } from "../const/types";
// import Footer from "./Footer";
import { TableContext } from "./DataTableContext";
import {
  useReactTable,
  getCoreRowModel,
  ColumnFiltersState,
  SortingState,
  Column,
} from "@tanstack/react-table";
import useDataFromUrl from "./useDataFromUrl";
import { Container, Table } from "@chakra-ui/react";

interface DataTableProps {
  children: ReactNode;
  url: string;
  columns: Column[];
}

const DataTable = ({ columns, url, children }: DataTableProps) => {
  //   const [selectedRows, setSelectedRows] = useState({});
  //   const [totalCount, setTotalCount] = useState<number>(0);
  //   // const [tableWidth, setTableWidth] = useState<number>(0);
  //   const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [error, setError] = useState<string>('');
  //   const [filterTerm, setFilterTerm] = useState<FilterInterface>({
  //     offset: offset,
  //     rows: rows,
  //     field: '',
  //     sort: '',
  //     searchTerm: '',
  //     individualSearchTerm: {},
  //   });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const { data, loading, hasError, refreshData } = useDataFromUrl({
    url: url,
    defaultData: {
      success: false,
      results: [],
      count: 0,
      filterCount: 0,
    },
    params: {
      pagination: JSON.stringify({
        offset: pagination.pageIndex * pagination.pageSize,
        rows: pagination.pageSize,
      }),
      sorting: JSON.stringify(
        sorting.length > 0
          ? { field: sorting[0].id, sort: sorting[0].desc ? "desc" : "asc" }
          : {}
      ),
      where: JSON.stringify(
        columnFilters.reduce((accumulator, filter) => {
          const obj: any = {};
          obj[filter.id] = filter.value;
          return { ...accumulator, ...obj };
        }, {})
      ),
    },
  });
  const table = useReactTable({
    data: data.results,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    columnResizeMode: "onChange",
    state: {
      pagination,
      sorting,
      columnFilters,
    },
    defaultColumn: {
      size: 10, //starting column size
      minSize: 10, //enforced during column resizing
      maxSize: 10000, //enforced during column resizing
    },
  });

  useEffect(() => {
    refreshData();
  }, [pagination, sorting, columnFilters]);

  return (
    <TableContext.Provider
      value={{ table: { ...table }, refreshData: refreshData }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default DataTable;
