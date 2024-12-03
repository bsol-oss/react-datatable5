import { Box, ChakraProvider, Text, theme } from "@chakra-ui/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable, DefaultTable, TableComponent, TextCell } from "../../index";
import { data, Product } from "../product_data";
import { useDataTable } from "../../components/DataTable/useDataTable";

interface RowActionsProps {
  row: Product;
}

const RowActions = ({ row }: RowActionsProps) => {
  return <>has no actions</>;
};

const DefaultTableShowcase = () => {
  const datatable = useDataTable({
    default: { sorting: [{ id: "title", desc: false }] },
  });
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
          enableColumnFilter: false,
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
          meta: {
            displayName: "Brand",
            filterVariant: "select",
            filterOptions: ["Apple", "Huawei"],
          },
        }),
        // Accessor Column
        columnHelper.accessor("category", {
          cell: (props) => {
            return <TextCell>{props.row.original.category}</TextCell>;
          },
          header: () => <span>Category</span>,
          footer: () => <span>Category</span>,
          size: 160,
          meta: {
            displayName: "Brand",
            filterVariant: "select",
            filterOptions: [
              "fragrances",
              "groceries",
              "home-decoration",
              "laptops",
              "skincare",
              "smartphones",
            ],
          },
        }),
      ],
    }),
  ];

  return (
    <ChakraProvider theme={theme}>
      <DataTable columns={columns} data={data} {...datatable}>
        <DefaultTable
          showSelector
          showFilter
          showFilterName
          showFilterTags
          filterOptions={["category", "brand"]}
        />
        <Box width="400px" height={"400px"}>
          <DefaultTable showFilter />
        </Box>
        <Box width="2400px" height={"2400px"}>
          <DefaultTable showFilter />
        </Box>

        <Text> {"fitTable={true}"}</Text>

        <Box width="400px" height={"400px"}>
          <DefaultTable
            showFilter
            fitTableWidth
            tHeadProps={{ bgColor: "yellow", _dark: { bgColor: "blue" } }}
          />
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
      </DataTable>
    </ChakraProvider>
  );
};

export default DefaultTableShowcase;
