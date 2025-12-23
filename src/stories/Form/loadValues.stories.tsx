import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import {
  Heading,
  Text,
  Box,
  VStack,
  HStack,
  Alert,
  Badge,
  Code,
  Separator,
} from '@chakra-ui/react';

/**
 * Preloaded Values Story
 *
 * This story demonstrates how to use preLoadedValues to populate a form
 * with initial/default values for all supported field types.
 *
 * Key features demonstrated:
 * - String fields (text input, textarea)
 * - Number/Integer fields
 * - Boolean fields
 * - Date/Time/DateTime fields
 * - Enum fields
 * - Array fields (simple array, tag-picker)
 * - Object fields (nested objects)
 */

const meta = {
  title: 'react-datatable5/Form/PreloadedValues',
  component: DefaultForm,
  parameters: {
    docs: {
      description: {
        component:
          'Comprehensive example showing preloaded values for all supported field types',
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

export const PreloadedValues: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <PreloadedValuesForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const PreloadedValuesForm = () => {
  // Comprehensive preloaded values for all field types
  const form = useForm({
    preLoadedValues: {
      // String fields
      name: 'John Doe',
      email: 'john.doe@example.com',
      bio: 'This is a preloaded biography text that demonstrates how textarea fields work with preloaded values.',
      website: 'https://example.com',

      // Number fields
      age: 30,
      score: 85.5,
      price: 99.99,

      // Boolean fields
      isActive: true,
      subscribe: false,

      // Date/Time fields
      birthDate: '1990-05-15',
      appointmentTime: '14:30:00+08:00',
      createdAt: '2024-01-15T10:30:00+08:00',

      // Enum fields
      status: 'active',
      role: 'admin',

      // Array fields
      tags: ['react', 'typescript', 'chakra-ui'],
      hobbies: ['reading', 'coding', 'gaming'],

      // Object fields (nested)
      address: {
        street: '123 Main Street',
        city: 'Hong Kong',
        zipCode: '00000',
        country: 'HK',
      },
    },
  });

  const schema = {
    type: 'object',
    title: 'User Profile Form',
    properties: {
      // String fields
      name: {
        type: 'string',
        minLength: 2,
        maxLength: 50,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      bio: {
        type: 'string',
        variant: 'text-area',
        minLength: 10,
        maxLength: 500,
      },
      website: {
        type: 'string',
        format: 'uri',
      },

      // Number fields
      age: {
        type: 'integer',
        minimum: 0,
        maximum: 120,
      },
      score: {
        type: 'number',
        minimum: 0,
        maximum: 100,
      },
      price: {
        type: 'number',
        minimum: 0,
      },

      // Boolean fields
      isActive: {
        type: 'boolean',
      },
      subscribe: {
        type: 'boolean',
      },

      // Date/Time fields
      birthDate: {
        type: 'string',
        format: 'date',
      },
      appointmentTime: {
        type: 'string',
        format: 'time',
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
      },

      // Enum fields
      status: {
        type: 'string',
        enum: ['active', 'inactive', 'pending'],
      },
      role: {
        type: 'string',
        enum: ['admin', 'user', 'moderator', 'guest'],
      },

      // Array fields
      tags: {
        type: 'array',
        items: {
          type: 'string',
        },
        minItems: 1,
        maxItems: 10,
      },
      hobbies: {
        type: 'array',
        items: {
          type: 'string',
        },
        minItems: 1,
        maxItems: 5,
      },

      // Object fields (nested)
      address: {
        type: 'object',
        properties: {
          street: {
            type: 'string',
            minLength: 1,
          },
          city: {
            type: 'string',
            minLength: 1,
          },
          zipCode: {
            type: 'string',
            pattern: '^[0-9]{5}$',
          },
          country: {
            type: 'string',
            enum: ['HK', 'US', 'UK', 'CA'],
          },
        },
        required: ['street', 'city', 'country'],
      },
    },
    required: ['name', 'email', 'age', 'status'],
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch" p={4}>
      {/* Header Documentation */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="lg">Preloaded Values Example</Heading>
          <Text>
            This story demonstrates how to use <Code>preLoadedValues</Code> to
            populate a form with initial/default values for all supported field
            types.
          </Text>

          <Alert.Root status="info" borderRadius="md">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>How to Use Preloaded Values</Alert.Title>
              <Alert.Description>
                <VStack gap={2} align="stretch" mt={2}>
                  <Text>
                    Pass <Code>preLoadedValues</Code> to the{' '}
                    <Code>useForm</Code> hook with an object containing the
                    initial values for each field.
                  </Text>
                  <Text>
                    The form will automatically populate all fields with these
                    values on mount.
                  </Text>
                </VStack>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>

          <Separator />

          <Box mt={2}>
            <Heading size="sm" mb={2}>
              Preloaded Values Structure:
            </Heading>
            <Box
              p={4}
              bg="bg.subtle"
              borderRadius="md"
              borderWidth="1px"
              fontFamily="mono"
              fontSize="sm"
              overflowX="auto"
            >
              <Code
                colorScheme="gray"
                display="block"
                whiteSpace="pre-wrap"
                fontSize="sm"
              >
                {`{
  // String fields
  name: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'Preloaded text...',
  website: 'https://example.com',

  // Number fields
  age: 30,
  score: 85.5,
  price: 99.99,

  // Boolean fields
  isActive: true,
  subscribe: false,

  // Date/Time fields
  birthDate: '1990-05-15',
  appointmentTime: '14:30:00+08:00',
  createdAt: '2024-01-15T10:30:00+08:00',

  // Enum fields
  status: 'active',
  role: 'admin',

  // Array fields
  tags: ['react', 'typescript', 'chakra-ui'],
  hobbies: ['reading', 'coding', 'gaming'],

  // Object fields (nested)
  address: {
    street: '123 Main Street',
    city: 'Hong Kong',
    zipCode: '00000',
    country: 'HK',
  },
}`}
              </Code>
            </Box>
          </Box>
        </VStack>
      </Box>

      {/* Field Types Overview */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">Supported Field Types</Heading>
          <VStack gap={3} align="stretch">
            <HStack gap={4}>
              <Badge colorScheme="blue" px={2} py={1}>
                String
              </Badge>
              <Text>Text input, textarea, email, URI formats</Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="green" px={2} py={1}>
                Number
              </Badge>
              <Text>Integer and decimal numbers</Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="purple" px={2} py={1}>
                Boolean
              </Badge>
              <Text>Checkbox inputs</Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="orange" px={2} py={1}>
                Date/Time
              </Badge>
              <Text>Date, time, and datetime pickers</Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="pink" px={2} py={1}>
                Enum
              </Badge>
              <Text>Dropdown select with predefined options</Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="teal" px={2} py={1}>
                Array
              </Badge>
              <Text>Tag picker and simple arrays</Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="cyan" px={2} py={1}>
                Object
              </Badge>
              <Text>Nested object structures</Text>
            </HStack>
          </VStack>
        </VStack>
      </Box>

      {/* Interactive Demo Form */}
      <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="sm">
        <VStack gap={4} align="stretch">
          <Heading size="md">Form with Preloaded Values</Heading>
          <Text>
            All fields below are pre-populated with initial values. You can edit
            them and submit the form to see the updated data.
          </Text>

          <DefaultForm
            formConfig={{
              schema: schema as JSONSchema7,
              serverUrl: 'http://localhost:8123',
              onSubmit: async (data) => {
                console.log('Form submitted with data:', data);
                alert(
                  `Form submitted successfully!\n\nCheck the console for the full data object.`
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
                backButtonLabel: 'Back',
                forwardButtonLabel: 'Forward',
              },
              ...form,
            }}
          />
        </VStack>
      </Box>

      {/* Code Example */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">Usage Example</Heading>
          <Text>
            To use preloaded values, pass them to the <Code>useForm</Code> hook:
          </Text>

          <Box
            p={4}
            bg="gray.800"
            borderRadius="md"
            borderWidth="1px"
            borderColor="gray.600"
          >
            <Code
              colorScheme="gray"
              p={4}
              display="block"
              whiteSpace="pre-wrap"
              fontSize="sm"
            >
              {`const form = useForm({
    preLoadedValues: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    isActive: true,
    status: 'active',
    tags: ['react', 'typescript'],
    address: {
      street: '123 Main Street',
      city: 'Hong Kong',
    },
  },
});

return (
  <DefaultForm
    formConfig={{
      schema: schema,
      serverUrl: 'http://localhost:8123',
      onSubmit: (data) => {
        console.log('Submitted:', data);
      },
      ...form,
    }}
  />
);`}
            </Code>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
};
