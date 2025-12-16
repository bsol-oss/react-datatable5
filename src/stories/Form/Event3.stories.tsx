import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from 'i18next';
import { JSONSchema7 } from 'json-schema';
import { I18nextProvider, initReactI18next } from 'react-i18next';
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

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export const Event3: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <SomeForm />
          </I18nextProvider>
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
