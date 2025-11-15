import type { Meta, StoryObj } from '@storybook/react-vite';
import CardViewShowcase from './CardViewShowcase';
import DefaultTableShowcase from './DefaultTableShowcase';
import DefaultTableShowcaseTwo from './DefaultTableShowcase2';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TableViewShowcase from '../DataTable/TableViewShowcase';
import DefaultTableShowcase3 from './DefaultTableShowcase3';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/DataTableServer',
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
const queryClient = new QueryClient();

export const DefaultTableView2: Story = {
  render: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <DefaultTableShowcaseTwo />
      </QueryClientProvider>
    );
  },
};
export const DefaultTableView3: Story = {
  render: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <DefaultTableShowcase3 />
      </QueryClientProvider>
    );
  },
};

export const TableView: Story = {
  render: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <TableViewShowcase />
      </QueryClientProvider>
    );
  },
};

export const CardView: Story = {
  render: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <CardViewShowcase />
      </QueryClientProvider>
    );
  },
};
