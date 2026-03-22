# useDataTableServer

Extends `useDataTable` with a **React Query** request to a URL or custom `queryFn`. Sends `offset`, `limit`, `sorting`, `where` (column filters), and `searching` (global filter).

## Source

[`src/components/DataTable/useDataTableServer.tsx`](../../../src/components/DataTable/useDataTableServer.tsx)

## Import

```tsx
import {
  useDataTableServer,
  type DataResponse,
  type QueryParams,
} from '@bsol-oss/react-datatable5';
```

## API

### `UseDataTableServerProps<TData>`

| Name              | Description                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| `url`             | GET endpoint; axios is used with `params` derived from table state.            |
| `queryFn`         | Alternative to `url`: `(params: QueryParams) => Promise<DataResponse<TData>>`. |
| `debounce`        | Debounce refetches when state changes (default `true`).                        |
| `debounceDelay`   | Ms (default `1000`).                                                           |
| `placeholderData` | Passed to React Query.                                                         |
| `default`         | Same as `useDataTable`.                                                        |

### `QueryParams`

- `offset`, `limit`, `sorting`, `where`, `searching`

### Response shape

`DataResponse<T>`: `{ data: T[]; count: number }`.

## Example

```tsx
const datatable = useDataTableServer({
  url: '/api/items',
  default: { pageSize: 10 },
});

return <DataTableServer columns={cols} {...datatable} />;
```

## Related

- [DataTableServer](../datatable-core/data-table-server.md)

## See also

- [DATATABLE_SERVER_USAGE.md](../../DATATABLE_SERVER_USAGE.md)
- [Component index](../README.md)
