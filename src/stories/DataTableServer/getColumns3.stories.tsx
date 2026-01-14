import { DataDisplay } from '@/components/DataTable/display/DataDisplay';
import { DataTableServer } from '@/components/DataTable/DataTableServer';
import { DefaultTable } from '@/components/DataTable/DefaultTable';
import { TableComponent } from '@/components/DataTable/display/TableComponent';
import { useDataTableServer } from '@/components/DataTable/useDataTableServer';
import { getColumns } from '@/components/DataTable/utils/getColumns';
import { Provider } from '@/components/ui/provider';
import { Box, Text } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import { peopleSchema } from '../schema';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/DataTableServer/getColumns',
  component: DataDisplay,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DataDisplay>;

type Story = StoryObj<typeof meta>;

export default meta;

export const GetColumns3Story: Story = {
  name: 'Get Columns 3 Story',
  render: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <DataDisplayView />
      </QueryClientProvider>
    );
  },
};

const queryClient = new QueryClient();

const DataDisplayView = () => {
  return <AddressApp />;
};

const AddressApp = () => {
  const datatable = useDataTableServer({
    url: 'http://localhost:8081/api/g/core_people',
    default: { sorting: [{ id: 'id', desc: false }] },
  });

  const columns = getColumns<string>({
    schema: peopleSchema as JSONSchema7,
    width: [400, 80, 100],
    meta: {},
  });

  const columnsInclude = getColumns<string>({
    schema: peopleSchema as JSONSchema7,
    // ignore: ["building_name"],
    include: ['first_name'],
    width: [400, 80, 100],
    meta: {
      first_name: {
        displayName: 'First Name',
        filterVariant: 'select',
        filterOptions: [
          { label: 'Apple', value: 'Apple' },
          { label: 'Huawei', value: 'Huawei' },
        ],
      },
    },
  });

  return (
    <Provider>
      <DataTableServer
        url="http://localhost:8081/api/g/core_people"
        columns={columns as any}
        {...datatable}
      >
        <DefaultTable
          controlProps={{
            showGlobalFilter: true,
            showFilter: true,
            fitTableWidth: true,
            fitTableHeight: true,
          }}
        />
        <DataDisplay />
        <DataDisplay variant="stats" />
        <Box width={'20rem'}>
          <DataDisplay variant="horizontal" />
        </Box>
        <DataDisplay variant="horizontal" />
        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
      </DataTableServer>
      <DataTableServer
        url="http://localhost:8081/api/g/core_people"
        columns={columnsInclude as any}
        {...datatable}
      >
        <DataDisplay />
      </DataTableServer>
    </Provider>
  );
};
