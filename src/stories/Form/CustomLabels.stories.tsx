import { DefaultForm } from '@/components/Form/components/core/DefaultForm';
import { useForm } from '@/components/Form/useForm';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JSONSchema7 } from 'json-schema';
import {
  LoadInitialValuesParams,
  LoadInitialValuesResult,
} from '@/components/Form/components/types/CustomJSONSchema7';

// Helper function to create default loadInitialValues for id-picker fields
const createDefaultLoadInitialValues = () => {
  return async (
    params: LoadInitialValuesParams
  ): Promise<LoadInitialValuesResult> => {
    if (!params.ids || params.ids.length === 0) {
      return { data: { data: [], count: 0 }, idMap: {} };
    }

    const { column: column_ref, customQueryFn } = params.foreign_key;

    if (!customQueryFn) {
      throw new Error(
        'customQueryFn is required in foreign_key. serverUrl has been removed.'
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
      params.setIdMap((state) => {
        return { ...state, ...returnedIdMap };
      });
    }

    return { data, idMap: returnedIdMap || {} };
  };
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/Form/Custom Labels (Override zhhk)',
  component: DefaultForm,
  parameters: {
    docs: {
      description: {
        component:
          'Demonstrates custom labels for DateTimePicker and IdPicker components using label objects.',
      },
    },
  },

  argTypes: {},
} satisfies Meta<typeof DefaultForm>;

type Story = StoryObj<typeof meta>;

export default meta;
const queryClient = new QueryClient();

export const CustomDateTimePickerLabels: Story = {
  name: 'Custom Date Time Picker Labels',
  args: {
    formConfig: {
      schema: {} as JSONSchema7,
      idMap: {},
      setIdMap: () => {},
      form: {} as any,
    },
  },
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <DateTimePickerForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

export const CustomIdPickerLabels: Story = {
  name: 'Custom Id Picker Labels',
  args: {
    formConfig: {
      schema: {} as JSONSchema7,
      idMap: {},
      setIdMap: () => {},
      form: {} as any,
    },
  },
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

export const CustomEnumPickerLabels: Story = {
  name: 'Custom Enum Picker Labels',
  args: {
    formConfig: {
      schema: {} as JSONSchema7,
      idMap: {},
      setIdMap: () => {},
      form: {} as any,
    },
  },
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <EnumPickerForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

export const CombinedCustomLabels: Story = {
  name: 'Combined Custom Labels',
  args: {
    formConfig: {
      schema: {} as JSONSchema7,
      idMap: {},
      setIdMap: () => {},
      form: {} as any,
    },
  },
  render: () => {
    return (
      <Provider>
        <QueryClientProvider client={queryClient}>
          <CombinedForm />
        </QueryClientProvider>
      </Provider>
    );
  },
};

const DateTimePickerForm = () => {
  const form = useForm({
    preLoadedValues: { event_date: '2024-01-15T10:30:00Z' },
  });

  const schema = {
    type: 'object',
    properties: {
      event_date: {
        type: 'string',
        format: 'date-time',
        title: 'Event Date & Time',
      },
      start_time: {
        type: 'string',
        format: 'date-time',
        title: 'Start Time',
      },
    },
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        onSubmit: (data) => {
          console.log('DateTimePicker form submitted:', data);
        },
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
          backButtonLabel: '上一頁',
          forwardButtonLabel: '下一頁',
        },
        ...form,
      }}
    />
  );
};

const IdPickerForm = () => {
  const form = useForm({
    preLoadedValues: { category_id: '1', tags: ['1', '2'] },
  });

  const schema = {
    type: 'object',
    properties: {
      category_id: {
        type: 'string',
        title: 'Category',
        variant: 'id-picker',
        foreign_key: {
          table: 'categories',
          column: 'id',
        },
        loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
      },
      tags: {
        type: 'array',
        title: 'Tags',
        variant: 'id-picker',
        foreign_key: {
          table: 'tags',
          column: 'id',
        },
        loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
      },
    },
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        onSubmit: (data) => {
          console.log('IdPicker form submitted:', data);
        },
        idPickerLabels: {
          undefined: '找不到項目',
          addMore: '新增標籤',
          typeToSearch: '搜尋項目...',
          total: '總計項目',
          showing: '顯示',
          perPage: '每頁項目',
          emptySearchResult: '找不到符合的項目',
          initialResults: '開始輸入以搜尋項目',
        },
        ...form,
      }}
    />
  );
};

const CombinedForm = () => {
  const form = useForm({
    preLoadedValues: {
      event_date: '2024-02-20T14:00:00Z',
      organizer_id: '2',
    },
  });

  const schema = {
    type: 'object',
    properties: {
      event_date: {
        type: 'string',
        format: 'date-time',
        title: 'Event Date & Time',
      },
      organizer_id: {
        type: 'string',
        title: 'Organizer',
        variant: 'id-picker',
        foreign_key: {
          table: 'users',
          column: 'id',
        },
        loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
      },
      categories: {
        type: 'array',
        title: 'Categories',
        variant: 'id-picker',
        foreign_key: {
          table: 'categories',
          column: 'id',
        },
        loadInitialValues: createDefaultLoadInitialValues(), // Required for id-picker: loads records for human-readable display
      },
    },
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        onSubmit: (data) => {
          console.log('Combined form submitted:', data);
        },
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
        },
        idPickerLabels: {
          undefined: '找不到項目',
          addMore: '新增更多',
          typeToSearch: '輸入搜尋...',
          total: '總計',
          showing: '顯示',
          perPage: '每頁',
          emptySearchResult: '找不到結果',
          initialResults: '輸入以搜尋項目',
        },
        ...form,
      }}
    />
  );
};

const EnumPickerForm = () => {
  const form = useForm({
    preLoadedValues: { status: 'active', tags: ['tag1', 'tag2'] },
  });

  const schema = {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        title: 'Status',
        enum: ['active', 'inactive', 'pending'],
        variant: 'enum-picker',
      },
      tags: {
        type: 'array',
        title: 'Tags',
        items: {
          type: 'string',
          enum: ['tag1', 'tag2', 'tag3', 'tag4'],
        },
        variant: 'enum-picker',
      },
    },
  } as JSONSchema7;

  return (
    <DefaultForm
      formConfig={{
        schema: schema as JSONSchema7,
        onSubmit: (data) => {
          console.log('EnumPicker form submitted:', data);
        },
        enumPickerLabels: {
          undefined: '找不到項目',
          addMore: '新增標籤',
          typeToSearch: '搜尋項目...',
          total: '總計項目',
          showing: '顯示',
          perPage: '每頁項目',
          emptySearchResult: '找不到符合的項目',
          initialResults: '開始輸入以搜尋項目',
        },
        ...form,
      }}
    />
  );
};
