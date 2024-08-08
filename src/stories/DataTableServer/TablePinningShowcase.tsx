// import React from 'react';
import { ButtonGroup, ChakraProvider, Flex, theme } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableServer } from "../../components/DataTableServer";
import { EditOrderButton } from "../../components/EditOrderButton";
import { EditViewButton } from "../../components/EditViewButton";
import { PageSizeControl } from "../../components/Controls/PageSizeControl";
import { Table } from "../../components/DataTable/Table";
import { TableBody } from "../../components/DataTable/TableBody";
import { TableFooter } from "../../components/DataTable/TableFooter";
import { TableHeader } from "../../components/DataTable/TableHeader";
import { TablePagination } from "../../components/DataTable/TablePagination";
import { TableSelector } from "../../components/DataTable/TableSelector";
import { TextCell } from "../../components/DataTable/TextCell";

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
      footer: () => <span>Session Id</span>,
      meta: {
        displayName: "Session Id",
      },
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
      footer: () => <span>User Message</span>,
      meta: {
        displayName: "User Message",
      },
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
      header: () => <span>System Response</span>,
      footer: () => <span>System Response</span>,
      size: 400,
      meta: {
        displayName: "System Response",
      },
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
      header: () => <span>Last Update</span>,
      footer: () => <span>Last Update</span>,
      meta: {
        displayName: "Last Update",
      },
    }),
    // display Column
    columnHelper.display({
      id: "total_token",
      cell: (props) => {
        return <TextCell>{props.row.original.total_token}</TextCell>;
      },
      header: () => <span>Total Token</span>,
      footer: () => <span>Total Token</span>,
      sortDescFirst: false,
      meta: {
        displayName: "Total Token",
      },
    }),
    columnHelper.display({
      id: "total_prompt_tokens",
      cell: (props) => {
        return <TextCell>{props.row.original.total_prompt_tokens}</TextCell>;
      },
      header: () => <span>Total Prompt Token</span>,
      footer: () => <span>Total Prompt Token</span>,
      sortDescFirst: false,
      meta: {
        displayName: "Total Prompt Token",
      },
    }),
  ];
  return (
    <ChakraProvider theme={theme}>
      <DataTableServer
        columns={columns}
        url={"http://localhost:8333/api/v1/gpt/chat/history/all"}
      >
        <Flex gap="0.25rem">
          <TablePagination />
          <ButtonGroup isAttached>
            <EditViewButton />
          </ButtonGroup>
          <EditOrderButton />
          <PageSizeControl />
          <ButtonGroup isAttached>
            <TableSelector />
          </ButtonGroup>
        </Flex>
        <Table>
          <TableHeader canResize />
          <TableBody />
          <TableFooter />
        </Table>
      </DataTableServer>
    </ChakraProvider>
  );
};

export default TablePinningShowcase;
