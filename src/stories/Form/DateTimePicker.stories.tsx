import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import { Box, Text, VStack, HStack, Button, Dialog } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import { buildErrorMessages } from '@/components/Form/utils/buildErrorMessages';
import { useState } from 'react';
import { DateTimePicker } from '@/components/DatePicker/DateTimePicker';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/Form/DateTimePicker',
  component: DefaultForm,
  parameters: {
    docs: {
      description: {
        component:
          'This story demonstrates the date-time picker field component. Users can select both date and time using the calendar and time picker interface.',
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

export const BasicUsage: Story = {
  name: 'Basic Usage',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <BasicDateTimeForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic date-time picker example. Click the button to open the calendar and time picker to select both date and time.',
      },
    },
  },
};

export const WithPreFilledValues: Story = {
  name: 'With Pre Filled Values',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <PreFilledDateTimeForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Date-time picker with pre-filled values. The date and time are initialized with a specific value.',
      },
    },
  },
};

export const WithValidation: Story = {
  name: 'With Validation',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ValidationDateTimeForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Date-time picker with validation. Try submitting the form without selecting a date-time to see the validation error.',
      },
    },
  },
};

export const CustomDateFormat: Story = {
  name: 'Custom Date Format',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <CustomDateFormatForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Date-time picker with custom date format. The display format and storage format can be customized.',
      },
    },
  },
};

export const CustomLabels: Story = {
  name: 'Custom Labels',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <CustomLabelsForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Date-time picker with custom labels for month names, weekday names, and navigation buttons.',
      },
    },
  },
};

export const MultipleDateTimeFields: Story = {
  name: 'Multiple Date Time Fields',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <MultipleDateTimeFieldsForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Form with multiple date-time picker fields demonstrating different configurations.',
      },
    },
  },
};

export const WithSchemaHelperButtons: Story = {
  name: 'With Schema Helper Buttons',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <SchemaHelperButtonsForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Date-time picker with helper buttons (Yesterday, Today, Tomorrow, +7 Days) configured via schema. Click the date button to see the helper buttons.',
      },
    },
  },
};

export const WithSchemaHelperButtonsAndTimezone: Story = {
  name: 'With Schema Helper Buttons and Timezone',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <SchemaHelperButtonsAndTimezoneForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Date-time picker with both helper buttons and timezone selector configured via schema.',
      },
    },
  },
};

// Date-time picker with controlled timezone offset (standalone example)
const ControlledTimezoneOffsetForm = () => {
  const [value, setValue] = useState<string>();
  const [timezoneOffset, setTimezoneOffset] = useState<string>('+08:00');

  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          DateTimePicker with Controlled Timezone Offset
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          This example demonstrates controlled timezone offset in a standalone
          DateTimePicker. The timezone offset is managed externally and can be
          changed via the buttons below. This is useful when you need to
          synchronize the timezone offset across multiple components or manage
          it from a parent component.
        </Text>
        <HStack gap={2} flexWrap="wrap" mb={4}>
          <Button
            size="sm"
            onClick={() => setTimezoneOffset('+08:00')}
            colorPalette={timezoneOffset === '+08:00' ? 'blue' : 'gray'}
          >
            UTC+08:00
          </Button>
          <Button
            size="sm"
            onClick={() => setTimezoneOffset('+00:00')}
            colorPalette={timezoneOffset === '+00:00' ? 'blue' : 'gray'}
          >
            UTC+00:00
          </Button>
          <Button
            size="sm"
            onClick={() => setTimezoneOffset('-05:00')}
            colorPalette={timezoneOffset === '-05:00' ? 'blue' : 'gray'}
          >
            UTC-05:00
          </Button>
          <Button
            size="sm"
            onClick={() => setTimezoneOffset('+09:00')}
            colorPalette={timezoneOffset === '+09:00' ? 'blue' : 'gray'}
          >
            UTC+09:00
          </Button>
        </HStack>
        <Box p={3} bg="bg.subtle" borderRadius="md" mb={4}>
          <Text fontSize="sm" fontWeight="semibold">
            Current Timezone Offset: {timezoneOffset}
          </Text>
        </Box>
      </Box>

      <DateTimePicker
        value={value}
        onChange={setValue}
        showTimezoneSelector={true}
        timezoneOffset={timezoneOffset}
        onTimezoneOffsetChange={setTimezoneOffset}
      />

      {value && (
        <Box p={3} bg="bg.subtle" borderRadius="md">
          <Text fontSize="sm" fontWeight="semibold" mb={2}>
            Selected Value:
          </Text>
          <Text fontSize="sm" fontFamily="mono">
            {value}
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export const WithControlledTimezoneOffset: Story = {
  name: 'With Controlled Timezone Offset',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ControlledTimezoneOffsetForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Date-time picker with controlled timezone offset. The timezone offset is managed externally and can be changed programmatically.',
      },
    },
  },
};

// Basic date-time picker form
const BasicDateTimeForm = () => {
  const form = useForm({
    preLoadedValues: {},
  });

  const schema = {
    type: 'object',
    properties: {
      eventDateTime: {
        type: 'string',
        format: 'date-time',
        title: 'Event Date & Time',
      },
    },
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Basic Date-Time Picker
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          Click the button to open the calendar and time picker. You can select
          both date and time.
        </Text>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Form submitted with data:', data);
            alert(
              `Date-time selected: ${JSON.stringify(data.eventDateTime, null, 2)}`
            );
          },
          ...form,
        }}
      />
    </VStack>
  );
};

// Date-time picker with pre-filled values
const PreFilledDateTimeForm = () => {
  const form = useForm({
    preLoadedValues: {
      eventDateTime: '2024-01-15T10:30:00+08:00',
    },
  });

  const schema = {
    type: 'object',
    properties: {
      eventDateTime: {
        type: 'string',
        format: 'date-time',
        title: 'Event Date & Time',
      },
    },
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Date-Time Picker with Pre-filled Values
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          The date-time is pre-filled with January 15, 2024 at 10:30 AM.
        </Text>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Form submitted with data:', data);
            alert(
              `Date-time selected: ${JSON.stringify(data.eventDateTime, null, 2)}`
            );
          },
          ...form,
        }}
      />
    </VStack>
  );
};

// Date-time picker with validation
const ValidationDateTimeForm = () => {
  const form = useForm({
    preLoadedValues: {},
  });

  const errorMessage = buildErrorMessages({
    required: {
      eventDateTime: 'Event date and time is required',
    },
  });

  const schema = {
    type: 'object',
    properties: {
      eventDateTime: {
        type: 'string',
        format: 'date-time',
        title: 'Event Date & Time',
        errorMessages: {
          required: 'datetimeValidation.eventDateTime.field_required',
        },
      },
    },
    required: ['eventDateTime'],
    errorMessage,
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Date-Time Picker with Validation
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          The date-time field is required. Try submitting the form without
          selecting a date-time to see the validation error.
        </Text>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Form submitted with data:', data);
            alert(
              `Date-time selected: ${JSON.stringify(data.eventDateTime, null, 2)}`
            );
          },
          ...form,
        }}
      />
    </VStack>
  );
};

// Date-time picker with custom date format
const CustomDateFormatForm = () => {
  const form = useForm({
    preLoadedValues: {},
  });

  const schema = {
    type: 'object',
    properties: {
      eventDateTime: {
        type: 'string',
        format: 'date-time',
        title: 'Event Date & Time (Custom Format)',
        displayDateFormat: 'MM/DD/YYYY HH:mm',
        dateFormat: 'YYYY-MM-DD[T]HH:mm:ssZ',
      },
    },
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Date-Time Picker with Custom Date Format
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          The date-time picker displays dates in MM/DD/YYYY HH:mm format but
          stores them as ISO 8601 format with timezone.
        </Text>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Form submitted with data:', data);
            alert(
              `Date-time selected: ${JSON.stringify(data.eventDateTime, null, 2)}`
            );
          },
          ...form,
        }}
      />
    </VStack>
  );
};

// Date-time picker with custom labels
const CustomLabelsForm = () => {
  const form = useForm({
    preLoadedValues: {
      eventDateTime: '2024-03-20T14:00:00+08:00',
    },
  });

  const schema = {
    type: 'object',
    properties: {
      eventDateTime: {
        type: 'string',
        format: 'date-time',
        title: 'Event Date & Time',
      },
    },
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Date-Time Picker with Custom Labels
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          The date-time picker uses custom labels for month names, weekday
          names, and navigation buttons.
        </Text>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Form submitted with data:', data);
            alert(
              `Date-time selected: ${JSON.stringify(data.eventDateTime, null, 2)}`
            );
          },
          dateTimePickerLabels: {
            monthNamesShort: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            weekdayNamesShort: [
              'Sun',
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
            ],
            backButtonLabel: '← Previous',
            forwardButtonLabel: 'Next →',
          },
          ...form,
        }}
      />
    </VStack>
  );
};

// Form with multiple date-time picker fields
const MultipleDateTimeFieldsForm = () => {
  const form = useForm({
    preLoadedValues: {
      startDateTime: '2024-06-01T09:00:00+08:00',
      endDateTime: '2024-06-01T17:00:00+08:00',
    },
  });

  const schema = {
    type: 'object',
    properties: {
      startDateTime: {
        type: 'string',
        format: 'date-time',
        title: 'Start Date & Time',
        displayDateFormat: 'YYYY-MM-DD HH:mm',
      },
      endDateTime: {
        type: 'string',
        format: 'date-time',
        title: 'End Date & Time',
        displayDateFormat: 'YYYY-MM-DD HH:mm',
      },
      reminderDateTime: {
        type: 'string',
        format: 'date-time',
        title: 'Reminder Date & Time',
        displayDateFormat: 'MM/DD/YYYY HH:mm',
      },
    },
    required: ['startDateTime', 'endDateTime'],
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Multiple Date-Time Picker Fields
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          This form demonstrates multiple date-time picker fields with different
          configurations. Start and end date-time are required.
        </Text>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Form submitted with data:', data);
            alert(`Form data: ${JSON.stringify(data, null, 2)}`);
          },
          ...form,
        }}
      />
    </VStack>
  );
};

// Date-time picker with schema-based helper buttons
const SchemaHelperButtonsForm = () => {
  const form = useForm({
    preLoadedValues: {},
  });

  const schema = {
    type: 'object',
    properties: {
      eventDateTime: {
        type: 'string',
        format: 'date-time',
        title: 'Event Date & Time',
        dateTimePicker: {
          showQuickActions: true,
          quickActionLabels: {
            yesterday: 'Yesterday',
            today: 'Today',
            tomorrow: 'Tomorrow',
            plus7Days: '+7 Days',
          },
          showTimezoneSelector: false,
        },
      },
    },
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Date-Time Picker with Schema Helper Buttons
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          This example demonstrates how helper buttons can be configured via
          schema. The schema includes a `dateTimePicker` property with
          `showQuickActions` and `quickActionLabels` settings. Click the date
          button to see the helper buttons (Yesterday, Today, Tomorrow, +7
          Days).
        </Text>
        <Box p={3} bg="bg.subtle" borderRadius="md" mb={4}>
          <Text fontSize="sm" fontWeight="semibold" mb={2}>
            Schema Configuration:
          </Text>
          <Text fontSize="xs" fontFamily="mono" whiteSpace="pre-wrap">
            {JSON.stringify(
              {
                eventDateTime: {
                  type: 'string',
                  format: 'date-time',
                  dateTimePicker: {
                    showQuickActions: true,
                    quickActionLabels: {
                      yesterday: 'Yesterday',
                      today: 'Today',
                      tomorrow: 'Tomorrow',
                      plus7Days: '+7 Days',
                    },
                  },
                },
              },
              null,
              2
            )}
          </Text>
        </Box>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Form submitted with data:', data);
            alert(
              `Date-time selected: ${JSON.stringify(data.eventDateTime, null, 2)}`
            );
          },
          ...form,
        }}
      />
    </VStack>
  );
};

// Date-time picker with schema-based helper buttons and timezone selector
const SchemaHelperButtonsAndTimezoneForm = () => {
  const form = useForm({
    preLoadedValues: {},
  });

  const schema = {
    type: 'object',
    properties: {
      eventDateTime: {
        type: 'string',
        format: 'date-time',
        title: 'Event Date & Time',
        dateTimePicker: {
          showQuickActions: true,
          quickActionLabels: {
            yesterday: 'Yesterday',
            today: 'Today',
            tomorrow: 'Tomorrow',
            plus7Days: '+7 Days',
          },
          showTimezoneSelector: true,
        },
      },
    },
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Date-Time Picker with Schema Helper Buttons and Timezone
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          This example demonstrates both helper buttons and timezone selector
          configured via schema. The schema includes a `dateTimePicker` property
          with `showQuickActions`, `quickActionLabels`, and
          `showTimezoneSelector` settings.
        </Text>
        <Box p={3} bg="bg.subtle" borderRadius="md" mb={4}>
          <Text fontSize="sm" fontWeight="semibold" mb={2}>
            Schema Configuration:
          </Text>
          <Text fontSize="xs" fontFamily="mono" whiteSpace="pre-wrap">
            {JSON.stringify(
              {
                eventDateTime: {
                  type: 'string',
                  format: 'date-time',
                  dateTimePicker: {
                    showQuickActions: true,
                    quickActionLabels: {
                      yesterday: 'Yesterday',
                      today: 'Today',
                      tomorrow: 'Tomorrow',
                      plus7Days: '+7 Days',
                    },
                    showTimezoneSelector: true,
                  },
                },
              },
              null,
              2
            )}
          </Text>
        </Box>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Form submitted with data:', data);
            alert(
              `Date-time selected: ${JSON.stringify(data.eventDateTime, null, 2)}`
            );
          },
          ...form,
        }}
      />
    </VStack>
  );
};

// Date-time picker form inside a dialog
const DateTimePickerInDialogForm = () => {
  const form = useForm({
    preLoadedValues: {},
  });
  const [open, setOpen] = useState(false);

  const schema = {
    type: 'object',
    properties: {
      eventDateTime: {
        type: 'string',
        format: 'date-time',
        title: 'Event Date & Time',
        dateTimePicker: {
          showQuickActions: true,
        },
      },
      eventEndDateTime: {
        type: 'string',
        format: 'date-time',
        title: 'Event End Date & Time',
        dateTimePicker: {
          showQuickActions: true,
        },
      },
      eventName: {
        type: 'string',
        title: 'Event Name',
      },
      eventDescription: {
        type: 'string',
        variant: 'text-area',
        title: 'Event Description',
      },
    },
    required: ['eventDateTime', 'eventName'],
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Date-Time Picker Form Inside Dialog
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          This example demonstrates a DefaultForm with a DateTimePicker field
          inside a Dialog. The form includes multiple fields and the
          DateTimePicker has quick action buttons enabled. Click the button
          below to open the dialog.
        </Text>
      </Box>

      <Button onClick={() => setOpen(true)}>
        Open Dialog with DateTimePicker Form
      </Button>

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Content>
          <DefaultForm
            formConfig={{
              schema: schema as JSONSchema7,
              onSubmit: (data) => {
                console.log('Form submitted with data:', data);
                alert(`Form submitted:\n${JSON.stringify(data, null, 2)}`);
                setOpen(false);
              },
              insideDialog: true,
              dateTimePickerLabels: {
                quickActionLabels: {
                  yesterday: 'Yesterday',
                  today: 'Today',
                  tomorrow: 'Tomorrow',
                  plus7Days: '+7 Days',
                },
              },
              ...form,
            }}
          />
        </Dialog.Content>
      </Dialog.Root>
    </VStack>
  );
};

export const InsideDialog: Story = {
  name: 'Inside Dialog',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <DateTimePickerInDialogForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Date-time picker form inside a Dialog. This demonstrates how to use DefaultForm with DateTimePicker fields within a dialog. The form includes validation and quick action buttons for the date-time picker.',
      },
    },
  },
};
