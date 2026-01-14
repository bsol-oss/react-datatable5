import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../../components/DataTable/DataTable';
import {
  FilterDialog,
  ViewDialog,
  GlobalFilter,
  PageSizeControl,
  RowCountText,
  Table,
  TableBody,
  TableCards,
  TableComponent,
  TableFilter,
  TableFooter,
  TableHeader,
  Pagination,
  TableSelector,
  ResetSelectionButton,
  SelectAllRowsToggle,
  TextCell,
  useDataTable,
  useDataTableContext,
} from '../../index';
import { data, Product } from '../product_data';
import { Provider } from '@/components/ui/provider';
import {
  getSelectedRowCount,
  getSelectedRows,
  areAllRowsSelected,
  areAllPageRowsSelected,
} from '../../components/DataTable/utils/selectors';

export default {
  title: 'react-datatable5/DataTable/CustomSelectors',
  component: DataTable,
};

/**
 * Selection Info Component - Demonstrates custom selector utilities
 */
const SelectionInfo = () => {
  const { table, rowSelection } = useDataTableContext<Product>();
  const selectedCount = getSelectedRowCount(table, rowSelection);
  const selectedRows = getSelectedRows(table, rowSelection);
  const allSelected = areAllRowsSelected(table, rowSelection);
  const allPageSelected = areAllPageRowsSelected(table, rowSelection);

  return (
    <Box
      padding="1rem"
      bg="colorPalette.100"
      _dark={{ bg: 'colorPalette.900' }}
      borderRadius="md"
      marginBottom="1rem"
    >
      <Text fontWeight="bold" marginBottom="0.5rem">
        Custom Selector State (Using Custom Selectors):
      </Text>
      <Grid templateColumns="repeat(2, 1fr)" gap="0.5rem" fontSize="sm">
        <Text>
          <strong>Selected Count:</strong> {selectedCount}
        </Text>
        <Text>
          <strong>All Rows Selected:</strong> {allSelected ? 'Yes' : 'No'}
        </Text>
        <Text>
          <strong>All Page Rows Selected:</strong>{' '}
          {allPageSelected ? 'Yes' : 'No'}
        </Text>
        <Text>
          <strong>Total Rows:</strong> {table.getRowModel().rows.length}
        </Text>
      </Grid>
      {selectedRows.length > 0 && (
        <Box marginTop="0.5rem">
          <Text fontWeight="bold" fontSize="sm" marginBottom="0.25rem">
            Selected Row IDs:
          </Text>
          <Text fontSize="xs" fontFamily="mono">
            {selectedRows.map((row) => row.id).join(', ')}
          </Text>
        </Box>
      )}
    </Box>
  );
};

const columnHelper = createColumnHelper<Product>();

const columns: ColumnDef<Product>[] = [
  columnHelper.accessor('id', {
    cell: (props) => {
      return <TextCell>{props.row.original.id}</TextCell>;
    },
    header: () => <span>ID</span>,
    size: 80,
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
    size: 200,
  }),
  columnHelper.accessor('price', {
    cell: (props) => {
      return <TextCell>${props.row.original.price}</TextCell>;
    },
    header: () => <span>Price</span>,
    size: 100,
  }),
  columnHelper.accessor('stock', {
    cell: (props) => {
      return <TextCell>{props.row.original.stock}</TextCell>;
    },
    header: () => <span>Stock</span>,
    size: 100,
  }),
  columnHelper.accessor('category', {
    cell: (props) => {
      return <TextCell>{props.row.original.category}</TextCell>;
    },
    header: () => <span>Category</span>,
    size: 150,
  }),
];

/**
 * Table View with Custom Selectors
 * Demonstrates row selection using custom selector utilities
 */
export const TableViewWithCustomSelectors = () => {
  const datatable = useDataTable({
    default: {
      pagination: { pageIndex: 0, pageSize: 10 },
      sorting: [{ id: 'title', desc: false }],
    },
  });

  return (
    <Provider>
      <DataTable columns={columns} data={data} {...datatable}>
        <SelectionInfo />
        <Flex gap="0.5rem" marginBottom="1rem" flexWrap="wrap">
          <Pagination />
          <ViewDialog />
          <FilterDialog />
          <PageSizeControl />
          <TableSelector />
          <SelectAllRowsToggle />
          <ResetSelectionButton />
          <GlobalFilter />
          <Text paddingRight="0.5rem">Total:</Text>
          <RowCountText />
        </Flex>
        <Grid gridTemplateColumns={'repeat(auto-fit, minmax(20rem, 1fr))'}>
          <TableFilter />
        </Grid>
        <Table>
          <TableHeader canResize showSelector />
          <TableBody showSelector />
          <TableFooter showSelector />
        </Table>
        <PageSizeControl />
        <Pagination />
      </DataTable>
    </Provider>
  );
};

/**
 * Card View with Custom Selectors
 * Demonstrates row selection in card view using custom selector utilities
 */
export const CardViewWithCustomSelectors = () => {
  const datatable = useDataTable({
    default: {
      pagination: { pageIndex: 0, pageSize: 6 },
      sorting: [{ id: 'title', desc: false }],
    },
  });

  return (
    <Provider>
      <DataTable columns={columns} data={data} {...datatable}>
        <SelectionInfo />
        <Flex gap="0.5rem" marginBottom="1rem" flexWrap="wrap">
          <Pagination />
          <PageSizeControl />
          <TableSelector />
          <SelectAllRowsToggle />
          <ResetSelectionButton />
          <GlobalFilter />
          <Text paddingRight="0.5rem">Total:</Text>
          <RowCountText />
        </Flex>
        <Grid
          gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap="1rem"
        >
          <TableCards<Product>
            isSelectable={true}
            renderTitle={(row) => (
              <Text fontWeight="bold" fontSize="lg">
                {row.original.title}
              </Text>
            )}
          />
        </Grid>
        <PageSizeControl />
        <Pagination />
      </DataTable>
    </Provider>
  );
};

/**
 * Selection State Debug View
 * Shows the raw selection state and demonstrates all custom selector functions
 */
export const SelectionStateDebug = () => {
  const datatable = useDataTable({
    default: {
      pagination: { pageIndex: 0, pageSize: 5 },
    },
  });

  return (
    <Provider>
      <DataTable columns={columns} data={data} {...datatable}>
        <SelectionInfo />
        <Box
          padding="1rem"
          bg="colorPalette.50"
          _dark={{ bg: 'colorPalette.950' }}
          borderRadius="md"
          marginBottom="1rem"
        >
          <Text fontWeight="bold" marginBottom="0.5rem">
            Raw Row Selection State:
          </Text>
          <TableComponent
            render={(table) => {
              const { rowSelection } = table.getState();
              return (
                <Text fontSize="xs" fontFamily="mono" whiteSpace="pre-wrap">
                  {JSON.stringify(rowSelection, null, 2)}
                </Text>
              );
            }}
          />
        </Box>
        <Flex gap="0.5rem" marginBottom="1rem" flexWrap="wrap">
          <Pagination />
          <TableSelector />
          <SelectAllRowsToggle />
          <ResetSelectionButton />
        </Flex>
        <Table>
          <TableHeader canResize showSelector />
          <TableBody showSelector />
        </Table>
        <Pagination />
      </DataTable>
    </Provider>
  );
};

/**
 * Multi-page Selection Demo
 * Demonstrates selection persistence across pages
 */
export const MultiPageSelection = () => {
  const datatable = useDataTable({
    default: {
      pagination: { pageIndex: 0, pageSize: 5 },
    },
  });

  return (
    <Provider>
      <DataTable columns={columns} data={data} {...datatable}>
        <SelectionInfo />
        <Box
          padding="0.75rem"
          bg="blue.50"
          _dark={{ bg: 'blue.950' }}
          borderRadius="md"
          marginBottom="1rem"
        >
          <Text fontSize="sm">
            <strong>Tip:</strong> Select rows on different pages to see
            selection persist across pagination. The custom selectors maintain
            selection state independently of TanStack primitives.
          </Text>
        </Box>
        <Flex gap="0.5rem" marginBottom="1rem" flexWrap="wrap">
          <Pagination />
          <PageSizeControl />
          <TableSelector />
          <SelectAllRowsToggle />
          <ResetSelectionButton />
        </Flex>
        <Table>
          <TableHeader canResize showSelector />
          <TableBody showSelector />
        </Table>
        <Pagination />
      </DataTable>
    </Provider>
  );
};
