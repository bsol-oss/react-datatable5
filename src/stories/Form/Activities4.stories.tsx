import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import { activitiesSchema } from '../schema';
import { CustomJSONSchema7 } from '@/components/Form/components/types/CustomJSONSchema7';

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

export const Activities4: Story = {
  name: 'Activities 4',
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
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              variant: 'radio',
              title: 'Name',
              description: 'Name of the activity',
              enum: ['Activity 1', 'Activity 2'],
            },
            description: {
              type: 'string',
              title: 'Description',
              description: 'Description of the activity',
            },
            start_date: {
              // @ts-expect-error TODO: find appropriate types
              variant: 'custom-input',
              inputRender: ({ sadd }) => {
                return <div>Custom Input</div>;
              },
              inputViewerRender: (props) => {
                return <div>Custom InputView</div>;
              },
            },
          },
        },
        ...form,
        onSubmit: async (data) => {
          console.log('Form submitted with data:', data);
          // Perform your submit logic here
        },
      }}
    />
  );
};
