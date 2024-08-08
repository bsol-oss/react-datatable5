import { Box, ChakraProvider, Flex, Text, theme } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import {
  DataTable,
  EditFilterButton,
  EditOrderButton,
  EditViewButton,
  GlobalFilter,
  PageSizeControl,
  RowCountText,
  Table,
  TableBody,
  TableComponent,
  TableFooter,
  TableHeader,
  TablePagination,
  TableSelector,
  TextCell,
} from "../../index";
import { data, Product } from "../data";
interface RowActionsProps {
  row: Product;
}

const RowActions = ({ row }: RowActionsProps) => {
  return <>has no actions</>;
};

const TableViewShowcase = () => {
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
      footer: () => <span>Information</span>,
      columns: [
        columnHelper.accessor("id", {
          cell: (props) => {
            return <TextCell>{props.row.original.id}</TextCell>;
          },
          header: () => <span>Id</span>,
          footer: () => <span>Id</span>,
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
          footer: () => <Box>Title</Box>,
          size: 200,
        }),
        // Accessor Column
        columnHelper.accessor("description", {
          cell: (props) => {
            return <TextCell>{props.row.original.description}</TextCell>;
          },
          header: () => <span>Description</span>,
          footer: () => <span>Description</span>,
          size: 400,
        }),
        columnHelper.accessor("price", {
          cell: (props) => {
            return <TextCell>{props.row.original.price}</TextCell>;
          },
          header: () => <span>price</span>,
          footer: () => <span>price</span>,
          size: 100,
          filterFn: (row, columnId, filterValue) => {
            console.log(row, columnId, filterValue);
            const [min, max] = filterValue;
            return min < row.original.price && max > row.original.price;
          },
          meta: {
            filterVariant: "range",
          },
        }),
      ],
    }),
  ];

  return (
    <ChakraProvider theme={theme}>
      <DataTable
        columns={columns}
        data={data}
        sorting={[{ id: "title", desc: false }]}
        columnVisibility={{ description: false }}
      >
        <Flex>
          <TablePagination />
          <EditViewButton />
          <EditFilterButton />
          <EditOrderButton />
          <PageSizeControl />
          <TableSelector />
          <GlobalFilter />
          <Text paddingRight="0.5rem">Total:</Text>
          <RowCountText />
        </Flex>
        <Table>
          <TableHeader canResize />
          <TableBody />
          <TableFooter />
        </Table>
        <PageSizeControl />
        <TablePagination />
        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
      </DataTable>
    </ChakraProvider>
  );
};

export default TableViewShowcase;
