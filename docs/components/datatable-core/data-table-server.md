# DataTableServer

Root component for **server-driven** tables. Same controlled state as `DataTable`, plus a React Query result and optional URL for server context.

## Source

[`src/components/DataTable/DataTableServer.tsx`](../../../src/components/DataTable/DataTableServer.tsx)

## Import

```tsx
import { DataTableServer } from '@bsol-oss/react-datatable5';
```

## When to use

- Data is loaded from an API; pagination/sorting/filters are sent as query parameters.
- Use with `useDataTableServer()` which builds the query and expects `{ data: T[], count: number }`.

## API

### `DataTableServerProps<TData>`

Extends the same controlled-state shape as `DataTable`, plus:

| Name    | Description                                                   |
| ------- | ------------------------------------------------------------- |
| `query` | `UseQueryResult<DataResponse<TData>>` from React Query.       |
| `url`   | Optional; used by documentation and server context consumers. |

`DataResponse` is `{ data: TData[]; count: number }`.

## Example

```tsx
const datatable = useDataTableServer({
  url: 'https://api.example.com/items',
  default: { pageSize: 10 },
});

return (
  <DataTableServer columns={columns} {...datatable}>
    <DefaultTableServer />
    <Pagination />
  </DataTableServer>
);
```

## Related

- [useDataTableServer](../datatable-hooks/use-data-table-server.md)
- [DefaultTableServer](../datatable-wrappers/default-table-server.md)

## See also

- Stories: `src/stories/DataTableServer/`
- [DataTable Server usage](../../DATATABLE_SERVER_USAGE.md)
- [Component index](../README.md)
