import {
  Box,
  ButtonGroup,
  ChakraProvider,
  Flex,
  theme,
} from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableServer } from "../../components/DataTableServer";
import { EditFilterButton } from "../../components/EditFilterButton";
import { EditOrderButton } from "../../components/EditOrderButton";
import { EditViewButton } from "../../components/EditViewButton";
import { GlobalFilter } from "../../components/GlobalFilter";
import { PageSizeControl } from "../../components/PageSizeControl";
import { Table } from "../../components/Table";
import { TableBody } from "../../components/TableBody";
import { TableFooter } from "../../components/TableFooter";
import { TableHeader } from "../../components/TableHeader";
import { TablePagination } from "../../components/TablePagination";
import { TableSelector } from "../../components/TableSelector";
import { TextCell } from "../../components/TextCell";
import { DensityToggleButton } from "../../components/DensityToggleButton";

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

const TableViewShowcase = () => {
  const columnHelper = createColumnHelper<ChatRecord>();

  const columns: ColumnDef<ChatRecord>[] = [
    // Display Column
    columnHelper.display({
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (props) => <RowActions row={props.row.original} />,
      meta: {
        displayName: "Actions",
      },
    }),

    // Grouping Column
    columnHelper.group({
      header: "Information",
      footer: (props) => props.column.id,
      columns: [
        columnHelper.accessor("session_id", {
          cell: (props) => {
            return (
              <TextCell label={props.row.original.session_id}>
                {props.row.original.session_id}
              </TextCell>
            );
          },
          header: () => <Box>Session Id</Box>,
          footer: () => <Box>Session Id</Box>,
          meta: {
            displayName: "Session Id",
          },
        }),
        columnHelper.accessor("last_user_message", {
          cell: (props) => {
            return (
              <Box padding={"0rem"}>
                <TextCell label={props.row.original.last_user_message}>
                  {props.row.original.last_user_message}
                </TextCell>
              </Box>
            );
          },
          size: 400,
          header: () => <Box>User Message</Box>,
          footer: () => <Box>User Message</Box>,
          meta: {
            displayName: "User Message",
          },
        }),
        // Accessor Column
        columnHelper.accessor("total_token", {
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
      ],
    }),
  ];

  return (
    <ChakraProvider theme={theme}>
      <DataTableServer
        columns={columns}
        url={"http://localhost:8333/api/v1/gpt/chat/history/all"}
        sorting={[{ id: "last_update", desc: true }]}
      >
        <Flex>
          <TablePagination />
          <ButtonGroup isAttached>
            <EditViewButton />
            <EditFilterButton />
            <DensityToggleButton />
          </ButtonGroup>
          <EditOrderButton />
          <PageSizeControl />
          <ButtonGroup isAttached>
            <TableSelector />
          </ButtonGroup>
          <GlobalFilter />
        </Flex>
        <Table>
          <TableHeader canResize />
          <TableBody />
          <TableFooter />
        </Table>
        <Flex gap="0.25rem">
          <TablePagination />
          <ButtonGroup isAttached>
            <EditViewButton />
            <EditFilterButton />
          </ButtonGroup>
          <EditOrderButton />
          <PageSizeControl />
          <ButtonGroup isAttached>
            <TableSelector />
          </ButtonGroup>
        </Flex>
      </DataTableServer>
    </ChakraProvider>
  );
};

export default TableViewShowcase;
