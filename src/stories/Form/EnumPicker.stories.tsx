import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from 'i18next';
import { JSONSchema7 } from 'json-schema';
import { I18nextProvider, initReactI18next } from 'react-i18next';

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

export const EnumPicker: Story = {
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
  const form = useForm({
    keyPrefix: 'nice',
    preLoadedValues: { parent_id: 'nice' },
  });

  const schema = {
    type: 'object',
    properties: {
      someEnum: {
        type: 'string',
        enum: ['1', '2', '3'],
        variant: 'enum-picker',
      },
      someEnumMultiple: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['1', '2', '3'],
        },
        variant: 'enum-picker',
      },
    },
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        serverUrl: 'http://localhost:8123',
        onSubmit: (data) => {
          console.log('nice', data, 'onSubmit-gkrp');
        },
        enumPickerLabels: {
          undefined: 'No item selected',
          addMore: 'Add more items',
          typeToSearch: 'Type to search options...',
          total: 'Total items',
          showing: 'Showing',
          perPage: 'per page',
          emptySearchResult: 'No matching options found',
          initialResults: 'Start typing to search',
        },
        ...form,
      }}
    />
  );
};
