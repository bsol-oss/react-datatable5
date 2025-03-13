import type { Meta, StoryObj } from "@storybook/react";
import CardViewShowcase from "./CardViewShowcase";
import TableViewShowcase from "./TableViewShowcase";
import DefaultTableShowcase from "./DefaultTableShowcase";
import DefaultTableShowcase2 from "./DefaultTableShowcase2";
import MinimalShowcase from "./MinimalShowcase";
import MinimalShowcase2 from "./MinimalShowcase2";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "react-datatable5/DataTable",
  component: TableViewShowcase,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof TableViewShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTableView2: Story = {
  render: () => {
    return <DefaultTableShowcase2 />;
  },
};

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

export const CardView = {
  render: () => {
    return <CardViewShowcase />;
  },
};

export const Minimal = {
  render: () => {
    return <MinimalShowcase />;
  },
};

export const Minimal2 = {
  render: () => {
    return <MinimalShowcase2 />;
  },
};
