import DatePicker from "@/components/DatePicker/DatePicker";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
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
  return (
    <ChakraProvider value={defaultSystem}>
      <div>
        <DatePicker
          selected={selectedDate}
          onDateSelected={({ selected, selectable, date }) => {
            setSelectedDate(() => date);
          }}
        />
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
