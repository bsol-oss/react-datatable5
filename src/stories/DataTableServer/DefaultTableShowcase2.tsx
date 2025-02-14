import { Provider } from "@/components/ui/provider";
import {
  Box,
  Button,
  Text
} from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import {
  DataTableServer,
  TableComponent,
  TextCell,
  useDataTableServer,
} from "../../index";


export interface Root {
  count: number;
  results: ProfileData[];
}

export interface ProfileData {
  id: string;
  table_id: string;
  person_id: string;
  data: any;
  created_by: any;
  created_at: string;
  updated_by: any;
  updated_at: string;
}

interface RowActionsProps {
  row: ProfileData;
}

const RowActions = ({ row }: RowActionsProps) => {
  return <>has no actions</>;
};

const DefaultTableShowcase2 = () => {
  // const dataTable = useDataTable({
  //   default: {
  //     pagination: { pageSize: 25, pageIndex: 0 },
  //   },
  // });

  const columnHelper = createColumnHelper<ProfileData>();

  const columns: ColumnDef<ProfileData>[] = [
    columnHelper.display({
      id: "actionsa",
      header: () => <span>Actions A</span>,
      cell: (props) => <RowActions row={props.row.original} />,
      meta: {
        displayName: "Actions A",
      },
    }),
    columnHelper.display({
      id: "actionsb",
      header: () => <span>Actions B</span>,
      cell: (props) => <RowActions row={props.row.original} />,
      meta: {
        displayName: "Actions B",
      },
    }),
    columnHelper.display({
      id: "actionsc",
      header: () => <span>Actions C</span>,
      cell: (props) => <RowActions row={props.row.original} />,
      meta: {
        displayName: "Actions C",
      },
    }),
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
        columnHelper.accessor("data", {
          cell: (props) => {
            return (
              <TextCell label={`${JSON.stringify(props.row.original.data)}`}>
                {`${JSON.stringify(props.row.original.data)}`}
              </TextCell>
            );
          },
          header: () => <Box>Data</Box>,
          footer: () => <Box>Data</Box>,
          meta: {
            displayName: "Data",
          },
        }),
      ],
    }),
  ];

  const columnv2: ColumnDef<ProfileData>[] = [
    // Display Column
    columnHelper.display({
      id: "actions1",
      header: () => <span>Actions 1</span>,
      cell: (props) => <RowActions row={props.row.original} />,
      meta: {
        displayName: "Actions 1",
      },
    }),
    columnHelper.display({
      id: "actions2",
      header: () => <span>Actions 2</span>,
      cell: (props) => <RowActions row={props.row.original} />,
      meta: {
        displayName: "Actions 2",
      },
    }),
    columnHelper.display({
      id: "actions3",
      header: () => <span>Actions 3</span>,
      cell: (props) => <RowActions row={props.row.original} />,
      meta: {
        displayName: "Actions 3",
      },
    }),

    // Grouping Column
    columnHelper.group({
      header: "Information",
      footer: (props) => props.column.id,
      columns: [
        columnHelper.accessor("data", {
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

  const [selectedId, setSelectedId] = useState<string>();
  const dataTable = useDataTableServer<ProfileData>({
    url: `http://localhost:8081/api/profile-data/${selectedId}/search`,
    default: {
      pagination: { pageSize: 25, pageIndex: 0 },
    },
  });

  return (
    <Provider>
      <Button
        onClick={() => {
          setSelectedId("staff_profile");
          dataTable.setColumnVisibility({ actionsa: false });
        }}
      >
        staff profile
      </Button>
      +
      <Button
        onClick={() => {
          setSelectedId("aad_profile");
          dataTable.setColumnVisibility({ actions1: false });
        }}
      >
        aad profile
      </Button>
      <DataTableServer
        url={`http://localhost:8081/api/profile-data/${selectedId}/search`}
        columns={selectedId == "aad_profile" ? columns : columnv2}
        // onFetchSuccess={(response)=>{console.log(response,"some-response-123")}}
        {...dataTable}
      >
        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
      </DataTableServer>
    </Provider>
  );
};

export default DefaultTableShowcase2;
