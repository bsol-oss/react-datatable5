import { Provider } from '@/components/ui/provider';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable, DefaultTable, TextCell, useDataTable } from '../../index';
import { data, Product } from '../product_data';

const meta = {
  title: 'react-datatable5/DataTable/Skeleton Loading',
  component: DefaultTable,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
} satisfies Meta<typeof DefaultTable>;

export default meta;
type Story = StoryObj<typeof meta>;

interface RowActionsProps {
  row: Product;
}

const RowActions = ({ row }: RowActionsProps) => {
  return <>no actions</>;
};

const columnHelper = createColumnHelper<Product>();

const columns: ColumnDef<Product>[] = [
  // Display Column
  columnHelper.display({
    id: 'actions',
    header: () => <span>Actions</span>,
    cell: (props) => <RowActions row={props.row.original} />,
  }),

  // Grouping Column
  columnHelper.group({
    header: 'Information',
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor('id', {
        cell: (props) => {
          return <TextCell>{props.row.original.id}</TextCell>;
        },
        header: () => <span>Id</span>,
        footer: (props) => props.column.id,
        size: 50,
      }),
      columnHelper.accessor('title', {
        cell: (props) => {
          return (
            <Box padding="0">
              <TextCell label={props.row.original.title}>
                {props.row.original.title}
              </TextCell>
            </Box>
          );
        },
        header: () => <Box>Title</Box>,
        footer: (props) => props.column.id,
        size: 200,
      }),
      columnHelper.accessor('description', {
        cell: (props) => {
          return <TextCell>{props.row.original.description}</TextCell>;
        },
        header: () => <span>Description</span>,
        footer: (props) => props.column.id,
        size: 400,
      }),
      columnHelper.accessor('price', {
        cell: (props) => {
          return <TextCell>{props.row.original.price}</TextCell>;
        },
        header: () => <span>Price</span>,
        footer: () => <span>Price</span>,
        size: 100,
      }),
      columnHelper.accessor('stock', {
        cell: (props) => {
          return <TextCell>{props.row.original.stock}</TextCell>;
        },
        header: () => <span>Stock</span>,
        footer: () => <span>Stock</span>,
        size: 80,
      }),
    ],
  }),
];

// Client-side skeleton example with manual loading control
const ClientSideSkeletonExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const datatable = useDataTable({
    default: {
      sorting: [{ id: 'title', desc: false }],
      pagination: { pageSize: 10, pageIndex: 0 },
    },
  });

  return (
    <Provider>
      <Box>
        <Flex gap="4" mb="4" alignItems="center">
          <Button onClick={() => setIsLoading(!isLoading)}>
            {isLoading ? 'Stop Loading' : 'Start Loading'}
          </Button>
          <Text>
            {isLoading
              ? 'Showing skeleton loading state...'
              : 'Showing actual data'}
          </Text>
        </Flex>
        <DataTable columns={columns} data={data} {...datatable}>
          <DefaultTable
            isLoading={isLoading}
            tableBodyProps={{ showSelector: true }}
            tableHeaderProps={{ showSelector: true }}
          />
        </DataTable>
      </Box>
    </Provider>
  );
};

// Example with different page sizes
const DifferentPageSizeExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const datatable = useDataTable({
    default: {
      sorting: [{ id: 'title', desc: false }],
      pagination: { pageSize, pageIndex: 0 },
    },
  });

  return (
    <Provider>
      <Box>
        <Flex gap="4" mb="4" alignItems="center" flexWrap="wrap">
          <Button onClick={() => setIsLoading(!isLoading)}>
            {isLoading ? 'Stop Loading' : 'Start Loading'}
          </Button>
          <Button
            onClick={() => setPageSize(pageSize === 5 ? 10 : 5)}
            variant="outline"
          >
            Toggle Page Size ({pageSize})
          </Button>
          <Text fontSize="sm" color="gray.600">
            Skeleton rows match page size: {pageSize}
          </Text>
        </Flex>
        <DataTable columns={columns} data={data} {...datatable}>
          <DefaultTable isLoading={isLoading} />
        </DataTable>
      </Box>
    </Provider>
  );
};

// Example with greedy variant
const GreedyVariantExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const datatable = useDataTable({
    default: {
      sorting: [{ id: 'title', desc: false }],
      pagination: { pageSize: 8, pageIndex: 0 },
    },
  });

  return (
    <Provider>
      <Box>
        <Flex gap="4" mb="4" alignItems="center">
          <Button onClick={() => setIsLoading(!isLoading)}>
            {isLoading ? 'Stop Loading' : 'Start Loading'}
          </Button>
          <Text fontSize="sm" color="gray.600">
            Greedy variant (no column resizing)
          </Text>
        </Flex>
        <DataTable columns={columns} data={data} {...datatable}>
          <DefaultTable
            variant="greedy"
            isLoading={isLoading}
            tableBodyProps={{ showSelector: true }}
            tableHeaderProps={{ showSelector: true }}
          />
        </DataTable>
      </Box>
    </Provider>
  );
};

// Example simulating async loading
const AsyncLoadingExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedData, setLoadedData] = useState<Product[]>([]);
  const datatable = useDataTable({
    default: {
      sorting: [{ id: 'title', desc: false }],
      pagination: { pageSize: 10, pageIndex: 0 },
    },
  });

  const simulateLoad = () => {
    setIsLoading(true);
    setLoadedData([]);
    // Simulate API call
    setTimeout(() => {
      setLoadedData(data);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Provider>
      <Box>
        <Flex gap="4" mb="4" alignItems="center">
          <Button onClick={simulateLoad} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Reload Data'}
          </Button>
          <Text>
            {isLoading
              ? 'Loading data (showing skeleton)...'
              : `Loaded ${loadedData.length} items`}
          </Text>
        </Flex>
        <DataTable columns={columns} data={loadedData} {...datatable}>
          <DefaultTable isLoading={isLoading} />
        </DataTable>
      </Box>
    </Provider>
  );
};

export const ClientSideManualControl: Story = {
  render: () => <ClientSideSkeletonExample />,
};

export const DifferentPageSizes: Story = {
  render: () => <DifferentPageSizeExample />,
};

export const GreedyVariant: Story = {
  render: () => <GreedyVariantExample />,
};

export const AsyncLoadingSimulation: Story = {
  render: () => <AsyncLoadingExample />,
};
