import type { Meta, StoryObj } from "@storybook/react";
import TableViewShowcase from "./TableViewShowcase";
import CardViewShowcase from "./CardViewShowcase";
import TablePinningShowcase from "./TablePinningShowcase";
import DefaultTableShowcase from "./DefaultTableShowcase";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/DataTableServer",
  component: TableViewShowcase,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof TableViewShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTableView: Story = {
  render: () => {
    return <DefaultTableShowcase />;
  },
};

export const TableView: Story = {
  render: () => {
    return <TableViewShowcase />;
  },
};

export const CardView: Story = {
  render: () => {
    return <CardViewShowcase />;
  },
};

export const TablePinningView: Story = {
  render: () => {
    return <TablePinningShowcase />;
  },
};
