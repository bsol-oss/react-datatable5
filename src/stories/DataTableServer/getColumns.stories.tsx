import { DataDisplay } from "@/components/DataTable/DataDisplay";
import { DataTableServer } from "@/components/DataTable/DataTableServer";
import { TableComponent } from "@/components/DataTable/TableComponent";
import { useDataTableServer } from "@/components/DataTable/useDataTableServer";
import { getColumns } from "@/components/DataTable/utils/getColumns";
import { Box, ChakraProvider, defaultSystem, Text } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { JSONSchema7 } from "json-schema";
import { addressSchema } from "../schema";
import { DefaultTable } from "@/components/DataTable/DefaultTable";
import { FilterOptions } from "@/components/Filter/FilterOptions";

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

const DataDisplayView = () => {
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
      }
    }
  });

  return (
    <ChakraProvider value={defaultSystem}>
      <DataTableServer columns={columns} {...datatable}>
        <DataDisplay />
        <DataDisplay variant="stats" />
        <Box width={"20rem"}>
          <DataDisplay variant="horizontal" />
        </Box>
        <FilterOptions column={"region"} />
        <DataDisplay variant="horizontal" />
        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
        <Box width="2400px" height={"2400px"}>
          <DefaultTable showFilter showFilterName showFilterTags fitTableWidth fitTableHeight />
        </Box>
      </DataTableServer>
    </ChakraProvider>
  );
};
