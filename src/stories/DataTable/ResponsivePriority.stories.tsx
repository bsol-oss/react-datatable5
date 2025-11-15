import { Provider } from '@/components/ui/provider';
import { Box, Text, Badge } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useDataTable } from '../../components/DataTable/useDataTable';
import { DataTable, DefaultTable, TextCell } from '../../index';
import { data, Product } from '../product_data';

const meta = {
  title: 'react-datatable5/DataTable/Responsive Priority',
  component: DefaultTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Demonstrates responsive column hiding with priority system. When canResize={false}, columns automatically hide based on container width. Lower priority numbers hide first. Resize the container width to see columns hide/show automatically.',
      },
    },
  },
} satisfies Meta<typeof DefaultTable>;

type Story = StoryObj<typeof meta>;

export default meta;

const ResponsivePriorityDemo = () => {
  const datatable = useDataTable({
    default: { sorting: [{ id: 'title', desc: false }] },
  });

  const columnHelper = createColumnHelper<Product>();

  const columns: ColumnDef<Product>[] = [
    // ID column - High priority (10), should stay visible longer
    columnHelper.accessor('id', {
      cell: (props) => {
        return (
          <Box>
            <TextCell>{props.row.original.id}</TextCell>
            <Badge size="sm" colorPalette="blue" marginTop="0.25rem">
              Priority: 10
            </Badge>
          </Box>
        );
      },
      header: () => (
        <Box>
          <Text>ID</Text>
          <Badge size="sm" colorPalette="blue" marginTop="0.25rem">
            Priority: 10
          </Badge>
        </Box>
      ),
      size: 120,
      meta: {
        responsivePriority: 10, // High priority - stays visible
      },
    }),

    // Title column - High priority (10), should stay visible longer
    columnHelper.accessor('title', {
      cell: (props) => {
        return (
          <Box>
            <TextCell>{props.row.original.title}</TextCell>
            <Badge size="sm" colorPalette="blue" marginTop="0.25rem">
              Priority: 10
            </Badge>
          </Box>
        );
      },
      header: () => (
        <Box>
          <Text>Title</Text>
          <Badge size="sm" colorPalette="blue" marginTop="0.25rem">
            Priority: 10
          </Badge>
        </Box>
      ),
      size: 200,
      meta: {
        responsivePriority: 10, // High priority - stays visible
      },
    }),

    // Price column - Medium priority (5)
    columnHelper.accessor('price', {
      cell: (props) => {
        return (
          <Box>
            <TextCell>${props.row.original.price}</TextCell>
            <Badge size="sm" colorPalette="orange" marginTop="0.25rem">
              Priority: 5
            </Badge>
          </Box>
        );
      },
      header: () => (
        <Box>
          <Text>Price</Text>
          <Badge size="sm" colorPalette="orange" marginTop="0.25rem">
            Priority: 5
          </Badge>
        </Box>
      ),
      size: 120,
      meta: {
        responsivePriority: 5, // Medium priority
      },
    }),

    // Rating column - Medium priority (5)
    columnHelper.accessor('rating', {
      cell: (props) => {
        return (
          <Box>
            <TextCell>{props.row.original.rating}</TextCell>
            <Badge size="sm" colorPalette="orange" marginTop="0.25rem">
              Priority: 5
            </Badge>
          </Box>
        );
      },
      header: () => (
        <Box>
          <Text>Rating</Text>
          <Badge size="sm" colorPalette="orange" marginTop="0.25rem">
            Priority: 5
          </Badge>
        </Box>
      ),
      size: 120,
      meta: {
        responsivePriority: 5, // Medium priority
      },
    }),

    // Stock column - Low priority (1), hides first
    columnHelper.accessor('stock', {
      cell: (props) => {
        return (
          <Box>
            <TextCell>{props.row.original.stock}</TextCell>
            <Badge size="sm" colorPalette="red" marginTop="0.25rem">
              Priority: 1
            </Badge>
          </Box>
        );
      },
      header: () => (
        <Box>
          <Text>Stock</Text>
          <Badge size="sm" colorPalette="red" marginTop="0.25rem">
            Priority: 1
          </Badge>
        </Box>
      ),
      size: 120,
      meta: {
        responsivePriority: 1, // Low priority - hides first
      },
    }),

    // Brand column - Low priority (1), hides first
    columnHelper.accessor('brand', {
      cell: (props) => {
        return (
          <Box>
            <TextCell>{props.row.original.brand}</TextCell>
            <Badge size="sm" colorPalette="red" marginTop="0.25rem">
              Priority: 1
            </Badge>
          </Box>
        );
      },
      header: () => (
        <Box>
          <Text>Brand</Text>
          <Badge size="sm" colorPalette="red" marginTop="0.25rem">
            Priority: 1
          </Badge>
        </Box>
      ),
      size: 150,
      meta: {
        responsivePriority: 1, // Low priority - hides first
      },
    }),

    // Category column - Low priority (1), hides first
    columnHelper.accessor('category', {
      cell: (props) => {
        return (
          <Box>
            <TextCell>{props.row.original.category}</TextCell>
            <Badge size="sm" colorPalette="red" marginTop="0.25rem">
              Priority: 1
            </Badge>
          </Box>
        );
      },
      header: () => (
        <Box>
          <Text>Category</Text>
          <Badge size="sm" colorPalette="red" marginTop="0.25rem">
            Priority: 1
          </Badge>
        </Box>
      ),
      size: 150,
      meta: {
        responsivePriority: 1, // Low priority - hides first
      },
    }),

    // Description column - No priority (Infinity), never auto-hides
    columnHelper.accessor('description', {
      cell: (props) => {
        return (
          <Box>
            <TextCell>{props.row.original.description}</TextCell>
            <Badge size="sm" colorPalette="green" marginTop="0.25rem">
              No Priority (Never hides)
            </Badge>
          </Box>
        );
      },
      header: () => (
        <Box>
          <Text>Description</Text>
          <Badge size="sm" colorPalette="green" marginTop="0.25rem">
            No Priority (Never hides)
          </Badge>
        </Box>
      ),
      size: 300,
      // No responsivePriority = Infinity (never auto-hides)
    }),
  ];

  return (
    <Box width="100%" height="600px">
      <Box marginBottom="1rem" padding="1rem" bg="bg.subtle" borderRadius="md">
        <Text fontSize="lg" fontWeight="bold" marginBottom="0.5rem">
          Responsive Column Hiding with Priority
        </Text>
        <Text fontSize="sm" marginBottom="0.5rem">
          This table has <code>canResize={false}</code>, so columns
          automatically hide when the container is too narrow.
        </Text>
        <Text fontSize="sm" marginBottom="0.5rem">
          <strong>Priority system:</strong>
        </Text>
        <Box as="ul" fontSize="sm" paddingLeft="1.5rem">
          <li>
            <Badge size="sm" colorPalette="red">
              Priority: 1
            </Badge>{' '}
            - Hides first (lowest priority)
          </li>
          <li>
            <Badge size="sm" colorPalette="orange">
              Priority: 5
            </Badge>{' '}
            - Medium priority
          </li>
          <li>
            <Badge size="sm" colorPalette="blue">
              Priority: 10
            </Badge>{' '}
            - High priority (stays visible longer)
          </li>
          <li>
            <Badge size="sm" colorPalette="green">
              No Priority
            </Badge>{' '}
            - Never auto-hides (Infinity priority)
          </li>
        </Box>
        <Text fontSize="sm" marginTop="0.5rem" fontStyle="italic">
          Try resizing the browser window or container to see columns hide/show
          automatically based on their priority.
        </Text>
      </Box>

      <DataTable {...datatable} columns={columns} data={data.slice(0, 10)}>
        <DefaultTable
          variant="greedy"
          controlProps={{
            showView: true,
            showPagination: true,
            showPageSizeControl: true,
          }}
        />
      </DataTable>
    </Box>
  );
};

export const WithPriority: Story = {
  render: () => (
    <Provider>
      <ResponsivePriorityDemo />
    </Provider>
  ),
};
