import { CheckboxCard } from '@/components/ui/checkbox-card';
import { DataTable } from '@/components/DataTable/DataTable';
import { TableFilterTags } from '@/components/DataTable/controls/TableFilterTags';
import { useDataTable } from '@/components/DataTable/useDataTable';
import { useDataTableContext } from '@/components/DataTable/context/useDataTableContext';
import { Provider } from '@/components/ui/provider';
import { Box, Flex, Text } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { data, Product } from '../product_data';

const meta = {
  title: 'react-datatable5/DataTable/TableFilterTags',
  component: TableFilterTags,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof TableFilterTags>;

type Story = StoryObj<typeof meta>;

export default meta;

const columnHelper = createColumnHelper<Product>();

const columns: ColumnDef<Product>[] = [
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    meta: {
      displayName: 'Title',
      filterVariant: 'text',
    },
  }),
  columnHelper.accessor('brand', {
    header: () => <span>Brand</span>,
    meta: {
      displayName: 'Brand',
      filterVariant: 'select',
      filterOptions: [
        { label: 'Apple', value: 'Apple' },
        { label: 'Samsung', value: 'Samsung' },
        { label: 'OPPO', value: 'OPPO' },
        { label: 'Huawei', value: 'Huawei' },
      ],
    },
  }),
  columnHelper.accessor('category', {
    header: () => <span>Category</span>,
    meta: {
      displayName: 'Category',
      filterVariant: 'select',
      filterOptions: [
        { label: 'Smartphones', value: 'smartphones' },
        { label: 'Laptops', value: 'laptops' },
        { label: 'Fragrances', value: 'fragrances' },
        { label: 'Skincare', value: 'skincare' },
        { label: 'Groceries', value: 'groceries' },
        { label: 'Home Decoration', value: 'home-decoration' },
      ],
    },
  }),
  columnHelper.accessor('price', {
    header: () => <span>Price</span>,
    meta: {
      displayName: 'Price',
      filterVariant: 'range',
      filterRange: {
        min: 0,
        max: 2000,
        step: 10,
      },
    },
  }),
];

// Helper component to display filtered row count
const FilteredRowCount = () => {
  const { table } = useDataTableContext<Product>();
  return (
    <Text fontSize="xs" color="fg.muted">
      {table.getFilteredRowModel().rows.length} rows filtered
    </Text>
  );
};

// Helper component to display total row count
const TotalRowCount = () => {
  const { table } = useDataTableContext<Product>();
  return (
    <Text fontSize="xs" color="fg.muted">
      {table.getRowModel().rows.length} total rows
    </Text>
  );
};

export const WithActiveFilters: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        columnFilters: [
          { id: 'title', value: 'iPhone' },
          { id: 'brand', value: 'Apple' },
          { id: 'category', value: 'smartphones' },
        ],
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Active Filter Tags (CheckboxCard)
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            Click on a filter card to remove it. The cards use Chakra UI v3
            CheckboxCard component.
          </Text>
          <DataTable columns={columns} data={data} {...datatable}>
            <Flex direction="column" gap={4}>
              <TableFilterTags />
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Table Data:
                </Text>
                <FilteredRowCount />
              </Box>
            </Flex>
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

export const WithMultipleFilters: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        columnFilters: [
          { id: 'brand', value: 'Apple' },
          { id: 'category', value: 'smartphones' },
          { id: 'price', value: [500, 1000] },
        ],
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Multiple Filter Types
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            Shows different filter types including text, select, and range
            filters.
          </Text>
          <DataTable columns={columns} data={data} {...datatable}>
            <Flex direction="column" gap={4}>
              <TableFilterTags />
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Filtered Results:
                </Text>
                <FilteredRowCount />
              </Box>
            </Flex>
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        columnFilters: [],
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            No Active Filters
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            When there are no active filters, the component renders nothing.
          </Text>
          <DataTable columns={columns} data={data} {...datatable}>
            <Flex direction="column" gap={4}>
              <TableFilterTags />
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  All Data:
                </Text>
                <TotalRowCount />
              </Box>
            </Flex>
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

// Interactive filter controls component
const InteractiveFilterControls = () => {
  const { table, setColumnFilters } = useDataTableContext<Product>();

  // Manually set filters to demonstrate interaction
  const addFilter = (columnId: string, value: string) => {
    const currentFilters = table.getState().columnFilters;
    const existingFilter = currentFilters.find((f) => f.id === columnId);

    if (existingFilter) {
      setColumnFilters(
        currentFilters.map((f) => (f.id === columnId ? { ...f, value } : f))
      );
    } else {
      setColumnFilters([...currentFilters, { id: columnId, value }]);
    }
  };

  const currentFilters = table.getState().columnFilters;

  return (
    <Flex gap={2} mb={4} flexWrap="wrap">
      <CheckboxCard
        label="Filter: Brand = Samsung"
        checked={currentFilters.some(
          (f) => f.id === 'brand' && f.value === 'Samsung'
        )}
        onCheckedChange={(details) => {
          if (details.checked) {
            addFilter('brand', 'Samsung');
          } else {
            setColumnFilters(
              currentFilters.filter(
                (f) => !(f.id === 'brand' && f.value === 'Samsung')
              )
            );
          }
        }}
      />
      <CheckboxCard
        label="Filter: Category = laptops"
        checked={currentFilters.some(
          (f) => f.id === 'category' && f.value === 'laptops'
        )}
        onCheckedChange={(details) => {
          if (details.checked) {
            addFilter('category', 'laptops');
          } else {
            setColumnFilters(
              currentFilters.filter(
                (f) => !(f.id === 'category' && f.value === 'laptops')
              )
            );
          }
        }}
      />
    </Flex>
  );
};

export const InteractiveExample: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        columnFilters: [{ id: 'brand', value: 'Apple' }],
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Interactive Filter Tags
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            Add filters using the buttons below, then remove them by clicking
            the filter cards.
          </Text>
          <DataTable columns={columns} data={data} {...datatable}>
            <InteractiveFilterControls />
            <Flex direction="column" gap={4}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Active Filters:
                </Text>
                <TableFilterTags />
              </Box>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Results:
                </Text>
                <FilteredRowCount />
              </Box>
            </Flex>
          </DataTable>
        </Box>
      </Provider>
    );
  },
};
