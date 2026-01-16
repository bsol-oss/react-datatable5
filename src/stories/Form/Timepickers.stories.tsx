import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';

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

export const Timepickers: Story = {
  name: 'Timepickers',
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
  };

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        onSubmit: (data) => {
          console.log('nice', data, 'onSubmit-gkrp');
        },
        ...form,
      }}
    />
  );
};
