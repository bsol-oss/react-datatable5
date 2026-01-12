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
  title: 'react-datatable5/Form/Error Display Demo',
  component: DefaultForm,
  parameters: {
    docs: {
      description: {
        component:
          "This story demonstrates the improved error message display. All validation errors now appear consistently below their respective input fields using Chakra UI's Field component errorText prop for better accessibility and styling.",
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

export const ErrorDisplayDemo: Story = {
  name: 'Error Display Demo',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ErrorDisplayDemoForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A demonstration form showing the improved error message display. Try submitting the form with invalid data to see how errors appear below each input field.',
      },
    },
  },
};

export const FieldTypesComparison: Story = {
  name: 'Field Types Comparison',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <FieldTypesComparisonForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows different field types with their error messages displayed below inputs using the updated errorText prop.',
      },
    },
  },
};

// Demo form showing error display improvements
const ErrorDisplayDemoForm = () => {
  const form = useForm({
    preLoadedValues: {},
  });

  const errorMessage = buildErrorMessages({
    required: {
      username: 'Username is required',
      email: 'Email address is required',
      password: 'Password is required',
      age: 'Age is required',
      description: 'Description is required',
    },
    properties: {
      username: {
        minLength: 'Username must be at least 3 characters',
        maxLength: 'Username cannot exceed 20 characters',
        pattern: 'Username can only contain letters, numbers, and underscores',
      },
      email: {
        format: 'Please enter a valid email address',
      },
      password: {
        minLength: 'Password must be at least 8 characters',
        pattern:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      },
      age: {
        minimum: 'You must be at least 18 years old',
        maximum: 'Age cannot exceed 120',
      },
      description: {
        minLength: 'Description must be at least 10 characters',
        maxLength: 'Description cannot exceed 200 characters',
      },
    },
  });

  const schema = {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 20,
        pattern: '^[a-zA-Z0-9_]+$',
        title: 'Username',
      },
      email: {
        type: 'string',
        format: 'email',
        title: 'Email Address',
      },
      password: {
        type: 'string',
        minLength: 8,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
        title: 'Password',
      },
      age: {
        type: 'number',
        minimum: 18,
        maximum: 120,
        title: 'Age',
      },
      description: {
        type: 'string',
        variant: 'text-area',
        minLength: 10,
        maxLength: 200,
        title: 'Description',
      },
      isActive: {
        type: 'boolean',
        title: 'Active Account',
      },
      category: {
        type: 'string',
        enum: ['personal', 'business', 'education'],
        title: 'Account Type',
      },
    },
    required: ['username', 'email', 'password', 'age', 'description'],
    errorMessage,
  } as JSONSchema7;

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Form with Improved Error Display
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          All validation errors now appear below their respective input fields
          using Chakra UI's Field component errorText prop. Try submitting the
          form with invalid data to see the improved error display.
        </Text>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Demo form data:', data);
            alert('Form submitted successfully!');
          },
          ...form,
        }}
      />
    </VStack>
  );
};

// Form showing different field types with error display
const FieldTypesComparisonForm = () => {
  const form = useForm({
    preLoadedValues: {},
  });

  const errorMessage = buildErrorMessages({
    required: {
      textField: 'Text field is required',
      numberField: 'Number field is required',
      textareaField: 'Textarea is required',
      emailField: 'Email is required',
      dateField: 'Date is required',
      timeField: 'Time is required',
      booleanField: 'Boolean selection is required',
      enumField: 'Please select an option',
    },
    properties: {
      textField: {
        minLength: 'Text must be at least 5 characters',
      },
      numberField: {
        minimum: 'Number must be at least 1',
        maximum: 'Number cannot exceed 1000',
      },
      emailField: {
        format: 'Please enter a valid email address',
      },
      textareaField: {
        minLength: 'Textarea must be at least 10 characters',
      },
    },
  });

  const schema = {
    type: 'object',
    properties: {
      textField: {
        type: 'string',
        minLength: 5,
        title: 'Text Input',
      },
      numberField: {
        type: 'number',
        minimum: 1,
        maximum: 1000,
        title: 'Number Input',
      },
      textareaField: {
        type: 'string',
        variant: 'text-area',
        minLength: 10,
        title: 'Textarea',
      },
      emailField: {
        type: 'string',
        format: 'email',
        title: 'Email Input',
      },
      dateField: {
        type: 'string',
        format: 'date',
        title: 'Date Input',
      },
      timeField: {
        type: 'string',
        format: 'time',
        title: 'Time Input',
      },
      booleanField: {
        type: 'boolean',
        title: 'Boolean Input',
      },
      enumField: {
        type: 'string',
        enum: ['option1', 'option2', 'option3'],
        title: 'Select Input',
      },
    },
    required: [
      'textField',
      'numberField',
      'textareaField',
      'emailField',
      'dateField',
      'timeField',
      'booleanField',
      'enumField',
    ],
    errorMessage,
  } as JSONSchema7;

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Field Types with Error Display
        </Text>
        <Text fontSize="sm" color="gray.600" mb={4}>
          Different form field types showing consistent error message display
          below inputs.
        </Text>
      </Box>

      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          onSubmit: (data) => {
            console.log('Comparison form data:', data);
            alert('Form submitted successfully!');
          },
          ...form,
        }}
      />
    </VStack>
  );
};
