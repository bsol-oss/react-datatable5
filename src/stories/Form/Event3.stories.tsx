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
            },
          },
        } as JSONSchema7,
        // include: ["name"],
        // ignore: ["id", "created_at", "updated_at"],
        serverUrl: 'http://localhost:8081',
        ...form,
      }}
    />
  );
};
