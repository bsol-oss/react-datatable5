import { DataDisplay } from "@/components/DataTable/DataDisplay";
import { DataTableServer } from "@/components/DataTable/DataTableServer";
import { TableComponent } from "@/components/DataTable/TableComponent";
import { useDataTableServer } from "@/components/DataTable/useDataTableServer";
import { getColumns } from "@/components/DataTable/utils/getColumns";
import { Box, ChakraProvider, defaultSystem, Text } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
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

export const DataDisplayStory: Story = {
  render: () => {
    return <DataDisplayView />;
  },
};

// const RowActions = () => {
//   return <>has no actions</>;
// };

const DataDisplayView = () => {
  const datatable = useDataTableServer({
    url: "http://localhost:8081/api/g/core_addresses",
    default: { sorting: [{ id: "id", desc: false }] },
  });
  const columns = getColumns({
    schema: addressSchema as JSONSchema7,
    hidden: [],
  });

  return (
    <ChakraProvider value={defaultSystem}>
      <DataTableServer columns={columns} {...datatable}>
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
    </ChakraProvider>
  );
};
