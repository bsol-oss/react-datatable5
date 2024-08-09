import { Box, Button, ChakraProvider, Text, theme } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import {
  DataTableServer,
  DefaultTable,
  TableComponent,
  TextCell,
} from "../../index";
import { useState } from "react";

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

const DefaultTableShowcase2 = () => {
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
              <TextCell label={`${JSON.stringify(props.row.original.data)}`}>
                {`${JSON.stringify(props.row.original.data)}`}
              </TextCell>
            );
          },
          header: () => <Box>Session Id</Box>,
          footer: () => <Box>Session Id</Box>,
          meta: {
            displayName: "Session Id",
          },
        }),
      ],
    }),
  ];

  const columnv2: ColumnDef<ChatRecord>[] = [
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
              <TextCell label={`${JSON.stringify(props.row.original.data)}`}>
                {`${JSON.stringify(props.row.original.data)}`}
              </TextCell>
            );
          },
          header: () => <Box>Column Def v2</Box>,
          footer: () => <Box>Column Def v2</Box>,
          meta: {
            displayName: "dddddddd Id",
          },
        }),
      ],
    }),
  ];

  const [selectedId, setSelectedId] = useState();

  return (
    <ChakraProvider theme={theme}>
      <Button
        onClick={() => {
          setSelectedId("ea3382be-eb0e-4b72-9a7b-9ec9df7dbf61");
        }}
      >
        staff profile
      </Button>
      <Button
        onClick={() => {
          setSelectedId("dc40c86a-7ce6-4835-b9fb-2fd6afa4b909");
        }}
      >
        aad profile
      </Button>
      <DataTableServer
        columns={
          selectedId == "dc40c86a-7ce6-4835-b9fb-2fd6afa4b909"
            ? columns
            : columnv2
        }
        url={`http://localhost:8081/api/profile-data/${selectedId}/search`}
        sorting={[{ id: "last_update", desc: true }]}
        pagination={{ pageSize: 25, pageIndex: 0 }}
      >
        <DefaultTable showFilter filterOptions={["model"]} />
        <Box width="400px" height={"400px"}>
          <DefaultTable showFilter />
        </Box>
        <Box width="2400px" height={"2400px"}>
          <DefaultTable showFilter />
        </Box>

        <Text> {"fitTable={true}"}</Text>

        <Box width="400px" height={"400px"}>
          <DefaultTable showFilter fitTableWidth />
        </Box>
        <Box width="2400px" height={"2400px"}>
          <DefaultTable showFilter fitTableWidth fitTableHeight />
        </Box>

        <Box width="2400px" height={"2400px"}>
          <DefaultTable showFilter fitTableWidth fitTableHeight />
        </Box>

        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
      </DataTableServer>
    </ChakraProvider>
  );
};

export default DefaultTableShowcase2;
