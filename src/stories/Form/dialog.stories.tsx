import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import { Button, Dialog } from '@chakra-ui/react';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import { useState } from 'react';
import { CustomQueryFnParams } from '@/components/Form/components/fields/StringInputField';

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

export const InsideDialog: Story = {
  name: 'Inside Dialog',
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
  const [open, setOpen] = useState(false);

  // Mock query function for id-picker
  const mockGeolocationQueryFn = async ({
    searching,
    limit,
    offset,
    where,
  }: CustomQueryFnParams) => {
    const mockData = [
      { id: 'loc-1', name: 'Location 1', address: '123 Main St' },
      { id: 'loc-2', name: 'Location 2', address: '456 Oak Ave' },
      { id: 'loc-3', name: 'Location 3', address: '789 Pine Rd' },
    ];

    let filtered = mockData;
    if (searching) {
      filtered = mockData.filter((item) =>
        item.name.toLowerCase().includes(searching.toLowerCase())
      );
    }

    if (where && where.length > 0) {
      const whereClause = where[0];
      if (whereClause.id === 'id') {
        const ids = Array.isArray(whereClause.value)
          ? whereClause.value
          : [whereClause.value];
        filtered = mockData.filter((item) => ids.includes(item.id));
      }
    }

    const paginated = filtered.slice(offset, offset + limit);
    const idMap: Record<string, any> = {};
    paginated.forEach((item) => {
      idMap[item.id] = item;
    });

    return {
      data: {
        data: paginated,
        count: filtered.length,
      },
      idMap,
    };
  };

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
      someEnum: {
        type: 'string',
        enum: ['1', '2', '3'],
      },
      someDate: {
        type: 'string',
        format: 'date',
      },
      someId: {
        type: 'string',
        variant: 'id-picker',
        customQueryFn: mockGeolocationQueryFn,
        loadInitialValues: async (params: {
          ids: string[];
          customQueryFn: any;
          setIdMap: React.Dispatch<
            React.SetStateAction<Record<string, object>>
          >;
        }) => {
          if (!params.ids || params.ids.length === 0) {
            return { data: { data: [], count: 0 }, idMap: {} };
          }
          const { customQueryFn } = params;
          if (!customQueryFn) {
            throw new Error(
              'customQueryFn is required. serverUrl has been removed.'
            );
          }
          const { data, idMap: returnedIdMap } = await customQueryFn({
            searching: '',
            limit: params.ids.length,
            offset: 0,
            where: [
              {
                id: 'id',
                value: params.ids.length === 1 ? params.ids[0] : params.ids,
              },
            ],
          });
          if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
            params.setIdMap((state: Record<string, object>) => {
              return { ...state, ...returnedIdMap };
            });
          }
          return { data, idMap: returnedIdMap || {} };
        }, // Required for id-picker: loads records for human-readable display
      },
      someTime: {
        type: 'string',
        format: 'time',
      },
      someDateRange: {
        type: 'array',
        variant: 'date-range',
        items: {
          type: 'string',
          format: 'date',
        },
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
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Content>
          <DefaultForm
            formConfig={{
              schema: schema as JSONSchema7,
              onSubmit: (data) => {
                console.log('nice', data, 'onSubmit-gkrp');
              },
              insideDialog: true,
              ...form,
            }}
          />{' '}
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
