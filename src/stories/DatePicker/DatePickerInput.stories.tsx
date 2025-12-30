import { DatePickerInput } from '@/components/DatePicker/DatePicker';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta = {
  title: 'react-datatable5/DatePicker/DatePicker',
  component: DatePickerInput,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof DatePickerInput>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Basic: Story = {
  name: 'Basic',
  render: () => {
    return <BasicView />;
  },
};

const BasicView = () => {
  const [selectedDate, setSelectedDate] = useState<string>();

  return (
    <Provider>
      <div style={{ padding: '20px', maxWidth: '300px' }}>
        <DatePickerInput
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            console.log('Selected date:', date);
          }}
          placeholder="Select a date"
        />
        {selectedDate && (
          <div style={{ marginTop: '20px', padding: '10px' }}>
            <p>Selected date: {selectedDate}</p>
          </div>
        )}
      </div>
    </Provider>
  );
};

export const WithCustomFormat: Story = {
  name: 'With Custom Format',
  render: () => {
    return <CustomFormatView />;
  },
};

const CustomFormatView = () => {
  const [selectedDate, setSelectedDate] = useState<string>();

  return (
    <Provider>
      <div style={{ padding: '20px', maxWidth: '300px' }}>
        <DatePickerInput
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          placeholder="Select a date"
          dateFormat="YYYY-MM-DD"
          displayFormat="MMM DD, YYYY"
        />
        {selectedDate && (
          <div style={{ marginTop: '20px', padding: '10px' }}>
            <p>Selected date: {selectedDate}</p>
          </div>
        )}
      </div>
    </Provider>
  );
};

export const WithMinMaxDate: Story = {
  name: 'With Min Max Date',
  render: () => {
    return <MinMaxDateView />;
  },
};

const MinMaxDateView = () => {
  const [selectedDate, setSelectedDate] = useState<string>();
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(today.getDate() - 7); // 7 days ago
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30); // 30 days from now

  return (
    <Provider>
      <div style={{ padding: '20px', maxWidth: '300px' }}>
        <DatePickerInput
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          placeholder="Select a date (within range)"
          minDate={minDate}
          maxDate={maxDate}
        />
        {selectedDate && (
          <div style={{ marginTop: '20px', padding: '10px' }}>
            <p>Selected date: {selectedDate}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              Min: {minDate.toLocaleDateString()}, Max:{' '}
              {maxDate.toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </Provider>
  );
};

export const WithCustomLabels: Story = {
  name: 'With Custom Labels',
  render: () => {
    return <CustomLabelsView />;
  },
};

const CustomLabelsView = () => {
  const [selectedDate, setSelectedDate] = useState<string>();

  return (
    <Provider>
      <div style={{ padding: '20px', maxWidth: '300px' }}>
        <DatePickerInput
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          placeholder="選擇日期"
          labels={{
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
            backButtonLabel: '上月',
            forwardButtonLabel: '下月',
            todayLabel: '今天',
            yesterdayLabel: '昨天',
            tomorrowLabel: '明天',
          }}
        />
        {selectedDate && (
          <div style={{ marginTop: '20px', padding: '10px' }}>
            <p>Selected date: {selectedDate}</p>
          </div>
        )}
      </div>
    </Provider>
  );
};

export const MultipleMonths: Story = {
  name: 'Multiple Months',
  render: () => {
    return <MultipleMonthsView />;
  },
};

const MultipleMonthsView = () => {
  const [selectedDate, setSelectedDate] = useState<string>();

  return (
    <Provider>
      <div style={{ padding: '20px', maxWidth: '600px' }}>
        <DatePickerInput
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          placeholder="Select a date"
          monthsToDisplay={2}
        />
        {selectedDate && (
          <div style={{ marginTop: '20px', padding: '10px' }}>
            <p>Selected date: {selectedDate}</p>
          </div>
        )}
      </div>
    </Provider>
  );
};

export const WithHelperButtons: Story = {
  name: 'With Helper Buttons',
  render: () => {
    return <HelperButtonsView />;
  },
};

const HelperButtonsView = () => {
  const [selectedDate, setSelectedDate] = useState<string>();

  return (
    <Provider>
      <div style={{ padding: '20px', maxWidth: '300px' }}>
        <DatePickerInput
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            console.log('Selected date:', date);
          }}
          placeholder="Select a date"
          showHelperButtons={true}
        />
        {selectedDate && (
          <div style={{ marginTop: '20px', padding: '10px' }}>
            <p>Selected date: {selectedDate}</p>
          </div>
        )}
      </div>
    </Provider>
  );
};

export const WithoutHelperButtons: Story = {
  name: 'Without Helper Buttons',
  render: () => {
    return <NoHelperButtonsView />;
  },
};

const NoHelperButtonsView = () => {
  const [selectedDate, setSelectedDate] = useState<string>();

  return (
    <Provider>
      <div style={{ padding: '20px', maxWidth: '300px' }}>
        <DatePickerInput
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          placeholder="Select a date"
          showHelperButtons={false}
        />
        {selectedDate && (
          <div style={{ marginTop: '20px', padding: '10px' }}>
            <p>Selected date: {selectedDate}</p>
          </div>
        )}
      </div>
    </Provider>
  );
};
