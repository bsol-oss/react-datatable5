import { Box, Text } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useDataTable } from "../../components/DataTable/useDataTable";
import { DataTable, DefaultTable, TableComponent, TextCell } from "../../index";
import { Employee, staffData } from "../staff_data";
import Provider from "../Provider";

interface RowActionsProps {
  row: Employee;
}

const RowActions = ({ row }: RowActionsProps) => {
  return <>has no actions</>;
};

const DefaultTableShowcase2 = () => {
  const datatable = useDataTable({
    default: { sorting: [{ id: "title", desc: false }] },
  });
  const columnHelper = createColumnHelper<Employee>();
  const columns: ColumnDef<Employee>[] = [
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
        columnHelper.accessor("id", {
          cell: (props) => {
            return <TextCell>{props.row.original.id}</TextCell>;
          },
          header: () => <span>Id</span>,
          footer: (props) => props.column.id,
          size: 50,
        }),
        columnHelper.accessor("is_active", {
          cell: (props) => {
            return (
              <TextCell>
                {props.row.original.is_active ? "true" : "false"}
              </TextCell>
            );
          },
          header: () => <span>is_active</span>,
          footer: () => <span>is_active</span>,
          size: 100,
          filterFn: (row, col, filterValue) => {
            return filterValue.some((value: "true" | "false") => {
              if (value === undefined || value === null) {
                return false;
              }
              if (value === "true") {
                return row.original.is_active === true;
              }
              if (value === "false") {
                return row.original.is_active === false;
              }
            });
          },
          meta: {
            filterVariant: "boolean",
          },
        }),
        columnHelper.accessor("hire_date", {
          cell: (props) => {
            return <TextCell>{props.row.original.hire_date}</TextCell>;
          },
          header: () => <span>hire_date</span>,
          footer: () => <span>hire_date</span>,
          size: 100,
          filterFn: (row, col, filterValue) => {
            console.log(filterValue);
            return true;
          },
          meta: {
            filterVariant: "dateRange",
          },
        }),

        columnHelper.accessor("university", {
          cell: (props) => {
            return <TextCell>{props.row.original.university}</TextCell>;
          },
          header: () => <span>university</span>,
          footer: () => <span>university</span>,
          size: 100,
          filterFn: (row, col, filterValue) => {
            return true;
          },
          meta: {
            filterVariant: "custom",
            renderFilter: (state, updater) => {
              return <>custom filter</>;
            },
          },
        }),
      ],
    }),
  ];

  return (
    <Provider>
      <DataTable columns={columns} data={staffData} {...datatable}>
        <DefaultTable
          controlProps={{
            showFilter: true,
            showFilterName: true,
            showFilterTags: true,
            filterOptions: ["category", "brand"],
          }}
        />
        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
        <Box width="400px" height={"400px"}>
          <DefaultTable
            controlProps={{
              showFilter: true,
            }}
          />
        </Box>
        <Box width="2400px" height={"2400px"}>
          <DefaultTable
            controlProps={{
              showFilter: true,
            }}
          />
        </Box>

        <Text> {"fitTable={true}"}</Text>

        <Box width="400px" height={"400px"}>
          <DefaultTable
            controlProps={{
              showFilter: true,
              fitTableWidth: true,
            }}
          />
        </Box>
        <Box width="2400px" height={"2400px"}>
          <DefaultTable
            controlProps={{
              showFilter: true,
              fitTableWidth: true,
              fitTableHeight: true,
            }}
          />
        </Box>

        <Box width="2400px" height={"2400px"}>
          <DefaultTable
            controlProps={{
              showFilter: true,
              fitTableWidth: true,
              fitTableHeight: true,
            }}
          />
        </Box>

        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
      </DataTable>
    </Provider>
  );
};

export default DefaultTableShowcase2;
