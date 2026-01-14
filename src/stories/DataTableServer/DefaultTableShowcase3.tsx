import { Provider } from '@/components/ui/provider';
import { Button, Text } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import axios from 'axios';
import { DataTableServer, DefaultTable, useDataTableServer } from '../../index';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const DefaultTableShowcase3 = () => {
  const columnHelper = createColumnHelper<Post>();

  const columns: ColumnDef<Post>[] = [
    columnHelper.display({
      id: 'title',
      header: () => <span>Title</span>,
      cell: (props) => <Text>{props.row.original.title}</Text>,
      meta: {
        displayName: 'Title',
      },
    }),
    columnHelper.display({
      id: 'body',
      header: () => <span>Body</span>,
      cell: (props) => <Text>{props.row.original.title}</Text>,
      meta: {
        displayName: 'Body',
      },
    }),
    columnHelper.display({
      id: 'userId',
      header: () => <span>User ID</span>,
      cell: (props) => <Text>{props.row.original.title}</Text>,
      meta: {
        displayName: 'User ID',
      },
    }),
    // Display Column
    columnHelper.display({
      id: 'id',
      header: () => <span>ID</span>,
      cell: (props) => <Text>{props.row.original.title}</Text>,
      meta: {
        displayName: 'ID',
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <span>Actions</span>,
      cell: () => <Button>Edit</Button>,
      meta: {
        displayName: 'Actions',
      },
    }),
  ];

  const dataTable = useDataTableServer<Post>({
    queryFn: async (params) => {
      console.log(params, 'params');

      // Remarks: https://jsonplaceholder.typicode.com/posts do not support pagination and sorting.
      // so it ignore the limit and offset.
      const response = await axios.get<Post[]>(
        `https://jsonplaceholder.typicode.com/posts`
      );
      return {
        data: response.data,
        count: response.data.length,
      };
    },
    placeholderData: {
      data: [
        {
          userId: 1,
          id: 1,
          title: 'test',
          body: 'test',
        },
      ],
      count: 0,
    },
    default: {
      pagination: { pageSize: 25, pageIndex: 0 },
    },
  });

  return (
    <Provider>
      <DataTableServer columns={columns} {...dataTable}>
        <DefaultTable />
      </DataTableServer>
    </Provider>
  );
};

export default DefaultTableShowcase3;
