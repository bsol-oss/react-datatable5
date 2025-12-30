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
  Badge,
  Code,
  Separator,
  Alert,
  List,
} from '@chakra-ui/react';
import { useState } from 'react';
import type { ReactNode } from 'react';

/**
 * IdPicker Multiple Selection Story
 *
 * This story demonstrates the IdPicker component's multiple selection functionality
 * with comprehensive examples, documentation, and interactive demonstrations.
 *
 * Features covered:
 * - Tag-based display of selected items
 * - Closable tags for easy removal
 * - "Add more" functionality
 * - Search and pagination
 * - Duplicate prevention
 * - Visual feedback for selected items
 * - Required vs optional multiple selection
 * - Custom option rendering with renderDisplay
 */

const meta = {
  title: 'react-datatable5/Form/IdPickerMultiple',
  component: () => null,
  parameters: {
    docs: {
      description: {
        component:
          'IdPicker with comprehensive multiple selection functionality demonstration',
      },
    },
  },
  argTypes: {},
} satisfies Meta<() => null>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

// Mock team member data for demonstration
const mockTeamMembers = [
  {
    id: 'tm-1',
    name: 'Alice Chen',
    email: 'alice.chen@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
  },
  {
    id: 'tm-2',
    name: 'Bob Wong',
    email: 'bob.wong@company.com',
    department: 'Design',
    role: 'UX Designer',
  },
  {
    id: 'tm-3',
    name: 'Charlie Lee',
    email: 'charlie.lee@company.com',
    department: 'Marketing',
    role: 'Marketing Manager',
  },
  {
    id: 'tm-4',
    name: 'Diana Ng',
    email: 'diana.ng@company.com',
    department: 'Sales',
    role: 'Sales Director',
  },
  {
    id: 'tm-5',
    name: 'Edward Lam',
    email: 'edward.lam@company.com',
    department: 'Engineering',
    role: 'Tech Lead',
  },
  {
    id: 'tm-6',
    name: 'Fiona Chow',
    email: 'fiona.chow@company.com',
    department: 'HR',
    role: 'HR Manager',
  },
  {
    id: 'tm-7',
    name: 'George Tsang',
    email: 'george.tsang@company.com',
    department: 'Finance',
    role: 'Finance Director',
  },
  {
    id: 'tm-8',
    name: 'Helen Ma',
    email: 'helen.ma@company.com',
    department: 'Operations',
    role: 'Operations Manager',
  },
  {
    id: 'tm-9',
    name: 'Ivan Liu',
    email: 'ivan.liu@company.com',
    department: 'Engineering',
    role: 'DevOps Engineer',
  },
  {
    id: 'tm-10',
    name: 'Jane Zhang',
    email: 'jane.zhang@company.com',
    department: 'Design',
    role: 'UI Designer',
  },
  {
    id: 'tm-11',
    name: 'Kevin Wang',
    email: 'kevin.wang@company.com',
    department: 'Marketing',
    role: 'Content Manager',
  },
  {
    id: 'tm-12',
    name: 'Lisa Ho',
    email: 'lisa.ho@company.com',
    department: 'Sales',
    role: 'Account Manager',
  },
  {
    id: 'tm-13',
    name: 'Mike Chan',
    email: 'mike.chan@company.com',
    department: 'Engineering',
    role: 'Backend Developer',
  },
  {
    id: 'tm-14',
    name: 'Nancy Wu',
    email: 'nancy.wu@company.com',
    department: 'HR',
    role: 'Recruiter',
  },
  {
    id: 'tm-15',
    name: 'Oscar Tang',
    email: 'oscar.tang@company.com',
    department: 'Finance',
    role: 'Financial Analyst',
  },
  {
    id: 'tm-16',
    name: 'Pamela Yu',
    email: 'pamela.yu@company.com',
    department: 'Operations',
    role: 'Project Coordinator',
  },
  {
    id: 'tm-17',
    name: 'Quincy Lin',
    email: 'quincy.lin@company.com',
    department: 'Engineering',
    role: 'Frontend Developer',
  },
  {
    id: 'tm-18',
    name: 'Rachel Kim',
    email: 'rachel.kim@company.com',
    department: 'Design',
    role: 'Product Designer',
  },
  {
    id: 'tm-19',
    name: 'Sam Liu',
    email: 'sam.liu@company.com',
    department: 'Marketing',
    role: 'Digital Marketing Specialist',
  },
  {
    id: 'tm-20',
    name: 'Tina Chen',
    email: 'tina.chen@company.com',
    department: 'Sales',
    role: 'Business Development',
  },
  {
    id: 'tm-21',
    name: 'Ulysses Zhang',
    email: 'ulysses.zhang@company.com',
    department: 'Engineering',
    role: 'QA Engineer',
  },
  {
    id: 'tm-22',
    name: 'Vera Wang',
    email: 'vera.wang@company.com',
    department: 'HR',
    role: 'Training Coordinator',
  },
  {
    id: 'tm-23',
    name: 'William Ho',
    email: 'william.ho@company.com',
    department: 'Finance',
    role: 'Budget Analyst',
  },
  {
    id: 'tm-24',
    name: 'Xavier Lam',
    email: 'xavier.lam@company.com',
    department: 'Operations',
    role: 'Process Manager',
  },
  {
    id: 'tm-25',
    name: 'Yolanda Ng',
    email: 'yolanda.ng@company.com',
    department: 'Engineering',
    role: 'Mobile Developer',
  },
];

// Custom query function to simulate API calls
const customTeamMemberQueryFn = async ({
  searching,
  limit,
  offset,
}: CustomQueryFnParams) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Filter team members based on search term
  const searchLower = searching.toLowerCase();
  const filteredMembers = mockTeamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower) ||
      member.department.toLowerCase().includes(searchLower) ||
      member.role.toLowerCase().includes(searchLower)
  );

  // Paginate results
  const paginatedMembers = filteredMembers.slice(offset, offset + limit);

  // Build idMap for selected items
  const idMap = Object.fromEntries(
    paginatedMembers.map((member) => [member.id, member])
  );

  return {
    data: {
      data: paginatedMembers,
      count: filteredMembers.length,
    },
    idMap,
  };
};

// Type definition for team member
interface TeamMember {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

// Example render functions for documentation
// These are used in code examples below and can be referenced in schemas

// Example 1: Simple custom display - Name with email
// @ts-expect-error - Used in documentation examples
const renderNameWithEmail = (item: unknown): ReactNode => {
  const member = item as TeamMember;
  return (
    <HStack gap={2}>
      <Text fontWeight="medium">{member.name}</Text>
      <Text fontSize="sm" color="fg.muted">
        ({member.email})
      </Text>
    </HStack>
  );
};

// Example 2: Rich custom display - Name, role, and department badge
const renderRichDisplay = (item: unknown): ReactNode => {
  const member = item as TeamMember;
  const departmentColors: Record<string, string> = {
    Engineering: 'blue',
    Design: 'purple',
    Marketing: 'pink',
    Sales: 'green',
    HR: 'orange',
    Finance: 'yellow',
    Operations: 'cyan',
  };
  return (
    <HStack gap={3} align="center">
      <VStack gap={0} align="start" flex={1}>
        <Text fontWeight="semibold">{member.name}</Text>
        <Text fontSize="xs" color="fg.muted">
          {member.role}
        </Text>
      </VStack>
      <Badge
        colorPalette={departmentColors[member.department] || 'gray'}
        variant="subtle"
      >
        {member.department}
      </Badge>
    </HStack>
  );
};

// Example 3: Compact display for tags - Just name and department
// @ts-expect-error - Used in documentation examples
const renderCompactTag = (item: unknown): ReactNode => {
  const member = item as TeamMember;
  return (
    <HStack gap={1}>
      <Text>{member.name}</Text>
      <Text fontSize="xs" color="fg.muted">
        • {member.department}
      </Text>
    </HStack>
  );
};

export const IdPickerMultipleSelection: Story = {
  name: 'Id Picker Multiple Selection',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <IdPickerMultipleForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const IdPickerMultipleForm = () => {
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    unknown
  > | null>(null);
  const form = useForm({ keyPrefix: '' });

  const schema = {
    type: 'object',
    title: 'Project Team Assignment',
    required: ['team_members'],
    properties: {
      // Required multiple selection
      team_members: {
        type: 'array',
        variant: 'id-picker',
        items: {
          type: 'string',
        },
        foreign_key: {
          table: 'team_members',
          column: 'id',
          customQueryFn: customTeamMemberQueryFn,
        },
      },

      // Optional multiple selection
      cc_recipients: {
        type: 'array',
        variant: 'id-picker',
        items: {
          type: 'string',
        },
        foreign_key: {
          table: 'team_members',
          column: 'id',
          customQueryFn: customTeamMemberQueryFn,
        },
      },

      // Another required multiple selection
      stakeholders: {
        type: 'array',
        variant: 'id-picker',
        items: {
          type: 'string',
        },
        foreign_key: {
          table: 'team_members',
          column: 'id',
          customQueryFn: customTeamMemberQueryFn,
        },
      },

      // Custom option rendering example
      custom_team_members: {
        type: 'array',
        variant: 'id-picker',
        items: {
          type: 'string',
        },
        foreign_key: {
          table: 'team_members',
          column: 'id',
          customQueryFn: customTeamMemberQueryFn,
        },
        renderDisplay: renderRichDisplay, // Custom rendering function
      },
    },
  } as JSONSchema7;

  return (
    <VStack gap={6} align="stretch" p={4}>
      {/* Header Documentation */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="lg">IdPicker Multiple Selection</Heading>
          <Text>
            This story demonstrates the IdPicker component's multiple selection
            functionality. Learn how to configure and use IdPicker for selecting
            multiple values with tags, search, and pagination.
          </Text>

          <Alert.Root status="info" borderRadius="md">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Key Features:</Alert.Title>
              <Alert.Description>
                <List.Root variant="marker" mt={2}>
                  <List.Item>
                    <strong>Tag-based display:</strong> Selected items appear as
                    closable tags
                  </List.Item>
                  <List.Item>
                    <strong>Add more functionality:</strong> Click "Add" tag to
                    open picker
                  </List.Item>
                  <List.Item>
                    <strong>Search & pagination:</strong> Find items across
                    multiple pages
                  </List.Item>
                  <List.Item>
                    <strong>Duplicate prevention:</strong> Already selected
                    items are highlighted
                  </List.Item>
                  <List.Item>
                    <strong>Custom option rendering:</strong> Customize how
                    options appear using renderDisplay
                  </List.Item>
                </List.Root>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        </VStack>
      </Box>

      {/* Usage Guide */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">How to Use Multiple Selection</Heading>

          <VStack gap={3} align="stretch">
            <HStack gap={4}>
              <Badge colorScheme="blue" px={2} py={1}>
                1
              </Badge>
              <Text>
                Click the <Code>"Add Team Member"</Code> tag to open the picker
              </Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="blue" px={2} py={1}>
                2
              </Badge>
              <Text>Type in the search box to filter team members</Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="blue" px={2} py={1}>
                3
              </Badge>
              <Text>Click on team members to add them to your selection</Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="blue" px={2} py={1}>
                4
              </Badge>
              <Text>Use pagination to browse through more results</Text>
            </HStack>
            <HStack gap={4}>
              <Badge colorScheme="blue" px={2} py={1}>
                5
              </Badge>
              <Text>
                Click the <Code>×</Code> on tags to remove selections
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
            Try selecting multiple team members, CC recipients, and
            stakeholders. Notice how the component handles different selection
            states and validation.
          </Text>

          <DefaultForm
            formConfig={{
              schema: schema as JSONSchema7,
              onSubmit: async (data) => {
                console.log('Form submitted with data:', data);
                setSubmittedData(data);
                alert(
                  `Form submitted successfully!\n\nTeam Members: ${data.team_members?.length || 0}\nCC Recipients: ${data.cc_recipients?.length || 0}\nStakeholders: ${data.stakeholders?.length || 0}`
                );
              },
              ...form,
            }}
          />
        </VStack>
      </Box>

      {/* Code Examples */}
      <Box p={6} borderRadius="lg" color="white">
        <VStack gap={4} align="stretch">
          <Heading size="md">JSON Schema Configuration</Heading>
          <Text>
            Configure IdPicker for multiple selection using this schema
            structure:
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
            >
              {`{
  "type": "object",
  "required": ["team_members"],
  "properties": {
    "team_members": {
      "type": "array",           // ← This triggers multiple selection
      "variant": "id-picker",    // ← This uses IdPicker component
      "items": {
        "type": "string"
      },
      "foreign_key": {
        "table": "team_members",
        "column": "id",
        "customQueryFn": customQueryFn
      }
    }
  }
}`}
            </Code>
          </Box>

          <VStack gap={2} align="stretch" mt={4}>
            <Text color="gray.300" fontWeight="bold">
              Key Properties:
            </Text>
            <HStack gap={4}>
              <Code colorScheme="blue">type: "array"</Code>
              <Text color="gray.300">Triggers multiple selection mode</Text>
            </HStack>
            <HStack gap={4}>
              <Code colorScheme="blue">variant: "id-picker"</Code>
              <Text color="gray.300">Uses IdPicker component</Text>
            </HStack>
            <HStack gap={4}>
              <Code colorScheme="blue">foreign_key</Code>
              <Text color="gray.300">Configures data source and display</Text>
            </HStack>
            <HStack gap={4}>
              <Code colorScheme="blue">customQueryFn</Code>
              <Text color="gray.300">Custom data fetching function</Text>
            </HStack>
          </VStack>
        </VStack>
      </Box>

      {/* Custom Option Rendering Section */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">Custom Option Rendering</Heading>
          <Text>
            Use the <Code>renderDisplay</Code> property to customize how options
            are displayed in both the dropdown and selected tags. This allows
            you to show rich information, badges, icons, or any custom React
            components.
          </Text>

          <Alert.Root status="info" borderRadius="md">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>How renderDisplay Works:</Alert.Title>
              <Alert.Description>
                <List.Root variant="marker" mt={2}>
                  <List.Item>
                    The function receives the item object as a parameter
                  </List.Item>
                  <List.Item>
                    Return any ReactNode (JSX, text, components, etc.)
                  </List.Item>
                  <List.Item>
                    Used in both dropdown options and selected tags
                  </List.Item>
                  <List.Item>
                    Uses <Code>defaultRenderDisplay</Code> if not provided
                  </List.Item>
                </List.Root>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>

          <VStack gap={4} align="stretch" mt={4}>
            <Box>
              <Heading size="sm" mb={2}>
                Example 1: Simple Custom Display
              </Heading>
              <Text fontSize="sm" mb={2}>
                Show name with email in parentheses:
              </Text>
              <Box
                p={4}
                bg="gray.50"
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Code
                  colorScheme="gray"
                  p={4}
                  display="block"
                  whiteSpace="pre-wrap"
                  fontSize="sm"
                >
                  {`const renderNameWithEmail = (item: unknown): ReactNode => {
  const member = item as TeamMember;
  return (
    <HStack gap={2}>
      <Text fontWeight="medium">{member.name}</Text>
      <Text fontSize="sm" color="fg.muted">
        ({member.email})
      </Text>
    </HStack>
  );
};

// In schema:
{
  "type": "array",
  "variant": "id-picker",
  "renderDisplay": renderNameWithEmail, // ← Reference the function
  // ... other properties
}`}
                </Code>
              </Box>
            </Box>

            <Separator />

            <Box>
              <Heading size="sm" mb={2}>
                Example 2: Rich Display with Badges
              </Heading>
              <Text fontSize="sm" mb={2}>
                Show name, role, and department badge (used in the form below):
              </Text>
              <Box
                p={4}
                bg="gray.50"
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Code
                  colorScheme="gray"
                  p={4}
                  display="block"
                  whiteSpace="pre-wrap"
                  fontSize="sm"
                >
                  {`const renderRichDisplay = (item: unknown): ReactNode => {
  const member = item as TeamMember;
  const departmentColors = {
    Engineering: 'blue',
    Design: 'purple',
    Marketing: 'pink',
    // ... more colors
  };
  return (
    <HStack gap={3} align="center">
      <VStack gap={0} align="start" flex={1}>
        <Text fontWeight="semibold">{member.name}</Text>
        <Text fontSize="xs" color="fg.muted">
          {member.role}
        </Text>
      </VStack>
      <Badge
        colorPalette={departmentColors[member.department] || 'gray'}
        variant="subtle"
      >
        {member.department}
      </Badge>
    </HStack>
  );
};`}
                </Code>
              </Box>
            </Box>

            <Separator />

            <Box>
              <Heading size="sm" mb={2}>
                Example 3: Compact Tag Display
              </Heading>
              <Text fontSize="sm" mb={2}>
                Compact format for selected tags:
              </Text>
              <Box
                p={4}
                bg="gray.50"
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.200"
              >
                <Code
                  colorScheme="gray"
                  p={4}
                  display="block"
                  whiteSpace="pre-wrap"
                  fontSize="sm"
                >
                  {`const renderCompactTag = (item: unknown): ReactNode => {
  const member = item as TeamMember;
  return (
    <HStack gap={1}>
      <Text>{member.name}</Text>
      <Text fontSize="xs" color="fg.muted">
        • {member.department}
      </Text>
    </HStack>
  );
};

// Usage: renderDisplay: renderCompactTag`}
                </Code>
              </Box>
            </Box>
          </VStack>

          <Box mt={4} p={4} borderRadius="md" borderWidth="1px">
            <Text fontWeight="bold" mb={2}>
              💡 Pro Tips:
            </Text>
            <List.Root variant="marker" gap={1}>
              <List.Item fontSize="sm">
                Use TypeScript type assertions to access item properties safely
              </List.Item>
              <List.Item fontSize="sm">
                Keep tag displays compact since they appear inline
              </List.Item>
              <List.Item fontSize="sm">
                Use Chakra UI components for consistent styling
              </List.Item>
              <List.Item fontSize="sm">
                Consider accessibility - ensure text is readable and contrast is
                sufficient
              </List.Item>
            </List.Root>
          </Box>
        </VStack>
      </Box>

      {/* Custom Option Demo Form */}
      <Box p={6} borderRadius="lg" borderWidth="1px" boxShadow="sm">
        <VStack gap={4} align="stretch">
          <Heading size="md">Custom Option Rendering Demo</Heading>
          <Text>
            The field below uses <Code>renderDisplay</Code> to show team members
            with their name, role, and department badge. Notice how the options
            in the dropdown and the selected tags both use the custom rendering.
          </Text>

          <DefaultForm
            formConfig={{
              schema: {
                type: 'object',
                title: 'Custom Display Example',
                properties: {
                  custom_team_members: {
                    type: 'array',
                    variant: 'id-picker',
                    items: {
                      type: 'string',
                    },
                    foreign_key: {
                      table: 'team_members',
                      column: 'id',
                      customQueryFn: customTeamMemberQueryFn,
                    },
                    renderDisplay: renderRichDisplay, // Uses renderRichDisplay
                  },
                },
              } as JSONSchema7,
              onSubmit: async (data) => {
                console.log('Custom display form submitted:', data);
                alert(
                  `Selected ${data.custom_team_members?.length || 0} team members with custom display!`
                );
              },
              ...form,
            }}
          />
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

      {/* Feature Highlights */}
      <Box p={6} borderRadius="lg" borderWidth="1px">
        <VStack gap={4} align="stretch">
          <Heading size="md">Advanced Features</Heading>

          <VStack gap={3} align="stretch">
            <Box>
              <Text fontWeight="bold">Tag Management</Text>
              <Text fontSize="sm">
                Selected items are displayed as interactive tags with close
                buttons for easy removal.
              </Text>
            </Box>

            <Separator />

            <Box>
              <Text fontWeight="bold">Search & Filter</Text>
              <Text fontSize="sm">
                Real-time search across multiple fields (name, email,
                department, role) with debounced input.
              </Text>
            </Box>

            <Separator />

            <Box>
              <Text fontWeight="bold">Pagination</Text>
              <Text fontSize="sm">
                Navigate through large datasets with configurable page sizes and
                pagination controls.
              </Text>
            </Box>

            <Separator />

            <Box>
              <Text fontWeight="bold">Visual Feedback</Text>
              <Text fontSize="sm">
                Already selected items are highlighted in the picker to prevent
                duplicates and provide clear visual feedback.
              </Text>
            </Box>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};
