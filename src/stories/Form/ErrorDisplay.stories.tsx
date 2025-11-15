import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from 'i18next';
import { JSONSchema7 } from 'json-schema';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import {
  buildErrorMessages,
  buildRequiredErrors,
  createErrorMessage,
} from '@/components/Form/utils/buildErrorMessages';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/Form/Error Display',
  component: DefaultForm,
  parameters: {
    docs: {
      description: {
        component:
          "This story demonstrates the updated error message display under form inputs using Chakra UI's Field component errorText prop. All validation errors now appear consistently below their respective input fields.",
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

i18n
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export const AllFieldTypesWithErrors: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <ComprehensiveForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive form showing all field types with validation errors displayed below inputs using the updated errorText prop.',
      },
    },
  },
};

export const RequiredFieldErrors: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <RequiredFieldsForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates required field validation errors appearing below various input types.',
      },
    },
  },
};

export const ValidationErrors: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <ValidationErrorsForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows various validation errors (minLength, maxLength, pattern, format, etc.) displayed below inputs.',
      },
    },
  },
};

export const ComplexFormWithErrors: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <ComplexForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A complex form with nested objects, arrays, and various field types showing error display improvements.',
      },
    },
  },
};

// Comprehensive form showing all field types with errors
const ComprehensiveForm = () => {
  const schema = {
    type: 'object',
    properties: {
      textInput: {
        type: 'string',
        minLength: 5,
        maxLength: 50,
        title: 'Text Input',
      },
      numberInput: {
        type: 'number',
        minimum: 10,
        maximum: 100,
        title: 'Number Input',
      },
      textareaInput: {
        type: 'string',
        variant: 'text-area',
        minLength: 20,
        title: 'Textarea',
      },
      emailInput: {
        type: 'string',
        format: 'email',
        title: 'Email Input',
      },
      dateInput: {
        type: 'string',
        format: 'date',
        title: 'Date Input',
      },
      timeInput: {
        type: 'string',
        format: 'time',
        title: 'Time Input',
      },
      datetimeInput: {
        type: 'string',
        format: 'date-time',
        title: 'Date Time Input',
      },
      booleanInput: {
        type: 'boolean',
        title: 'Boolean Input',
      },
      enumInput: {
        type: 'string',
        enum: ['option1', 'option2', 'option3'],
        title: 'Enum Input',
      },
      fileInput: {
        type: 'array',
        variant: 'file-picker',
        title: 'File Input',
      },
    },
    required: [
      'textInput',
      'numberInput',
      'textareaInput',
      'emailInput',
      'dateInput',
      'timeInput',
      'datetimeInput',
      'booleanInput',
      'enumInput',
      'fileInput',
    ],
  } as JSONSchema7;

  const form = useForm({
    keyPrefix: 'comprehensive',
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        ...form,
        schema: schema as JSONSchema7,
        serverUrl: 'http://localhost:8123',
        onSubmit: (data) => {
          console.log('Comprehensive form data:', data);
        },
      }}
    />
  );
};

// Form focusing on required field errors
const RequiredFieldsForm = () => {
  const schema = {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        title: 'First Name',
      },
      lastName: {
        type: 'string',
        title: 'Last Name',
      },
      age: {
        type: 'number',
        title: 'Age',
      },
      email: {
        type: 'string',
        format: 'email',
        title: 'Email Address',
      },
      phone: {
        type: 'string',
        title: 'Phone Number',
      },
      bio: {
        type: 'string',
        variant: 'text-area',
        title: 'Bio (Optional)',
      },
    },
    required: ['firstName', 'lastName', 'age', 'email', 'phone'],
  } as JSONSchema7;

  const form = useForm({
    keyPrefix: 'required',
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        ...form,
        schema: schema as JSONSchema7,
        serverUrl: 'http://localhost:8123',
        onSubmit: (data) => {
          console.log('Required fields form data:', data);
        },
      }}
    />
  );
};

// Form focusing on validation errors
const ValidationErrorsForm = () => {
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
      confirmPassword: {
        type: 'string',
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
        title: 'Confirm Password',
      },
      website: {
        type: 'string',
        format: 'uri',
        title: 'Website URL',
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
        maxLength: 500,
        title: 'Description',
      },
    },
    required: ['username', 'password', 'confirmPassword'],
  } as JSONSchema7;

  const form = useForm({
    keyPrefix: 'validation',
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        serverUrl: 'http://localhost:8123',
        onSubmit: (data) => {
          console.log('Validation form data:', data);
        },
        ...form,
      }}
    />
  );
};

// Complex form with nested objects and arrays
const ComplexForm = () => {
  const schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 100,
        title: 'Product Name',
      },
      price: {
        type: 'number',
        minimum: 0.01,
        maximum: 999999.99,
        title: 'Price',
      },
      category: {
        type: 'string',
        enum: ['electronics', 'clothing', 'books', 'home', 'sports'],
        title: 'Category',
      },
      description: {
        type: 'string',
        variant: 'text-area',
        title: 'Description',
      },
      email: {
        type: 'string',
        format: 'email',
        title: 'Contact Email',
      },
      isActive: {
        type: 'boolean',
        title: 'Active Product',
      },
      tags: {
        type: 'array',
        items: {
          type: 'string',
        },
        title: 'Tags',
      },
      address: {
        type: 'object',
        title: 'Address',
        properties: {
          street: {
            type: 'string',
            minLength: 5,
            title: 'Street Address',
          },
          city: {
            type: 'string',
            title: 'City',
          },
          state: {
            type: 'string',
            title: 'State/Province',
          },
          postalCode: {
            type: 'string',
            pattern: '^[0-9]{5}(-[0-9]{4})?$',
            title: 'Postal Code',
          },
          country: {
            type: 'string',
            title: 'Country',
          },
        },
        required: ['street', 'city', 'country'],
      },
    },
    required: ['name', 'price', 'category', 'address'],
  } as JSONSchema7;

  const form = useForm({
    keyPrefix: 'complex',
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        serverUrl: 'http://localhost:8123',
        onSubmit: (data) => {
          console.log('Complex form data:', data);
        },
        ...form,
      }}
    />
  );
};
