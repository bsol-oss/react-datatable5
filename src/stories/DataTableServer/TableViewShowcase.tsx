import { Provider } from "@/components/ui/provider";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  DataTableServer,
  DensityToggleButton,
  FilterDialog,
  EditOrderButton,
  ViewDialog,
  FilterOptions,
  GlobalFilter,
  PageSizeControl,
  ReloadButton,
  RowCountText,
  Table,
  TableBody,
  TableComponent,
  TableFilterTags,
  TableFooter,
  TableHeader,
  Pagination,
  TableSelector,
  TextCell,
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

const RowActions = () => {
  return (
    <>
      <Button>Some Action</Button>
    </>
  );
};

const TableViewShowcase = () => {
  const dataTable = useDataTableServer<ChatRecord>({
    url: "http://localhost:8333/api/v1/gpt/chat/history/all",
    default: {
      sorting: [{ id: "last_update", desc: true }],
      pagination: { pageSize: 25, pageIndex: 0 },
      columnVisibility: { total_completion_tokens: false },
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
          header: () => <Box color={"blue.400"}>Session Id</Box>,
          footer: () => <Box>Session Id</Box>,
          meta: {
            displayName: "Session Id",
          },
        }),
        columnHelper.accessor("last_user_message", {
          cell: (props) => {
            return (
              <TextCell label={props.row.original.last_user_message}>
                {props.row.original.last_user_message}
              </TextCell>
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
          enableColumnFilter: false,
        }),
        // Accessor Column
        columnHelper.accessor("model", {
          cell: (props) => {
            return <TextCell>{props.row.original.model}</TextCell>;
          },
          header: () => <span>Model</span>,
          footer: () => <span>Model</span>,
          sortDescFirst: false,
          meta: {
            displayName: "Model",
            filterVariant: "select",
            filterOptions: ["gpt4", "gpt35"],
          },
        }),
        columnHelper.accessor("total_completion_tokens", {
          cell: (props) => {
            return (
              <TextCell>{props.row.original.total_completion_tokens}</TextCell>
            );
          },
          header: () => <span>total_completion_tokens</span>,
          footer: () => <span>total_completion_tokens</span>,
          sortDescFirst: false,
          meta: {
            displayName: "Total Completetion Token",
            filterVariant: "range",
          },
        }),
      ],
    }),
  ];

  return (
    <Provider>
      <DataTableServer<ChatRecord>
        url={"http://localhost:8081"}
        columns={columns}
        {...dataTable}
      >
        <Flex flexFlow={"wrap"}>
          <Pagination />
          <ViewDialog text={"View"} />
          <FilterDialog text={"Filter"} />
          <DensityToggleButton text={"Toggle Density"} />
          <EditOrderButton text={"Order"} />
          <PageSizeControl pageSizes={[25, 50]} />
          <TableSelector />
          <ReloadButton />
          <GlobalFilter />
          <FilterOptions column="model" />
          <Text paddingRight={"0.5rem"}>{"Total: "}</Text>
          <RowCountText />
          <TableFilterTags />
        </Flex>
        <Table>
          <TableHeader canResize />
          <TableBody />
          <TableFooter />
        </Table>
        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
      </DataTableServer>
    </Provider>
  );
};

export default TableViewShowcase;
