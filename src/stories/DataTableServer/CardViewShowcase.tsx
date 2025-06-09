import { Provider } from "@/components/ui/provider";
import {
  Box,
  Flex
} from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  DataTableServer,
  EditSortingButton,
  FilterDialog,
  PageSizeControl,
  Pagination,
  TableCardContainer,
  TableCards,
  TableSelector,
  TextCell,
  ViewDialog,
  useDataTableServer,
} from "../../index";

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
  const dataTable = useDataTableServer<ChatRecord>({
    url: "http://localhost:8333/api/v1/gpt/chat/history/all",
    default: {
      sorting: [{ id: "last_update", desc: true }],
      pagination: { pageSize: 25, pageIndex: 0 },
    },
  });
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
    <Provider>
      <DataTableServer<ChatRecord> 
        columns={columns} 
        url="http://localhost:8333/api/v1/gpt/chat/history/all"
        {...dataTable}
      >
        <Flex gap="0.25rem">
          <Pagination />
          <ViewDialog />
          <FilterDialog />
          <EditSortingButton />
          <PageSizeControl />
          <TableSelector />
        </Flex>
        <TableCardContainer>
          <TableCards />
        </TableCardContainer>
        <Pagination />
      </DataTableServer>
    </Provider>
  );
};

export default CardViewShowcase;
