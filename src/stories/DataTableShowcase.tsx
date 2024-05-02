// import React from 'react';
import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import DataTable from "../components/DataTable";
import { PageSizeControl } from "../components/PageSizeControl";
import TableBody from "../components/TableBody";
import TablePagination from "../components/TablePagination";
import TableFooter from "../components/TableFooter";
import Table from "../components/Table";
import TableHeader from "../components/TableHeader";
import TableFilter from "../components/TableFilter";
import { ResetSortingButton } from "../components/ResetSortingButton";
import { EditViewButton } from "../components/EditViewButton";
import { TextCell } from "../components/TextCell";

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

const RowActions = ({ row }) => {
  return <>no actions</>;
};

const DataTableShowcase = () => {
  const columnHelper = createColumnHelper<ChatRecord>();

  const columns: ColumnDef<ChatRecord>[] = [
    // Display Column
    columnHelper.display({
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (props) => <RowActions row={props.row} />,
    }),
    // Grouping Column
    columnHelper.group({
      header: "Information",
      footer: (props) => props.column.id,
      columns: [
        columnHelper.accessor("session_id", {
          cell: (props) => {
            return <TextCell>{props.row.original.session_id}</TextCell>;
          },
          header: () => <span>Session Id</span>,
          footer: (props) => props.column.id,
        }),
        columnHelper.accessor("last_user_message", {
          cell: (props) => {
            return <TextCell>{props.row.original.last_user_message}</TextCell>;
          },

          header: () => <span>User Message</span>,
          footer: (props) => props.column.id,
        }),
        // Accessor Column
        columnHelper.accessor("total_token", {
          cell: (props) => {
            return <TextCell>{props.row.original.total_token}</TextCell>;
          },
          header: () => <span>Total Token</span>,
          footer: (props) => props.column.id,
          sortDescFirst: false
        }),
      ],
    }),
  ];

  return (
    <ChakraProvider theme={theme}>
      {/* <Box maxWidth="100rem"> */}
      <DataTable
        columns={columns}
        url={"http://localhost:8333/api/v1/gpt/chat/history/all"}
      >
        <EditViewButton />
        <ResetSortingButton />
        <TableFilter />

        <Table>
          <TableHeader />
          <TableBody />
          <TableFooter />
        </Table>

        <PageSizeControl />
        <TablePagination />
      </DataTable>
      {/* </Box> */}
    </ChakraProvider>
  );
};

export default DataTableShowcase;
