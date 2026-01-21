import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { CustomJSONSchema7 } from '@/components/Form/components/types/CustomJSONSchema7';
import { activitiesSchema } from '../schema';

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

export const Event2: Story = {
  name: 'Event 2',
  args: {
    formConfig: {
      schema: {},
      idMap: {},
      setIdMap: () => {},
      form: {} as any,
      translate: {
        t: (key: string) => key,
        ready: true,
      },
    },
  },
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
  // Add title to name property to avoid showing translation key
  const schemaWithTitle: CustomJSONSchema7 = {
    ...activitiesSchema,
    properties: {
      ...(activitiesSchema.properties || {}),
      name: {
        ...activitiesSchema.properties?.name,
        title: 'Name',
      },
    },
  };

  const form = useForm({ schema: schemaWithTitle });

  return (
    <DefaultForm
      formConfig={{
        schema: schemaWithTitle,
        ...form,
      }}
    />
  );
};
