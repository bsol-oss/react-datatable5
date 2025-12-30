import { RecordDisplay } from '@/components/DataTable/display/RecordDisplay';
import { DataDisplay } from '@/components/DataTable/display/DataDisplay';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'react-datatable5/DisplayComponent',
  component: RecordDisplay,
  parameters: {},

  argTypes: {},
} satisfies Meta<typeof DataDisplay>;

type Story = StoryObj<typeof meta>;

export default meta;

export const ObjectDisplay1: Story = {
  name: 'Object Display 1',
  render: () => {
    return <DataDisplayView />;
  },
};

const queryClient = new QueryClient();

const DataDisplayView = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RecordDisplay
          object={{
            nice: 'job',
            good: 'good good good',
            food: {
              fruit: 'grape',
              some: {
                column: 'id',
                value: 'b1f00432-e623-d6d3-c262-d50f7881f8ab',
              },
            },
          }}
        />
      </Provider>
    </QueryClientProvider>
  );
};

export const ObjectDisplay2: Story = {
  name: 'Object Display 2',
  render: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Provider>
          <SomeRecord />
        </Provider>
      </QueryClientProvider>
    );
  },
};

const SomeRecord = () => {
  return (
    <RecordDisplay
      object={{
        nice: 'job',
        good: 'good good good',
        food: {
          fruit: 'grape',
          some: {
            column: 'id',
            value: 'b1f00432-e623-d6d3-c262-d50f7881f8ab',
          },
        },
      }}
    />
  );
};
