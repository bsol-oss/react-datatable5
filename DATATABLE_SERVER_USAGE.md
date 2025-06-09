# DataTableServer Generic Type Usage

## Updated Interface

The `DataTableServer` component has been updated to properly handle generic types for data structures. 

### Key Changes

1. **Generic Parameter**: `TData` now represents the individual row data type (e.g., `Product`, `User`, etc.)
2. **Query Type**: The `query` prop expects `UseQueryResult<DataResponse<TData>>`
3. **Column Type**: The `columns` prop expects `ColumnDef<TData>[]`

### Before (Incorrect)
```typescript
// This was incorrect - TData extended DataResponse
export interface DataTableServerProps<TData extends DataResponse = DataResponse<unknown>>

// Usage was confusing and didn't provide proper typing
<DataTableServer columns={columns} query={query} ... />
```

### After (Correct)
```typescript
// Now TData represents the individual row data type
export interface DataTableServerProps<TData = unknown>

// Usage with proper typing
<DataTableServer<Product> columns={columns} query={query} ... />
```

## Usage Example

```typescript
import { DataTableServer } from "./components/DataTable/DataTableServer";
import { useDataTableServer } from "./components/DataTable/useDataTableServer";
import { Product } from "./types";

// 1. Create the server-side data table hook with proper typing
const datatableServer = useDataTableServer<Product>({
  url: "/api/products",
  default: { 
    sorting: [{ id: "title", desc: false }],
    pagination: { pageIndex: 0, pageSize: 10 }
  },
});

// 2. Define columns with proper typing
const columns: ColumnDef<Product>[] = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (props) => props.row.original.id,
  }),
  columnHelper.accessor("title", {
    header: "Title", 
    cell: (props) => props.row.original.title,
  }),
  // ... more columns
];

// 3. Use DataTableServer with proper generic typing
<DataTableServer<Product>
  columns={columns}
  url="/api/products"
  {...datatableServer}
>
  <DefaultTable />
</DataTableServer>
```

## Server Response Format

The server endpoint should return data in the following format:

```typescript
interface DataResponse<T> {
  data: T[];      // Array of your data type (e.g., Product[])
  count: number;  // Total count for pagination
}

// Example response for Product data:
{
  "data": [
    { "id": 1, "title": "iPhone", "price": 999, ... },
    { "id": 2, "title": "MacBook", "price": 1999, ... }
  ],
  "count": 150
}
```

## Benefits

- **Type Safety**: Full TypeScript support for your data structures
- **IntelliSense**: Proper autocomplete for column accessors and cell renderers
- **Error Prevention**: Compile-time checking for data structure mismatches
- **Clear Intent**: Generic parameter clearly indicates the row data type 