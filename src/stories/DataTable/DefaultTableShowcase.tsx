import { Box, ChakraProvider, Text, theme } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../components/DataTable";
import { DefaultTable } from "../../components/DefaultTable";
import { TableComponent } from "../../components/TableComponent";
import { TextCell } from "../../components/TextCell";
import { data, Product } from "../data";

interface RowActionsProps {
  row: Product;
}

const RowActions = ({ row }: RowActionsProps) => {
  return <>has no actions</>;
};

const DefaultTableShowcase = () => {
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
          size: 200,
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
        // Accessor Column
        columnHelper.accessor("price", {
          cell: (props) => {
            return <TextCell>{props.row.original.price}</TextCell>;
          },
          header: () => <span>Price</span>,
          footer: () => <span>Price</span>,
          size: 80,
        }),
        // Accessor Column
        columnHelper.accessor("discountPercentage", {
          cell: (props) => {
            return <TextCell>{props.row.original.discountPercentage}</TextCell>;
          },
          header: () => <span>Discount %</span>,
          footer: () => <span>Discount %</span>,
          size: 120,
          enableColumnFilter: false
        }),
        // Accessor Column
        columnHelper.accessor("rating", {
          cell: (props) => {
            return <TextCell>{props.row.original.rating}</TextCell>;
          },
          header: () => <span>Rating</span>,
          footer: () => <span>Rating</span>,
          size: 80,
        }),
        // Accessor Column
        columnHelper.accessor("stock", {
          cell: (props) => {
            return <TextCell>{props.row.original.stock}</TextCell>;
          },
          header: () => <span>Stock</span>,
          footer: () => <span>Stock</span>,
          size: 80,
        }),
        // Accessor Column
        columnHelper.accessor("brand", {
          cell: (props) => {
            return <TextCell>{props.row.original.brand}</TextCell>;
          },
          header: () => <span>Brand</span>,
          footer: () => <span>Brand</span>,
          size: 160,
        }),
        // Accessor Column
        columnHelper.accessor("category", {
          cell: (props) => {
            return <TextCell>{props.row.original.category}</TextCell>;
          },
          header: () => <span>Category</span>,
          footer: () => <span>Category</span>,
          size: 160,
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
      >
        <DefaultTable showFilter={true} />
        <Box width="400px" height={"400px"}>
          <DefaultTable showFilter={true} />
        </Box>
        <Box width="2400px" height={"2400px"}>
          <DefaultTable showFilter={true} />
        </Box>

        <Text> {"fitTable={true}"}</Text>

        <Box width="400px" height={"400px"}>
          <DefaultTable showFilter={true} fitTableWidth={true} />
        </Box>
        <Box width="2400px" height={"2400px"}>
          <DefaultTable
            showFilter={true}
            fitTableWidth={true}
            fitTableHeight={true}
          />
        </Box>

        <Box width="2400px" height={"2400px"}>
          <DefaultTable
            showFilter={true}
            fitTableWidth={true}
            fitTableHeight={true}
          />
        </Box>

        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
      </DataTable>
    </ChakraProvider>
  );
};

export default DefaultTableShowcase;
