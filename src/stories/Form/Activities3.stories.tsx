import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import { activitiesSchema } from '../schema';
import { getTableData } from '@/components/Form/utils/getTableData';
import axios from 'axios';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/Form',
  component: DefaultForm,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

export const Activities3: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <SomeForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const SomeForm = () => {
  const query = useQuery({
    queryKey: [`some_actitivitues`],
    queryFn: async () => {
      const data = await getTableData({
        serverUrl: 'http://localhost:8081',
        searching: 'e8ad43bf-e00f-4633-b334-68c0f3fd6ead',
        in_table: 'core_activities',
        limit: 10,
        offset: 0,
      });
      return data;
    },
    staleTime: 300000,
  });
  const form = useForm({
    keyPrefix: 'nice',
    preLoadedValues: (query.data ?? { data: [] }).data[0],
  });

  return (
    <DefaultForm
      formConfig={{
        schema: activitiesSchema as JSONSchema7,
        ignore: ['id', 'created_at', 'updated_at'],
        serverUrl: 'http://localhost:8081',
        onSubmit: async (data) => {
          console.log('onSubmit', data);
        },
        getUpdatedData: async () => {
          const response = await getTableData({
            serverUrl: 'http://localhost:8081',
            searching: 'e8ad43bf-e00f-4633-b334-68c0f3fd6ead',
            in_table: 'core_activities',
            limit: 10,
            offset: 0,
          });
          return response.data[0];
        },
        ...form,
      }}
    />
  );
};
