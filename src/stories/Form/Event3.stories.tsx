import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { CustomJSONSchema7 } from '@/components/Form/components/types/CustomJSONSchema7';
import { CustomQueryFnParams } from '@/components/Form/components/types/CustomJSONSchema7';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/Form',
  component: DefaultForm,
  parameters: {},

  argTypes: {},
};

type Story = StoryObj;

export default meta;
const queryClient = new QueryClient();

export const Event3: Story = {
  name: 'Event 3',
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
  const schema: CustomJSONSchema7 = {
    type: 'object',
    properties: {
      someString: {
        type: 'string',
        variant: 'id-picker',
        customQueryFn: async ({ searching }: CustomQueryFnParams) => {
          return {
            data: {
              data: [
                {
                  id: '12333',
                  name: 'John Doe',
                },
                {
                  id: '12334',
                  name: 'Jane Doe',
                },
              ].filter((item) =>
                item.name.toLowerCase().includes(searching.toLowerCase())
              ),
              count: 2,
            },
            idMap: {
              '12333': {
                id: '12333',
                name: 'John Doe',
              },
              '12334': {
                id: '12334',
                name: 'Jane Doe',
              },
            },
          };
        },
        loadInitialValues: async (params) => {
          if (!params.ids || params.ids.length === 0) {
            return { data: { data: [], count: 0 }, idMap: {} };
          }
          const { customQueryFn } = params;
          if (!customQueryFn) {
            throw new Error(
              'customQueryFn is required. serverUrl has been removed.'
            );
          }
          const { data, idMap: returnedIdMap } = await customQueryFn({
            searching: '',
            limit: params.ids.length,
            offset: 0,
            where: [
              {
                id: 'id',
                value: params.ids.length === 1 ? params.ids[0] : params.ids,
              },
            ],
          });
          if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
            params.setIdMap((state) => {
              return { ...state, ...returnedIdMap } as Record<string, unknown>;
            });
          }
          return { data, idMap: returnedIdMap || {} };
        }, // Required for id-picker: loads records for human-readable display
      },
    },
  };

  const form = useForm({ schema });

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        ...form,
      }}
    />
  );
};
