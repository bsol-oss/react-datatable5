// import React from 'react';
import { ChakraProvider, theme } from "@chakra-ui/react";
import {
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import ChakraDataTable from "../components/ChakraDataTable";
import useDataFromUrl from "../components/useDataFromUrl";

interface ChatRecord {
  session_id: string;
  last_user_message: string;
  last_system_response: string;
  total_token: number;
  total_prompt_tokens: number;
  total_completion_tokens: number;
  total_normalise_tokens: number;
  chat_type: string;
  model: string;
  created_by: string;
  last_update: string;
}

const DefaultDataTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const { data, loading, hasError, refreshData } = useDataFromUrl({
    url: "http://localhost:8333/api/v1/gpt/chat/history/all",
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
        columnFilters.length > 0
          ? { [columnFilters[0].id]: columnFilters[0].value }
          : {}
      ),
    },
  });

  const columnHelper = createColumnHelper<ChatRecord>();

  const columns: ColumnDef<ChatRecord>[] = [
    // Display Column
    columnHelper.display({
      id: "actions",
      header: () => <span>Actions</span>,
      // cell: (props) => <RowActions row={props.row} />,
    }),
    // Grouping Column
    columnHelper.group({
      header: "Information",
      footer: (props) => props.column.id,
      columns: [
        columnHelper.accessor("session_id", {
          cell: (props) => {
            return <span>{props.row.original.session_id}</span>;
          },
          header: () => <span>Session Id</span>,
          footer: (props) => props.column.id,
        }),
        columnHelper.accessor("last_user_message", {
          cell: (props) => {
            return <span>{props.row.original.last_user_message}</span>;
          },

          header: () => <span>User Message</span>,
          footer: (props) => props.column.id,
        }),
        // Accessor Column
        columnHelper.accessor("total_token", {
          cell: (props) => {
            return <span>{props.row.original.total_token}</span>;
          },
          header: () => <span>Total Token</span>,
          footer: (props) => props.column.id,
        }),
      ],
    }),
  ];

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
      size: 100, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 1000, //enforced during column resizing
    },
  });

  useEffect(() => {
    refreshData();
  }, [pagination, sorting]);
  return (
    <ChakraProvider theme={theme}>
      <ChakraDataTable
        table={table}
        hasFooter={true}
        refreshData={refreshData}
      />
    </ChakraProvider>
  );
};

export default DefaultDataTable;
