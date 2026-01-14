import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { JSONSchema7 } from 'json-schema';
import { eventsFilesSchema2 } from '../schema';

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

export const EventsFiles2: Story = {
  name: 'Events Files 2',
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
  const form = useForm({});

  return (
    <DefaultForm
      formConfig={{
        schema: eventsFilesSchema2 as JSONSchema7,
        ignore: ['id', 'created_at', 'updated_at'],
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
