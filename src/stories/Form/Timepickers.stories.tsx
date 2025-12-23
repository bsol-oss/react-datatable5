import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';

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

export const Timepickers: Story = {
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
  const form = useForm({
    keyPrefix: 'nice',
    preLoadedValues: { parent_id: 'nice' },
  });

  const schema = {
    type: 'object',
    properties: {
      someDateTimes: {
        type: 'string',
        format: 'date-time',
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
        ...form,
      }}
    />
  );
};
