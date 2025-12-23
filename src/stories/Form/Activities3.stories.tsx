import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { getTableData } from '@/components/Form/utils/getTableData';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import { activitiesSchema } from '../schema';
import { useState } from 'react';
import { Button, HStack, Text } from '@chakra-ui/react';
import type {
  IdPickerLabels,
  DateTimePickerLabels,
  FormButtonLabels,
  EnumPickerLabels,
} from '@/components/Form/components/types/CustomJSONSchema7';
import type { Translate } from '@/components/Form/useForm';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/Form',
  component: DefaultForm,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

export const Activities3: Story = {
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <SomeForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

// Enum value translations
const enumTranslations = {
  en: {
    'recurring_type.daily': 'Daily',
    'recurring_type.weekly': 'Weekly',
    'recurring_type.biweekly': 'Biweekly',
    'recurring_type.monthly': 'Monthly',
    'recurring_type.type_to_search': 'Select recurring type',
    'recurring_days.mon': 'Monday',
    'recurring_days.tue': 'Tuesday',
    'recurring_days.wed': 'Wednesday',
    'recurring_days.thu': 'Thursday',
    'recurring_days.fri': 'Friday',
    'recurring_days.sat': 'Saturday',
    'recurring_days.sun': 'Sunday',
    'recurring_days.type_to_search': 'Select recurring days',
  },
  'zh-HK': {
    'recurring_type.daily': '每日',
    'recurring_type.weekly': '每週',
    'recurring_type.biweekly': '每兩週',
    'recurring_type.monthly': '每月',
    'recurring_type.type_to_search': '請選擇重複類型',
    'recurring_days.mon': '星期一',
    'recurring_days.tue': '星期二',
    'recurring_days.wed': '星期三',
    'recurring_days.thu': '星期四',
    'recurring_days.fri': '星期五',
    'recurring_days.sat': '星期六',
    'recurring_days.sun': '星期日',
    'recurring_days.type_to_search': '請選擇重複日期',
  },
};

// Traditional Chinese (繁體中文) label objects
const zhHKLabels = {
  idPickerLabels: {
    undefined: '找不到項目',
    addMore: '新增更多',
    typeToSearch: '輸入搜尋...',
    total: '總計',
    showing: '顯示',
    perPage: '每頁',
    emptySearchResult: '找不到結果',
    initialResults: '輸入以搜尋項目',
  } as IdPickerLabels,
  enumPickerLabels: {
    undefined: '找不到選項',
    addMore: '新增更多',
    typeToSearch: '請選擇...',
    total: '總計',
    showing: '顯示',
    perPage: '每頁',
    emptySearchResult: '找不到結果',
    initialResults: '請選擇選項',
  } as EnumPickerLabels,
  dateTimePickerLabels: {
    monthNamesShort: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    weekdayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
    backButtonLabel: '← 上一頁',
    forwardButtonLabel: '下一頁 →',
  } as DateTimePickerLabels,
  formButtonLabels: {
    submit: '提交',
    reset: '重置',
    cancel: '取消',
    confirm: '確認',
    add: '新增',
    save: '儲存',
    addNew: '新增項目',
    fieldRequired: '此欄位為必填',
  } as FormButtonLabels,
};

// English label objects
const enLabels = {
  idPickerLabels: {
    undefined: 'Item not found',
    addMore: 'Add more',
    typeToSearch: 'Type to search...',
    total: 'Total',
    showing: 'Showing',
    perPage: 'per page',
    emptySearchResult: 'No results found',
    initialResults: 'Start typing to search',
  } as IdPickerLabels,
  enumPickerLabels: {
    undefined: 'Option not found',
    addMore: 'Add more',
    typeToSearch: 'Select...',
    total: 'Total',
    showing: 'Showing',
    perPage: 'per page',
    emptySearchResult: 'No results found',
    initialResults: 'Select an option',
  } as EnumPickerLabels,
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
    weekdayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    backButtonLabel: '← Previous',
    forwardButtonLabel: 'Next →',
  } as DateTimePickerLabels,
  formButtonLabels: {
    submit: 'Submit',
    reset: 'Reset',
    cancel: 'Cancel',
    confirm: 'Confirm',
    add: 'Add',
    save: 'Save',
    addNew: 'Add New',
    fieldRequired: 'This field is required',
  } as FormButtonLabels,
};

// Field label translations
const fieldLabels = {
  en: {
    name: 'Name',
    parent_event_id: 'Parent Event',
    start_date: 'Start Date',
    start_date2: 'Start Date 2',
    start_time: 'Start Time',
    end_date: 'End Date',
    end_time: 'End Time',
    is_recurring: 'Is Recurring',
    recurring_type: 'Recurring Type',
    recurring_days: 'Recurring Days',
    description: 'Description',
    remarks: 'Remarks',
  },
  'zh-HK': {
    name: '名稱',
    parent_event_id: '父活動',
    start_date: '開始日期',
    start_date2: '開始日期 2',
    start_time: '開始時間',
    end_date: '結束日期',
    end_time: '結束時間',
    is_recurring: '是否重複',
    recurring_type: '重複類型',
    recurring_days: '重複日期',
    description: '描述',
    remarks: '備註',
  },
};

// Function to apply field labels to schema based on language
const applyFieldLabels = (
  schema: JSONSchema7,
  language: 'en' | 'zh-HK'
): JSONSchema7 => {
  const labels = fieldLabels[language];
  const schemaCopy = JSON.parse(JSON.stringify(schema)) as JSONSchema7;

  if (schemaCopy.properties) {
    Object.keys(schemaCopy.properties).forEach((key) => {
      const property = schemaCopy.properties![key];
      if (
        property &&
        typeof property === 'object' &&
        !Array.isArray(property)
      ) {
        property.title = labels[key as keyof typeof labels] || key;
      }
    });
  }

  return schemaCopy;
};

const SomeForm = () => {
  const [language, setLanguage] = useState<'en' | 'zh-HK'>('en');

  const query = useQuery({
    queryKey: [`some_actitivitues`],
    queryFn: async () => {
      const data = await getTableData({
        serverUrl: 'http://localhost:8081',
        searching: 'e8ad43bf-e00f-4633-b334-68c0f3fd6ead',
        in_table: 'core_activities',
        limit: 10,
        offset: 0,
      });
      return data;
    },
    staleTime: 300000,
  });

  // Create custom translate function that handles enum value translations
  const enumTranslationsMap = enumTranslations[language];
  const customTranslate: Translate = {
    t: (key: string, options?: any) => {
      // Check if this is an enum value translation
      if (enumTranslationsMap[key]) {
        return enumTranslationsMap[key];
      }
      // Fallback to key as-is
      return key;
    },
    ready: true,
  };

  const form = useForm({
    preLoadedValues: (query.data ?? { data: [] }).data[0],
  });

  // Override translate with custom one that handles enum translations
  const formWithTranslate = {
    ...form,
    translate: customTranslate,
  };

  // Select labels based on current language
  const labels = language === 'zh-HK' ? zhHKLabels : enLabels;

  // Apply field labels to schema based on language
  const localizedSchema = applyFieldLabels(
    activitiesSchema as JSONSchema7,
    language
  );

  return (
    <>
      {/* Language Switcher */}
      <HStack gap={4} mb={4} p={4} borderRadius="md">
        <Text fontWeight="bold">Language / 語言:</Text>
        <Button
          size="sm"
          colorScheme={language === 'en' ? 'blue' : 'gray'}
          onClick={() => setLanguage('en')}
        >
          English
        </Button>
        <Button
          size="sm"
          colorScheme={language === 'zh-HK' ? 'blue' : 'gray'}
          onClick={() => setLanguage('zh-HK')}
        >
          繁體中文
        </Button>
      </HStack>

      <DefaultForm
        formConfig={{
          schema: localizedSchema,
          ignore: ['id', 'created_at', 'updated_at'],
          serverUrl: 'http://localhost:8081',
          onSubmit: async (data) => {
            console.log('onSubmit', data);
          },
          getUpdatedData: async () => {
            const response = await getTableData({
              serverUrl: 'http://localhost:8081',
              searching: 'e8ad43bf-e00f-4633-b334-68c0f3fd6ead',
              in_table: 'core_activities',
              limit: 10,
              offset: 0,
            });
            return response.data[0];
          },
          // Apply labels based on selected language
          ...labels,
          ...formWithTranslate,
        }}
      />
    </>
  );
};
