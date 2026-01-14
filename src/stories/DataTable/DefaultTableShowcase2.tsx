import { Provider } from '@/components/ui/provider';
import { Box, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useDataTable } from '../../components/DataTable/useDataTable';
import {
  DataDisplay,
  DataTable,
  DefaultTable,
  TableComponent,
  TableControls,
  TextCell,
} from '../../index';
import { Employee, staffData } from '../staff_data';

const RowActions = () => {
  return <>has no actions</>;
};

const DefaultTableShowcase2 = () => {
  const datatable = useDataTable({
    default: { sorting: [{ id: 'title', desc: false }] },
  });
  const columnHelper = createColumnHelper<Employee>();
  const columns: ColumnDef<Employee>[] = [
    // Display Column
    columnHelper.display({
      id: 'actions',
      header: () => <span>Actions</span>,
      cell: () => <RowActions />,
    }),

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
        columnHelper.accessor('is_active', {
          cell: (props) => {
            return (
              <TextCell>
                {props.row.original.is_active ? 'true' : 'false'}
              </TextCell>
            );
          },
          header: () => <span>is_active</span>,
          footer: () => <span>is_active</span>,
          size: 100,
          filterFn: (row, _col, filterValue) => {
            return filterValue.some((value: 'true' | 'false') => {
              if (value === undefined || value === null) {
                return false;
              }
              if (value === 'true') {
                return row.original.is_active === true;
              }
              if (value === 'false') {
                return row.original.is_active === false;
              }
            });
          },
          meta: {
            filterVariant: 'boolean',
          },
        }),
        columnHelper.accessor('hire_date', {
          cell: (props) => {
            return <TextCell>{props.row.original.hire_date}</TextCell>;
          },
          header: () => <span>hire_date</span>,
          footer: () => <span>hire_date</span>,
          size: 100,
          filterFn: (row, columnId, filterValue) => {
            console.log(row, columnId, filterValue, 'dksopf');

            if (!row || !columnId || !filterValue || filterValue.length !== 2) {
              return false; // Handle invalid input gracefully
            }
            const hireDateValue = row.getValue(columnId);

            if (!hireDateValue) {
              return false; // Handle missing hire date gracefully.  Crucially important!
            }

            // Ensure hireDateValue is a Date object.  Crucially important!
            let hireDate: Date;
            if (hireDateValue instanceof Date) {
              hireDate = hireDateValue;
            } else {
              try {
                hireDate = new Date(hireDateValue as string | number); // Try to parse it if it's a string
              } catch (error) {
                console.error('Error parsing hire date:', hireDateValue, error);
                return false; // Handle invalid date strings gracefully
              }
            }

            const startDate = filterValue[0];
            const endDate = filterValue[1];

            if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
              console.error('Invalid filter dates provided.');
              return false; // Handle cases where filter values aren't valid dates.
            }

            return hireDate >= startDate && hireDate <= endDate;
          },
          meta: {
            filterVariant: 'dateRange',
          },
        }),

        columnHelper.accessor('university', {
          cell: (props) => {
            return <TextCell>{props.row.original.university}</TextCell>;
          },
          header: () => <span>university</span>,
          footer: () => <span>university</span>,
          size: 400,
          filterFn: () => {
            return true;
          },
          meta: {
            filterVariant: 'custom',
            renderFilter: () => {
              return <>custom filter</>;
            },
          },
        }),
      ],
    }),
  ];

  return (
    <Provider>
      <DataTable columns={columns} data={staffData} {...datatable}>
        <TableControls>
          <DataDisplay />
        </TableControls>

        <DefaultTable
          controlProps={{
            showFilter: true,
            filterTagsOptions: [
              {
                column: 'university',
                options: [
                  { label: 'university', value: 'university' },
                  { label: 'university', value: 'university' },
                ],
              },
            ],
          }}
          variant="greedy"
        />
        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
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

        <Text>
          {`controlProps={{
              showFilter: true,
              fitTableWidth: true,
            }}`}
        </Text>

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

        <TableComponent
          render={(table) => {
            return <Text>Table state: {JSON.stringify(table.getState())}</Text>;
          }}
        />
      </DataTable>
    </Provider>
  );
};

export default DefaultTableShowcase2;
