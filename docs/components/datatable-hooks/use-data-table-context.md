# useDataTableContext

React context accessor for the current table instance and labels inside `DataTable` / `DataTableServer`.

## Source

[`src/components/DataTable/context/useDataTableContext.tsx`](../../../src/components/DataTable/context/useDataTableContext.tsx)

## Import

```tsx
import { useDataTableContext } from '@bsol-oss/react-datatable5';
```

## API

Returns `DataTableContextProps<TData>` including:

- `table` — TanStack `Table` instance
- `tableLabel` — UI strings for filters, pagination, etc.

Use inside children of `DataTable` or `DataTableServer`.

## Example

```tsx
const { table, tableLabel } = useDataTableContext<MyRow>();
const rowCount = table.getRowModel().rows.length;
```

## Related

- [DataTable](../datatable-core/data-table.md)

## See also

- [Component index](../README.md)
