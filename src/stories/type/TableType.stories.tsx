import type { Meta, StoryObj } from "@storybook/react";
import DataTableShowcase from "./DataTableShowcase";
import TableViewShowcase from "../view/TableViewShowcase";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable/type/DataTable",
  component: TableViewShowcase,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof TableViewShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DataTable: Story = {
  render: () => {
    return <DataTableShowcase />;
  },
};
