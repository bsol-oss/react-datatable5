// import React from 'react';
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableServer } from "../components/DataTableServer";
import { EditViewButton } from "../components/EditViewButton";
import { PageSizeControl } from "../components/PageSizeControl";
import { ResetFilteringButton } from "../components/ResetFilteringButton";
import { ResetSortingButton } from "../components/ResetSortingButton";
import { Table } from "../components/Table";
import { TableBody } from "../components/TableBody";
import { TableFilter } from "../components/TableFilter";
import { TableFooter } from "../components/TableFooter";
import { TableHeader } from "../components/TableHeader";
import { TablePagination } from "../components/TablePagination";
import { TextCell } from "../components/TextCell";

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

interface RowActionsProps {
  row: ChatRecord;
}

const RowActions = ({ row }: RowActionsProps) => {
  return <>has no actions</>;
};

const TablePinningShowcase = () => {
  const columnHelper = createColumnHelper<ChatRecord>();

  const columns: ColumnDef<ChatRecord>[] = [
    columnHelper.display({
      id: "session_id",
      cell: (props) => {
        return (
          <TextCell label={props.row.original.session_id}>
            {props.row.original.session_id}
          </TextCell>
        );
      },
      header: () => <span>Session Id</span>,
      footer: (props) => props.column.id,
    }),
    columnHelper.display({
      id: "last_user_message",
      cell: (props) => {
        return (
          <TextCell label={props.row.original.last_user_message}>
            {props.row.original.last_user_message}
          </TextCell>
        );
      },

      header: () => <span>User Message</span>,
      footer: (props) => props.column.id,
    }),
    columnHelper.display({
      id: "last_system_response",
      cell: (props) => {
        return (
          <TextCell label={props.row.original.last_system_response}>
            {props.row.original.last_system_response}
          </TextCell>
        );
      },
      header: () => <span>last_system_response</span>,
      size: 400,
      footer: (props) => props.column.id,
    }),
    columnHelper.display({
      id: "last_update",
      cell: (props) => {
        return (
          <TextCell label={props.row.original.last_update}>
            {props.row.original.last_update}
          </TextCell>
        );
      },
      header: () => <span>last_update</span>,
      footer: (props) => props.column.id,
    }),
    // display Column
    columnHelper.display({
      id: "total_token",
      cell: (props) => {
        return <TextCell>{props.row.original.total_token}</TextCell>;
      },
      header: () => <span>Total Token</span>,
      footer: (props) => props.column.id,
      sortDescFirst: false,
    }),
    columnHelper.display({
      id: "total_prompt_tokens",
      cell: (props) => {
        return <TextCell>{props.row.original.total_prompt_tokens}</TextCell>;
      },
      header: () => <span>Total Prompt Token</span>,
      footer: (props) => props.column.id,
      sortDescFirst: false,
    }),
  ];
  return (
    <ChakraProvider theme={theme}>
      <DataTableServer
        columns={columns}
        url={"http://localhost:8333/api/v1/gpt/chat/history/all"}
      >
        <EditViewButton />
        <ResetSortingButton />
        <TableFilter />
        <ResetFilteringButton />
        <Table >
          <TableHeader canResize/>
          <TableBody />
          <TableFooter />
        </Table>
        <PageSizeControl />
        <TablePagination />
      </DataTableServer>
    </ChakraProvider>
  );
};

export default TablePinningShowcase;
