import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { CustomJSONSchema7 } from '@/components/Form/components/types/CustomJSONSchema7';
// Note: The buildErrorMessages utilities are no longer used in the new approach
// as we now use per-field errorMessages in the schema directly

// Note: This library no longer provides default validation error messages.
// Developers must provide custom error messages via the errorMessages field in each schema property.
// The consuming application is responsible for translating these messages using their i18n system.
// If no errorMessages are provided, no error text will be displayed (consuming apps can handle this).

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

export const Validation: Story = {
  name: 'Validation',
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

export const ValidationWithHelpers: Story = {
  name: 'Validation With Helpers',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <FormWithHelpers />
        </QueryClientProvider>
      </Provider>
    );
  },
};

export const ValidationWithI18n: Story = {
  name: 'Validation With I18n',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <FormWithI18n />
        </QueryClientProvider>
      </Provider>
    );
  },
};

// Example 1: Using per-field errorMessages (new approach)
const SomeForm = () => {
  const schema: CustomJSONSchema7 = {
    type: 'object',
    title: 'Basic Validation Form',
    properties: {
      someTextarea: {
        type: 'string',
        variant: 'text-area',
        minLength: 10,
        errorMessage: {
          required: 'This field is required',
          minLength: 'Text must be at least 10 characters long',
        },
      },
      someNumber: {
        type: 'number',
        minimum: 10,
        errorMessage: {
          required: 'This field is required',
          minimum: 'Number must be at least 10',
        },
      },
      someTime: {
        type: 'string',
        format: 'time',
        errorMessage: {
          format: 'Please enter a valid time format',
        },
      },
    },
    required: ['someTextarea', 'someNumber'],
  };

  const form = useForm({
    preLoadedValues: { parent_id: 'nice' },
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        onSubmit: (data) => {
          console.log('nice', data, 'onSubmit-gkrp');
        },
        ...form,
      }}
    />
  );
};

// Example 2: Using per-field errorMessage for user registration
const FormWithHelpers = () => {
  const schema: CustomJSONSchema7 = {
    type: 'object',
    title: 'User Registration Form',
    properties: {
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 20,
        pattern: '^[a-zA-Z0-9]+$',
        errorMessage: {
          required: 'Username is required',
          minLength: 'Username must be at least 3 characters long',
          maxLength: 'Username must be no more than 20 characters long',
          pattern: 'Username can only contain letters and numbers',
        },
      },
      email: {
        type: 'string',
        format: 'email',
        errorMessage: {
          required: 'Email is required',
          format: 'Please enter a valid email address',
        },
      },
      password: {
        type: 'string',
        minLength: 8,
        pattern: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]',
        errorMessage: {
          required: 'Password is required',
          minLength: 'Password must be at least 8 characters long',
          pattern:
            'Password must contain at least one letter, one number, and one special character',
        },
      },
      age: {
        type: 'number',
        minimum: 18,
        maximum: 120,
        errorMessage: {
          minimum: 'Age must be at least 18',
          maximum: 'Age must be no more than 120',
        },
      },
    },
    required: ['username', 'email', 'password'],
  };

  const form = useForm({
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        onSubmit: (data) => {
          console.log('User registration:', data);
        },
        ...form,
      }}
    />
  );
};

// Example 3: Using per-field errorMessage for product form
const FormWithI18n = () => {
  const schema: CustomJSONSchema7 = {
    type: 'object',
    title: 'Product Form',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 100,
        errorMessage: {
          required: 'Product name is required',
          minLength: 'Product name must be at least 3 characters long',
          maxLength: 'Product name must be no more than 100 characters long',
        },
      },
      price: {
        type: 'number',
        minimum: 0.01,
        maximum: 999999.99,
        errorMessage: {
          required: 'Price is required',
          minimum: 'Price must be at least 0.01',
          maximum: 'Price must be no more than 999999.99',
        },
      },
      category: {
        type: 'string',
        enum: ['electronics', 'clothing', 'food', 'books'],
        errorMessage: {
          required: 'Category is required',
          enum: 'Please select a valid category',
        },
      },
      description: {
        type: 'string',
        maxLength: 500,
        errorMessage: {
          maxLength: 'Description must be no more than 500 characters long',
        },
      },
      releaseDate: {
        type: 'string',
        format: 'date',
        errorMessage: {
          format: 'Please enter a valid date format',
        },
      },
    },
    required: ['name', 'price', 'category'],
  };

  const form = useForm({
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema: schema,
        onSubmit: (data) => {
          console.log('Product data:', data);
        },
        ...form,
      }}
    />
  );
};
