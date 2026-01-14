import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import { Box, Flex } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import { CustomQueryFnParams } from '@/components/Form/components/fields/StringInputField';

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

// Mock query functions for id-picker fields
const mockActivityQueryFn = async ({
  searching,
  limit,
  offset,
  where,
}: CustomQueryFnParams) => {
  const mockData = [
    { id: 'act-1', name: 'Activity 1', description: 'First activity' },
    { id: 'act-2', name: 'Activity 2', description: 'Second activity' },
    { id: 'act-3', name: 'Activity 3', description: 'Third activity' },
  ];
  let filtered = mockData;
  if (searching) {
    filtered = mockData.filter(
      (item) =>
        item.name.toLowerCase().includes(searching.toLowerCase()) ||
        item.description.toLowerCase().includes(searching.toLowerCase())
    );
  }
  if (where && where.length > 0) {
    const ids = Array.isArray(where[0].value)
      ? where[0].value
      : [where[0].value];
    filtered = mockData.filter((item) => ids.includes(item.id));
  }
  const paginated = filtered.slice(offset, offset + limit);
  const idMap: Record<string, any> = {};
  paginated.forEach((item) => {
    idMap[item.id] = item;
  });
  return {
    data: { data: paginated, count: filtered.length },
    idMap,
  };
};

const mockEventQueryFn = async ({
  searching,
  limit,
  offset,
  where,
}: CustomQueryFnParams) => {
  const mockData = [
    { id: 'evt-1', name: 'Event 1', date: '2024-01-01' },
    { id: 'evt-2', name: 'Event 2', date: '2024-02-01' },
    { id: 'evt-3', name: 'Event 3', date: '2024-03-01' },
  ];
  let filtered = mockData;
  if (searching) {
    filtered = mockData.filter((item) =>
      item.name.toLowerCase().includes(searching.toLowerCase())
    );
  }
  if (where && where.length > 0) {
    const ids = Array.isArray(where[0].value)
      ? where[0].value
      : [where[0].value];
    filtered = mockData.filter((item) => ids.includes(item.id));
  }
  const paginated = filtered.slice(offset, offset + limit);
  const idMap: Record<string, any> = {};
  paginated.forEach((item) => {
    idMap[item.id] = item;
  });
  return {
    data: { data: paginated, count: filtered.length },
    idMap,
  };
};

export const EventsGeolocations: Story = {
  name: 'Events Geolocations',
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

const eventsGeolocationsSchema = {
  title: 'events_geolocations',
  required: ['someNumbers', 'parent_id', 'geolocations'],
  errorMessage: {
    required: {
      someNumbers: 'Some Numbers is required goood',
    },
  },
  properties: {
    someNumbers: {
      type: 'number',
    },
    someDateTimes: {
      type: 'string',
      format: 'date-time',
    },
    parent_id: {
      type: 'string',
      format: 'uuid',
    },
    geolocations: {
      type: 'object',
      properties: {
        latitude: {
          type: 'number',
          description:
            'Missing description. Database type: double precision. Default value: null',
        },
        longitude: {
          type: 'number',
        },
        address: {
          type: 'object',
          properties: {
            district: {
              type: 'string',
            },
          },
        },
      },
    },
    child_records: {
      type: 'array',
      items: {
        $id: 'core_geolocations',
        type: 'object',
        title: 'core_geolocations',
        $schema: 'http://json-schema.org/draft-07/schema#',
        example: {
          name: 'Excepteur',
        },
        required: ['name'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description:
              'Missing description. Database type: uuid. Default value: uuid_generate_v4()',
          },
          city: {
            type: 'string',
            maxLength: 255,
            description:
              'Missing description. Database type: character varying. Default value: null',
          },
          name: {
            type: 'string',
            maxLength: 255,
            description:
              'Missing description. Database type: character varying. Default value: null',
          },
          region: {
            type: 'string',
            maxLength: 255,
            description:
              'Missing description. Database type: character varying. Default value: null',
          },
          street: {
            type: 'string',
            maxLength: 255,
            description:
              'Missing description. Database type: character varying. Default value: null',
          },
          country: {
            type: 'string',
            maxLength: 255,
            description:
              'Missing description. Database type: character varying. Default value: null',
          },
          district: {
            type: 'string',
            maxLength: 255,
            description:
              'Missing description. Database type: character varying. Default value: null',
          },
          latitude: {
            type: 'number',
            description:
              'Missing description. Database type: double precision. Default value: null',
          },
          longitude: {
            type: 'number',
            description:
              'Missing description. Database type: double precision. Default value: null',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description:
              'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
          },
          deleted_at: {
            type: 'string',
            format: 'date-time',
            description:
              'Missing description. Database type: timestamp with time zone. Default value: null',
          },
          extra_info: {
            type: 'object',
            properties: {},
            description:
              'Missing description. Database type: jsonb. Default value: null',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description:
              'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
          },
          description: {
            type: 'string',
            description:
              'Missing description. Database type: text. Default value: null',
          },
        },
        description: 'Missing description',
        searchingColumns: ['name'],
        additionalProperties: false,
      },
    },
    child_events: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          description:
            'Missing description. Database type: uuid. Default value: uuid_generate_v4()',
        },
        remarks: {
          type: 'string',
          description:
            'Missing description. Database type: text. Default value: null',
          gridColumn: '1/span 12',
          gridRow: '8/span 1',
        },
        end_date: {
          type: 'string',
          variant: 'date-picker',
          format: 'date',
          gridColumn: '7/span 3',
          gridRow: '4/span 1',
          description:
            'Missing description. Database type: date. Default value: null',
        },
        end_time: {
          type: 'string',
          format: 'time',
          gridColumn: '10/span 3',
          gridRow: '4/span 1',
          description:
            'Missing description. Database type: time without time zone. Default value: null',
        },
        created_at: {
          type: 'string',
          format: 'date-time',
          description:
            'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
        },
        event_name: {
          type: 'string',
          maxLength: 255,
          description:
            'Missing description. Database type: character varying. Default value: null',
          gridColumn: '1/span 12',
          gridRow: '1/span 1',
        },
        extra_info: {
          type: 'object',
          properties: {},
          description:
            'Missing description. Database type: jsonb. Default value: null',
          gridColumn: '1/span 4',
          gridRow: '9/span 1',
        },
        start_date: {
          type: 'string',
          variant: 'date-picker',
          gridColumn: '1/span 3',
          gridRow: '4/span 1',
          format: 'date',
          description:
            'Missing description. Database type: date. Default value: null',
        },
        start_time: {
          type: 'string',
          format: 'time',
          gridColumn: '4/span 3',
          gridRow: '4/span 1',
          description:
            'Missing description. Database type: time without time zone. Default value: null',
        },
        updated_at: {
          type: 'string',
          format: 'date-time',
          description:
            'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
        },
        description: {
          type: 'string',
          description:
            'Missing description. Database type: text. Default value: null',
          gridColumn: '1/span 12',
          gridRow: '6/span 1',
        },
        is_recurring: {
          type: 'boolean',
          description:
            'Missing description. Database type: boolean. Default value: false',
          gridColumn: '1/span 3',
          gridRow: '5/span 1',
        },
        recurring_days: {
          type: 'string',
          description:
            'Missing description. Database type: text. Default value: null',
          gridColumn: '7/span 3',
          gridRow: '5/span 1',
          enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        },
        recurring_type: {
          type: 'string',
          description:
            'Missing description. Database type: text. Default value: null',
          gridColumn: '4/span 3',
          gridRow: '5/span 1',
          enum: ['daily', 'weekly', 'biweekly', 'monthly'],
        },
        parent_event_id: {
          type: 'string',
          format: 'uuid',
          description:
            'Missing description. Database type: uuid. Default value: null',
          gridColumn: '1/span 6',
          gridRow: '2/span 1',
          variant: 'id-picker',
          customQueryFn: mockActivityQueryFn,
          idColumn: 'id',
          loadInitialValues: async (params) => {
            if (!params.ids || params.ids.length === 0) {
              return { data: { data: [], count: 0 }, idMap: {} };
            }
            const { customQueryFn, idColumn } = params;
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
                  id: idColumn,
                  value: params.ids.length === 1 ? params.ids[0] : params.ids,
                },
              ],
            });
            if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
              params.setIdMap((state) => {
                return { ...state, ...returnedIdMap };
              });
            }
            return { data, idMap: returnedIdMap || {} };
          }, // Required for id-picker: loads records for human-readable display
        },
      },
    },
    more_events: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description:
              'Missing description. Database type: uuid. Default value: uuid_generate_v4()',
          },
          remarks: {
            type: 'string',
            description:
              'Missing description. Database type: text. Default value: null',
            gridColumn: '1/span 12',
            gridRow: '8/span 1',
          },
          end_date: {
            type: 'string',
            variant: 'date-picker',
            format: 'date',
            gridColumn: '7/span 3',
            gridRow: '4/span 1',
            description:
              'Missing description. Database type: date. Default value: null',
          },
          end_time: {
            type: 'string',
            format: 'time',
            gridColumn: '10/span 3',
            gridRow: '4/span 1',
            description:
              'Missing description. Database type: time without time zone. Default value: null',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
            description:
              'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
          },
          event_name: {
            type: 'string',
            maxLength: 255,
            description:
              'Missing description. Database type: character varying. Default value: null',
            gridColumn: '1/span 12',
            gridRow: '1/span 1',
          },
          extra_info: {
            type: 'object',
            properties: {},
            description:
              'Missing description. Database type: jsonb. Default value: null',
            gridColumn: '1/span 4',
            gridRow: '9/span 1',
          },
          start_date: {
            type: 'string',
            variant: 'date-picker',
            gridColumn: '1/span 3',
            gridRow: '4/span 1',
            format: 'date',
            description:
              'Missing description. Database type: date. Default value: null',
          },
          start_time: {
            type: 'string',
            format: 'time',
            gridColumn: '4/span 3',
            gridRow: '4/span 1',
            description:
              'Missing description. Database type: time without time zone. Default value: null',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
            description:
              'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
          },
          description: {
            type: 'string',
            description:
              'Missing description. Database type: text. Default value: null',
            gridColumn: '1/span 12',
            gridRow: '6/span 1',
          },
          is_recurring: {
            type: 'boolean',
            description:
              'Missing description. Database type: boolean. Default value: false',
            gridColumn: '1/span 3',
            gridRow: '5/span 1',
          },
          recurring_days: {
            type: 'string',
            description:
              'Missing description. Database type: text. Default value: null',
            gridColumn: '7/span 3',
            gridRow: '5/span 1',
            enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
          },
          recurring_type: {
            type: 'string',
            description:
              'Missing description. Database type: text. Default value: null',
            gridColumn: '4/span 3',
            gridRow: '5/span 1',
            enum: ['daily', 'weekly', 'biweekly', 'monthly'],
          },
          parent_event_id: {
            type: 'string',
            format: 'uuid',
            description:
              'Missing description. Database type: uuid. Default value: null',
            gridColumn: '1/span 6',
            gridRow: '2/span 1',
            variant: 'id-picker',
            customQueryFn: mockActivityQueryFn,
            idColumn: 'id',
            loadInitialValues: async (params) => {
              if (!params.ids || params.ids.length === 0) {
                return { data: { data: [], count: 0 }, idMap: {} };
              }
              const { customQueryFn, idColumn } = params;
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
                    id: idColumn,
                    value: params.ids.length === 1 ? params.ids[0] : params.ids,
                  },
                ],
              });
              if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
                params.setIdMap((state) => {
                  return { ...state, ...returnedIdMap };
                });
              }
              return { data, idMap: returnedIdMap || {} };
            }, // Required for id-picker: loads records for human-readable display
          },
          child_events: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  format: 'uuid',
                  description:
                    'Missing description. Database type: uuid. Default value: uuid_generate_v4()',
                },
                remarks: {
                  type: 'string',
                  description:
                    'Missing description. Database type: text. Default value: null',
                  gridColumn: '1/span 12',
                  gridRow: '8/span 1',
                },
                end_date: {
                  type: 'string',
                  variant: 'date-picker',
                  format: 'date',
                  gridColumn: '7/span 3',
                  gridRow: '4/span 1',
                  description:
                    'Missing description. Database type: date. Default value: null',
                },
                end_time: {
                  type: 'string',
                  format: 'time',
                  gridColumn: '10/span 3',
                  gridRow: '4/span 1',
                  description:
                    'Missing description. Database type: time without time zone. Default value: null',
                },
                created_at: {
                  type: 'string',
                  format: 'date-time',
                  description:
                    'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
                },
                event_name: {
                  type: 'string',
                  maxLength: 255,
                  description:
                    'Missing description. Database type: character varying. Default value: null',
                  gridColumn: '1/span 12',
                  gridRow: '1/span 1',
                },
                extra_info: {
                  type: 'object',
                  properties: {},
                  description:
                    'Missing description. Database type: jsonb. Default value: null',
                  gridColumn: '1/span 4',
                  gridRow: '9/span 1',
                },
                start_date: {
                  type: 'string',
                  variant: 'date-picker',
                  gridColumn: '1/span 3',
                  gridRow: '4/span 1',
                  format: 'date',
                  description:
                    'Missing description. Database type: date. Default value: null',
                },
                start_time: {
                  type: 'string',
                  format: 'time',
                  gridColumn: '4/span 3',
                  gridRow: '4/span 1',
                  description:
                    'Missing description. Database type: time without time zone. Default value: null',
                },
                updated_at: {
                  type: 'string',
                  format: 'date-time',
                  description:
                    'Missing description. Database type: timestamp with time zone. Default value: CURRENT_TIMESTAMP',
                },
                description: {
                  type: 'string',
                  description:
                    'Missing description. Database type: text. Default value: null',
                  gridColumn: '1/span 12',
                  gridRow: '6/span 1',
                },
                is_recurring: {
                  type: 'boolean',
                  description:
                    'Missing description. Database type: boolean. Default value: false',
                  gridColumn: '1/span 3',
                  gridRow: '5/span 1',
                },
                recurring_days: {
                  type: 'string',
                  description:
                    'Missing description. Database type: text. Default value: null',
                  gridColumn: '7/span 3',
                  gridRow: '5/span 1',
                  enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                },
                recurring_type: {
                  type: 'string',
                  description:
                    'Missing description. Database type: text. Default value: null',
                  gridColumn: '4/span 3',
                  gridRow: '5/span 1',
                  enum: ['daily', 'weekly', 'biweekly', 'monthly'],
                },
                parent_event_id: {
                  type: 'string',
                  format: 'uuid',
                  description:
                    'Missing description. Database type: uuid. Default value: null',
                  gridColumn: '1/span 6',
                  gridRow: '2/span 1',
                  variant: 'id-picker',
                  customQueryFn: mockEventQueryFn,
                  idColumn: 'id',
                  loadInitialValues: async (params) => {
                    if (!params.ids || params.ids.length === 0) {
                      return { data: { data: [], count: 0 }, idMap: {} };
                    }
                    const { customQueryFn, idColumn } = params;
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
                          id: idColumn,
                          value:
                            params.ids.length === 1
                              ? params.ids[0]
                              : params.ids,
                        },
                      ],
                    });
                    if (
                      returnedIdMap &&
                      Object.keys(returnedIdMap).length > 0
                    ) {
                      params.setIdMap((state) => {
                        return { ...state, ...returnedIdMap };
                      });
                    }
                    return { data, idMap: returnedIdMap || {} };
                  }, // Required for id-picker: loads records for human-readable display
                },
              },
            },
          },
          numbers: {
            type: 'array',
            items: {
              type: 'number',
            },
          },
          strings: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          booleans: {
            type: 'array',
            items: {
              type: 'boolean',
            },
          },
        },
      },
    },
    some_events: {
      type: 'array',
      items: {
        type: 'string',
      },
      variant: 'id-picker',
      customQueryFn: mockActivityQueryFn,
      idColumn: 'id',
      loadInitialValues: async (params) => {
        if (!params.ids || params.ids.length === 0) {
          return { data: { data: [], count: 0 }, idMap: {} };
        }
        const { customQueryFn, idColumn } = params;
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
              id: idColumn,
              value: params.ids.length === 1 ? params.ids[0] : params.ids,
            },
          ],
        });
        if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
          params.setIdMap((state) => {
            return { ...state, ...returnedIdMap };
          });
        }
        return { data, idMap: returnedIdMap || {} };
      }, // Required for id-picker: loads records for human-readable display
    },
  },
};

const SomeForm = () => {
  const form = useForm({
    preLoadedValues: { parent_id: 'nice' },
  });

  return (
    <Flex>
      <DefaultForm
        formConfig={{
          schema: eventsGeolocationsSchema as JSONSchema7,
          onSubmit: (data) => {
            console.log('nice', data, 'onSubmit-gkrp');
          },
          ...form,
        }}
      />
    </Flex>
  );
};
