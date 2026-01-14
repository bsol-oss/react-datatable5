import DatePicker from '@/components/DatePicker/DatePicker';
import { getMultiDates } from '@/components/DatePicker/getMultiDates';
import { Provider } from '@/components/ui/provider';
import { Button } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/DatePicker/date-picker',
  component: DatePicker,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Single: Story = {
  name: 'Single',
  args: { selected: [] },
  render: () => {
    return <DataDisplayView />;
  },
};

const DataDisplayView = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined
  >();
  const [showOutsideDays, setShowOutsideDays] = useState<boolean>(false);
  return (
    <Provider>
      <div>
        <DatePicker
          selected={selectedDate ?? []}
          onDateSelected={({ date }) => {
            setSelectedDate(() => date);
          }}
          firstDayOfWeek={firstDayOfWeek}
          showOutsideDays={showOutsideDays}
          // in traditional chinese
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
            // in traditional chinese
            backButtonLabel: '上月',
            forwardButtonLabel: '下月',
            weekdayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
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
        {selectedDate && (
          <div style={{ paddingTop: 20, textAlign: 'center' }}>
            <p>Selected:</p>
            <p>{`${selectedDate.toLocaleDateString()}`}</p>
          </div>
        )}
      </div>
    </Provider>
  );
};

export const Multi: Story = {
  name: 'Multi',
  args: { selected: [] },
  render: () => {
    return <DataDisplayMultiView />;
  },
};

const DataDisplayMultiView = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined
  >();
  const [showOutsideDays, setShowOutsideDays] = useState<boolean>(false);
  return (
    <Provider>
      <div>
        <DatePicker
          selected={selectedDates}
          onDateSelected={({ date }) => {
            const isSelected = selectedDates.some(
              (d) => d.getTime() === date.getTime()
            );
            const newDates = getMultiDates({
              selected: isSelected,
              selectable: true,
              selectedDate: date,
              selectedDates,
            });
            setSelectedDates(() => newDates);
          }}
          firstDayOfWeek={firstDayOfWeek}
          showOutsideDays={showOutsideDays}
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
      </div>
    </Provider>
  );
};

export const MinMax: Story = {
  name: 'Min Max',
  args: { selected: [] },
  render: () => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [firstDayOfWeek, setFirstDayOfWeek] = useState<
      0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined
    >();
    const [showOutsideDays, setShowOutsideDays] = useState<boolean>(false);
    return (
      <Provider>
        <div>
          <DatePicker
            selected={selectedDates}
            onDateSelected={({ date }) => {
              const isSelected = selectedDates.some(
                (d) => d.getTime() === date.getTime()
              );
              const newDates = getMultiDates({
                selected: isSelected,
                selectable: true,
                selectedDate: date,
                selectedDates,
              });
              setSelectedDates(() => newDates);
            }}
            firstDayOfWeek={firstDayOfWeek}
            showOutsideDays={showOutsideDays}
            {...{
              date: new Date('05/01/2018'),
              minDate: new Date('05/04/2018'),
              maxDate: new Date('06/27/2018'),
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
        </div>
      </Provider>
    );
  },
};

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
        <div>
          <DatePicker
            selected={selectedDates}
            onDateSelected={({ date }) => {
              const isSelected = selectedDates.some(
                (d) => d.getTime() === date.getTime()
              );
              const newDates = getMultiDates({
                selected: isSelected,
                selectable: true,
                selectedDate: date,
                selectedDates,
              });
              setSelectedDates(() => newDates);
            }}
            firstDayOfWeek={firstDayOfWeek}
            showOutsideDays={showOutsideDays}
            {...{
              date: new Date('05/01/2018'),
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
        </div>
      </Provider>
    );
  },
};
