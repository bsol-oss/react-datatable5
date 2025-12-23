import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
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
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

export const Validation: Story = {
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
  const schema = {
    type: 'object',
    properties: {
      someTextarea: {
        type: 'string',
        variant: 'text-area',
        minLength: 10,
        errorMessages: {
          required: 'nice.someTextarea.field_required',
          minLength: 'nice.someTextarea.minLength_error',
        },
      },
      someNumber: {
        type: 'number',
        minimum: 10,
        errorMessages: {
          required: 'nice.someNumber.field_required',
          minimum: 'nice.someNumber.minimum_error',
        },
      },
      someTime: {
        type: 'string',
        format: 'time',
        errorMessages: {
          format: 'nice.someTime.format_error',
        },
      },
    },
    required: ['someTextarea', 'someNumber'],
  } as JSONSchema7;

  const form = useForm({
    keyPrefix: 'nice',
    preLoadedValues: { parent_id: 'nice' },
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        serverUrl: 'http://localhost:8123',
        onSubmit: (data) => {
          console.log('nice', data, 'onSubmit-gkrp');
        },
        ...form,
      }}
    />
  );
};

// Example 2: Using per-field errorMessages for user registration
const FormWithHelpers = () => {
  const schema = {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 20,
        pattern: '^[a-zA-Z0-9]+$',
        errorMessages: {
          required: 'user.username.field_required',
          minLength: 'user.username.minLength_error',
          maxLength: 'user.username.maxLength_error',
          pattern: 'user.username.pattern_error',
        },
      },
      email: {
        type: 'string',
        format: 'email',
        errorMessages: {
          required: 'user.email.field_required',
          format: 'user.email.format_error',
        },
      },
      password: {
        type: 'string',
        minLength: 8,
        pattern: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]',
        errorMessages: {
          required: 'user.password.field_required',
          minLength: 'user.password.minLength_error',
          pattern: 'user.password.pattern_error',
        },
      },
      age: {
        type: 'number',
        minimum: 18,
        maximum: 120,
        errorMessages: {
          minimum: 'user.age.minimum_error',
          maximum: 'user.age.maximum_error',
        },
      },
    },
    required: ['username', 'email', 'password'],
  } as JSONSchema7;

  const form = useForm({
    keyPrefix: 'user',
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        serverUrl: 'http://localhost:8123',
        onSubmit: (data) => {
          console.log('User registration:', data);
        },
        ...form,
      }}
    />
  );
};

// Example 3: Using per-field errorMessages for product form
const FormWithI18n = () => {
  const schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 100,
        errorMessages: {
          required: 'product.name.field_required',
          minLength: 'product.name.minLength_error',
          maxLength: 'product.name.maxLength_error',
        },
      },
      price: {
        type: 'number',
        minimum: 0.01,
        maximum: 999999.99,
        errorMessages: {
          required: 'product.price.field_required',
          minimum: 'product.price.minimum_error',
          maximum: 'product.price.maximum_error',
        },
      },
      category: {
        type: 'string',
        enum: ['electronics', 'clothing', 'food', 'books'],
        errorMessages: {
          required: 'product.category.field_required',
          enum: 'product.category.enum_error',
        },
      },
      description: {
        type: 'string',
        maxLength: 500,
        errorMessages: {
          maxLength: 'product.description.maxLength_error',
        },
      },
      releaseDate: {
        type: 'string',
        format: 'date',
        errorMessages: {
          format: 'product.releaseDate.format_error',
        },
      },
    },
    required: ['name', 'price', 'category'],
  } as JSONSchema7;

  const form = useForm({
    keyPrefix: 'product',
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        serverUrl: 'http://localhost:8123',
        onSubmit: (data) => {
          console.log('Product data:', data);
        },
        ...form,
      }}
    />
  );
};
