import { Box, ChakraProvider, Flex, Table, theme } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../components/DataTable/DataTable";
import {
  EditFilterButton,
  EditOrderButton,
  EditViewButton,
  GlobalFilter,
  PageSizeControl,
  TableBody,
  TableFooter,
  TableHeader,
  TablePagination,
  TableSelector,
  TextCell,
} from "../../index";
import { data, Product } from "../data";

export default {
  title: "react-datatable5/DataTable/interactive",
  component: DataTable,
  argTypes: {
    data: { control: { type: "array" } },
    columns: { control: { type: "array" } },
    enableRowSelection: { control: { type: "boolean" } },
    enableMultiRowSelection: { control: { type: "boolean" } },
    enableSubRowSelection: { control: { type: "boolean" } },
    onRowSelect: { action: "onRowSelect" },
    columnOrder: { control: { type: "array" } },
    columnFilters: { control: { type: "object" } },
    globalFilter: { control: { type: "text" } },
    density: { control: { type: "select", options: ["sm", "md", "lg"] } },
    pagination: { control: { type: "object" } },
    sorting: { control: { type: "array" } },
    rowSelection: { control: { type: "object" } },
  },
};

const Template = (args) => {
  return (
    <ChakraProvider theme={theme}>
      <DataTable {...args}>
        <Flex>
          <TablePagination />
          <EditViewButton />
          <EditFilterButton />
          <EditOrderButton />
          <PageSizeControl />
          <TableSelector />
          <GlobalFilter />
        </Flex>
        <Table>
          <TableHeader canResize />
          <TableBody />
          <TableFooter />
        </Table>
        <PageSizeControl />
        <TablePagination />
      </DataTable>
    </ChakraProvider>
  );
};

interface RowActionsProps {
  row: Product;
}

const RowActions = ({ row }: RowActionsProps) => {
  return <>no actions</>;
};

const columnHelper = createColumnHelper<Product>();

const columns: ColumnDef<Product>[] = [
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
      columnHelper.accessor("title", {
        cell: (props) => {
          return (
            <Box padding={"0rem"}>
              <TextCell label={props.row.original.title}>
                {props.row.original.title}
              </TextCell>
            </Box>
          );
        },
        header: () => <Box>Title</Box>,
        footer: (props) => props.column.id,
        size: 100,
      }),
      // Accessor Column
      columnHelper.accessor("description", {
        cell: (props) => {
          return <TextCell>{props.row.original.description}</TextCell>;
        },
        header: () => <span>Description</span>,
        footer: (props) => props.column.id,
        size: 400,
      }),
    ],
  }),
];

export const Playground = Template.bind({});

Playground.args = {
  data: data,
  columns: columns,
  enableRowSelection: true,
  enableMultiRowSelection: true,
  enableSubRowSelection: true,
  onRowSelect: () => {},
  columnOrder: ["actions", "id", "title", "description"],
  columnFilters: [],
  globalFilter: "",
  density: "sm",
  pagination: { pageIndex: 0, pageSize: 10 },
  sorting: [],
  rowSelection: {},
};
