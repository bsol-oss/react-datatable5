import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';

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

export const AllFieldTypesWithErrors: Story = {
  name: 'All Field Types With Errors',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ComprehensiveForm />
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
  name: 'Required Field Errors',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <RequiredFieldsForm />
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
  name: 'Validation Errors',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ValidationErrorsForm />
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
  name: 'Complex Form With Errors',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ComplexForm />
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

export const TraditionalChineseErrors: Story = {
  name: 'Traditional Chinese Error Messages (繁體中文錯誤訊息)',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <TraditionalChineseForm />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive form demonstrating Traditional Chinese (zh-TW) error messages for all validation types.',
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
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        ...form,
        schema: schema as JSONSchema7,
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
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        ...form,
        schema: schema as JSONSchema7,
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
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
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
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        onSubmit: (data) => {
          console.log('Complex form data:', data);
        },
        ...form,
      }}
    />
  );
};

// Traditional Chinese error messages form
const TraditionalChineseForm = () => {
  const schema = {
    type: 'object',
    properties: {
      使用者名稱: {
        type: 'string',
        minLength: 3,
        maxLength: 20,
        pattern: '^[a-zA-Z0-9_]+$',
        title: '使用者名稱',
      },
      電子郵件: {
        type: 'string',
        format: 'email',
        title: '電子郵件地址',
      },
      密碼: {
        type: 'string',
        minLength: 8,
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
        title: '密碼',
      },
      確認密碼: {
        type: 'string',
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
        title: '確認密碼',
      },
      年齡: {
        type: 'number',
        minimum: 18,
        maximum: 120,
        title: '年齡',
      },
      電話號碼: {
        type: 'string',
        title: '電話號碼',
      },
      網站網址: {
        type: 'string',
        format: 'uri',
        title: '網站網址',
      },
      描述: {
        type: 'string',
        variant: 'text-area',
        minLength: 10,
        maxLength: 500,
        title: '描述',
      },
    },
    required: [
      '使用者名稱',
      '電子郵件',
      '密碼',
      '確認密碼',
      '年齡',
      '電話號碼',
      '網站網址',
      '描述',
    ],
  } as JSONSchema7;

  const form = useForm({
    preLoadedValues: {},
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        onSubmit: (data) => {
          console.log('Traditional Chinese form data:', data);
        },
        ...form,
      }}
    />
  );
};
