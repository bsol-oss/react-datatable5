import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from 'i18next';
import { JSONSchema7 } from 'json-schema';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { CustomQueryFnParams } from '@/components/Form/components/fields/StringInputField';
import axios from 'axios';
import {
  Heading,
  Text,
  Box,
  VStack,
  HStack,
  Badge,
  Code,
  Separator,
  Alert,
  List,
} from '@chakra-ui/react';
import { useState } from 'react';

/**
 * IdPicker Combobox Story
 *
 * This story demonstrates the revamped IdPicker UI using Chakra UI v3 Combobox component
 * with a real public API (JSONPlaceholder Users API).
 *
 * Features showcased:
 * - Modern combobox interface with search
 * - Single and multiple selection modes
 * - Real-time API integration
 * - Loading states and error handling
 * - Tag-based display for multiple selections
 * - Keyboard navigation support
 * - Empty states and search feedback
 */

const meta = {
  title: 'react-datatable5/Form/IdPickerCombobox',
  component: () => null,
  parameters: {
    docs: {
      description: {
        component:
          'IdPicker with revamped combobox UI using Chakra UI v3 Combobox component and public API integration',
      },
    },
  },
  argTypes: {},
} satisfies Meta<() => null>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

// Initialize i18n with resources
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  lng: 'en',
  resources: {
    en: {
      translation: {
        // Single picker translations
        'selected_user.field_label': 'Select User',
        'selected_user.field_required': 'User selection is required',
        'selected_user.undefined': 'User not found',
        'selected_user.add_more': 'Add User',
        'selected_user.type_to_search': 'Type to search users...',
        'selected_user.total': 'Total',
        'selected_user.showing': 'Showing',
        'selected_user.per_page': 'per page',
        'selected_user.empty_search_result': 'No users found',
        'selected_user.initial_results': 'Start typing to search for users',
        'selected_user.loading': 'Loading users...',
        'selected_user.loading_failed': 'Failed to load users',

        // Multiple picker translations
        'team_members.field_label': 'Team Members',
        'team_members.field_required': 'At least one team member is required',
        'team_members.undefined': 'Member not found',
        'team_members.add_more': 'Add Team Member',
        'team_members.type_to_search': 'Type to search team members...',
        'team_members.total': 'Total',
        'team_members.showing': 'Showing',
        'team_members.per_page': 'per page',
        'team_members.empty_search_result': 'No team members found',
        'team_members.initial_results':
          'Start typing to search for team members',
        'team_members.loading': 'Loading team members...',
        'team_members.loading_failed': 'Failed to load team members',
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

// JSONPlaceholder Users API interface
interface JsonPlaceholderUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Custom query function using JSONPlaceholder public API
const jsonPlaceholderUserQueryFn = async ({
  searching,
  limit = 50,
  offset = 0,
  where,
}: CustomQueryFnParams) => {
  try {
    // Add manual delay to demonstrate skeleton loader (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // If where clause is provided, fetch specific users by ID
    if (where && where.length > 0) {
      const whereClause = where[0];
      if (whereClause.id === 'id' && whereClause.value) {
        const ids = Array.isArray(whereClause.value)
          ? whereClause.value
          : [whereClause.value];

        // Fetch users by IDs
        const userPromises = ids.map((id) =>
          axios
            .get<JsonPlaceholderUser>(
              `https://jsonplaceholder.typicode.com/users/${id}`
            )
            .then((res) => res.data)
            .catch(() => null)
        );

        const users = (await Promise.all(userPromises)).filter(
          (user) => user !== null
        ) as JsonPlaceholderUser[];

        // Transform to expected format
        const transformedUsers = users.map((user) => ({
          id: String(user.id),
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          website: user.website,
          company: user.company.name,
          city: user.address.city,
        }));

        const idMap = Object.fromEntries(
          transformedUsers.map((user) => [user.id, user])
        );

        return {
          data: {
            data: transformedUsers,
            count: transformedUsers.length,
          },
          idMap,
        };
      }
    }

    // Fetch all users from JSONPlaceholder
    const response = await axios.get<JsonPlaceholderUser[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
    let users = response.data;

    // Filter by search term if provided
    if (searching) {
      const searchLower = searching.toLowerCase();
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.username.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.company.name.toLowerCase().includes(searchLower) ||
          user.address.city.toLowerCase().includes(searchLower)
      );
    }

    // Transform to expected format
    const transformedUsers = users.map((user) => ({
      id: String(user.id),
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: user.company.name,
      city: user.address.city,
    }));

    // Paginate results
    const paginatedUsers = transformedUsers.slice(offset, offset + limit);

    // Build idMap for selected items
    const idMap = Object.fromEntries(
      paginatedUsers.map((user) => [user.id, user])
    );

    return {
      data: {
        data: paginatedUsers,
        count: transformedUsers.length,
      },
      idMap,
    };
  } catch (error) {
    console.error('Error fetching users from JSONPlaceholder:', error);
    throw error;
  }
};

export const IdPickerComboboxDemo: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <IdPickerComboboxForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

const IdPickerComboboxForm = () => {
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    unknown
  > | null>(null);
  const form = useForm({ keyPrefix: '' });

  const schema = {
    type: 'object',
    title: 'User Selection with Combobox',
    required: ['selected_user', 'team_members'],
    properties: {
      // Single selection IdPicker with combobox
      selected_user: {
        type: 'string',
        variant: 'id-picker',
        foreign_key: {
          display_column: 'name',
          table: 'users',
          column: 'id',
          customQueryFn: jsonPlaceholderUserQueryFn,
        },
      },

      // Multiple selection IdPicker with combobox
      team_members: {
        type: 'array',
        variant: 'id-picker',
        items: {
          type: 'string',
        },
        foreign_key: {
          display_column: 'name',
          table: 'users',
          column: 'id',
          customQueryFn: jsonPlaceholderUserQueryFn,
        },
      },
    },
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch" p={4}>
      {/* Header Documentation */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="lg">IdPicker with Revamped Combobox UI</Heading>
          <Text>
            This story demonstrates the revamped IdPicker component using Chakra
            UI v3's modern Combobox component. The component now features a
            cleaner, more intuitive interface with real-time search, keyboard
            navigation, and seamless integration with public APIs.
          </Text>

          <Alert.Root status="info" borderRadius="md">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>New Combobox Features:</Alert.Title>
              <Alert.Description>
                <List.Root variant="marker" mt={2}>
                  <List.Item>
                    <strong>Modern UI:</strong> Built with Chakra UI v3 Combobox
                    for a polished, accessible experience
                  </List.Item>
                  <List.Item>
                    <strong>Real-time Search:</strong> Debounced search with
                    instant filtering as you type
                  </List.Item>
                  <List.Item>
                    <strong>Keyboard Navigation:</strong> Full keyboard support
                    for accessibility
                  </List.Item>
                  <List.Item>
                    <strong>Loading States:</strong> Visual feedback during API
                    calls
                  </List.Item>
                  <List.Item>
                    <strong>Error Handling:</strong> Clear error messages when
                    API calls fail
                  </List.Item>
                  <List.Item>
                    <strong>Public API Integration:</strong> Uses
                    JSONPlaceholder Users API for real data
                  </List.Item>
                </List.Root>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        </VStack>
      </Box>

      {/* API Information */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">Public API Integration</Heading>
          <Text>
            This story uses the <Code>JSONPlaceholder Users API</Code> to
            demonstrate real API integration:
          </Text>

          <Box p={4} bg="bg.subtle" borderRadius="md">
            <VStack gap={2} align="stretch">
              <HStack>
                <Badge colorScheme="blue">API Endpoint</Badge>
                <Code fontSize="sm">
                  https://jsonplaceholder.typicode.com/users
                </Code>
              </HStack>
              <HStack>
                <Badge colorScheme="green">Method</Badge>
                <Text fontSize="sm">GET</Text>
              </HStack>
              <HStack>
                <Badge colorScheme="purple">Data Format</Badge>
                <Text fontSize="sm">JSON</Text>
              </HStack>
            </VStack>
          </Box>

          <Text fontSize="sm" color="text.subtle">
            The API returns 10 users with fields including name, username,
            email, company, and address. The search functionality filters across
            all these fields.
          </Text>
        </VStack>
      </Box>

      {/* Usage Guide */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">How to Use the Combobox</Heading>

          <VStack gap={3} align="stretch">
            <HStack gap={4}>
              <Badge colorScheme="blue" px={2} py={1}>
                1
              </Badge>
              <Text>
                <strong>Click</strong> on the input field to open the combobox
                dropdown
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="blue" px={2} py={1}>
                2
              </Badge>
              <Text>
                <strong>Type</strong> to search users by name, email, username,
                company, or city
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="blue" px={2} py={1}>
                3
              </Badge>
              <Text>
                <strong>Use arrow keys</strong> to navigate through results
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="blue" px={2} py={1}>
                4
              </Badge>
              <Text>
                <strong>Press Enter</strong> or <strong>Click</strong> to select
                an item
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="blue" px={2} py={1}>
                5
              </Badge>
              <Text>
                For multiple selection, selected items appear as{' '}
                <strong>tags</strong> that can be removed
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </Box>

      {/* Interactive Demo Form */}
      <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="sm">
        <VStack gap={4} align="stretch">
          <Heading size="md">Interactive Demo</Heading>
          <Text>
            Try selecting users from the JSONPlaceholder API. Notice the
            real-time search, loading states, and smooth interactions.
          </Text>
          <Alert.Root status="info" borderRadius="md">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Skeleton Loader Demo</Alert.Title>
              <Alert.Description>
                A manual 800ms delay has been added to API requests to
                demonstrate the skeleton loader. Type in the search field to see
                the skeleton items appear while loading.
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>

          <DefaultForm
            formConfig={{
              schema: schema as JSONSchema7,
              serverUrl: 'http://localhost:8081',
              onSubmit: async (data) => {
                console.log('Form submitted with data:', data);
                setSubmittedData(data);
                alert(
                  `Form submitted successfully!\n\nSelected User: ${data.selected_user}\nTeam Members: ${JSON.stringify(data.team_members)}`
                );
              },
              ...form,
            }}
          />
        </VStack>
      </Box>

      {/* Code Examples */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">Implementation Details</Heading>
          <Text>
            The combobox implementation uses Chakra UI v3's Combobox component
            with the following key features:
          </Text>

          <Separator />

          <Box>
            <Heading size="sm" mb={2}>
              Custom Query Function
            </Heading>
            <Text fontSize="sm" mb={2}>
              The customQueryFn handles API calls to JSONPlaceholder:
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
                fontSize="xs"
              >
                {`const jsonPlaceholderUserQueryFn = async ({
  searching,
  limit = 50,
  offset = 0,
  where,
}: CustomQueryFnParams) => {
  // Fetch from JSONPlaceholder API
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  
  // Filter by search term
  let users = response.data;
  if (searching) {
    users = users.filter(user => 
      user.name.toLowerCase().includes(searching.toLowerCase()) ||
      user.email.toLowerCase().includes(searching.toLowerCase())
      // ... more filters
    );
  }
  
  // Transform and return in expected format
  return {
    data: {
      data: transformedUsers,
      count: users.length,
    },
    idMap,
  };
};`}
              </Code>
            </Box>
          </Box>

          <Separator />

          <Box>
            <Heading size="sm" mb={2}>
              JSON Schema Configuration
            </Heading>
            <Text fontSize="sm" mb={2}>
              Configure IdPicker with combobox using this schema:
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
                fontSize="xs"
              >
                {`{
  "type": "string",        // or "array" for multiple
  "variant": "id-picker",
  "foreign_key": {
    "display_column": "name",
    "table": "users",
    "column": "id",
    "customQueryFn": jsonPlaceholderUserQueryFn
  }
}`}
              </Code>
            </Box>
          </Box>
        </VStack>
      </Box>

      {/* Submitted Data Display */}
      {submittedData && (
        <Box p={6} borderRadius="lg" borderWidth="1px">
          <VStack gap={4} align="stretch">
            <Heading size="md">Form Submission Result</Heading>
            <Text>
              Here's the data that would be submitted with your selections:
            </Text>
            <Box p={4} borderRadius="md" borderWidth="1px">
              <Code p={4} display="block" whiteSpace="pre-wrap">
                {JSON.stringify(submittedData, null, 2)}
              </Code>
            </Box>
          </VStack>
        </Box>
      )}

      {/* Technical Highlights */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">Technical Highlights</Heading>

          <VStack gap={3} align="stretch">
            <Box>
              <Text fontWeight="bold">Combobox Component</Text>
              <Text fontSize="sm">
                Uses Chakra UI v3's <Code>Combobox</Code> component which
                provides built-in accessibility, keyboard navigation, and ARIA
                support.
              </Text>
            </Box>

            <Separator />

            <Box>
              <Text fontWeight="bold">Debounced Search</Text>
              <Text fontSize="sm">
                Search input is debounced (300ms) to reduce API calls while
                maintaining responsive feel.
              </Text>
            </Box>

            <Separator />

            <Box>
              <Text fontWeight="bold">React Query Integration</Text>
              <Text fontSize="sm">
                Uses <Code>@tanstack/react-query</Code> for efficient data
                fetching, caching, and state management.
              </Text>
            </Box>

            <Separator />

            <Box>
              <Text fontWeight="bold">Collection Management</Text>
              <Text fontSize="sm">
                Uses Chakra UI's <Code>useListCollection</Code> hook for
                efficient filtering and item management.
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};
