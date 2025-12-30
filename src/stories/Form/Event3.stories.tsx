import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import { CustomQueryFnParams } from '@/components/Form/components/fields/StringInputField';
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
  const form = useForm({ keyPrefix: 'nice' });

  return (
    <DefaultForm
      formConfig={{
        schema: {
          type: 'object',
          properties: {
            someString: {
              type: 'string',
              variant: 'id-picker',
              foreign_key: {
                table: 'core_people',
                column: 'id',
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
                        item.name
                          .toLowerCase()
                          .includes(searching.toLowerCase())
                      ),
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
              },
              loadInitialValues: async (params) => {
                if (!params.ids || params.ids.length === 0) {
                  return { data: { data: [], count: 0 }, idMap: {} };
                }
                const { column: column_ref, customQueryFn } =
                  params.foreign_key;
                if (!customQueryFn) {
                  throw new Error(
                    'customQueryFn is required in foreign_key. serverUrl has been removed.'
                  );
                }
                const { data, idMap: returnedIdMap } = await customQueryFn({
                  searching: '',
                  limit: params.ids.length,
                  offset: 0,
                  where: [
                    {
                      id: column_ref,
                      value:
                        params.ids.length === 1 ? params.ids[0] : params.ids,
                    },
                  ],
                });
                if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
                  params.setIdMap((state) => {
                    return { ...state, ...returnedIdMap };
                  });
                }
                return { data, idMap: returnedIdMap || {} };
              }, // Required for id-picker: loads records for human-readable display
            },
          },
        } as JSONSchema7,
        // include: ["name"],
        // ignore: ["id", "created_at", "updated_at"],
        ...form,
      }}
    />
  );
};
