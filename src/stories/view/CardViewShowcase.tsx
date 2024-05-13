import { ButtonGroup, ChakraProvider, Flex, theme } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableServer } from "../../components/DataTableServer";
import { EditFilterButton } from "../../components/EditFilterButton";
import { EditOrderButton } from "../../components/EditOrderButton";
import { EditSortingButton } from "../../components/EditSortingButton";
import { EditViewButton } from "../../components/EditViewButton";
import { PageSizeControl } from "../../components/PageSizeControl";
import { TableCardContainer } from "../../components/TableCardContainer";
import { TableCards } from "../../components/TableCards";
import { TablePagination } from "../../components/TablePagination";
import { TableSelector } from "../../components/TableSelector";
import { TextCell } from "../../components/TextCell";

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
  return <>no actions</>;
};

const CardViewShowcase = () => {
  const columnHelper = createColumnHelper<ChatRecord>();

  const columns: ColumnDef<ChatRecord, unknown>[] = [
    // Display Column
    columnHelper.display({
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (props) => <RowActions row={props.row.original} />,
    }),

    // Grouping Column
    columnHelper.group({
      header: "Information",
      footer: (props) => props.column.id,
      columns: [
        columnHelper.accessor("session_id", {
          cell: (props) => {
            return <TextCell>{`${props.row.original.session_id}`}</TextCell>;
          },
          header: () => <span>Session Id</span>,
          footer: (props) => props.column.id,
        }),
        columnHelper.accessor("last_user_message", {
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
        // Accessor Column
        columnHelper.accessor("total_token", {
          cell: (props) => {
            return <TextCell>{props.row.original.total_token}</TextCell>;
          },
          header: () => <span>Total Token</span>,
          footer: (props) => props.column.id,
          sortDescFirst: false,
        }),
      ],
    }),
  ];

  return (
    <ChakraProvider theme={theme}>
      <DataTableServer
        columns={columns}
        url={"http://localhost:8333/api/v1/gpt/chat/history/all"}
      >
        <Flex gap='0.25rem'>
          <TablePagination />
          <ButtonGroup isAttached>
            <EditViewButton />
            <EditFilterButton />
            <EditSortingButton />
          </ButtonGroup>
          <EditOrderButton />
          <PageSizeControl />
          <ButtonGroup isAttached>
            <TableSelector />
          </ButtonGroup>
        </Flex>
        <TableCardContainer>
          <TableCards />
        </TableCardContainer>
        <TablePagination />
      </DataTableServer>
    </ChakraProvider>
  );
};

export default CardViewShowcase;