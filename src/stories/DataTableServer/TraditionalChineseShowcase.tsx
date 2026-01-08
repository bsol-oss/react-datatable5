import { Provider } from '@/components/ui/provider';
import { Box, Text, VStack } from '@chakra-ui/react';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  DataTableServer,
  DefaultTable,
  TextCell,
  useDataTableServer,
} from '../../index';
import { DataTableLabel } from '../../components/DataTable/context/DataTableContext';
import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Traditional Chinese labels for DataTable
const traditionalChineseLabels: DataTableLabel = {
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
  noFiltersMatchText: '沒有符合的篩選條件',
  filterByLabel: '篩選依據',
  filterLabelsPlaceholder: '篩選標籤',
};

const TraditionalChineseShowcase = () => {
  const dataTable = useDataTableServer<Post>({
    queryFn: async (params) => {
      const response = await axios.get<Post[]>(
        `https://jsonplaceholder.typicode.com/posts`
      );
      return {
        data: response.data,
        count: response.data.length,
      };
    },
    default: {
      pagination: { pageSize: 25, pageIndex: 0 },
      sorting: [{ id: 'id', desc: false }],
    },
  });

  const columnHelper = createColumnHelper<Post>();

  const columns: ColumnDef<Post>[] = [
    columnHelper.accessor('id', {
      header: () => <span>編號</span>,
      cell: (props) => <TextCell>{props.row.original.id}</TextCell>,
      meta: {
        displayName: '編號',
        filterVariant: 'text',
      },
    }),
    columnHelper.accessor('title', {
      header: () => <span>標題</span>,
      cell: (props) => (
        <TextCell label={props.row.original.title}>
          {props.row.original.title}
        </TextCell>
      ),
      meta: {
        displayName: '標題',
        filterVariant: 'text',
      },
    }),
    columnHelper.accessor('body', {
      header: () => <span>內容</span>,
      cell: (props) => (
        <TextCell label={props.row.original.body}>
          {props.row.original.body}
        </TextCell>
      ),
      meta: {
        displayName: '內容',
        filterVariant: 'text',
      },
    }),
    columnHelper.accessor('userId', {
      header: () => <span>用戶編號</span>,
      cell: (props) => <TextCell>{props.row.original.userId}</TextCell>,
      meta: {
        displayName: '用戶編號',
        filterVariant: 'select',
        filterOptions: [
          { label: '用戶 1', value: 1 },
          { label: '用戶 2', value: 2 },
          { label: '用戶 3', value: 3 },
          { label: '用戶 4', value: 4 },
          { label: '用戶 5', value: 5 },
        ],
      },
    }),
  ];

  return (
    <Provider>
      <VStack align="stretch" gap={4} p={4}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            繁體中文資料表範例
          </Text>
          <Text fontSize="sm" color="fg.muted" mb={4}>
            此範例展示使用繁體中文標籤的伺服器端資料表。所有介面文字都已翻譯為繁體中文。
          </Text>
        </Box>

        <DataTableServer
          columns={columns}
          tableLabel={traditionalChineseLabels}
          {...dataTable}
        >
          <DefaultTable
            controlProps={{
              showGlobalFilter: true,
              showFilter: true,
              showReload: true,
              showView: true,
              showFilterTags: true,
              showPageCountText: true,
            }}
          />
        </DataTableServer>
      </VStack>
    </Provider>
  );
};

const queryClient = new QueryClient();

const TraditionalChineseShowcaseWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TraditionalChineseShowcase />
    </QueryClientProvider>
  );
};

export default TraditionalChineseShowcaseWrapper;
