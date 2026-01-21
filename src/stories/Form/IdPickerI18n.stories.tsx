import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  CustomQueryFnParams,
  CustomJSONSchema7,
} from '@/components/Form/components/types/CustomJSONSchema7';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';

/**
 * IdPicker Label Objects Story
 *
 * This story demonstrates using label objects for IdPicker labels.
 *
 * The story includes:
 * - Single and multiple IdPicker instances
 * - Language switcher (English & Traditional Chinese HK) using label objects
 * - All IdPicker label keys demonstrated
 * - Uses label objects from SchemaFormContext instead of i18n
 */

const meta = {
  title: 'react-datatable5/Form/IdPicker',
  component: DefaultForm,
  parameters: {
    docs: {
      description: {
        component:
          'IdPicker with label objects - demonstrates using label objects instead of i18n',
      },
    },
  },
  argTypes: {},
};

type Story = StoryObj;

export default meta;
const queryClient = new QueryClient();

// Label objects for English
const englishLabels = {
  single_user: {
    undefined: 'User not found',
    addMore: 'Add more users',
    typeToSearch: 'Type to search users...',
    total: 'Total',
    showing: 'Showing',
    perPage: 'per page',
    emptySearchResult: 'No users found matching your search',
    initialResults: 'Start typing to search for users',
  },
  multiple_users: {
    undefined: 'User not found',
    addMore: 'Add more',
    typeToSearch: 'Search users...',
    total: 'Total',
    showing: 'Showing',
    perPage: 'per page',
    emptySearchResult: 'No matching users',
    initialResults: 'Click to search and select users',
  },
};

// Label objects for Traditional Chinese (HK)
const chineseLabels = {
  single_user: {
    undefined: '找不到用戶',
    addMore: '新增更多用戶',
    typeToSearch: '輸入以搜尋用戶...',
    total: '總數',
    showing: '顯示',
    perPage: '每頁',
    emptySearchResult: '找不到符合的用戶',
    initialResults: '開始輸入以搜尋用戶',
  },
  multiple_users: {
    undefined: '找不到用戶',
    addMore: '新增更多',
    typeToSearch: '搜尋用戶...',
    total: '總數',
    showing: '顯示',
    perPage: '每頁',
    emptySearchResult: '沒有符合的用戶',
    initialResults: '點擊以搜尋及選擇用戶',
  },
};

// Mock user data for demonstration
const mockUsers = [
  {
    id: 'user-1',
    name: 'Alice Chen',
    email: 'alice@example.com',
    department: 'Engineering',
  },
  {
    id: 'user-2',
    name: 'Bob Wong',
    email: 'bob@example.com',
    department: 'Design',
  },
  {
    id: 'user-3',
    name: 'Charlie Lee',
    email: 'charlie@example.com',
    department: 'Marketing',
  },
  {
    id: 'user-4',
    name: 'Diana Ng',
    email: 'diana@example.com',
    department: 'Sales',
  },
  {
    id: 'user-5',
    name: 'Edward Lam',
    email: 'edward@example.com',
    department: 'Engineering',
  },
  {
    id: 'user-6',
    name: 'Fiona Chow',
    email: 'fiona@example.com',
    department: 'HR',
  },
  {
    id: 'user-7',
    name: 'George Tsang',
    email: 'george@example.com',
    department: 'Finance',
  },
  {
    id: 'user-8',
    name: 'Helen Ma',
    email: 'helen@example.com',
    department: 'Operations',
  },
];

// Custom query function to simulate API calls
const customUserQueryFn = async ({
  searching,
  limit,
  offset,
}: CustomQueryFnParams) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Filter users based on search term
  const searchLower = searching.toLowerCase();
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.department.toLowerCase().includes(searchLower)
  );

  // Paginate results
  const paginatedUsers = filteredUsers.slice(offset, offset + limit);

  // Build idMap for selected items
  const idMap = Object.fromEntries(
    paginatedUsers.map((user) => [user.id, user])
  );

  return {
    data: {
      data: paginatedUsers,
      count: filteredUsers.length,
    },
    idMap,
  };
};

export const IdPickerI18n: Story = {
  name: 'Id Picker I18n',
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <IdPickerForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const IdPickerForm = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'zh-HK'>('en');

  // Language switcher - switch label objects instead of i18n
  const switchLanguage = (lang: 'en' | 'zh-HK') => {
    setCurrentLang(lang);
  };

  // Get labels based on current language
  const labels = currentLang === 'en' ? englishLabels : chineseLabels;

  const schema: CustomJSONSchema7 = {
    type: 'object',
    title: 'User Selection Form',
    required: ['single_user'],
    properties: {
      // Single selection IdPicker
      single_user: {
        type: 'string',
        variant: 'id-picker',
        customQueryFn: customUserQueryFn,
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
            params.setIdMap((state) => {
              return { ...state, ...returnedIdMap };
            });
          }
          return { data, idMap: returnedIdMap || {} };
        }, // Required for id-picker: loads records for human-readable display
      },

      // Multiple selection IdPicker
      multiple_users: {
        type: 'array',
        variant: 'id-picker',
        items: {
          type: 'string',
        },
        customQueryFn: customUserQueryFn,
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
            params.setIdMap((state) => {
              return { ...state, ...returnedIdMap };
            });
          }
          return { data, idMap: returnedIdMap || {} };
        }, // Required for id-picker: loads records for human-readable display
      },
    },
  };

  return (
    <Flex direction="column" gap={4} p={4}>
      {/* Header with language switcher */}
      <Flex
        direction="column"
        gap={3}
        p={4}
        bg="bg.subtle"
        borderRadius="md"
        borderWidth="1px"
        borderColor="border.subtle"
      >
        <Heading size="md">IdPicker with Label Objects</Heading>
        <Text fontSize="sm" color="gray.600">
          This story demonstrates using label objects instead of i18n. Switch
          languages to see label objects in action.
        </Text>

        <Flex gap={2} alignItems="center">
          <Text fontSize="sm" fontWeight="bold">
            Language:
          </Text>
          <Button
            size="sm"
            colorScheme={currentLang === 'en' ? 'blue' : 'gray'}
            onClick={() => switchLanguage('en')}
          >
            English
          </Button>
          <Button
            size="sm"
            colorScheme={currentLang === 'zh-HK' ? 'blue' : 'gray'}
            onClick={() => switchLanguage('zh-HK')}
          >
            繁體中文 (香港)
          </Button>
        </Flex>

        {/* Code comparison */}
        <Flex
          direction="column"
          gap={2}
          mt={2}
          p={3}
          bg="bg.muted"
          borderRadius="md"
        >
          <Text fontSize="xs" fontWeight="bold">
            Label Objects Pattern:
          </Text>
          <Text fontSize="xs" fontFamily="mono" color="green.600">
            {`idPickerLabels={{ typeToSearch: '...' }}`}
          </Text>
          <Text fontSize="xs" fontFamily="mono" color="green.600">
            {`idPickerLabels?.addMore ?? fallback`}
          </Text>
          <Text fontSize="xs" mt={2} color="text.subtle">
            Components use label objects from SchemaFormContext with i18n
            fallbacks
          </Text>
        </Flex>
      </Flex>

      {/* The form with IdPicker fields */}
      {(() => {
        const form = useForm({ schema });
        return (
          <DefaultForm
            formConfig={{
              schema: schema,
              onSubmit: async (data) => {
                console.log('Form submitted with data:', data);
                alert(
                  `Form submitted!\nSingle user: ${data.single_user}\nMultiple users: ${JSON.stringify(data.multiple_users)}`
                );
              },
              idPickerLabels: labels.single_user,
              ...form,
            }}
          />
        );
      })()}

      {/* Translation keys reference */}
      <Flex
        direction="column"
        gap={2}
        p={4}
        bg="bg.subtle"
        borderRadius="md"
        borderWidth="1px"
        borderColor="border.subtle"
        mt={4}
      >
        <Heading size="sm">Translation Keys Used by IdPicker</Heading>
        <Text fontSize="xs" color="text.subtle">
          All these keys are accessed via the useFormLabel hook:
        </Text>
        <Flex direction="column" gap={1} mt={2} fontFamily="mono" fontSize="xs">
          <Text>
            • <strong>formI18n.label()</strong> → field_label
          </Text>
          <Text>
            • <strong>formI18n.t('undefined')</strong> → undefined
          </Text>
          <Text>
            • <strong>formI18n.t('add_more')</strong> → add_more
          </Text>
          <Text>
            • <strong>formI18n.t('type_to_search')</strong> → type_to_search
          </Text>
          <Text>
            • <strong>formI18n.t('total')</strong> → total
          </Text>
          <Text>
            • <strong>formI18n.t('showing')</strong> → showing
          </Text>
          <Text>
            • <strong>formI18n.t('per_page')</strong> → per_page
          </Text>
          <Text>
            • <strong>formI18n.t('empty_search_result')</strong> →
            empty_search_result
          </Text>
          <Text>
            • <strong>formI18n.t('initial_results')</strong> → initial_results
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
