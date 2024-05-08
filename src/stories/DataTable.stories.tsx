import type { Meta, StoryObj } from "@storybook/react";
import TableViewShowcase from "./TableViewShowcase";
import CardViewShowcase from "./CardViewShowcase";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "DataTable/TableView",
  component: TableViewShowcase,
  parameters: {
  },
  
  argTypes: {
  },

} satisfies Meta<typeof TableViewShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableView: Story = {
  render: () => {
    return <TableViewShowcase />;
  },
};

export const CardView = {
  render: () => {
    return <CardViewShowcase />;
  },
};
