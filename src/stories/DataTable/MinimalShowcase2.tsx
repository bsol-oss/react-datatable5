import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useDataTable } from '../../components/DataTable/useDataTable';
import { DataTable, TableDataDisplay, TextCell } from '../../index';
import { Product } from '../product_data';

export const data = [
  {
    id: 1,
    title: 'iPhone 9',
    description: 'An apple mobile which is like an apple',
    price: 549,
  },
  {
    id: 2,
    title: 'iPhone X',
    description:
      'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
    price: 899,
  },
] as Product[];

const DefaultTableShowcase = () => {
  const datatable = useDataTable();
  const columnHelper = createColumnHelper<Product>();
  const columns: ColumnDef<Product>[] = [
    columnHelper.display({
      id: 'id',
      cell: (props) => {
        return <TextCell>{props.row.original.id}</TextCell>;
      },
      header: () => <span>Id</span>,
      size: 50,
    }),
    columnHelper.display({
      id: 'title',
      cell: (props) => {
        return <TextCell>{props.row.original.title}hi</TextCell>;
      },
      header: () => <span>title</span>,
      size: 200,
    }),
    columnHelper.display({
      id: 'description',
      cell: (props) => {
        return <TextCell>{props.row.original.description}</TextCell>;
      },
      header: () => <span>description</span>,
      size: 400,
    }),
    columnHelper.accessor('description', {
      id: 'description2',
      cell: (props) => {
        return <TextCell>{props.row.original.description}</TextCell>;
      },
      header: () => <span>description</span>,
      size: 400,
    }),
  ];

  return (
    <DataTable columns={columns} data={data} {...datatable}>
      <TableDataDisplay colorPalette="yellow" />
      <TableDataDisplay colorPalette="red" />
      <TableDataDisplay colorPalette="blue" />
      <TableDataDisplay colorPalette="gray" />
    </DataTable>
  );
};

import { Provider } from '@/components/ui/provider';

const MinimalShowcase2 = () => {
  return (
    <Provider>
      <DefaultTableShowcase />
    </Provider>
  );
};

export default MinimalShowcase2;
