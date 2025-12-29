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
  title: 'react-datatable5/Form/Date Range Picker',
  component: DefaultForm,
  parameters: {
    docs: {
      description: {
        component:
          'This story demonstrates the date range picker field component. Users can select a start and end date using the calendar interface.',
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

export const BasicUsage: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <BasicDateRangeForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic date range picker example. Click the button to open the calendar and select a date range.',
      },
    },
  },
};

export const WithPreFilledValues: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <PreFilledDateRangeForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Date range picker with pre-filled values. The range is initialized with dates.',
      },
    },
  },
};

export const WithValidation: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ValidationDateRangeForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Date range picker with validation. Try submitting the form without selecting a date range to see the validation error.',
      },
    },
  },
};

export const CustomDateFormat: Story = {
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
          'Date range picker with custom date format. The display format and storage format can be customized.',
      },
    },
  },
};

// Basic date range picker form
const BasicDateRangeForm = () => {
  const form = useForm({
    keyPrefix: 'dateRange',
    preLoadedValues: {},
  });

  const schema = {
    type: 'object',
    properties: {
      dateRange: {
        type: 'array',
        variant: 'date-range',
        items: {
          type: 'string',
          format: 'date',
        },
        title: 'Select Date Range',
      },
    },
  } as JSONSchema7;

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Basic Date Range Picker
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          Click the button to open the calendar and select a date range. You can
          select a start date and an end date.
        </Text>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Form submitted with data:', data);
            alert(
              `Date range selected: ${JSON.stringify(data.dateRange, null, 2)}`
            );
          },
          ...form,
        }}
      />
    </VStack>
  );
};

// Date range picker with pre-filled values
const PreFilledDateRangeForm = () => {
  const form = useForm({
    keyPrefix: 'dateRangePrefilled',
    preLoadedValues: {
      dateRange: ['2024-01-01', '2024-01-31'],
    },
  });

  const schema = {
    type: 'object',
    properties: {
      dateRange: {
        type: 'array',
        variant: 'date-range',
        items: {
          type: 'string',
          format: 'date',
        },
        title: 'Date Range',
      },
    },
  } as JSONSchema7;

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Date Range Picker with Pre-filled Values
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          The date range is pre-filled with January 2024 dates.
        </Text>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Form submitted with data:', data);
            alert(
              `Date range selected: ${JSON.stringify(data.dateRange, null, 2)}`
            );
          },
          ...form,
        }}
      />
    </VStack>
  );
};

// Date range picker with validation
const ValidationDateRangeForm = () => {
  const form = useForm({
    keyPrefix: 'dateRangeValidation',
    preLoadedValues: {},
  });

  const errorMessage = buildErrorMessages({
    required: {
      dateRange: 'Date range is required',
    },
  });

  const schema = {
    type: 'object',
    properties: {
      dateRange: {
        type: 'array',
        variant: 'date-range',
        items: {
          type: 'string',
          format: 'date',
        },
        title: 'Date Range',
        minItems: 2,
      },
    },
    required: ['dateRange'],
    errorMessage,
  } as JSONSchema7;

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Date Range Picker with Validation
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          The date range field is required. Try submitting the form without
          selecting a date range to see the validation error.
        </Text>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Form submitted with data:', data);
            alert(
              `Date range selected: ${JSON.stringify(data.dateRange, null, 2)}`
            );
          },
          ...form,
        }}
      />
    </VStack>
  );
};

// Date range picker with custom date format
const CustomDateFormatForm = () => {
  const form = useForm({
    keyPrefix: 'dateRangeCustom',
    preLoadedValues: {},
  });

  const schema = {
    type: 'object',
    properties: {
      dateRange: {
        type: 'array',
        variant: 'date-range',
        items: {
          type: 'string',
          format: 'date',
        },
        title: 'Date Range (Custom Format)',
        displayDateFormat: 'MM/DD/YYYY',
        dateFormat: 'YYYY-MM-DD',
      },
    },
  } as JSONSchema7;

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Date Range Picker with Custom Date Format
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          The date range picker displays dates in MM/DD/YYYY format but stores
          them as YYYY-MM-DD.
        </Text>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Form submitted with data:', data);
            alert(
              `Date range selected: ${JSON.stringify(data.dateRange, null, 2)}`
            );
          },
          ...form,
        }}
      />
    </VStack>
  );
};
