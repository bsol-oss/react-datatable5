import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import { FilePickerMediaFile } from '@/components/Form/components/types/CustomJSONSchema7';

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

// Mock function to simulate fetching files from media library
const mockFetchFiles = async (
  search: string
): Promise<FilePickerMediaFile[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockFiles: FilePickerMediaFile[] = [
    {
      id: 'file-1',
      name: 'sample-image.jpg',
      url: 'https://via.placeholder.com/150',
      size: 102400,
      comment: 'Sample image file',
      type: 'image/jpeg',
    },
    {
      id: 'file-2',
      name: 'document.pdf',
      url: undefined,
      size: 512000,
      comment: 'Important document',
      type: 'application/pdf',
    },
    {
      id: 'file-3',
      name: 'photo.png',
      url: 'https://via.placeholder.com/150/0000FF/808080',
      size: 204800,
      comment: 'Photo file',
      type: 'image/png',
    },
    {
      id: 'file-4',
      name: 'presentation.pptx',
      url: undefined,
      size: 1048576,
      comment: 'Business presentation',
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    },
    {
      id: 'file-5',
      name: 'logo.svg',
      url: 'https://via.placeholder.com/150/FF0000/FFFFFF',
      size: 15360,
      comment: 'Company logo',
      type: 'image/svg+xml',
    },
    {
      id: 'file-6',
      name: 'spreadsheet.xlsx',
      url: undefined,
      size: 307200,
      comment: 'Financial data',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  ];

  // Filter by search term if provided
  if (search.trim()) {
    return mockFiles.filter(
      (file) =>
        file.name.toLowerCase().includes(search.toLowerCase()) ||
        (file.comment &&
          file.comment.toLowerCase().includes(search.toLowerCase()))
    );
  }

  return mockFiles;
};

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
      integerInput: {
        type: 'integer',
        minimum: 1,
        maximum: 100,
        title: 'Integer Input',
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
      uriInput: {
        type: 'string',
        format: 'uri',
        title: 'URI Input',
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
      dateRangeInput: {
        type: 'array',
        variant: 'date-range',
        minItems: 2,
        maxItems: 2,
        title: 'Date Range Input',
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
      multipleEnumInput: {
        type: 'array',
        variant: 'enum-picker',
        items: {
          type: 'string',
          enum: ['red', 'green', 'blue', 'yellow'],
        },
        minItems: 1,
        maxItems: 3,
        title: 'Multiple Enum Input',
      },
      fileInput: {
        type: 'array',
        variant: 'file-picker',
        minItems: 1,
        title: 'File Input',
      },
      mediaLibrarySingle: {
        type: 'string',
        variant: 'media-library-browser',
        title: 'Media Library (Single)',
        filePicker: {
          onFetchFiles: mockFetchFiles,
          filterImageOnly: false,
        },
      },
      mediaLibraryMultiple: {
        type: 'array',
        variant: 'media-library-browser',
        minItems: 1,
        maxItems: 5,
        title: 'Media Library (Multiple)',
        filePicker: {
          onFetchFiles: mockFetchFiles,
          filterImageOnly: false,
        },
      },
      simpleArrayInput: {
        type: 'array',
        items: {
          type: 'string',
          minLength: 2,
        },
        minItems: 2,
        maxItems: 5,
        title: 'Simple Array Input',
      },
      nestedObjectInput: {
        type: 'object',
        properties: {
          street: {
            type: 'string',
            minLength: 5,
            title: 'Street',
            errorMessages: {
              required: 'Street address is required',
              minLength: 'Street must be at least 5 characters',
            },
          },
          city: {
            type: 'string',
            minLength: 2,
            title: 'City',
            errorMessages: {
              required: 'City is required',
              minLength: 'City name is too short',
            },
          },
          postalCode: {
            type: 'string',
            pattern: '^[0-9]{5}(-[0-9]{4})?$',
            title: 'Postal Code',
            errorMessages: {
              required: 'Postal code is required',
              pattern: 'Invalid postal code format (use 12345 or 12345-6789)',
            },
          },
          country: {
            type: 'string',
            enum: ['USA', 'Canada', 'UK', 'Australia'],
            title: 'Country',
            errorMessages: {
              required: 'Please select a country',
            },
          },
        },
        required: ['street', 'city', 'postalCode', 'country'],
        title: 'Nested Object Input (Address)',
      },
      deeplyNestedObject: {
        type: 'object',
        properties: {
          contactInfo: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
                title: 'Email',
                errorMessages: {
                  required: 'Email is required',
                  format: 'Invalid email format',
                },
              },
              phone: {
                type: 'string',
                pattern: '^[0-9]{10}$',
                title: 'Phone',
                errorMessages: {
                  required: 'Phone number is required',
                  pattern: 'Phone must be 10 digits',
                },
              },
            },
            required: ['email', 'phone'],
            title: 'Contact Information',
          },
          emergencyContact: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                minLength: 2,
                title: 'Emergency Contact Name',
                errorMessages: {
                  required: 'Emergency contact name is required',
                  minLength: 'Name must be at least 2 characters',
                },
              },
              relationship: {
                type: 'string',
                enum: ['Parent', 'Spouse', 'Sibling', 'Friend', 'Other'],
                title: 'Relationship',
                errorMessages: {
                  required: 'Please select a relationship',
                },
              },
              phoneNumber: {
                type: 'string',
                pattern: '^[0-9]{10}$',
                title: 'Phone Number',
                errorMessages: {
                  required: 'Emergency phone is required',
                  pattern: 'Phone must be 10 digits',
                },
              },
            },
            required: ['name', 'relationship', 'phoneNumber'],
            title: 'Emergency Contact',
          },
        },
        required: ['contactInfo', 'emergencyContact'],
        title: 'Deeply Nested Object',
      },
      recordInput: {
        type: 'object',
        title: 'Record Input (Key-Value Pairs)',
      },
    },
    required: [
      'textInput',
      'numberInput',
      'integerInput',
      'textareaInput',
      'emailInput',
      'uriInput',
      'dateInput',
      'timeInput',
      'datetimeInput',
      'dateRangeInput',
      'booleanInput',
      'enumInput',
      'multipleEnumInput',
      'fileInput',
      'mediaLibrarySingle',
      'mediaLibraryMultiple',
      'simpleArrayInput',
      'nestedObjectInput',
      'deeplyNestedObject',
      'recordInput',
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
