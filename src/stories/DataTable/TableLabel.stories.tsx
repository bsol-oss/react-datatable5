import { Box, Flex, Text, VStack, HStack, Separator } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../../components/DataTable/DataTable';
import { useDataTable } from '../../components/DataTable/useDataTable';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { data, Product } from '../product_data';
import {
  TableControls,
  TableHeader,
  TableBody,
  TableFooter,
  Table as TableWithData,
  ViewDialog,
  FilterDialog,
  ReloadButton,
  ResetSelectionButton,
  ResetSortingButton,
  GlobalFilter,
} from '../../index';
import { DataTableLabel } from '../../components/DataTable/context/DataTableContext';

const meta = {
  title: 'react-datatable5/DataTable/TableLabel',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component:
          "The `tableLabel` prop allows you to customize all text labels used throughout the DataTable components. This is useful for internationalization (i18n) or customizing the UI text to match your application's design language.",
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof DataTable>;

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
      ],
    },
  }),
  columnHelper.accessor('price', {
    header: () => <span>Price</span>,
    meta: {
      displayName: 'Price',
      filterVariant: 'range',
      filterRangeConfig: {
        min: 0,
        max: 2000,
        step: 10,
        defaultValue: [0, 2000],
      },
    },
  }),
  columnHelper.accessor('stock', {
    header: () => <span>In Stock</span>,
    meta: {
      displayName: 'In Stock',
      filterVariant: 'boolean',
    },
    cell: (props) => (props.row.original.stock > 0 ? 'Yes' : 'No'),
  }),
];

// Default labels (as defined in DataTable component)
const defaultLabels: DataTableLabel = {
  view: 'View',
  edit: 'Edit',
  filterButtonText: 'Filter',
  filterTitle: 'Filter',
  filterReset: 'Reset',
  filterClose: 'Close',
  reloadTooltip: 'Reload',
  reloadButtonText: 'Reload',
  resetSelection: 'Reset Selection',
  resetSorting: 'Reset Sorting',
  rowCountText: 'Row Count',
  hasErrorText: 'Has Error',
  globalFilterPlaceholder: 'Search',
  trueLabel: 'True',
  falseLabel: 'False',
};

// Custom labels example
const customLabels: DataTableLabel = {
  view: '查看',
  edit: '編輯',
  filterButtonText: '篩選',
  filterTitle: '篩選條件',
  filterReset: '重置',
  filterClose: '關閉',
  reloadTooltip: '重新載入',
  reloadButtonText: '重新載入',
  resetSelection: '清除選擇',
  resetSorting: '清除排序',
  rowCountText: '總行數',
  hasErrorText: '發生錯誤',
  globalFilterPlaceholder: '搜尋...',
  trueLabel: '是',
  falseLabel: '否',
};

export const DefaultLabels: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        pagination: { pageIndex: 0, pageSize: 10 },
        sorting: [{ id: 'title', desc: false }],
        columnFilters: [{ id: 'brand', value: 'Apple' }],
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Default Labels
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                This example shows the DataTable with default English labels.
                All labels use the default values defined in the component.
              </Text>
            </Box>

            <DataTable
              columns={columns}
              data={data}
              {...datatable}
              tableLabel={defaultLabels}
            >
              <TableControls
                showGlobalFilter
                showFilter
                showReload
                showView
                showFilterTags
                showPageCountText
              >
                <TableWithData>
                  <TableHeader canResize />
                  <TableBody />
                  <TableFooter />
                </TableWithData>
              </TableControls>
            </DataTable>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                Label Usage:
              </Text>
              <VStack align="stretch" gap={1} fontSize="xs" color="fg.muted">
                <Text>
                  • <strong>view</strong>: Used in ViewDialog button and title
                </Text>
                <Text>
                  • <strong>filterButtonText</strong>: Filter button text
                </Text>
                <Text>
                  • <strong>filterTitle</strong>: Filter dialog title
                </Text>
                <Text>
                  • <strong>filterReset</strong>: Reset filters button
                </Text>
                <Text>
                  • <strong>filterClose</strong>: Close filter dialog button
                </Text>
                <Text>
                  • <strong>reloadTooltip</strong>: Tooltip for reload icon
                  button
                </Text>
                <Text>
                  • <strong>reloadButtonText</strong>: Text for reload button
                </Text>
                <Text>
                  • <strong>resetSelection</strong>: Reset row selection button
                </Text>
                <Text>
                  • <strong>resetSorting</strong>: Reset sorting button
                </Text>
                <Text>
                  • <strong>rowCountText</strong>: Label before row count number
                </Text>
                <Text>
                  • <strong>hasErrorText</strong>: Tooltip for error icon
                </Text>
                <Text>
                  • <strong>globalFilterPlaceholder</strong>: Search input
                  placeholder
                </Text>
                <Text>
                  • <strong>trueLabel/falseLabel</strong>: Labels for boolean
                  filters
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Provider>
    );
  },
};

export const CustomLabels: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        pagination: { pageIndex: 0, pageSize: 10 },
        sorting: [{ id: 'title', desc: false }],
        columnFilters: [{ id: 'brand', value: 'Apple' }],
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Custom Labels (Traditional Chinese)
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                This example demonstrates custom labels in Traditional Chinese.
                All labels have been customized via the `tableLabel` prop.
              </Text>
            </Box>

            <DataTable
              columns={columns}
              data={data}
              {...datatable}
              tableLabel={customLabels}
            >
              <TableControls
                showGlobalFilter
                showFilter
                showReload
                showView
                showFilterTags
                showPageCountText
              >
                <TableWithData>
                  <TableHeader canResize />
                  <TableBody />
                  <TableFooter />
                </TableWithData>
              </TableControls>
            </DataTable>
          </VStack>
        </Box>
      </Provider>
    );
  },
};

export const IndividualComponents: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        pagination: { pageIndex: 0, pageSize: 10 },
        sorting: [{ id: 'title', desc: false }],
        rowSelection: { '0': true, '1': true },
      },
    });

    const componentLabels: DataTableLabel = {
      ...defaultLabels,
      view: 'View Columns',
      filterButtonText: 'Open Filters',
      reloadButtonText: 'Refresh Data',
      resetSelection: 'Clear All Selections',
      resetSorting: 'Clear Sort',
      globalFilterPlaceholder: 'Type to search...',
    };

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={6}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Individual Component Labels
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                This example shows how different components use the tableLabel
                values. Each component is displayed separately to demonstrate
                their specific label usage.
              </Text>
            </Box>

            <DataTable
              columns={columns}
              data={data}
              {...datatable}
              tableLabel={componentLabels}
            >
              <VStack align="stretch" gap={4}>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    View Dialog (uses: view)
                  </Text>
                  <ViewDialog />
                </Box>

                <Separator />

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Filter Dialog (uses: filterButtonText, filterTitle,
                    filterReset, filterClose)
                  </Text>
                  <FilterDialog />
                </Box>

                <Separator />

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Reload Button (uses: reloadTooltip, reloadButtonText)
                  </Text>
                  <HStack>
                    <ReloadButton variant="icon" />
                    <Text fontSize="xs" color="fg.muted">
                      (icon variant with tooltip)
                    </Text>
                  </HStack>
                  <HStack mt={2}>
                    <ReloadButton variant="button" />
                    <Text fontSize="xs" color="fg.muted">
                      (button variant with text)
                    </Text>
                  </HStack>
                </Box>

                <Separator />

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Reset Buttons
                  </Text>
                  <HStack gap={2}>
                    <Box>
                      <Text fontSize="xs" color="fg.muted" mb={1}>
                        Reset Selection (uses: resetSelection)
                      </Text>
                      <ResetSelectionButton />
                    </Box>
                    <Box>
                      <Text fontSize="xs" color="fg.muted" mb={1}>
                        Reset Sorting (uses: resetSorting)
                      </Text>
                      <ResetSortingButton />
                    </Box>
                  </HStack>
                </Box>

                <Separator />

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Global Filter (uses: globalFilterPlaceholder)
                  </Text>
                  <GlobalFilter />
                </Box>

                <Separator />

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Table Controls (uses: rowCountText, hasErrorText)
                  </Text>
                  <TableControls showPageCountText>
                    <TableWithData>
                      <TableHeader canResize />
                      <TableBody />
                      <TableFooter />
                    </TableWithData>
                  </TableControls>
                </Box>
              </VStack>
            </DataTable>
          </VStack>
        </Box>
      </Provider>
    );
  },
};

export const BooleanFilterLabels: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        pagination: { pageIndex: 0, pageSize: 10 },
      },
    });

    const booleanLabels: DataTableLabel = {
      ...defaultLabels,
      trueLabel: 'In Stock',
      falseLabel: 'Out of Stock',
    };

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Boolean Filter Labels
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                This example demonstrates how `trueLabel` and `falseLabel` are
                used in boolean filters. The "In Stock" column uses a boolean
                filter with custom labels.
              </Text>
            </Box>

            <DataTable
              columns={columns}
              data={data}
              {...datatable}
              tableLabel={booleanLabels}
            >
              <TableControls showFilter showFilterTags>
                <TableWithData>
                  <TableHeader canResize />
                  <TableBody />
                  <TableFooter />
                </TableWithData>
              </TableControls>
            </DataTable>

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                How to use:
              </Text>
              <Text fontSize="xs" color="fg.muted">
                Open the Filter dialog and look for the "In Stock" filter. The
                boolean options will show "In Stock" and "Out of Stock" instead
                of "True" and "False".
              </Text>
            </Box>
          </VStack>
        </Box>
      </Provider>
    );
  },
};

export const Comparison: Story = {
  render: () => {
    const datatable1 = useDataTable({
      default: {
        pagination: { pageIndex: 0, pageSize: 5 },
        sorting: [{ id: 'title', desc: false }],
      },
    });

    const datatable2 = useDataTable({
      default: {
        pagination: { pageIndex: 0, pageSize: 5 },
        sorting: [{ id: 'title', desc: false }],
      },
    });

    return (
      <Provider>
        <Box p={4}>
          <VStack align="stretch" gap={6}>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Side-by-Side Comparison
              </Text>
              <Text fontSize="sm" color="fg.muted" mb={4}>
                Compare default English labels (left) with custom Traditional
                Chinese labels (right).
              </Text>
            </Box>

            <Flex gap={4} direction={{ base: 'column', lg: 'row' }}>
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Default Labels (English)
                </Text>
                <DataTable
                  columns={columns}
                  data={data}
                  {...datatable1}
                  tableLabel={defaultLabels}
                >
                  <TableControls
                    showGlobalFilter
                    showFilter
                    showView
                    showPageCountText
                  >
                    <TableWithData>
                      <TableHeader canResize />
                      <TableBody />
                      <TableFooter />
                    </TableWithData>
                  </TableControls>
                </DataTable>
              </Box>

              <Box flex={1}>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Custom Labels (Traditional Chinese)
                </Text>
                <DataTable
                  columns={columns}
                  data={data}
                  {...datatable2}
                  tableLabel={customLabels}
                >
                  <TableControls
                    showGlobalFilter
                    showFilter
                    showView
                    showPageCountText
                  >
                    <TableWithData>
                      <TableHeader canResize />
                      <TableBody />
                      <TableFooter />
                    </TableWithData>
                  </TableControls>
                </DataTable>
              </Box>
            </Flex>
          </VStack>
        </Box>
      </Provider>
    );
  },
};
