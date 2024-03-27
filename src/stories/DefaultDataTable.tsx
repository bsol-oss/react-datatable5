// import React from 'react';
import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import ChakraDataTable from "../components/ChakraDataTable";
import {
  createColumnHelper,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import useDataFromUrl from "../components/useDataFromUrl";
import { useEffect, useState } from "react";

interface GetChatRecordsResult {
  success: boolean;
  results: ChatRecord[];
  count: number;
  filterCount: number;
}
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
        offset: pagination.pageIndex *  pagination.pageSize,
        rows: pagination.pageSize,
      }),
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
        // Accessor Column
        // columnHelper.accessor("meeting_id", {
        //   cell: (props) => {
        //     const meeting_id = props.row.original.meeting_id;
        //     const meeting = meetings.find(({ id }) => {
        //       return id === meeting_id;
        //     });
        //     if (!meeting) {
        //       return <span>Meeting Not Found</span>;
        //     }
        //     return <span>{meeting.name}</span>;
        //   },
        //   header: () => <span>Meeting</span>,
        //   footer: (props) => props.column.id,
        // }),
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
        // columnHelper.accessor("start_time", {
        //   cell: (props) => {
        //     return <DateCell date={props.row.original.start_time} />;
        //   },
        //   header: () => <span>Start Time</span>,
        //   footer: (props) => props.column.id,
        // }),
        // Accessor Column
        // columnHelper.accessor((row) => row.end_time, {
        //   id: "end_time",
        //   cell: (props) => {
        //     return <DateCell date={props.row.original.end_time} />;
        //   },
        //   header: () => <span>End Time</span>,
        //   footer: (props) => props.column.id,
        // }),
        // // Accessor Column
        // columnHelper.accessor((row) => row.max_timeslots_per_day, {
        //   id: "max_timeslots_per_day",
        //   cell: (info) => info.getValue(),
        //   header: () => <span>Max Timesolots Per Day</span>,
        //   footer: (props) => props.column.id,
        // }),
        // // Accessor Column
        // columnHelper.accessor((row) => row.max_days_per_round, {
        //   id: "max_days_per_round",
        //   cell: (info) => info.getValue(),
        //   header: () => <span>Max Day Per Round</span>,
        //   footer: (props) => props.column.id,
        // }),
      ],
    }),
    // Grouping Column
    // columnHelper.group({
    //   header: "More Info",
    //   footer: (props) => props.column.id,
    //   columns: [
    //     columnHelper.accessor("created_at", {
    //       header: () => <span>Created At</span>,
    //       footer: (props) => props.column.id,
    //       cell: (props) => {
    //         return <DateCell date={props.row.original.created_at} />;
    //       },
    //     }),
    //     // Accessor Column
    //     columnHelper.accessor("updated_at", {
    //       header: () => <span>Updated At</span>,
    //       footer: (props) => props.column.id,
    //       cell: (props) => {
    //         return <DateCell date={props.row.original.updated_at} />;
    //       },
    //     }),
    //   ],
    // }),
  ];

  const table = useReactTable({
    data: data.results,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    onPaginationChange: (setterFunction) => {
      setPagination(setterFunction);
      refreshData();
    },
    state: {
      pagination,
    },
  });
  console.log(pagination, "dsgj");
useEffect(()=>{refreshData()},[pagination])
  return (
    <ChakraProvider theme={theme}>
      <ChakraDataTable table={table} hasFooter={true} />
    </ChakraProvider>
  );
};

export default DefaultDataTable;
