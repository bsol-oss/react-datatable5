import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useDataTable } from '../../components/DataTable/useDataTable';
import {
  DataTable,
  FilterDialog,
  ViewDialog,
  GlobalFilter,
  PageSizeControl,
  RowCountText,
  Table,
  TableBody,
  TableComponent,
  TableFilter,
  TableFooter,
  TableHeader,
  Pagination,
  TableSelector,
  TextCell,
} from '../../index';
import { data, Product } from '../product_data';
import { Provider } from '@/components/ui/provider';

const RowActions = () => {
  return <>has no actions</>;
};

const TableViewShowcase = () => {
  const datatable = useDataTable({
    default: {
      sorting: [{ id: 'title', desc: false }],
      columnVisibility: { description: false },
    },
  });
  const columnHelper = createColumnHelper<Product>();
  const columns: ColumnDef<Product>[] = [
    // Display Column
    columnHelper.display({
      id: 'actions',
      header: () => <span>Actions</span>,
      cell: () => <RowActions />,
    }),

    // Grouping Column
    columnHelper.group({
      header: 'Information',
      footer: () => <span>Information</span>,
      columns: [
        columnHelper.accessor('id', {
          cell: (props) => {
            return <TextCell>{props.row.original.id}</TextCell>;
          },
          header: () => <span>Id</span>,
          footer: () => <span>Id</span>,
          size: 50,
        }),
        columnHelper.accessor('title', {
          cell: (props) => {
            return (
              <Box padding={'0rem'}>
                <TextCell label={props.row.original.title}>
                  {props.row.original.title}
                </TextCell>
              </Box>
            );
          },
          header: () => <Box>Title</Box>,
          footer: () => <Box>Title</Box>,
          size: 200,
        }),
        // Accessor Column
        columnHelper.accessor('description', {
          cell: (props) => {
            return <TextCell>{props.row.original.description}</TextCell>;
          },
          header: () => <span>Description</span>,
          footer: () => <span>Description</span>,
          size: 400,
        }),
        columnHelper.accessor('price', {
          cell: (props) => {
            return <TextCell>{props.row.original.price}</TextCell>;
          },
          header: () => <span>price</span>,
          footer: () => <span>price</span>,
          size: 100,
          filterFn: (row, columnId, filterValue) => {
            console.log(row, columnId, filterValue);
            const [min, max] = filterValue;
            return min < row.original.price && max > row.original.price;
          },
          meta: {
            filterVariant: 'range',
            filterRangeConfig: {
              min: -15,
              max: 10000,
              step: 100,
              defaultValue: [10, 1050],
            },
          },
        }),
      ],
    }),
  ];

  return (
    <Provider>
      <DataTable columns={columns} data={data} {...datatable}>
        <Flex>
          <Pagination />
          <ViewDialog />
          <FilterDialog />
          <PageSizeControl />
          <TableSelector />
          <GlobalFilter />
          <Text paddingRight="0.5rem">Total:</Text>
          <RowCountText />
        </Flex>
        <Grid gridTemplateColumns={'repeat(auto-fit, minmax(20rem, 1fr))'}>
          <TableFilter />
        </Grid>
        <Table>
          <TableHeader canResize />
          <TableBody />
          <TableFooter />
        </Table>
        <PageSizeControl />
        <Pagination />
        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
      </DataTable>
    </Provider>
  );
};

export default TableViewShowcase;
