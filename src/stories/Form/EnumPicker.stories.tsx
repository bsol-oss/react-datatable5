import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import type { CustomJSONSchema7 } from '@/components/Form/components/types/CustomJSONSchema7';
import { Provider } from '@/components/ui/provider';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

export const EnumPicker: Story = {
  name: 'Enum Picker',
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
  const schema: CustomJSONSchema7 = {
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
      companion_type_whitelist: {
        type: 'array',
        title: 'Companion Type Whitelist',
        description: 'Companion Type Whitelist',
        items: {
          type: 'string',
          enum: ['family_member', 'companion'],
        },
        variant: 'enum-picker' as const,
        renderDisplay: (item) =>
          `Translated: ${item === 'family_member' ? 'Family Member' : 'Companion'}`,
      },
    },
  };
  const form = useForm({
    preLoadedValues: { parent_id: 'nice' },
    schema: schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
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
