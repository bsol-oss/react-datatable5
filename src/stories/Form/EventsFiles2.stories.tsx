import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import i18n from 'i18next';
import { JSONSchema7 } from 'json-schema';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { eventsFilesSchema2 } from '../schema';

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

export const EventsFiles2: Story = {
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
        schema: eventsFilesSchema2 as JSONSchema7,
        ignore: ['id', 'created_at', 'updated_at'],
        serverUrl: 'http://localhost:8081',
        onSubmit: async (data) => {
          const body = data['file_id'].map((file_id: string) => {
            return {
              file_id,
              event_id: data['event_id'],
            };
          });

          await axios.post('http://localhost:8081/api/g/events_files/many', {
            data: body,
          });
        },
        ...form,
      }}
    />
  );
};
