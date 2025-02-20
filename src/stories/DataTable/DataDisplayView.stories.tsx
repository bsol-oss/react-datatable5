import { DataDisplay } from "@/components/DataTable/DataDisplay";
import { DataTable } from "@/components/DataTable/DataTable";
import { TableComponent } from "@/components/DataTable/TableComponent";
import { TextCell } from "@/components/DataTable/TextCell";
import { useDataTable } from "@/components/DataTable/useDataTable";
import { Provider } from "@/components/ui/provider";
import { Box, Text } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { data, Product } from "../product_data";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/DataTable/Data Display View",
  component: DataDisplay,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DataDisplay>;

type Story = StoryObj<typeof meta>;

export default meta;

export const DataDisplayStory: Story = {
  render: () => {
    return <DataDisplayView />;
  },
};

const RowActions = () => {
  return <>has no actions</>;
};

const DataDisplayView = () => {
  const datatable = useDataTable({
    default: { sorting: [{ id: "title", desc: false }] },
  });
  const columnHelper = createColumnHelper<Product>();
  const columns: ColumnDef<Product>[] = [
    // Display Column
    columnHelper.display({
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (props) => <RowActions />,
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
            return (
              <Box color={"blue"}>
                {props.row.original.description}
              </Box>
            );
          },
          header: () => <span>Description</span>,
          footer: (props) => props.column.id,
          size: 400,
          meta: {
            showCustomDisplay: true,
          },
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
    <Provider>
      <DataTable columns={columns} data={data} {...datatable}>
        <DataDisplay />
        <DataDisplay variant="stats" />
        <Box width={"20rem"}>
          <DataDisplay variant="horizontal" />
        </Box>
        <DataDisplay variant="horizontal" />
        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
      </DataTable>
    </Provider>
  );
};
