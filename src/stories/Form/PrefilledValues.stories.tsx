import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { FilePickerMediaFile } from '@/components/Form/components/types/CustomJSONSchema7';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomJSONSchema7 } from '@/components/Form/components/types/CustomJSONSchema7';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/Form/Prefilled Values',
  component: DefaultForm,
  parameters: {
    docs: {
      description: {
        component:
          'This story demonstrates all field types with prefilled values. All form fields are pre-populated with example data to show how preLoadedValues work across different field types.',
      },
    },
  },
  argTypes: {},
};

type Story = StoryObj;

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

export const AllFieldTypesWithPrefilledValues: Story = {
  name: 'All Field Types With Prefilled Values',
  args: {},
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ComprehensiveFormWithPrefilledValues />
        </QueryClientProvider>
      </Provider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'A comprehensive form showing all field types with prefilled values. All fields are pre-populated with example data to demonstrate how preLoadedValues work.',
      },
    },
  },
};

// Comprehensive form showing all field types with prefilled values
const ComprehensiveFormWithPrefilledValues = () => {
  const schema: CustomJSONSchema7 = {
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
        title: 'File Input (Note: File objects cannot be prefilled in stories)',
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
            errorMessage: {
              required: 'Street address is required',
              minLength: 'Street must be at least 5 characters',
            },
          },
          city: {
            type: 'string',
            minLength: 2,
            title: 'City',
            errorMessage: {
              required: 'City is required',
              minLength: 'City name is too short',
            },
          },
          postalCode: {
            type: 'string',
            pattern: '^[0-9]{5}(-[0-9]{4})?$',
            title: 'Postal Code',
            errorMessage: {
              required: 'Postal code is required',
              pattern: 'Invalid postal code format (use 12345 or 12345-6789)',
            },
          },
          country: {
            type: 'string',
            enum: ['USA', 'Canada', 'UK', 'Australia'],
            title: 'Country',
            errorMessage: {
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
                errorMessage: {
                  required: 'Email is required',
                  format: 'Invalid email format',
                },
              },
              phone: {
                type: 'string',
                pattern: '^[0-9]{10}$',
                title: 'Phone',
                errorMessage: {
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
                errorMessage: {
                  required: 'Emergency contact name is required',
                  minLength: 'Name must be at least 2 characters',
                },
              },
              relationship: {
                type: 'string',
                enum: ['Parent', 'Spouse', 'Sibling', 'Friend', 'Other'],
                title: 'Relationship',
                errorMessage: {
                  required: 'Please select a relationship',
                },
              },
              phoneNumber: {
                type: 'string',
                pattern: '^[0-9]{10}$',
                title: 'Phone Number',
                errorMessage: {
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
      // Note: fileInput is not required since File objects can't be easily prefilled in stories
      'mediaLibrarySingle',
      'mediaLibraryMultiple',
      'simpleArrayInput',
      'nestedObjectInput',
      'deeplyNestedObject',
      'recordInput',
    ],
  };

  const form = useForm({
    preLoadedValues: {
      // String fields
      textInput: 'This is a prefilled text input value',
      textareaInput:
        'This is a prefilled textarea value with enough characters to meet the minimum length requirement.',
      emailInput: 'john.doe@example.com',
      uriInput: 'https://www.example.com',

      // Number fields
      numberInput: 42.5,
      integerInput: 75,

      // Date/Time fields
      dateInput: '2024-12-25',
      timeInput: '14:30:00+08:00',
      datetimeInput: '2024-12-25T14:30:00+08:00',
      dateRangeInput: ['2024-01-01', '2024-12-31'],

      // Boolean field
      booleanInput: true,

      // Enum fields
      enumInput: 'option2',
      multipleEnumInput: ['red', 'blue'],

      // Media library fields (using file IDs from mockFetchFiles)
      mediaLibrarySingle: 'file-1',
      mediaLibraryMultiple: ['file-1', 'file-3', 'file-5'],

      // Array fields
      simpleArrayInput: ['item1', 'item2', 'item3'],

      // Nested object fields
      nestedObjectInput: {
        street: '123 Main Street',
        city: 'Hong Kong',
        postalCode: '12345',
        country: 'USA',
      },

      // Deeply nested object fields
      deeplyNestedObject: {
        contactInfo: {
          email: 'contact@example.com',
          phone: '1234567890',
        },
        emergencyContact: {
          name: 'Jane Doe',
          relationship: 'Spouse',
          phoneNumber: '0987654321',
        },
      },

      // Record input (key-value pairs)
      recordInput: {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      },
    },
    schema,
  });

  return (
    <DefaultForm
      formConfig={{
        ...form,
        schema,
      }}
    />
  );
};
