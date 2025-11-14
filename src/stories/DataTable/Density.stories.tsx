import { Box, Flex, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../../components/DataTable/DataTable';
import {
  DefaultTable,
  DensityToggleButton,
  TextCell,
  useDataTable,
} from '../../index';
import { data, Product } from '../product_data';
import { Provider } from '@/components/ui/provider';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'react-datatable5/DataTable/Density',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const RowActions = () => {
  return <Text fontSize="sm">View</Text>;
};

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
    columns: [
      columnHelper.accessor('id', {
        cell: (props) => {
          return <TextCell>{props.row.original.id}</TextCell>;
        },
        header: () => <span>Id</span>,
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
        size: 200,
      }),
      columnHelper.accessor('description', {
        cell: (props) => {
          return <TextCell>{props.row.original.description}</TextCell>;
        },
        header: () => <span>Description</span>,
        size: 300,
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
        size: 80,
      }),
      columnHelper.accessor('brand', {
        cell: (props) => {
          return <TextCell>{props.row.original.brand}</TextCell>;
        },
        header: () => <span>Brand</span>,
        size: 120,
      }),
    ],
  }),
];

export const DensityToggle: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'title', desc: false }],
        density: 'md',
      },
    });

    return (
      <Provider>
        <Box>
          <Flex gap={4} mb={4} alignItems="center">
            <Text fontWeight="bold">Density Control:</Text>
            <DensityToggleButton />
            <DensityToggleButton text="Toggle Density" />
            <Text fontSize="sm" color="gray.600">
              Current: {datatable.density}
            </Text>
          </Flex>
          <DataTable columns={columns} data={data.slice(0, 10)} {...datatable}>
            <DefaultTable
              tableBodyProps={{ showSelector: true }}
              tableHeaderProps={{ showSelector: true }}
            />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

export const ExtraSmallDensity: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'title', desc: false }],
        density: 'xs',
      },
    });

    return (
      <Provider>
        <Box>
          <Text fontWeight="bold" mb={4}>
            Extra Small Density (xs) - 2px padding
          </Text>
          <DataTable columns={columns} data={data.slice(0, 10)} {...datatable}>
            <DefaultTable
              tableBodyProps={{ showSelector: true }}
              tableHeaderProps={{ showSelector: true }}
            />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

export const SmallDensity: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'title', desc: false }],
        density: 'sm',
      },
    });

    return (
      <Provider>
        <Box>
          <Text fontWeight="bold" mb={4}>
            Small Density (sm) - 4px padding
          </Text>
          <DataTable columns={columns} data={data.slice(0, 10)} {...datatable}>
            <DefaultTable
              tableBodyProps={{ showSelector: true }}
              tableHeaderProps={{ showSelector: true }}
            />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

export const MediumDensity: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'title', desc: false }],
        density: 'md',
      },
    });

    return (
      <Provider>
        <Box>
          <Text fontWeight="bold" mb={4}>
            Medium Density (md) - 8px padding
          </Text>
          <DataTable columns={columns} data={data.slice(0, 10)} {...datatable}>
            <DefaultTable
              tableBodyProps={{ showSelector: true }}
              tableHeaderProps={{ showSelector: true }}
            />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

export const LargeDensity: Story = {
  render: () => {
    const datatable = useDataTable({
      default: {
        sorting: [{ id: 'title', desc: false }],
        density: 'lg',
      },
    });

    return (
      <Provider>
        <Box>
          <Text fontWeight="bold" mb={4}>
            Large Density (lg) - 12px padding
          </Text>
          <DataTable columns={columns} data={data.slice(0, 10)} {...datatable}>
            <DefaultTable
              tableBodyProps={{ showSelector: true }}
              tableHeaderProps={{ showSelector: true }}
            />
          </DataTable>
        </Box>
      </Provider>
    );
  },
};

export const DensityComparison: Story = {
  render: () => {
    const datatableXs = useDataTable({
      default: {
        sorting: [{ id: 'title', desc: false }],
        density: 'xs',
      },
    });

    const datatableSm = useDataTable({
      default: {
        sorting: [{ id: 'title', desc: false }],
        density: 'sm',
      },
    });

    const datatableMd = useDataTable({
      default: {
        sorting: [{ id: 'title', desc: false }],
        density: 'md',
      },
    });

    const datatableLg = useDataTable({
      default: {
        sorting: [{ id: 'title', desc: false }],
        density: 'lg',
      },
    });

    return (
      <Provider>
        <Box>
          <Text fontWeight="bold" mb={4} fontSize="lg">
            Density Comparison
          </Text>
          <Flex direction="column" gap={8}>
            <Box>
              <Text fontWeight="semibold" mb={2}>
                Extra Small (xs) - 2px padding
              </Text>
              <DataTable
                columns={columns}
                data={data.slice(0, 5)}
                {...datatableXs}
              >
                <DefaultTable
                  tableBodyProps={{ showSelector: true }}
                  tableHeaderProps={{ showSelector: true }}
                />
              </DataTable>
            </Box>

            <Box>
              <Text fontWeight="semibold" mb={2}>
                Small (sm) - 4px padding
              </Text>
              <DataTable
                columns={columns}
                data={data.slice(0, 5)}
                {...datatableSm}
              >
                <DefaultTable
                  tableBodyProps={{ showSelector: true }}
                  tableHeaderProps={{ showSelector: true }}
                />
              </DataTable>
            </Box>

            <Box>
              <Text fontWeight="semibold" mb={2}>
                Medium (md) - 8px padding
              </Text>
              <DataTable
                columns={columns}
                data={data.slice(0, 5)}
                {...datatableMd}
              >
                <DefaultTable
                  tableBodyProps={{ showSelector: true }}
                  tableHeaderProps={{ showSelector: true }}
                />
              </DataTable>
            </Box>

            <Box>
              <Text fontWeight="semibold" mb={2}>
                Large (lg) - 12px padding
              </Text>
              <DataTable
                columns={columns}
                data={data.slice(0, 5)}
                {...datatableLg}
              >
                <DefaultTable
                  tableBodyProps={{ showSelector: true }}
                  tableHeaderProps={{ showSelector: true }}
                />
              </DataTable>
            </Box>
          </Flex>
        </Box>
      </Provider>
    );
  },
};
