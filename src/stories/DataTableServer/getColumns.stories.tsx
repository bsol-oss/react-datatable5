import { DataDisplay } from "@/components/DataTable/display/DataDisplay";
import { DataTableServer } from "@/components/DataTable/DataTableServer";
import { DefaultTable } from "@/components/DataTable/DefaultTable";
import { TableComponent } from "@/components/DataTable/display/TableComponent";
import { useDataTableServer } from "@/components/DataTable/useDataTableServer";
import { getColumns } from "@/components/DataTable/utils/getColumns";
import { Provider } from "@/components/ui/provider";
import { Box, Text } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JSONSchema7 } from "json-schema";
import { addressSchema } from "../schema";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/DataTableServer/getColumns",
  component: DataDisplay,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DataDisplay>;

type Story = StoryObj<typeof meta>;

export default meta;

export const GetColumnsStory: Story = {
  render: () => {
    return <DataDisplayView />;
  },
};

const queryClient = new QueryClient();

const DataDisplayView = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AddressApp />
    </QueryClientProvider>
  );
};

const AddressApp = () => {
  const datatable = useDataTableServer({
    url: "http://localhost:8081/api/g/core_addresses",
    default: { sorting: [{ id: "id", desc: false }] },
  });
  const columns = getColumns<string>({
    schema: addressSchema as JSONSchema7,
    ignore: ["building_name"],
    width: [400, 80, 100],
    meta: {
      created_at: {
        displayName: "Created at",
        filterVariant: "select",
        filterOptions: ["Apple", "Huawei"],
      },
    },
  });

  return (
    <Provider>
      <DataTableServer columns={columns} {...datatable}>
          <DefaultTable
            showFilter
            showFilterName
            showFilterTags
            fitTableWidth
            fitTableHeight
          />
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
      </DataTableServer>
    </Provider>
  );
};
