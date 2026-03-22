# DataTable server usage

Server-side tables use **`useDataTableServer`** + **`DataTableServer`** and expect your API to respond with a fixed shape.

## Response shape

```ts
interface DataResponse<T> {
  data: T[];
  count: number;
}
```

## Query parameters

The hook sends (among others):

| Param              | Role                    |
| ------------------ | ----------------------- |
| `offset` / `limit` | Pagination              |
| `sorting`          | TanStack `SortingState` |
| `where`            | Column filters          |
| `searching`        | Global filter string    |

Your backend should interpret these consistently with your `ColumnDef` and filter setup.

## Minimal setup

```tsx
const datatable = useDataTableServer({
  url: 'https://api.example.com/items',
  default: { pageSize: 20 },
});

return (
  <DataTableServer columns={columns} {...datatable}>
    <DefaultTableServer />
    <Pagination />
  </DataTableServer>
);
```

## Related

- [useDataTableServer](./components/datatable-hooks/use-data-table-server.md)
- [DataTableServer](./components/datatable-core/data-table-server.md)
