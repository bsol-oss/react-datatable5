import { Provider } from '@/components/ui/provider';
import { Box, Button, ButtonGroup, HStack, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { LuDelete } from 'react-icons/lu';
import { useDataTable } from '../../components/DataTable/useDataTable';
import { DataTable, DefaultTable, TableComponent, TextCell } from '../../index';
import { data, Product } from '../product_data';
import { BiPencil } from 'react-icons/bi';
import { BsEye } from 'react-icons/bs';
// Uncomment the following imports when using DataTableServer
// import { DataTableServer } from "../../components/DataTable/DataTableServer";
// import { useDataTableServer } from "../../components/DataTable/useDataTableServer";

const DefaultTableShowcase = () => {
  const datatable = useDataTable({
    default: { sorting: [{ id: 'title', desc: false }] },
  });

  const columnHelper = createColumnHelper<Product>();
  const columns: ColumnDef<Product>[] = [
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
              <TextCell label={props.row.original.title}>
                {props.row.original.title}
              </TextCell>
            );
          },
          header: () => <Box>Title</Box>,
          footer: (props) => props.column.id,
          size: 200,
        }),
        // Accessor Column
        columnHelper.accessor('description', {
          cell: (props) => {
            return <TextCell>{props.row.original.description}</TextCell>;
          },
          header: () => <span>Description</span>,
          footer: (props) => props.column.id,
          size: 400,
        }),
        // Accessor Column
        columnHelper.accessor('price', {
          cell: (props) => {
            return <TextCell>{props.row.original.price}</TextCell>;
          },
          header: () => <span>Price</span>,
          footer: () => <span>Price</span>,
          size: 80,
        }),
        // Accessor Column
        columnHelper.accessor('discountPercentage', {
          cell: (props) => {
            return <TextCell>{props.row.original.discountPercentage}</TextCell>;
          },
          header: () => <span>Discount %</span>,
          footer: () => <span>Discount %</span>,
          size: 120,
          enableColumnFilter: false,
        }),
        // Accessor Column
        columnHelper.accessor('rating', {
          cell: (props) => {
            return <TextCell>{props.row.original.rating}</TextCell>;
          },
          header: () => <span>Rating</span>,
          footer: () => <span>Rating</span>,
          size: 80,
        }),
        // Accessor Column
        columnHelper.accessor('stock', {
          cell: (props) => {
            return <TextCell>{props.row.original.stock}</TextCell>;
          },
          header: () => <span>Stock</span>,
          footer: () => <span>Stock</span>,
          size: 80,
        }),
        // Accessor Column
        columnHelper.accessor('brand', {
          cell: (props) => {
            return <TextCell>{props.row.original.brand}</TextCell>;
          },
          header: () => <span>品牌</span>,
          footer: () => <span>品牌</span>,
          size: 160,
          meta: {
            // config to traditional chinese if possible
            displayName: '品牌',
            filterVariant: 'select',
            filterOptions: [
              { label: '苹果', value: 'Apple' },
              { label: '华为', value: 'Huawei' },
            ],
            headerTexts: {
              pinColumn: '固定品牌列',
              sortAscending: '品牌排序A-Z',
            },
          },
        }),
        // Accessor Column
        columnHelper.accessor('category', {
          cell: (props) => {
            return <TextCell>{props.row.original.category}</TextCell>;
          },
          header: () => <span>Category</span>,
          footer: () => <span>Category</span>,
          size: 160,
          meta: {
            displayName: 'Brand',
            filterVariant: 'select',
            filterOptions: [
              { label: 'fragrances', value: 'fragrances' },
              { label: 'groceries', value: 'groceries' },
              { label: 'home-decoration', value: 'home-decoration' },
              { label: 'laptops', value: 'laptops' },
              { label: 'skincare', value: 'skincare' },
              { label: 'smartphones', value: 'smartphones' },
            ],
          },
        }),
      ],
    }),
    // Display Column
    columnHelper.display({
      id: 'actions',
      header: () => <span></span>,
      cell: () => (
        <HStack h={'100%'} alignItems={'center'} justifyContent={'end'}>
          <ButtonGroup size="sm" variant="outline" attached>
            <Button>
              <BsEye />
            </Button>
            <Button>
              <BiPencil />
            </Button>
            <Button>
              <LuDelete />
            </Button>
          </ButtonGroup>
        </HStack>
      ),
    }),
  ];

  return (
    <Provider>
      {/* Example using regular DataTable for client-side data */}
      <DataTable columns={columns} data={data} {...datatable}>
        <DefaultTable
          controlProps={{
            filterTagsOptions: [
              {
                column: 'brand',
                options: [
                  { label: '苹果', value: 'Apple' },
                  { label: '华为', value: 'Huawei' },
                ],
              },
              {
                column: 'category',
                options: [
                  { label: 'fragrances', value: 'fragrances' },
                  { label: 'groceries', value: 'groceries' },
                  { label: 'home-decoration', value: 'home-decoration' },
                  { label: 'laptops', value: 'laptops' },
                  { label: 'skincare', value: 'skincare' },
                  { label: 'smartphones', value: 'smartphones' },
                ],
              },
            ],
            gridProps: {
              colorPalette: 'red',
            },
          }}
          tableProps={{
            colorPalette: 'red',
          }}
          tableBodyProps={{ showSelector: true }}
          tableHeaderProps={{ showSelector: true }}
        />
        <DefaultTable
          controlProps={{
            showPagination: false,
            gridProps: {
              colorPalette: 'purple',
            },
          }}
          tableProps={{}}
          tableBodyProps={{ showSelector: true }}
          tableHeaderProps={{
            showSelector: true,
            tableRowProps: {
              height: '20',
            },
          }}
        />
        <TableComponent
          render={(table) => {
            return (
              <Text>Table state nice: {JSON.stringify(table.getState())}</Text>
            );
          }}
        />
        <TableComponent
          render={(table) => {
            return (
              <Button
                onClick={() => {
                  table.setRowSelection({});
                }}
              >
                {'reset select'}
              </Button>
            );
          }}
        />
        <Box width="400px" height={'400px'}>
          <DefaultTable
            controlProps={{
              showFilter: true,
            }}
          />
        </Box>
        <Box width="2400px" height={'2400px'}>
          <DefaultTable
            controlProps={{
              showFilter: true,
            }}
          />
        </Box>

        <Text> {'fitTable={true}'}</Text>

        <Box width="400px" height={'400px'}>
          <DefaultTable
            controlProps={{
              showFilter: true,
              fitTableWidth: true,
            }}
          />
        </Box>
        <Box width="2400px" height={'2400px'}>
          <DefaultTable
            controlProps={{
              showFilter: true,
              fitTableWidth: true,
              fitTableHeight: true,
            }}
          />
        </Box>

        <Box width="2400px" height={'2400px'}>
          <DefaultTable
            controlProps={{
              showFilter: true,
              fitTableWidth: true,
              fitTableHeight: true,
            }}
          />
        </Box>

        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
      </DataTable>

      {/* Example of how to use DataTableServer with proper typing:
      
      <DataTableServer<Product>
        columns={columns}
        url="/api/products"
        {...datatableServer}
      >
        <DefaultTable />
      </DataTableServer>
      
      This will now properly type the TData generic as Product,
      ensuring that:
      - columns: ColumnDef<Product>[]
      - query: UseQueryResult<DataResponse<Product>>
      - The server response should be: { data: Product[], count: number }
      */}
    </Provider>
  );
};

export default DefaultTableShowcase;
