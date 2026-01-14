import DatePicker from '@/components/DatePicker/DatePicker';
import { getRangeDates } from '@/components/DatePicker/getRangeDates';
import RangeDatePicker from '@/components/DatePicker/RangeDatePicker';
import { Provider } from '@/components/ui/provider';
import { Button, Flex } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/DatePicker/range-date-picker',
  component: DatePicker,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof meta>;

export default meta;

export const MultipleMonths: Story = {
  name: 'Multiple Months',
  args: { selected: [] },
  render: () => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [firstDayOfWeek, setFirstDayOfWeek] = useState<
      0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined
    >();
    const [showOutsideDays, setShowOutsideDays] = useState<boolean>(false);
    return (
      <Provider>
        <Flex flexFlow={'column'}>
          <RangeDatePicker
            selected={selectedDates}
            onDateSelected={({ selectable, date }) => {
              const newDates = getRangeDates({
                selectable,
                date,
                selectedDates,
              });
              setSelectedDates(() => newDates ?? []);
            }}
            firstDayOfWeek={firstDayOfWeek}
            showOutsideDays={showOutsideDays}
            withPopover={false}
            {...{
              date: new Date('05/15/2018'),
              minDate: new Date('05/04/2018'),
              maxDate: new Date('09/27/2018'),
              monthsToDisplay: 3,
            }}
          />
          <RangeDatePicker
            selected={selectedDates}
            onDateSelected={({ selectable, date }) => {
              const newDates = getRangeDates({
                selectable,
                date,
                selectedDates,
              });
              setSelectedDates(() => newDates ?? []);
            }}
            firstDayOfWeek={firstDayOfWeek}
            showOutsideDays={showOutsideDays}
            withPopover={false}
            {...{
              date: new Date('05/15/2018'),
              minDate: new Date('05/04/2018'),
              maxDate: new Date('09/27/2018'),
              monthsToDisplay: 3,
            }}
          />
          <div style={{ paddingTop: 20, textAlign: 'center' }}>
            <div>Set First Day of The Week</div>
            {['Su', 'M', 'T', 'W', 'Th', 'F', 'S'].map((day, i) => (
              <Button
                data-test={`firstDayOfWeekButton${day}`}
                key={day}
                onClick={() => {
                  setFirstDayOfWeek(i as 0 | 1 | 2 | 3 | 4 | 5 | 6);
                }}
                style={{
                  background: firstDayOfWeek === i ? 'purple' : undefined,
                }}
              >
                {day}
              </Button>
            ))}
          </div>
          <div style={{ paddingTop: 20, textAlign: 'center' }}>
            <Button
              data-test="showOutsideDaysButton"
              onClick={() => {
                setShowOutsideDays((state) => !state);
              }}
            >
              Toggle Show Outside Days: {showOutsideDays ? 'True' : 'False'}
            </Button>
          </div>
          {selectedDates && (
            <div style={{ paddingTop: 20, textAlign: 'center' }}>
              <p>Selected:</p>
              <p>{`${JSON.stringify(selectedDates)}`}</p>
            </div>
          )}
        </Flex>
      </Provider>
    );
  },
};

export const ChineseLabels: Story = {
  name: 'Chinese Labels',
  args: { selected: [] },
  render: () => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [firstDayOfWeek, setFirstDayOfWeek] = useState<
      0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined
    >(0);
    return (
      <Provider>
        <Flex flexFlow={'column'} gap={4}>
          <RangeDatePicker
            selected={selectedDates}
            onDateSelected={({ selectable, date }) => {
              const newDates = getRangeDates({
                selectable,
                date,
                selectedDates,
              });
              setSelectedDates(() => newDates ?? []);
            }}
            firstDayOfWeek={firstDayOfWeek}
            monthsToDisplay={2}
            withPopover={false}
            // Traditional Chinese labels
            labels={{
              monthNamesFull: [
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
            }}
          />
          <div style={{ paddingTop: 20, textAlign: 'center' }}>
            <div>設定每週第一天</div>
            {['日', '一', '二', '三', '四', '五', '六'].map((day, i) => (
              <Button
                data-test={`firstDayOfWeekButton${day}`}
                key={day}
                onClick={() => {
                  setFirstDayOfWeek(i as 0 | 1 | 2 | 3 | 4 | 5 | 6);
                }}
                style={{
                  background: firstDayOfWeek === i ? 'purple' : undefined,
                }}
              >
                {day}
              </Button>
            ))}
          </div>
          {selectedDates.length > 0 && (
            <div style={{ paddingTop: 20, textAlign: 'center' }}>
              <p>已選擇的日期範圍：</p>
              <p>
                {selectedDates.length === 1
                  ? `${selectedDates[0].toLocaleDateString('zh-TW')}`
                  : selectedDates.length === 2
                    ? `${selectedDates[0].toLocaleDateString('zh-TW')} - ${selectedDates[1].toLocaleDateString('zh-TW')}`
                    : '請選擇日期範圍'}
              </p>
            </div>
          )}
        </Flex>
      </Provider>
    );
  },
};
