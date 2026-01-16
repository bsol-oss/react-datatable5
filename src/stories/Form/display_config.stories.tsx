import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { CustomJSONSchema7 } from '@/components/Form/components/types/CustomJSONSchema7';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';

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
  const { form, idMap, setIdMap } = useForm<any>({
    preLoadedValues: { someTextArea: 'nice', someNumber: 10 },
  });

  const schema: CustomJSONSchema7 = {
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
  };

  return (
    <>
      <DefaultForm
        formConfig={{
          schema: schema,
          onSubmit: (data) => {
            console.log('nice', data, 'onSubmit-gkrp');
          },
          displayConfig: {
            showSubmitButton: false,
            showResetButton: false,
            showTitle: false,
          },
          form,
          idMap,
          setIdMap,
        }}
      />
      <DefaultForm
        formConfig={{
          schema: schema,
          onSubmit: (data) => {
            console.log('nice', data, 'onSubmit-gkrp');
          },
          displayConfig: {
            showSubmitButton: true,
            showResetButton: true,
            showTitle: true,
          },
          form,
          idMap,
          setIdMap,
        }}
      />
    </>
  );
};
