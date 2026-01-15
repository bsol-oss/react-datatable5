import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomQueryFnParams } from '@/components/Form/components/fields/StringInputField';
import { LoadInitialValuesParams } from '@/components/Form/components/types/CustomJSONSchema7';
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
import type { ReactNode } from 'react';
import { CustomJSONSchema7 } from '@/components/Form/components/types/CustomJSONSchema7';

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
};

type Story = StoryObj;

export default meta;
const queryClient = new QueryClient();

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

        // Also add username-based entries for username-based lookups
        const usernameIdMap = Object.fromEntries(
          transformedUsers.map((user) => [user.username, user])
        );

        return {
          data: {
            data: transformedUsers,
            count: transformedUsers.length,
          },
          idMap: { ...idMap, ...usernameIdMap }, // Merge both id and username keys
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

    // Build idMap for selected items (using id as key)
    const idMap = Object.fromEntries(
      paginatedUsers.map((user) => [user.id, user])
    );

    // Also add username-based entries for username-based lookups
    // This allows itemToValue to use username while still maintaining id-based lookups
    const usernameIdMap = Object.fromEntries(
      paginatedUsers.map((user) => [user.username, user])
    );

    return {
      data: {
        data: paginatedUsers,
        count: transformedUsers.length,
      },
      idMap: { ...idMap, ...usernameIdMap }, // Merge both id and username keys
    };
  } catch (error) {
    console.error('Error fetching users from JSONPlaceholder:', error);
    throw error;
  }
};

// Type for transformed user data
interface TransformedUser {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: string;
  city: string;
}

// Custom renderDisplay function for single selection
const renderUserDisplay = (item: unknown): ReactNode => {
  const user = item as TransformedUser;
  return (
    <HStack gap={3} align="center">
      <VStack gap={0} align="start" flex={1}>
        <Text fontWeight="semibold">{user.name}</Text>
        <HStack gap={2}>
          <Text fontSize="xs" color="fg.muted">
            @{user.username}
          </Text>
          <Text fontSize="xs" color="fg.muted">
            •
          </Text>
          <Text fontSize="xs" color="fg.muted">
            {user.email}
          </Text>
        </HStack>
      </VStack>
      <Badge colorPalette="blue" variant="subtle">
        {user.company}
      </Badge>
    </HStack>
  );
};

export const IdPickerComboboxDemo: Story = {
  name: 'Id Picker Combobox Demo',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <IdPickerComboboxForm />
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
  const form = useForm({});

  const schema = {
    type: 'object',
    title: 'User Selection with Combobox',
    required: ['selected_user', 'team_members'],
    properties: {
      // Single selection IdPicker with combobox and custom renderDisplay
      selected_user: {
        type: 'string',
        variant: 'id-picker',
        customQueryFn: jsonPlaceholderUserQueryFn,
        renderDisplay: renderUserDisplay, // Custom rendering function - used in both dropdown and selected value
        loadInitialValues: async (params) => {
          if (!params.ids || params.ids.length === 0) {
            return { data: { data: [], count: 0 }, idMap: {} };
          }
          const { customQueryFn } = params;
          if (!customQueryFn) {
            throw new Error(
              'customQueryFn is required. serverUrl has been removed.'
            );
          }
          const { data, idMap: returnedIdMap } = await customQueryFn({
            searching: '',
            limit: params.ids.length,
            offset: 0,
            where: [
              {
                id: 'id',
                value: params.ids.length === 1 ? params.ids[0] : params.ids,
              },
            ],
          });
          if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
            params.setIdMap((state: Record<string, object>) => {
              return { ...state, ...returnedIdMap };
            });
          }
          return { data, idMap: returnedIdMap || {} };
        }, // Required for id-picker: loads records for human-readable display
      },

      // Multiple selection IdPicker with combobox (no renderDisplay - shows default)
      team_members: (() => {
        const customQueryFn = jsonPlaceholderUserQueryFn;
        return {
          type: 'array',
          variant: 'id-picker',
          items: {
            type: 'string',
          },
          customQueryFn,
          // Note: No renderDisplay - will use default display
          loadInitialValues: async (params: LoadInitialValuesParams) => {
            if (!params.ids || params.ids.length === 0) {
              return { data: { data: [], count: 0 }, idMap: {} };
            }
            const column_ref = 'id';
            if (!customQueryFn) {
              throw new Error(
                'customQueryFn is required. serverUrl has been removed.'
              );
            }
            const { data, idMap: returnedIdMap } = await customQueryFn({
              searching: '',
              limit: params.ids.length,
              offset: 0,
              where: [
                {
                  id: column_ref,
                  value: params.ids.length === 1 ? params.ids[0] : params.ids,
                },
              ],
            });
            if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
              params.setIdMap((state: Record<string, object>) => {
                return { ...state, ...returnedIdMap };
              });
            }
            return { data, idMap: returnedIdMap || {} };
          }, // Required for id-picker: loads records for human-readable display
        };
      })(),

      // Single selection IdPicker with custom itemToValue function
      // This demonstrates using a custom value extraction (username instead of id)
      selected_by_username: {
        type: 'string',
        variant: 'id-picker',
        customQueryFn: jsonPlaceholderUserQueryFn,
        renderDisplay: renderUserDisplay,
        // Custom itemToValue: extract username instead of id
        // This allows storing/using username as the value instead of the numeric id
        itemToValue: (item) => {
          const user = item as TransformedUser;
          return user.username; // Use username as the value instead of id
        },
        loadInitialValues: async (params) => {
          if (!params.ids || params.ids.length === 0) {
            return { data: { data: [], count: 0 }, idMap: {} };
          }
          const { customQueryFn } = params;
          if (!customQueryFn) {
            throw new Error(
              'customQueryFn is required. serverUrl has been removed.'
            );
          }
          // Since we're using username as value, we need to find users by username
          // Fetch all users and filter by username (since JSONPlaceholder doesn't support username filtering)
          const { data: allData } = await customQueryFn({
            searching: '',
            limit: 100,
            offset: 0,
          });

          // Filter users by username (params.ids contains usernames)
          const usernames = Array.isArray(params.ids)
            ? params.ids
            : [params.ids];
          const matchingUsers = allData.data.filter((user: TransformedUser) =>
            usernames.includes(user.username)
          );

          // Create idMap using username as key (since that's what we use as value)
          const usernameIdMap: Record<string, TransformedUser> = {};
          matchingUsers.forEach((user: TransformedUser) => {
            usernameIdMap[user.username] = user;
          });

          if (Object.keys(usernameIdMap).length > 0) {
            params.setIdMap((state: Record<string, object>) => {
              return { ...state, ...usernameIdMap };
            });
          }

          return {
            data: {
              data: matchingUsers,
              count: matchingUsers.length,
            },
            idMap: usernameIdMap,
          };
        },
      },
    },
  } as CustomJSONSchema7;

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

      {/* Custom Display Section */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">Custom Display with renderDisplay</Heading>
          <Text>
            The <Code>renderDisplay</Code> property allows you to customize how
            items are displayed in both the dropdown options and the selected
            value. The single selection IdPicker below uses a custom{' '}
            <Code>renderDisplay</Code> function to show rich user information
            including name, username, email, and company badge.
          </Text>

          <Alert.Root status="info" borderRadius="md">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>How renderDisplay Works:</Alert.Title>
              <Alert.Description>
                <List.Root variant="marker" mt={2}>
                  <List.Item>
                    <strong>Function signature:</strong> Receives the item
                    object as a parameter and returns a ReactNode
                  </List.Item>
                  <List.Item>
                    <strong>Used in two places:</strong> Both dropdown options
                    and the selected value display above the input
                  </List.Item>
                  <List.Item>
                    <strong>Flexible output:</strong> Return any ReactNode (JSX,
                    text, components, etc.)
                  </List.Item>
                  <List.Item>
                    <strong>Perfect for:</strong> Showing multiple fields,
                    badges, custom layouts, or formatted data
                  </List.Item>
                </List.Root>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>

          <Box>
            <Heading size="sm" mb={2}>
              Example: Rich User Display Function
            </Heading>
            <Text fontSize="sm" mb={2}>
              The <Code>renderDisplay</Code> function receives the full item
              object and returns a custom React component. This example shows
              name, username, email, and company badge. The same function is
              used for both dropdown items and the selected value display:
            </Text>
            <Box p={4}>
              <Code
                colorScheme="gray"
                p={4}
                display="block"
                whiteSpace="pre-wrap"
                fontSize="sm"
              >
                {`// Define the renderDisplay function
const renderUserDisplay = (item: unknown): ReactNode => {
  const user = item as TransformedUser;
  return (
    <HStack gap={3} align="center">
      <VStack gap={0} align="start" flex={1}>
        <Text fontWeight="semibold">{user.name}</Text>
        <HStack gap={2}>
          <Text fontSize="xs" color="fg.muted">
            @{user.username}
          </Text>
          <Text fontSize="xs" color="fg.muted">•</Text>
          <Text fontSize="xs" color="fg.muted">
            {user.email}
          </Text>
        </HStack>
      </VStack>
      <Badge colorPalette="blue" variant="subtle">
        {user.company}
      </Badge>
    </HStack>
  );
};

// Use it in your schema:
{
  "type": "string",
  "variant": "id-picker",
  "renderDisplay": renderUserDisplay, // ← Add this property
  "customQueryFn": jsonPlaceholderUserQueryFn,
}`}
              </Code>
            </Box>
          </Box>

          <Alert.Root status="success" borderRadius="md" mt={2}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Try It Out:</Alert.Title>
              <Alert.Description>
                <VStack gap={2} align="stretch" mt={2}>
                  <Text>
                    • Select a user from the "Selected User" field below (has{' '}
                    <Code>renderDisplay</Code>)
                  </Text>
                  <Text>
                    • Notice the rich display format appears both in the
                    dropdown options and above the input field
                  </Text>
                  <Text>
                    • Compare with "Team Members" field which doesn't have{' '}
                    <Code>renderDisplay</Code> - it automatically shows the{' '}
                    <Code>name</Code> field thanks to intelligent default
                    display
                  </Text>
                  <Text>
                    • The <Code>renderDisplay</Code> function is applied
                    consistently in both the dropdown and selected value display
                  </Text>
                </VStack>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>

          <Separator mt={4} />

          <Box mt={4}>
            <Heading size="sm" mb={2}>
              Comparison: With vs Without renderDisplay
            </Heading>
            <VStack gap={3} align="stretch" mt={2}>
              <Box p={3} borderRadius="md" borderWidth="1px">
                <Text fontWeight="bold" mb={1}>
                  With renderDisplay (Selected User field):
                </Text>
                <Text fontSize="sm">
                  Shows rich format: Name, @username, email, and company badge
                  in a custom layout
                </Text>
              </Box>
              <Box p={3} borderRadius="md" borderWidth="1px">
                <Text fontWeight="bold" mb={1}>
                  Without renderDisplay (Team Members field):
                </Text>
                <Text fontSize="sm">
                  Uses intelligent default display: automatically detects the{' '}
                  <Code>name</Code> field in user objects and displays it (e.g.,
                  "Leanne Graham", "Ervin Howell"). For objects without common
                  display fields, falls back to JSON.stringify.
                </Text>
              </Box>
            </VStack>
          </Box>

          <Separator mt={4} />

          <Box mt={4}>
            <Heading size="sm" mb={2}>
              Custom Value Extraction with itemToValue
            </Heading>
            <Text fontSize="sm" mb={3}>
              The <Code>itemToValue</Code> property allows you to customize how
              the value is extracted from an item object. By default, it uses
              the foreign key column (e.g., <Code>id</Code>), but you can
              provide a custom function to extract any field or compute a custom
              value.
            </Text>

            <Alert.Root status="info" borderRadius="md" mt={3}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>When to Use itemToValue:</Alert.Title>
                <Alert.Description>
                  <List.Root variant="marker" mt={2}>
                    <List.Item>
                      <strong>Different value field:</strong> Store/use a
                      different field than the foreign key (e.g., username
                      instead of id)
                    </List.Item>
                    <List.Item>
                      <strong>Computed values:</strong> Generate a custom value
                      from multiple fields (e.g., full name from first + last
                      name)
                    </List.Item>
                    <List.Item>
                      <strong>Formatted values:</strong> Apply formatting or
                      transformation to the value (e.g., uppercase,
                      prefix/suffix)
                    </List.Item>
                    <List.Item>
                      <strong>Composite keys:</strong> Create composite
                      identifiers from multiple fields
                    </List.Item>
                  </List.Root>
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>

            <Box p={4} borderRadius="md" borderWidth="1px" mt={3}>
              <Code
                colorScheme="gray"
                p={4}
                display="block"
                whiteSpace="pre-wrap"
                fontSize="xs"
              >
                {`// Example: Extract username instead of id
{
  "type": "string",
  "variant": "id-picker",
  "customQueryFn": jsonPlaceholderUserQueryFn,
,
  "itemToValue": (item) => {
    const user = item as TransformedUser;
    return user.username; // Use username as value instead of id
  }
}

// Example: Composite value from multiple fields
{
  "itemToValue": (item) => {
    return \`\${item.firstName}-\${item.lastName}\`;
  }
}

// Example: Formatted value
{
  "itemToValue": (item) => {
    return item.email.toUpperCase();
  }
}`}
              </Code>
            </Box>

            <Alert.Root status="success" borderRadius="md" mt={3}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Try It Out:</Alert.Title>
                <Alert.Description>
                  <VStack gap={2} align="stretch" mt={2}>
                    <Text>
                      • Select a user from the "Selected by Username" field
                      below
                    </Text>
                    <Text>
                      • Notice that the stored value is the username (e.g.,
                      "Bret", "Antonette") instead of the numeric id
                    </Text>
                    <Text>
                      • The <Code>itemToValue</Code> function extracts the
                      username field from the selected item
                    </Text>
                    <Text>
                      • This is useful when you want to store/use a different
                      identifier than the primary key
                    </Text>
                  </VStack>
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          </Box>

          <Separator mt={4} />

          <Box mt={4}>
            <Heading size="sm" mb={2}>
              Readable String Display with itemToString
            </Heading>
            <Text fontSize="sm" mb={3}>
              The <Code>itemToString</Code> function is automatically provided
              by the IdPicker hook and ensures that items can always be
              converted to readable string representations. This is essential
              for the Chakra UI v3 combobox to display selected values properly.
            </Text>

            <Alert.Root status="info" borderRadius="md" mt={3}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>How itemToString Works:</Alert.Title>
                <Alert.Description>
                  <List.Root variant="marker" mt={2}>
                    <List.Item>
                      <strong>Automatic conversion:</strong> Uses{' '}
                      <Code>renderDisplay</Code> function (or{' '}
                      <Code>defaultRenderDisplay</Code> as fallback) to convert
                      items to strings
                    </List.Item>
                    <List.Item>
                      <strong>String/Number handling:</strong> Directly returns
                      string or number values
                    </List.Item>
                    <List.Item>
                      <strong>ReactNode handling:</strong> For ReactNode values,
                      falls back to
                      <Code>defaultRenderDisplay</Code> to ensure a string
                      representation
                    </List.Item>
                    <List.Item>
                      <strong>Combobox integration:</strong> Used internally by
                      the combobox collection to display selected values in the
                      input field
                    </List.Item>
                  </List.Root>
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>

            <Box p={4} borderRadius="md" borderWidth="1px" mt={3}>
              <Code
                colorScheme="gray"
                p={4}
                display="block"
                whiteSpace="pre-wrap"
                fontSize="xs"
              >
                {`// itemToString is automatically provided by useIdPickerData hook
// It ensures currentValue can always be displayed as a readable string

// Example: Using itemToString in your component
const { itemToString } = useIdPickerData({ ... });

// Convert any item to a readable string
const readableString = itemToString(selectedItem);
// Returns: "Leanne Graham" (if renderDisplay returns string)
// Returns: "{\\"id\\":1,\\"name\\":\\"Leanne Graham\\"}" (if ReactNode, uses defaultRenderDisplay)

// The combobox automatically uses itemToString via the collection's itemToString:
const { collection } = useListCollection({
  itemToString: (item) => item.displayLabel, // Uses itemToString internally
  // ...
});`}
              </Code>
            </Box>

            <Alert.Root status="success" borderRadius="md" mt={3}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Key Benefits:</Alert.Title>
                <Alert.Description>
                  <VStack gap={2} align="stretch" mt={2}>
                    <Text>
                      • <strong>Always readable:</strong> Ensures selected
                      values are always displayed as readable strings in the
                      combobox input
                    </Text>
                    <Text>
                      • <strong>Automatic fallback:</strong> Handles ReactNode
                      values gracefully by falling back to defaultRenderDisplay
                    </Text>
                    <Text>
                      • <strong>Consistent display:</strong> Works seamlessly
                      with both custom
                      <Code>renderDisplay</Code> functions and default display
                      logic
                    </Text>
                    <Text>
                      • <strong>Chakra v3 compatible:</strong> Required for
                      proper combobox functionality in Chakra UI v3
                    </Text>
                  </VStack>
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          </Box>

          <Separator mt={4} />

          <Box mt={4}>
            <Heading size="sm" mb={2}>
              Intelligent Default Display
            </Heading>
            <Text fontSize="sm" mb={3}>
              When no custom <Code>renderDisplay</Code> is provided, the default
              function intelligently handles objects by checking for common
              display fields:
            </Text>
            <VStack gap={2} align="stretch" mt={2}>
              <HStack gap={2}>
                <Badge colorPalette="blue">1.</Badge>
                <Text fontSize="sm">
                  Checks if item is an object (not array, not primitive)
                </Text>
              </HStack>
              <HStack gap={2}>
                <Badge colorPalette="blue">2.</Badge>
                <Text fontSize="sm">
                  Looks for display fields in order: <Code>name</Code>,{' '}
                  <Code>title</Code>, <Code>label</Code>,{' '}
                  <Code>displayName</Code>, <Code>display_name</Code>,{' '}
                  <Code>text</Code>, <Code>value</Code>
                </Text>
              </HStack>
              <HStack gap={2}>
                <Badge colorPalette="blue">3.</Badge>
                <Text fontSize="sm">
                  Returns the first found field value (if string or number)
                </Text>
              </HStack>
              <HStack gap={2}>
                <Badge colorPalette="blue">4.</Badge>
                <Text fontSize="sm">
                  Falls back to <Code>JSON.stringify</Code> if no display field
                  found or item is not an object
                </Text>
              </HStack>
            </VStack>

            <Box p={4} borderRadius="md" borderWidth="1px" mt={3}>
              <Code
                colorScheme="gray"
                p={4}
                display="block"
                whiteSpace="pre-wrap"
                fontSize="xs"
              >
                {`// Example: Object with 'name' field
const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
// defaultRenderDisplay(user) → "John Doe" ✅

// Example: Object with 'title' field
const post = { id: '2', title: 'My Blog Post', content: '...' };
// defaultRenderDisplay(post) → "My Blog Post" ✅

// Example: Object without common fields
const data = { id: '3', x: 1, y: 2 };
// defaultRenderDisplay(data) → '{"id":"3","x":1,"y":2}' (JSON.stringify)

// Example: Primitive value
// defaultRenderDisplay("hello") → '"hello"' (JSON.stringify)`}
              </Code>
            </Box>

            <Alert.Root status="info" borderRadius="md" mt={3}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Benefits:</Alert.Title>
                <Alert.Description>
                  <VStack gap={1} align="stretch" mt={2}>
                    <Text fontSize="sm">
                      • Objects with common fields (name, title, label) display
                      automatically without needing custom{' '}
                      <Code>renderDisplay</Code>
                    </Text>
                    <Text fontSize="sm">
                      • More readable default display for typical data
                      structures
                    </Text>
                    <Text fontSize="sm">
                      • Still works for primitives and complex objects via
                      JSON.stringify fallback
                    </Text>
                  </VStack>
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          </Box>
        </VStack>
      </Box>

      {/* Interactive Demo Form */}
      <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="sm">
        <VStack gap={4} align="stretch">
          <Heading size="md">Interactive Demo</Heading>
          <Text>
            Try selecting users from the JSONPlaceholder API. Notice the
            real-time search, loading states, smooth interactions, and the
            custom display format showing name, username, email, and company
            badge. The <Code>renderDisplay</Code> function is used in both the
            dropdown options and the selected value display above the input.
          </Text>
          <Text fontSize="sm" color="fg.muted" mt={2}>
            <strong>Note:</strong> The "Selected by Username" field demonstrates
            the <Code>itemToValue</Code> feature, storing username instead of id
            as the value.
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
              onSubmit: async (data) => {
                console.log('Form submitted with data:', data);
                setSubmittedData(data);
                alert(
                  `Form submitted successfully!\n\nSelected User (ID): ${data.selected_user}\nSelected by Username: ${data.selected_by_username}\nTeam Members: ${JSON.stringify(data.team_members)}`
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
      "customQueryFn": jsonPlaceholderUserQueryFn,
,
    "renderDisplay": renderUserDisplay,  // Optional: custom display
    "itemToValue": (item) => item.username,  // Optional: custom value extraction
    // itemToString is automatically provided by useIdPickerData hook
    // It ensures items can always be converted to readable strings
    "loadInitialValues": async (params) => { /* ... */ }  // Required for id-picker
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

            <Separator />

            <Box>
              <Text fontWeight="bold">itemToString Function</Text>
              <Text fontSize="sm">
                The <Code>itemToString</Code> function is automatically provided
                by
                <Code>useIdPickerData</Code> hook. It ensures that items can
                always be converted to readable string representations, which is
                essential for Chakra UI v3 combobox to display selected values
                properly. It uses
                <Code>renderDisplay</Code> (or <Code>defaultRenderDisplay</Code>{' '}
                as fallback) and handles strings, numbers, and ReactNodes
                gracefully.
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};
