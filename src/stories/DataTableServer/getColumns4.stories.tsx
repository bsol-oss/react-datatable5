import { DataTableServer } from '@/components/DataTable/DataTableServer';
import { DataDisplay } from '@/components/DataTable/display/DataDisplay';
import { TableDataDisplay } from '@/components/DataTable/display/TableDataDisplay';
import { useDataTableServer } from '@/components/DataTable/useDataTableServer';
import { getColumns } from '@/components/DataTable/utils/getColumns';
import { Provider } from '@/components/ui/provider';
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

export const GetColumns4Story: Story = {
  name: 'Get Columns 4 Story',
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

  const columnsInclude = getColumns<string>({
    schema: peopleSchema as JSONSchema7,
    meta: {},
  });

  return (
    <Provider>
      <DataTableServer
        url="http://localhost:8081/api/g/core_people"
        columns={columnsInclude as any}
        {...datatable}
      >
        <TableDataDisplay />
        {JSON.stringify(datatable.query.data)}
      </DataTableServer>
    </Provider>
  );
};
