# DataTableServer Usage Guide

## Overview

`DataTableServer` is a server-side data table component that fetches data from an API endpoint. It uses `@tanstack/react-query` for data fetching and `@tanstack/react-table` for table state management. All filtering, sorting, and pagination are handled server-side.

## Basic Setup

### 1. Wrap Your App with QueryClientProvider

`DataTableServer` requires `@tanstack/react-query` to be configured. Wrap your application (or the component tree containing the table) with `QueryClientProvider`:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from '@bsol-oss/react-datatable5/components/ui/provider';
import {
  DataTableServer,
  useDataTableServer,
  DefaultTable,
} from '@bsol-oss/react-datatable5';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <MyDataTable />
      </Provider>
    </QueryClientProvider>
  );
}
```

### 2. Define Your Data Type

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  status: 'active' | 'inactive';
  created_at: string;
}
```

### 3. Create Column Definitions

```tsx
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<Product>();

const columns: ColumnDef<Product>[] = [
  columnHelper.accessor('name', {
    header: 'Product Name',
    cell: (info) => info.getValue(),
    meta: {
      displayName: 'Product Name',
    },
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => `$${info.getValue()}`,
    meta: {
      displayName: 'Price',
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue(),
    meta: {
      displayName: 'Status',
      filterVariant: 'select',
      filterOptions: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
  }),
];
```

### 4. Use the Hook and Component

```tsx
function MyDataTable() {
  const dataTable = useDataTableServer<Product>({
    url: 'https://api.example.com/products',
    default: {
      pagination: { pageSize: 10, pageIndex: 0 },
      sorting: [{ id: 'name', desc: false }],
    },
  });

  return (
    <DataTableServer<Product> columns={columns} {...dataTable}>
      <DefaultTable />
    </DataTableServer>
  );
}
```

## API Requirements

### Request Parameters

The server endpoint must accept the following query parameters:

```typescript
interface QueryParams {
  offset: number; // Calculated as pageIndex * pageSize
  limit: number; // Page size
  sorting: SortingState; // Array of { id: string, desc: boolean }
  where: ColumnFiltersState; // Array of column filters
  searching: string; // Global search term
}
```

**Example Request:**

```
GET /api/products?offset=0&limit=10&sorting=[{"id":"name","desc":false}]&where=[]&searching=
```

### Response Format

The server must return data in this format:

```typescript
interface DataResponse<T> {
  data: T[]; // Array of data items
  count: number; // Total count for pagination
}
```

**Example Response:**

```json
{
  "data": [
    { "id": "1", "name": "Product A", "price": 100, "status": "active" },
    { "id": "2", "name": "Product B", "price": 200, "status": "inactive" }
  ],
  "count": 150
}
```

## Hook Configuration

### `useDataTableServer` Options

```tsx
const dataTable = useDataTableServer<Product>({
  // Required: API endpoint URL
  url: 'https://api.example.com/products',

  // Optional: Custom query function (alternative to url)
  queryFn: async (params) => {
    const response = await axios.get('/api/products', { params });
    return response.data;
  },

  // Optional: Default state values
  default: {
    pagination: { pageSize: 10, pageIndex: 0 },
    sorting: [{ id: 'name', desc: false }],
    columnFilters: [],
    globalFilter: '',
    rowSelection: {},
    columnOrder: [],
    columnVisibility: {},
    density: 'sm', // 'sm' | 'md' | 'lg'
  },

  // Optional: Debounce settings (default: true, 1000ms)
  debounce: true,
  debounceDelay: 1000,

  // Optional: Placeholder data while loading
  placeholderData: {
    data: [],
    count: 0,
  },
});
```

### Return Values

The hook returns all state and setters needed by `DataTableServer`:

```tsx
{
  // State
  pagination: PaginationState;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  globalFilter: string;
  rowSelection: RowSelectionState;
  columnOrder: ColumnOrderState;
  columnVisibility: VisibilityState;
  density: DensityState;

  // Setters
  setPagination: OnChangeFn<PaginationState>;
  setSorting: OnChangeFn<SortingState>;
  setColumnFilters: OnChangeFn<ColumnFiltersState>;
  setGlobalFilter: OnChangeFn<string>;
  setRowSelection: OnChangeFn<RowSelectionState>;
  setColumnOrder: OnChangeFn<ColumnOrderState>;
  setColumnVisibility: OnChangeFn<VisibilityState>;
  setDensity: OnChangeFn<DensityState>;

  // React Query result
  query: UseQueryResult<DataResponse<Product>, Error>;
}
```

## Component Props

### `DataTableServer` Props

```tsx
<DataTableServer<Product>
  columns={columns}
  url="https://api.example.com/products" // Optional, for reference
  enableRowSelection={true}
  enableMultiRowSelection={true}
  enableSubRowSelection={true}
  tableLabel={{
    view: 'View',
    edit: 'Edit',
    filterButtonText: 'Filter',
    // ... other labels
  }}
  {...dataTable} // Spread all values from useDataTableServer
>
  {/* Display components */}
</DataTableServer>
```

## Display Components

### DefaultTable

The most common display component with built-in controls:

```tsx
<DataTableServer<Product> columns={columns} {...dataTable}>
  <DefaultTable
    controlProps={{
      showFilter: true,
      showReload: true,
      fitTableWidth: false,
      fitTableHeight: false,
      filterTagsOptions: [
        {
          column: 'status',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ],
        },
      ],
      extraItems: <Button>Custom Action</Button>,
    }}
  />
</DataTableServer>
```

### TableCards

Display data as cards instead of a table:

```tsx
import { TableCards } from '@bsol-oss/react-datatable5';

<DataTableServer<Product> columns={columns} {...dataTable}>
  <TableCards<Product>
    renderCard={(row) => (
      <Card>
        <CardHeader>{row.original.name}</CardHeader>
        <CardBody>Price: ${row.original.price}</CardBody>
      </Card>
    )}
  />
</DataTableServer>;
```

### Custom Display

You can compose your own display using lower-level components:

```tsx
import {
  TableComponent,
  TableHeader,
  TableBody,
  TableFooter,
} from '@bsol-oss/react-datatable5';

<DataTableServer<Product> columns={columns} {...dataTable}>
  <TableComponent
    render={(table) => (
      <>
        <TableHeader table={table} />
        <TableBody table={table} />
        <TableFooter table={table} />
      </>
    )}
  />
</DataTableServer>;
```

## Custom Query Function

Instead of using a URL, you can provide a custom query function for more control:

```tsx
const dataTable = useDataTableServer<Product>({
  queryFn: async (params) => {
    // Custom logic here
    const response = await axios.get('/api/products', {
      params: {
        skip: params.offset,
        take: params.limit,
        orderBy: params.sorting.map((s) => ({
          [s.id]: s.desc ? 'desc' : 'asc',
        })),
        filters: params.where,
        search: params.searching,
      },
    });

    return {
      data: response.data.items,
      count: response.data.total,
    };
  },
});
```

## Advanced Features

### Debouncing

By default, requests are debounced by 1000ms to prevent excessive API calls. You can customize this:

```tsx
const dataTable = useDataTableServer<Product>({
  url: '/api/products',
  debounce: true, // Enable debouncing
  debounceDelay: 500, // 500ms delay
});
```

Or disable debouncing entirely:

```tsx
const dataTable = useDataTableServer<Product>({
  url: '/api/products',
  debounce: false, // No debouncing
});
```

### Placeholder Data

Show data immediately while the first request loads:

```tsx
const dataTable = useDataTableServer<Product>({
  url: '/api/products',
  placeholderData: {
    data: [{ id: '1', name: 'Loading...', price: 0, status: 'active' }],
    count: 0,
  },
});
```

### Accessing Query State

The `query` object from React Query is available for loading states, errors, etc.:

```tsx
function MyDataTable() {
  const dataTable = useDataTableServer<Product>({
    url: '/api/products',
  });

  // Access query state
  const { isLoading, isError, error } = dataTable.query;

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <DataTableServer<Product> columns={columns} {...dataTable}>
      <DefaultTable />
    </DataTableServer>
  );
}
```

### Custom Labels

Customize all user-facing text:

```tsx
<DataTableServer<Product>
  columns={columns}
  {...dataTable}
  tableLabel={{
    view: '查看',
    edit: '編輯',
    filterButtonText: '篩選',
    filterTitle: '篩選條件',
    filterReset: '重置',
    filterClose: '關閉',
    reloadTooltip: '重新載入',
    reloadButtonText: '重新載入',
    resetSelection: '重置選擇',
    resetSorting: '重置排序',
    globalFilterPlaceholder: '搜尋...',
    trueLabel: '是',
    falseLabel: '否',
    // ... more labels
  }}
>
  <DefaultTable />
</DataTableServer>
```

## Complete Example

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from '@bsol-oss/react-datatable5/components/ui/provider';
import {
  DataTableServer,
  useDataTableServer,
  DefaultTable,
  ColumnDef,
  createColumnHelper,
} from '@bsol-oss/react-datatable5';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

const queryClient = new QueryClient();
const columnHelper = createColumnHelper<User>();

function UsersTable() {
  const dataTable = useDataTableServer<User>({
    url: 'https://api.example.com/users',
    default: {
      pagination: { pageSize: 20, pageIndex: 0 },
      sorting: [{ id: 'created_at', desc: true }],
    },
  });

  const columns: ColumnDef<User>[] = [
    columnHelper.accessor('name', {
      header: 'Name',
      meta: { displayName: 'Name' },
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      meta: { displayName: 'Email' },
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      meta: {
        displayName: 'Role',
        filterVariant: 'select',
        filterOptions: [
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
        ],
      },
    }),
  ];

  return (
    <DataTableServer<User> columns={columns} {...dataTable}>
      <DefaultTable
        controlProps={{
          showFilter: true,
          showReload: true,
        }}
      />
    </DataTableServer>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <UsersTable />
      </Provider>
    </QueryClientProvider>
  );
}
```

## Key Differences from DataTable

- **DataTable**: Client-side table that handles all filtering, sorting, and pagination locally
- **DataTableServer**: Server-side table that sends all state to the API and receives paginated results

Use `DataTableServer` when:

- Working with large datasets
- Need server-side filtering/sorting
- Want to reduce client-side memory usage
- API already supports pagination

Use `DataTable` when:

- Working with small datasets (< 1000 rows)
- Want instant filtering/sorting without API calls
- Data is already loaded in memory
