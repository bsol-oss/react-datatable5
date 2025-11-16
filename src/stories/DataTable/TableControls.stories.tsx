import { Provider } from '@/components/ui/provider';
import { Box, Text } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DataTable, DefaultTable, TextCell, useDataTable } from '../../index';
import { data, Product } from '../product_data';

const meta = {
  title: 'react-datatable5/DataTable/TableControls',
  component: DefaultTable,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof DefaultTable>;

type Story = StoryObj<typeof meta>;

export default meta;

const columnHelper = createColumnHelper<Product>();

const columns: ColumnDef<Product, unknown>[] = [
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (props) => <TextCell>{props.row.original.title}</TextCell>,
    meta: {
      displayName: 'Title',
    },
  }),
  columnHelper.accessor('brand', {
    header: () => <span>Brand</span>,
    cell: (props) => <TextCell>{props.row.original.brand}</TextCell>,
    meta: {
      displayName: 'Brand',
    },
  }),
  columnHelper.accessor('category', {
    header: () => <span>Category</span>,
    cell: (props) => <TextCell>{props.row.original.category}</TextCell>,
    meta: {
      displayName: 'Category',
    },
  }),
  columnHelper.accessor('price', {
    header: () => <span>Price</span>,
    cell: (props) => <TextCell>${props.row.original.price}</TextCell>,
    meta: {
      displayName: 'Price',
    },
  }),
  columnHelper.accessor('stock', {
    header: () => <span>Stock</span>,
    cell: (props) => <TextCell>{props.row.original.stock}</TextCell>,
    meta: {
      displayName: 'Stock',
    },
  }),
] as ColumnDef<Product, unknown>[];

export const WithFilterTagsOptions: Story = {
  render: () => {
    const datatable = useDataTable({
      default: { sorting: [{ id: 'title', desc: false }] },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            TableControls with filterTagsOptions
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            The filterTagsOptions prop allows you to add TagFilter components
            for specific columns. Each filter allows single selection (selectOne
            is true) and displays the column's displayName as a label.
          </Text>
          <DataTable columns={columns} data={data} {...datatable}>
            <DefaultTable
              controlProps={{
                filterTagsOptions: [
                  {
                    column: 'category',
                    options: [
                      { label: 'Smartphones', value: 'smartphones' },
                      { label: 'Laptops', value: 'laptops' },
                      { label: 'Fragrances', value: 'fragrances' },
                      { label: 'Skincare', value: 'skincare' },
                      { label: 'Groceries', value: 'groceries' },
                      { label: 'Home Decoration', value: 'home-decoration' },
                    ],
                  },
                ],
              }}
            />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

export const MultipleFilterTagsOptions: Story = {
  render: () => {
    const datatable = useDataTable({
      default: { sorting: [{ id: 'title', desc: false }] },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Multiple filterTagsOptions
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            You can provide multiple filterTagsOptions to filter by different
            columns simultaneously. Each filter is displayed in its own row with
            the column's displayName label.
          </Text>
          <DataTable columns={columns} data={data} {...datatable}>
            <DefaultTable
              controlProps={{
                filterTagsOptions: [
                  {
                    column: 'category',
                    options: [
                      { label: 'Smartphones', value: 'smartphones' },
                      { label: 'Laptops', value: 'laptops' },
                      { label: 'Fragrances', value: 'fragrances' },
                      { label: 'Skincare', value: 'skincare' },
                      { label: 'Groceries', value: 'groceries' },
                      { label: 'Home Decoration', value: 'home-decoration' },
                    ],
                  },
                  {
                    column: 'brand',
                    options: [
                      { label: 'Apple', value: 'Apple' },
                      { label: 'Samsung', value: 'Samsung' },
                      { label: 'OPPO', value: 'OPPO' },
                      { label: 'Huawei', value: 'Huawei' },
                      { label: 'HP Pavilion', value: 'HP Pavilion' },
                      { label: 'Infinix', value: 'Infinix' },
                      {
                        label: 'Microsoft Surface',
                        value: 'Microsoft Surface',
                      },
                    ],
                  },
                ],
              }}
            />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

export const WithOtherControls: Story = {
  render: () => {
    const datatable = useDataTable({
      default: { sorting: [{ id: 'title', desc: false }] },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            filterTagsOptions with other controls
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            filterTagsOptions can be combined with other TableControls features
            like global filter, filter dialog, reload button, and pagination.
          </Text>
          <DataTable columns={columns} data={data} {...datatable}>
            <DefaultTable
              controlProps={{
                showGlobalFilter: true,
                showFilter: true,
                showReload: true,
                filterTagsOptions: [
                  {
                    column: 'category',
                    options: [
                      { label: 'Smartphones', value: 'smartphones' },
                      { label: 'Laptops', value: 'laptops' },
                      { label: 'Fragrances', value: 'fragrances' },
                      { label: 'Skincare', value: 'skincare' },
                      { label: 'Groceries', value: 'groceries' },
                      { label: 'Home Decoration', value: 'home-decoration' },
                    ],
                  },
                ],
              }}
            />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

export const EmptyFilterTagsOptions: Story = {
  render: () => {
    const datatable = useDataTable({
      default: { sorting: [{ id: 'title', desc: false }] },
    });

    return (
      <Provider>
        <Box p={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Empty filterTagsOptions
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            When filterTagsOptions is an empty array or not provided, no tag
            filters are displayed. The table still functions normally with other
            controls.
          </Text>
          <DataTable columns={columns} data={data} {...datatable}>
            <DefaultTable
              controlProps={{
                showGlobalFilter: true,
                showFilter: true,
                filterTagsOptions: [],
              }}
            />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};
