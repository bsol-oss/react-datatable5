import DatePicker from "@/components/DatePicker/DatePicker";
import { Button, ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/DatePicker/date-picker",
  component: DatePicker,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof meta>;

export default meta;

export const DatePickerStory: Story = {
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
    <ChakraProvider value={defaultSystem}>
      <div>
        <DatePicker
          selected={selectedDate}
          onDateSelected={({ selected, selectable, date }) => {
            setSelectedDate(() => date);
          }}
          firstDayOfWeek={firstDayOfWeek}
          showOutsideDays={showOutsideDays}
        />
        <div style={{ paddingTop: 20, textAlign: "center" }}>
          <div>Set First Day of The Week</div>
          {["Su", "M", "T", "W", "Th", "F", "S"].map((day, i) => (
            <Button
              data-test={`firstDayOfWeekButton${day}`}
              key={day}
              onClick={() => {
                setFirstDayOfWeek(i);
              }}
              style={{ background: firstDayOfWeek === i ? "purple" : null }}
            >
              {day}
            </Button>
          ))}
        </div>
        <div style={{ paddingTop: 20, textAlign: "center" }}>
          <Button
            data-test="showOutsideDaysButton"
            onClick={() => {
              setShowOutsideDays((state) => !state);
            }}
          >
            Toggle Show Outside Days: {showOutsideDays ? "True" : "False"}
          </Button>
        </div>
        {selectedDate && (
          <div style={{ paddingTop: 20, textAlign: "center" }}>
            <p>Selected:</p>
            <p>{`${selectedDate.toLocaleDateString()}`}</p>
          </div>
        )}
      </div>
    </ChakraProvider>
  );
};
