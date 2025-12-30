import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import { Box, Text, VStack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import { buildErrorMessages } from '@/components/Form/utils/buildErrorMessages';

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

// Basic date-time picker form
const BasicDateTimeForm = () => {
  const form = useForm({
    keyPrefix: 'datetime',
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
    <VStack spacing={6} align="stretch">
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
    keyPrefix: 'datetimePrefilled',
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
    <VStack spacing={6} align="stretch">
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
    keyPrefix: 'datetimeValidation',
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
    <VStack spacing={6} align="stretch">
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
    keyPrefix: 'datetimeCustom',
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
    <VStack spacing={6} align="stretch">
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
    keyPrefix: 'datetimeLabels',
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
    <VStack spacing={6} align="stretch">
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
    keyPrefix: 'multipleDatetime',
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
    <VStack spacing={6} align="stretch">
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
