# DataTable

Root component for **client-side** tables. Wraps `@tanstack/react-table`, provides `DataTableContext`, and registers a fuzzy global filter.

## Source

[`src/components/DataTable/DataTable.tsx`](../../../src/components/DataTable/DataTable.tsx)

## Import

```tsx
import { DataTable } from '@bsol-oss/react-datatable5';
```

## When to use

- Local data that fits in memory; sorting, filtering, and pagination run in the browser.
- Pair with `useDataTable()` for state and pass the returned setters/state into `DataTable`.

## API

### `DataTableProps<TData>`

| Name                                                                                                                                           | Description                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `data`                                                                                                                                         | Row array. Avoid replacing the array reference in a way that causes infinite re-renders. |
| `columns`                                                                                                                                      | TanStack `ColumnDef[]`.                                                                  |
| `columnOrder`, `columnFilters`, `globalFilter`, `density`, `pagination`, `sorting`, `rowSelection`, `columnVisibility`                         | Controlled table state.                                                                  |
| `setPagination`, `setSorting`, `setColumnFilters`, `setRowSelection`, `setGlobalFilter`, `setColumnOrder`, `setDensity`, `setColumnVisibility` | State updaters from `useDataTable`.                                                      |
| `enableRowSelection`, `enableMultiRowSelection`, `enableSubRowSelection`                                                                       | Row selection toggles.                                                                   |
| `onRowSelect`                                                                                                                                  | Callback when selection changes.                                                         |
| `tableLabel`                                                                                                                                   | Strings for toolbar / dialogs (see `DataTableLabel` in context).                         |
| `children`                                                                                                                                     | Typically `DefaultTable`, `TableControls`, etc.                                          |

## Example

```tsx
const datatable = useDataTable({ default: { pageSize: 20 } });

return (
  <DataTable columns={columns} data={rows} {...datatable}>
    <DefaultTable />
  </DataTable>
);
```

## Related

- [useDataTable](../datatable-hooks/use-data-table.md)
- [DefaultTable](../datatable-wrappers/default-table.md)

## See also

- Stories: `src/stories/DataTable/`
- [Component index](../README.md)
