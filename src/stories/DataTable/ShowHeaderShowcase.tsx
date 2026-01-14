import { Provider } from '@/components/ui/provider';
import { Box, Text, VStack } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useDataTable } from '../../components/DataTable/useDataTable';
import { DataTable, DefaultTable, TextCell } from '../../index';
import { data, Product } from '../product_data';

const ShowHeaderShowcase = () => {
  const datatable = useDataTable({
    default: { sorting: [{ id: 'title', desc: false }] },
  });

  const columnHelper = createColumnHelper<Product>();
  const columns: ColumnDef<Product>[] = [
    columnHelper.accessor('id', {
      cell: (props) => {
        return <TextCell>{props.row.original.id}</TextCell>;
      },
      header: () => <span>Id</span>,
      size: 50,
    }),
    columnHelper.accessor('title', {
      cell: (props) => {
        return <TextCell>{props.row.original.title}</TextCell>;
      },
      header: () => <span>Title</span>,
      size: 200,
    }),
    columnHelper.accessor('description', {
      cell: (props) => {
        return <TextCell>{props.row.original.description}</TextCell>;
      },
      header: () => <span>Description</span>,
      size: 400,
    }),
    columnHelper.accessor('price', {
      cell: (props) => {
        return <TextCell>${props.row.original.price}</TextCell>;
      },
      header: () => <span>Price</span>,
      size: 100,
    }),
    columnHelper.accessor('brand', {
      cell: (props) => {
        return <TextCell>{props.row.original.brand}</TextCell>;
      },
      header: () => <span>Brand</span>,
      size: 120,
    }),
  ];

  const columnsWithAlignEnd: ColumnDef<Product>[] = [
    columnHelper.accessor('id', {
      cell: (props) => {
        return <TextCell alignEnd>{props.row.original.id}</TextCell>;
      },
      header: () => <span>Id</span>,
      size: 50,
    }),
    columnHelper.accessor('title', {
      cell: (props) => {
        return <TextCell>{props.row.original.title}</TextCell>;
      },
      header: () => <span>Title</span>,
      size: 200,
    }),
    columnHelper.accessor('description', {
      cell: (props) => {
        return <TextCell>{props.row.original.description}</TextCell>;
      },
      header: () => <span>Description</span>,
      size: 400,
    }),
    columnHelper.accessor('price', {
      cell: (props) => {
        return <TextCell alignEnd>${props.row.original.price}</TextCell>;
      },
      header: () => <span>Price</span>,
      size: 100,
    }),
    columnHelper.accessor('stock', {
      cell: (props) => {
        return <TextCell alignEnd>{props.row.original.stock}</TextCell>;
      },
      header: () => <span>Stock</span>,
      size: 100,
    }),
    columnHelper.accessor('rating', {
      cell: (props) => {
        return <TextCell alignEnd>{props.row.original.rating}</TextCell>;
      },
      header: () => <span>Rating</span>,
      size: 100,
    }),
  ];

  return (
    <Provider>
      <VStack gap={8} align="stretch" padding={4}>
        <Box>
          <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
            Default Table (with header - showHeader=true)
          </Text>
          <DataTable columns={columns} data={data} {...datatable}>
            <DefaultTable showHeader={true} />
          </DataTable>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
            Table without Header (showHeader=false)
          </Text>
          <DataTable columns={columns} data={data} {...datatable}>
            <DefaultTable showHeader={false} />
          </DataTable>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
            Table with Header and Footer (showHeader=true, showFooter=true)
          </Text>
          <DataTable columns={columns} data={data} {...datatable}>
            <DefaultTable showHeader={true} showFooter={true} />
          </DataTable>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
            Table without Header but with Footer (showHeader=false,
            showFooter=true)
          </Text>
          <DataTable columns={columns} data={data} {...datatable}>
            <DefaultTable showHeader={false} showFooter={true} />
          </DataTable>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
            Table with TextCell alignEnd prop (Price, Stock, Rating aligned
            right)
          </Text>
          <DataTable columns={columnsWithAlignEnd} data={data} {...datatable}>
            <DefaultTable showHeader={true} />
          </DataTable>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
            Table with alignEnd and without Header
          </Text>
          <DataTable columns={columnsWithAlignEnd} data={data} {...datatable}>
            <DefaultTable showHeader={false} />
          </DataTable>
        </Box>
      </VStack>
    </Provider>
  );
};

export default ShowHeaderShowcase;
