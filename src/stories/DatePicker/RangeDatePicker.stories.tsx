import DatePicker from "@/components/DatePicker/DatePicker";
import { getRangeDates } from "@/components/DatePicker/getRangeDates";
import RangeDatePicker from "@/components/DatePicker/RangeDatePicker";
import { Button, ChakraProvider, defaultSystem, Flex } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/DatePicker/range-date-picker",
  component: DatePicker,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof meta>;

export default meta;

export const MultipleMonths: Story = {
  render: () => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [firstDayOfWeek, setFirstDayOfWeek] = useState<
      0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined
    >();
    const [showOutsideDays, setShowOutsideDays] = useState<boolean>(false);
    return (
      <ChakraProvider value={defaultSystem}>
        <Flex flexFlow={'column'}>
          <RangeDatePicker
            selected={selectedDates}
            onDateSelected={({ selected, selectable, date }) => {
              const newDates = getRangeDates({
                selectable,
                date,
                selectedDates,
              });
              setSelectedDates(() => newDates);
            }}
            firstDayOfWeek={firstDayOfWeek}
            showOutsideDays={showOutsideDays}
            {...{
              date: new Date("05/15/2018"),
              minDate: new Date("05/04/2018"),
              maxDate: new Date("09/27/2018"),
              monthsToDisplay: 3,
            }}
          />
          <RangeDatePicker
            selected={selectedDates}
            onDateSelected={({ selected, selectable, date }) => {
              const newDates = getRangeDates({
                selectable,
                date,
                selectedDates,
              });
              setSelectedDates(() => newDates);
            }}
            firstDayOfWeek={firstDayOfWeek}
            showOutsideDays={showOutsideDays}
            {...{
              date: new Date("05/15/2018"),
              minDate: new Date("05/04/2018"),
              maxDate: new Date("09/27/2018"),
              monthsToDisplay: 3,
            }}
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
          {selectedDates && (
            <div style={{ paddingTop: 20, textAlign: "center" }}>
              <p>Selected:</p>
              <p>{`${JSON.stringify(selectedDates)}`}</p>
            </div>
          )}
        </Flex>
      </ChakraProvider>
    );
  },
};
