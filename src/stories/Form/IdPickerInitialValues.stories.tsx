import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import { CustomQueryFnParams } from '@/components/Form/components/fields/StringInputField';
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
 * IdPicker Initial Values Story
 *
 * This story demonstrates that IdPicker correctly handles initial/pre-loaded values.
 * The query should automatically trigger on mount to fetch and display the selected values.
 *
 * Key features tested:
 * - Single IdPicker with initial value
 * - Multiple IdPicker with initial values array
 * - Query automatically triggers on mount
 * - Selected values are displayed correctly
 * - Values are loaded from getValues() when watch() hasn't initialized yet
 */

const meta = {
  title: 'react-datatable5/Form/IdPickerInitialValues',
  component: DefaultForm,
  parameters: {
    docs: {
      description: {
        component:
          'IdPicker with initial values - demonstrates that the query triggers correctly on mount to display pre-loaded values',
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

// Mock user/employee data
const mockEmployees = [
  {
    id: 'emp-1',
    name: 'Alice Chen',
    email: 'alice.chen@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
  },
  {
    id: 'emp-2',
    name: 'Bob Wong',
    email: 'bob.wong@company.com',
    department: 'Design',
    role: 'UX Designer',
  },
  {
    id: 'emp-3',
    name: 'Charlie Lee',
    email: 'charlie.lee@company.com',
    department: 'Marketing',
    role: 'Marketing Manager',
  },
  {
    id: 'emp-4',
    name: 'Diana Ng',
    email: 'diana.ng@company.com',
    department: 'Sales',
    role: 'Sales Director',
  },
  {
    id: 'emp-5',
    name: 'Edward Lam',
    email: 'edward.lam@company.com',
    department: 'Engineering',
    role: 'Tech Lead',
  },
  {
    id: 'emp-6',
    name: 'Fiona Chow',
    email: 'fiona.chow@company.com',
    department: 'HR',
    role: 'HR Manager',
  },
  {
    id: 'emp-7',
    name: 'George Tsang',
    email: 'george.tsang@company.com',
    department: 'Finance',
    role: 'Finance Director',
  },
  {
    id: 'emp-8',
    name: 'Helen Ma',
    email: 'helen.ma@company.com',
    department: 'Operations',
    role: 'Operations Manager',
  },
];

// Custom query function to simulate API calls
const customEmployeeQueryFn = async ({
  searching,
  limit,
  offset,
  where,
}: CustomQueryFnParams) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filteredEmployees = [...mockEmployees];

  // Handle where clause for fetching specific IDs (for initial values)
  if (where && where.length > 0) {
    const whereClause = where[0];
    if (whereClause.id === 'id' && whereClause.value) {
      if (Array.isArray(whereClause.value)) {
        // Multiple IDs
        filteredEmployees = mockEmployees.filter((emp) =>
          whereClause.value.includes(emp.id)
        );
      } else {
        // Single ID
        filteredEmployees = mockEmployees.filter(
          (emp) => emp.id === whereClause.value
        );
      }
    }
  } else {
    // Filter by search term if provided
    if (searching) {
      const searchLower = searching.toLowerCase();
      filteredEmployees = mockEmployees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchLower) ||
          emp.email.toLowerCase().includes(searchLower) ||
          emp.department.toLowerCase().includes(searchLower) ||
          emp.role.toLowerCase().includes(searchLower)
      );
    }
  }

  // Paginate results
  const paginatedEmployees = filteredEmployees.slice(offset, offset + limit);

  // Build idMap for selected items
  const idMap = Object.fromEntries(
    paginatedEmployees.map((emp) => [emp.id, emp])
  );

  return {
    data: {
      data: paginatedEmployees,
      count: filteredEmployees.length,
    },
    idMap,
  };
};

export const IdPickerWithInitialValues: Story = {
  name: 'Id Picker With Initial Values',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <IdPickerInitialValuesForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const IdPickerInitialValuesForm = () => {
  // Pre-load form with initial values
  // These should trigger the query on mount and display correctly
  const form = useForm({
    preLoadedValues: {
      // Single IdPicker with initial value
      manager: 'emp-2', // Bob Wong
      // Multiple IdPicker with initial values array
      team_members: ['emp-1', 'emp-3', 'emp-5'], // Alice Chen, Charlie Lee, Edward Lam
    },
  });

  const schema = {
    type: 'object',
    title: 'Team Assignment Form',
    required: ['manager'],
    properties: {
      // Single selection IdPicker with initial value
      manager: {
        type: 'string',
        variant: 'id-picker',
        customQueryFn: customEmployeeQueryFn,
        idColumn: 'id',
        loadInitialValues: async (params) => {
          if (!params.ids || params.ids.length === 0) {
            return { data: { data: [], count: 0 }, idMap: {} };
          }
          const { customQueryFn, idColumn } = params;
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
                id: idColumn,
                value: params.ids.length === 1 ? params.ids[0] : params.ids,
              },
            ],
          });
          if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
            params.setIdMap((state) => {
              return { ...state, ...returnedIdMap };
            });
          }
          return { data, idMap: returnedIdMap || {} };
        }, // Required for id-picker: loads records for human-readable display
      },

      // Multiple selection IdPicker with initial values
      team_members: {
        type: 'array',
        variant: 'id-picker',
        items: {
          type: 'string',
        },
        customQueryFn: customEmployeeQueryFn,
        idColumn: 'id',
        loadInitialValues: async (params) => {
          if (!params.ids || params.ids.length === 0) {
            return { data: { data: [], count: 0 }, idMap: {} };
          }
          const { customQueryFn, idColumn } = params;
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
                id: idColumn,
                value: params.ids.length === 1 ? params.ids[0] : params.ids,
              },
            ],
          });
          if (returnedIdMap && Object.keys(returnedIdMap).length > 0) {
            params.setIdMap((state) => {
              return { ...state, ...returnedIdMap };
            });
          }
          return { data, idMap: returnedIdMap || {} };
        }, // Required for id-picker: loads records for human-readable display
      },
    },
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch" p={4}>
      {/* Header Documentation */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="lg">IdPicker with Initial Values</Heading>
          <Text>
            This story demonstrates that IdPicker correctly handles initial
            (pre-loaded) values. The component should automatically trigger the
            query on mount to fetch and display the selected values.
          </Text>

          <Alert.Root status="success" borderRadius="md">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Expected Behavior:</Alert.Title>
              <Alert.Description>
                <VStack gap={2} align="stretch" mt={2}>
                  <Text>
                    ✓ <strong>Manager field</strong> should display "Bob Wong"
                    immediately on mount (no loading spinner)
                  </Text>
                  <Text>
                    ✓ <strong>Team Members field</strong> should display three
                    tags: "Alice Chen", "Charlie Lee", and "Edward Lam"
                    immediately on mount
                  </Text>
                  <Text>
                    ✓ The query should automatically trigger on mount to fetch
                    these values
                  </Text>
                  <Text>
                    ✓ Values should be visible without needing to open the
                    picker
                  </Text>
                </VStack>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>

          <Separator />

          <Box mt={2}>
            <Heading size="sm" mb={2}>
              Pre-loaded Values:
            </Heading>
            <VStack gap={2} align="stretch" fontFamily="mono" fontSize="sm">
              <HStack>
                <Badge colorScheme="blue">manager</Badge>
                <Code>emp-2</Code>
                <Text>(Bob Wong)</Text>
              </HStack>
              <HStack>
                <Badge colorScheme="blue">team_members</Badge>
                <Code>['emp-1', 'emp-3', 'emp-5']</Code>
                <Text>(Alice Chen, Charlie Lee, Edward Lam)</Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>

      {/* Technical Details */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">How It Works</Heading>
          <Text>
            The fix ensures that when initial values are provided via{' '}
            <Code>preLoadedValues</Code>, the IdPicker component:
          </Text>

          <VStack gap={3} align="stretch" mt={2}>
            <HStack gap={4}>
              <Badge colorScheme="green" px={2} py={1}>
                1
              </Badge>
              <Text>
                Uses <Code>getValues()</Code> to read initial values immediately
                on mount
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="green" px={2} py={1}>
                2
              </Badge>
              <Text>
                Falls back to initial values when <Code>watch()</Code> hasn't
                initialized yet
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="green" px={2} py={1}>
                3
              </Badge>
              <Text>
                Enables the query with initial values so it triggers on mount
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="green" px={2} py={1}>
                4
              </Badge>
              <Text>Automatically fetches and displays the selected items</Text>
            </HStack>
          </VStack>

          <Box mt={4} p={4} bg="bg.subtle" borderRadius="md">
            <Text fontSize="sm" fontFamily="mono" whiteSpace="pre-wrap">
              {`// Before fix: query wouldn't trigger on mount
// After fix: query triggers with initial values from getValues()

const currentId = watchId ?? initialId; // Uses getValues() if watch() not ready
const queryDefault = useQuery({
  queryKey: [...currentId], // Includes initial values
  enabled: !!currentId, // Enabled on mount if initial value exists
  queryFn: async () => {
    // Fetches data for initial value
  }
});`}
            </Text>
          </Box>
        </VStack>
      </Box>

      {/* Interactive Demo Form */}
      <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="sm">
        <VStack gap={4} align="stretch">
          <Heading size="md">Form with Initial Values</Heading>
          <Text>
            Both fields below have pre-loaded values. They should display
            immediately on mount without requiring any user interaction.
          </Text>

          <DefaultForm
            formConfig={{
              schema: schema as JSONSchema7,
              onSubmit: async (data) => {
                console.log('Form submitted with data:', data);
                alert(
                  `Form submitted!\n\nManager: ${data.manager}\nTeam Members: ${JSON.stringify(data.team_members)}`
                );
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
            To use IdPicker with initial values, provide them via{' '}
            <Code>preLoadedValues</Code> in the <Code>useForm</Code> hook:
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
    // Single IdPicker with initial value
    manager: 'emp-2',
    // Multiple IdPicker with initial values
    team_members: ['emp-1', 'emp-3', 'emp-5'],
  },
});

// The IdPicker will automatically:
// 1. Detect initial values via getValues()
// 2. Trigger query on mount
// 3. Display selected values correctly`}
            </Code>
          </Box>
        </VStack>
      </Box>
    </VStack>
  );
};
