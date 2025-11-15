import DatePicker from '@/components/DatePicker/DatePicker';
import { PickerDemo } from '@/components/DatePicker/PickerDemo';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/DatePicker/pickers',
  component: DatePicker,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DatePicker>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Single: Story = {
  render: () => {
    return (
      <Provider>
        <PickerDemo />
      </Provider>
    );
  },
};
