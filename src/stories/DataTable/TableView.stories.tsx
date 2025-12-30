import type { Meta, StoryObj } from '@storybook/react-vite';
import CardViewShowcase from './CardViewShowcase';
import TableViewShowcase from './TableViewShowcase';
import DefaultTableShowcase from './DefaultTableShowcase';
import DefaultTableShowcase2 from './DefaultTableShowcase2';
import MinimalShowcase from './MinimalShowcase';
import MinimalShowcase2 from './MinimalShowcase2';
import ShowHeaderShowcase from './ShowHeaderShowcase';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/DataTable',
  component: TableViewShowcase,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof TableViewShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTableView2: Story = {
  name: 'Default Table View 2',
  render: () => {
    return <DefaultTableShowcase2 />;
  },
};

export const DefaultTableView: Story = {
  name: 'Default Table View',
  render: () => {
    return <DefaultTableShowcase />;
  },
};

export const TableView: Story = {
  name: 'Table View',
  render: () => {
    return <TableViewShowcase />;
  },
};

export const CardView = {
  name: 'Card View',
  render: () => {
    return <CardViewShowcase />;
  },
};

export const Minimal = {
  name: 'Minimal',
  render: () => {
    return <MinimalShowcase />;
  },
};

export const Minimal2 = {
  name: 'Minimal 2',
  render: () => {
    return <MinimalShowcase2 />;
  },
};

export const ShowHeader = {
  name: 'Show Header',
  render: () => {
    return <ShowHeaderShowcase />;
  },
};
