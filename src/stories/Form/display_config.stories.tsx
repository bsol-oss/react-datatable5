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

export const displayConfig: Story = {
  name: 'Display Config',
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
      someTextarea: {
        type: 'string',
        variant: 'text-area',
        minLength: 10,
      },
      someNumber: {
        type: 'number',
        minimum: 10,
      },
    },
    required: ['someTextarea', 'someNumber'],
    errorMessage: {
      required: {
        someTextarea: 'it is required someTextarea <type-some-textarea>',
        someNumber: 'it is required someNumber <type-some-number>',
      },
      minLength: 'Please longer text',
      minimum: 'Please greater number',
      properties: {
        someTextarea: 'Please longer text someTextarea',
        someNumber: 'Please greater number someNumber',
      },
    },
  } as JSONSchema7;

  return (
    <>
      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('nice', data, 'onSubmit-gkrp');
          },
          displayConfig: {
            showSubmitButton: false,
            showResetButton: false,
            showTitle: false,
          },
          ...form,
        }}
      />
      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('nice', data, 'onSubmit-gkrp');
          },
          displayConfig: {
            showSubmitButton: true,
            showResetButton: true,
            showTitle: true,
          },
          ...form,
        }}
      />
    </>
  );
};
