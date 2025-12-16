import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from 'i18next';
import { JSONSchema7 } from 'json-schema';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { CustomQueryFnParams } from '@/components/Form/components/fields/StringInputField';
import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';

/**
 * IdPicker i18n Story
 *
 * This story demonstrates the simpler i18n handling in IdPicker using the useFormI18n hook.
 *
 * Old pattern (verbose):
 *   translate.t(removeIndex(`${colLabel}.field_label`))
 *   translate.t(removeIndex(`${colLabel}.add_more`))
 *
 * New pattern (clean):
 *   formI18n.label()
 *   formI18n.t('add_more')
 *
 * The story includes:
 * - Single and multiple IdPicker instances
 * - Language switcher (English & Traditional Chinese HK)
 * - All IdPicker translation keys demonstrated
 */

const meta = {
  title: 'react-datatable5/Form/IdPicker',
  component: DefaultForm,
  parameters: {
    docs: {
      description: {
        component:
          'IdPicker with comprehensive i18n support using the useFormI18n hook',
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

// Initialize i18n with resources for both English and Traditional Chinese (HK)
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  lng: 'en',
  resources: {
    en: {
      translation: {
        // Single picker translations
        'single_user.field_label': 'Select User',
        'single_user.field_required': 'User selection is required',
        'single_user.undefined': 'User not found',
        'single_user.add_more': 'Add more users',
        'single_user.type_to_search': 'Type to search users...',
        'single_user.total': 'Total',
        'single_user.showing': 'Showing',
        'single_user.per_page': 'per page',
        'single_user.empty_search_result':
          'No users found matching your search',
        'single_user.initial_results': 'Start typing to search for users',

        // Multiple picker translations
        'multiple_users.field_label': 'Select Multiple Users',
        'multiple_users.field_required': 'At least one user is required',
        'multiple_users.undefined': 'User not found',
        'multiple_users.add_more': 'Add more',
        'multiple_users.type_to_search': 'Search users...',
        'multiple_users.total': 'Total',
        'multiple_users.showing': 'Showing',
        'multiple_users.per_page': 'per page',
        'multiple_users.empty_search_result': 'No matching users',
        'multiple_users.initial_results': 'Click to search and select users',
      },
    },
    'zh-HK': {
      translation: {
        // Single picker translations (Traditional Chinese - Hong Kong)
        'single_user.field_label': '選擇用戶',
        'single_user.field_required': '必須選擇用戶',
        'single_user.undefined': '找不到用戶',
        'single_user.add_more': '新增更多用戶',
        'single_user.type_to_search': '輸入以搜尋用戶...',
        'single_user.total': '總數',
        'single_user.showing': '顯示',
        'single_user.per_page': '每頁',
        'single_user.empty_search_result': '找不到符合的用戶',
        'single_user.initial_results': '開始輸入以搜尋用戶',

        // Multiple picker translations (Traditional Chinese - Hong Kong)
        'multiple_users.field_label': '選擇多個用戶',
        'multiple_users.field_required': '至少需要選擇一個用戶',
        'multiple_users.undefined': '找不到用戶',
        'multiple_users.add_more': '新增更多',
        'multiple_users.type_to_search': '搜尋用戶...',
        'multiple_users.total': '總數',
        'multiple_users.showing': '顯示',
        'multiple_users.per_page': '每頁',
        'multiple_users.empty_search_result': '沒有符合的用戶',
        'multiple_users.initial_results': '點擊以搜尋及選擇用戶',
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

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
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n} defaultNS={'translation'}>
            <IdPickerForm />
          </I18nextProvider>
        </QueryClientProvider>
      </Provider>
    );
  },
};

const IdPickerForm = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const form = useForm({ keyPrefix: '' });

  // Language switcher
  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  const schema = {
    type: 'object',
    title: 'User Selection Form',
    required: ['single_user'],
    properties: {
      // Single selection IdPicker
      single_user: {
        type: 'string',
        variant: 'id-picker',
        foreign_key: {
          table: 'users',
          column: 'id',
          customQueryFn: customUserQueryFn,
        },
      },

      // Multiple selection IdPicker
      multiple_users: {
        type: 'array',
        variant: 'id-picker',
        items: {
          type: 'string',
        },
        foreign_key: {
          table: 'users',
          column: 'id',
          customQueryFn: customUserQueryFn,
        },
      },
    },
  } as JSONSchema7;

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
        <Heading size="md">IdPicker with useFormI18n Hook</Heading>
        <Text fontSize="sm" color="gray.600">
          This story demonstrates the simpler i18n pattern using the useFormI18n
          hook. Switch languages to see all translations in action.
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
            Old Pattern (Verbose):
          </Text>
          <Text fontSize="xs" fontFamily="mono" color="red.600">
            {`translate.t(removeIndex(removeIndex(\`\${column}.field_label\`)))`}
          </Text>
          <Text fontSize="xs" fontWeight="bold" mt={2}>
            New Pattern (Clean):
          </Text>
          <Text fontSize="xs" fontFamily="mono" color="green.600">
            {`formI18n.label()`}
          </Text>
        </Flex>
      </Flex>

      {/* The form with IdPicker fields */}
      <DefaultForm
        formConfig={{
          schema: schema as JSONSchema7,
          serverUrl: 'http://localhost:8081',
          onSubmit: async (data) => {
            console.log('Form submitted with data:', data);
            alert(
              `Form submitted!\nSingle user: ${data.single_user}\nMultiple users: ${JSON.stringify(data.multiple_users)}`
            );
          },
          ...form,
        }}
      />

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
          All these keys are accessed via the useFormI18n hook:
        </Text>
        <Flex direction="column" gap={1} mt={2} fontFamily="mono" fontSize="xs">
          <Text>
            • <strong>formI18n.label()</strong> → field_label
          </Text>
          <Text>
            • <strong>formI18n.required()</strong> → field_required
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
